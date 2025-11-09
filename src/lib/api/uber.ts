import { createApiClient, ApiError, type PriceRange, type Location } from './base';

// Uber API Types
export interface UberProduct {
  product_id: string;
  description: string;
  display_name: string;
  capacity: number;
  image: string;
  cash_enabled: boolean;
  shared: boolean;
  short_description?: string;
  price_details?: {
    service_fees: Array<{
      fee: number;
      name: string;
    }>;
    cost_per_minute: number;
    distance_unit: string;
    cost_per_distance: number;
    base: number;
    cancellation_fee: number;
    currency_code: string;
    minimum: number;
  };
}

export interface UberPriceEstimate {
  product_id: string;
  currency_code: string;
  display_name: string;
  estimate: string;
  low_estimate?: number;
  high_estimate?: number;
  surge_multiplier?: number;
  duration: number; // in seconds
  distance: number; // in miles
}

export interface UberTimeEstimate {
  product_id: string;
  display_name: string;
  estimate: number; // in seconds
}

export interface UberRideRequest {
  start_latitude: number;
  start_longitude: number;
  end_latitude: number;
  end_longitude: number;
  product_id?: string;
  surge_confirmation_id?: string;
  payment_method_id?: string;
}

export interface UberRideDetails {
  request_id: string;
  status: 'processing' | 'no_drivers_available' | 'accepted' | 'arriving' | 'in_progress' | 'driver_canceled' | 'rider_canceled' | 'completed';
  vehicle?: {
    make: string;
    model: string;
    license_plate: string;
    picture_url?: string;
  };
  driver?: {
    phone_number: string;
    sms_number: string;
    name: string;
    picture_url?: string;
    rating: number;
  };
  location?: {
    latitude: number;
    longitude: number;
    bearing: number;
  };
  eta?: number;
  surge_multiplier?: number;
  pickup?: {
    latitude: number;
    longitude: number;
    eta: number;
  };
  destination?: {
    latitude: number;
    longitude: number;
    eta: number;
  };
}

export interface UberSearchParams {
  pickup: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  destination: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  time?: string; // ISO 8601 timestamp for future rides
  seat_count?: number;
}

export interface UberEstimateResponse {
  products: UberProduct[];
  prices: UberPriceEstimate[];
  times: UberTimeEstimate[];
  pickup_location: Location;
  destination_location: Location;
  total_distance: number;
  estimated_trip_time: number;
  currency: string;
}

class UberApiService {
  private client;
  private apiKey: string;
  private isSandbox: boolean;

  constructor() {
    this.apiKey = process.env.UBER_API_KEY || '';
    this.isSandbox = process.env.NODE_ENV === 'development';
    
    // Use sandbox API for development/testing
    const baseUrl = this.isSandbox 
      ? 'https://sandbox-api.uber.com/v1.2' 
      : 'https://api.uber.com/v1.2';
    
    this.client = createApiClient(baseUrl, this.apiKey);
  }

  /**
   * Get available Uber products at a location
   */
  async getProducts(latitude: number, longitude: number): Promise<UberProduct[]> {
    try {
      if (!this.apiKey) {
        console.warn('Uber API key not configured, using mock data');
        return this.getMockProducts();
      }

      const response = await this.client.get<{ products: UberProduct[] }>('/products', {
        latitude,
        longitude
      });

      return response.products || [];
    } catch (error) {
      console.error('Uber Products API Error:', error);
      return this.getMockProducts();
    }
  }

  /**
   * Get price estimates for a trip
   */
  async getPriceEstimates(params: UberSearchParams): Promise<UberPriceEstimate[]> {
    try {
      if (!this.apiKey) {
        console.warn('Uber API key not configured, using mock data');
        return this.getMockPriceEstimates(params);
      }

      const response = await this.client.get<{ prices: UberPriceEstimate[] }>('/estimates/price', {
        start_latitude: params.pickup.latitude,
        start_longitude: params.pickup.longitude,
        end_latitude: params.destination.latitude,
        end_longitude: params.destination.longitude,
        ...(params.seat_count && { seat_count: params.seat_count })
      });

      return response.prices || [];
    } catch (error) {
      console.error('Uber Price Estimates API Error:', error);
      return this.getMockPriceEstimates(params);
    }
  }

  /**
   * Get time estimates for pickup
   */
  async getTimeEstimates(latitude: number, longitude: number, productId?: string): Promise<UberTimeEstimate[]> {
    try {
      if (!this.apiKey) {
        console.warn('Uber API key not configured, using mock data');
        return this.getMockTimeEstimates();
      }

      const response = await this.client.get<{ times: UberTimeEstimate[] }>('/estimates/time', {
        start_latitude: latitude,
        start_longitude: longitude,
        ...(productId && { product_id: productId })
      });

      return response.times || [];
    } catch (error) {
      console.error('Uber Time Estimates API Error:', error);
      return this.getMockTimeEstimates();
    }
  }

  /**
   * Get comprehensive ride estimates (products, prices, times)
   */
  async getRideEstimates(params: UberSearchParams): Promise<UberEstimateResponse> {
    try {
      const [products, prices, times] = await Promise.allSettled([
        this.getProducts(params.pickup.latitude, params.pickup.longitude),
        this.getPriceEstimates(params),
        this.getTimeEstimates(params.pickup.latitude, params.pickup.longitude)
      ]);

      const productsData = products.status === 'fulfilled' ? products.value : [];
      const pricesData = prices.status === 'fulfilled' ? prices.value : [];
      const timesData = times.status === 'fulfilled' ? times.value : [];

      // Calculate total distance using Haversine formula
      const totalDistance = this.calculateDistance(
        params.pickup.latitude,
        params.pickup.longitude,
        params.destination.latitude,
        params.destination.longitude
      );

      // Estimate trip time based on distance (rough estimate: 30 mph average in city)
      const estimatedTripTime = Math.round((totalDistance / 30) * 60 * 60); // in seconds

      return {
        products: productsData,
        prices: pricesData,
        times: timesData,
        pickup_location: {
          id: 'pickup',
          name: params.pickup.address || 'Pickup Location',
          country: '',
          coordinates: {
            lat: params.pickup.latitude,
            lng: params.pickup.longitude
          }
        },
        destination_location: {
          id: 'destination',
          name: params.destination.address || 'Destination',
          country: '',
          coordinates: {
            lat: params.destination.latitude,
            lng: params.destination.longitude
          }
        },
        total_distance: totalDistance,
        estimated_trip_time: estimatedTripTime,
        currency: pricesData[0]?.currency_code || 'USD'
      };
    } catch (error) {
      console.error('Uber Ride Estimates Error:', error);
      return this.getMockRideEstimates(params);
    }
  }

  /**
   * Request a ride (for future implementation - requires OAuth)
   */
  async requestRide(params: UberRideRequest): Promise<UberRideDetails | null> {
    try {
      if (!this.apiKey) {
        console.warn('Uber ride requests require authenticated API access');
        return null;
      }

      // Note: This requires OAuth authentication and user consent
      const response = await this.client.post<UberRideDetails>('/requests', params);
      return response;
    } catch (error) {
      console.error('Uber Ride Request Error:', error);
      return null;
    }
  }

  /**
   * Get ride details by request ID
   */
  async getRideDetails(requestId: string): Promise<UberRideDetails | null> {
    try {
      if (!this.apiKey) {
        return null;
      }

      const response = await this.client.get<UberRideDetails>(`/requests/${requestId}`);
      return response;
    } catch (error) {
      console.error('Uber Ride Details Error:', error);
      return null;
    }
  }

  /**
   * Calculate distance between two points using Haversine formula
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Mock products for development/fallback
   */
  private getMockProducts(): UberProduct[] {
    return [
      {
        product_id: 'mock-uberx',
        description: 'Low-cost, everyday rides',
        display_name: 'UberX',
        capacity: 4,
        image: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-uberx.png',
        cash_enabled: true,
        shared: false,
        short_description: 'Affordable, everyday rides',
        price_details: {
          service_fees: [],
          cost_per_minute: 0.26,
          distance_unit: 'mile',
          cost_per_distance: 1.15,
          base: 2.20,
          cancellation_fee: 5.00,
          currency_code: 'USD',
          minimum: 7.65
        }
      },
      {
        product_id: 'mock-comfort',
        description: 'Newer cars with more space',
        display_name: 'Uber Comfort',
        capacity: 4,
        image: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-comfort.png',
        cash_enabled: true,
        shared: false,
        short_description: 'Newer cars, extra legroom',
        price_details: {
          service_fees: [],
          cost_per_minute: 0.35,
          distance_unit: 'mile',
          cost_per_distance: 1.75,
          base: 3.65,
          cancellation_fee: 5.00,
          currency_code: 'USD',
          minimum: 9.65
        }
      },
      {
        product_id: 'mock-xl',
        description: 'Rides for up to 6 people',
        display_name: 'UberXL',
        capacity: 6,
        image: 'https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-uberxl.png',
        cash_enabled: true,
        shared: false,
        short_description: 'Rides for groups up to 6',
        price_details: {
          service_fees: [],
          cost_per_minute: 0.45,
          distance_unit: 'mile',
          cost_per_distance: 2.20,
          base: 4.85,
          cancellation_fee: 10.00,
          currency_code: 'USD',
          minimum: 12.65
        }
      }
    ];
  }

  /**
   * Mock price estimates for development/fallback
   */
  private getMockPriceEstimates(params: UberSearchParams): UberPriceEstimate[] {
    const distance = this.calculateDistance(
      params.pickup.latitude,
      params.pickup.longitude,
      params.destination.latitude,
      params.destination.longitude
    );
    
    const baseTime = Math.round(distance * 2 * 60); // ~30mph in seconds

    return [
      {
        product_id: 'mock-uberx',
        currency_code: 'USD',
        display_name: 'UberX',
        estimate: '$12-16',
        low_estimate: 12,
        high_estimate: 16,
        surge_multiplier: 1.0,
        duration: baseTime,
        distance: distance
      },
      {
        product_id: 'mock-comfort',
        currency_code: 'USD',
        display_name: 'Uber Comfort',
        estimate: '$16-22',
        low_estimate: 16,
        high_estimate: 22,
        surge_multiplier: 1.0,
        duration: baseTime,
        distance: distance
      },
      {
        product_id: 'mock-xl',
        currency_code: 'USD',
        display_name: 'UberXL',
        estimate: '$22-30',
        low_estimate: 22,
        high_estimate: 30,
        surge_multiplier: 1.0,
        duration: baseTime,
        distance: distance
      }
    ];
  }

  /**
   * Mock time estimates for development/fallback
   */
  private getMockTimeEstimates(): UberTimeEstimate[] {
    return [
      {
        product_id: 'mock-uberx',
        display_name: 'UberX',
        estimate: 420 // 7 minutes
      },
      {
        product_id: 'mock-comfort',
        display_name: 'Uber Comfort',
        estimate: 540 // 9 minutes
      },
      {
        product_id: 'mock-xl',
        display_name: 'UberXL',
        estimate: 720 // 12 minutes
      }
    ];
  }

  /**
   * Mock comprehensive ride estimates
   */
  private getMockRideEstimates(params: UberSearchParams): UberEstimateResponse {
    const distance = this.calculateDistance(
      params.pickup.latitude,
      params.pickup.longitude,
      params.destination.latitude,
      params.destination.longitude
    );

    return {
      products: this.getMockProducts(),
      prices: this.getMockPriceEstimates(params),
      times: this.getMockTimeEstimates(),
      pickup_location: {
        id: 'pickup',
        name: params.pickup.address || 'Pickup Location',
        country: '',
        coordinates: {
          lat: params.pickup.latitude,
          lng: params.pickup.longitude
        }
      },
      destination_location: {
        id: 'destination',
        name: params.destination.address || 'Destination',
        country: '',
        coordinates: {
          lat: params.destination.latitude,
          lng: params.destination.longitude
        }
      },
      total_distance: distance,
      estimated_trip_time: Math.round(distance * 2 * 60), // ~30mph
      currency: 'USD'
    };
  }
}

export const uberApi = new UberApiService();