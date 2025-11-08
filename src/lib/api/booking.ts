import { createApiClient, ApiError, type PriceRange, type Location } from './base';

// Booking.com API Types
export interface BookingHotel {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  mainPhotoUrl?: string;
  amenities: string[];
  description?: string;
  pricePerNight: PriceRange;
  cancellationPolicy: 'free' | 'partial' | 'non-refundable';
  breakfastIncluded: boolean;
  distanceFromCenter?: number;
}

export interface BookingSearchParams {
  destination: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children?: number;
  rooms?: number;
  currency?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  starRating?: number[];
  guestRating?: number;
  amenities?: string[];
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
}

export interface BookingSearchResponse {
  hotels: BookingHotel[];
  totalCount: number;
  searchId: string;
  location: Location;
  averagePrice: number;
  priceRange: PriceRange;
}

class BookingApiService {
  private client;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.BOOKING_API_KEY || '';
    
    // Note: Booking.com uses a different authentication method in production
    // This is a simplified implementation for demonstration
    this.client = createApiClient('https://api.booking.com/v1', this.apiKey);
  }

  /**
   * Search for hotels in a destination
   */
  async searchHotels(params: BookingSearchParams): Promise<BookingSearchResponse> {
    try {
      // In production, you would use Booking.com's actual API endpoints
      // This is a mock implementation that demonstrates the structure
      
      if (!this.apiKey) {
        console.warn('Booking.com API key not configured, using mock data');
        return this.getMockHotelData(params);
      }

      const searchParams = {
        dest_id: await this.getDestinationId(params.destination),
        checkin: params.checkIn,
        checkout: params.checkOut,
        adults: params.adults,
        children: params.children || 0,
        rooms: params.rooms || 1,
        currency: params.currency || 'USD',
        language: params.language || 'en',
        order: params.sortBy || 'popularity',
        ...(params.minPrice && { min_price: params.minPrice }),
        ...(params.maxPrice && { max_price: params.maxPrice }),
        ...(params.starRating && { stars: params.starRating.join(',') }),
        ...(params.guestRating && { review_score: params.guestRating }),
      };

      const response = await this.client.get<any>('/search', searchParams);
      
      return this.transformBookingResponse(response, params);
    } catch (error) {
      console.error('Booking API Error:', error);
      // Fallback to mock data on error
      return this.getMockHotelData(params);
    }
  }

  /**
   * Get hotel details by ID
   */
  async getHotelDetails(hotelId: string, checkIn?: string, checkOut?: string): Promise<BookingHotel | null> {
    try {
      if (!this.apiKey) {
        console.warn('Booking.com API key not configured, using mock data');
        return this.getMockHotelDetails(hotelId);
      }

      const response = await this.client.get<any>(`/hotels/${hotelId}`, {
        checkin: checkIn,
        checkout: checkOut
      });

      return this.transformHotelDetails(response);
    } catch (error) {
      console.error('Booking Hotel Details Error:', error);
      return this.getMockHotelDetails(hotelId);
    }
  }

  /**
   * Get destination ID from destination name
   */
  private async getDestinationId(destination: string): Promise<string> {
    try {
      const response = await this.client.get<any>('/destinations', {
        query: destination,
        language: 'en'
      });
      
      return response.destinations?.[0]?.dest_id || destination;
    } catch (error) {
      console.error('Destination lookup error:', error);
      return destination;
    }
  }

  /**
   * Transform Booking.com API response to our format
   */
  private transformBookingResponse(response: any, params: BookingSearchParams): BookingSearchResponse {
    // Transform the actual Booking.com response format to our interface
    const hotels: BookingHotel[] = (response.result || []).map((hotel: any) => ({
      id: hotel.hotel_id?.toString() || '',
      name: hotel.hotel_name || '',
      address: hotel.address || '',
      city: hotel.city || '',
      country: hotel.country_trans || '',
      coordinates: {
        lat: parseFloat(hotel.latitude) || 0,
        lng: parseFloat(hotel.longitude) || 0,
      },
      starRating: hotel.class || 0,
      reviewScore: parseFloat(hotel.review_score) || 0,
      reviewCount: parseInt(hotel.review_nr) || 0,
      mainPhotoUrl: hotel.main_photo_url,
      amenities: hotel.hotel_facilities?.map((f: any) => f.name) || [],
      description: hotel.hotel_description,
      pricePerNight: {
        min: parseFloat(hotel.min_total_price) || 0,
        max: parseFloat(hotel.max_total_price) || 0,
        currency: params.currency || 'USD',
      },
      cancellationPolicy: hotel.free_cancellation ? 'free' : 'partial',
      breakfastIncluded: hotel.is_free_cancellable || false,
      distanceFromCenter: parseFloat(hotel.distance) || undefined,
    }));

    return {
      hotels,
      totalCount: response.count || hotels.length,
      searchId: response.search_id || '',
      location: {
        id: response.dest_id?.toString() || '',
        name: params.destination,
        country: response.country || '',
      },
      averagePrice: hotels.reduce((sum, hotel) => sum + hotel.pricePerNight.min, 0) / hotels.length || 0,
      priceRange: {
        min: Math.min(...hotels.map(h => h.pricePerNight.min)),
        max: Math.max(...hotels.map(h => h.pricePerNight.max)),
        currency: params.currency || 'USD',
      },
    };
  }

  /**
   * Transform individual hotel details
   */
  private transformHotelDetails(response: any): BookingHotel {
    return {
      id: response.hotel_id?.toString() || '',
      name: response.hotel_name || '',
      address: response.address || '',
      city: response.city || '',
      country: response.country_trans || '',
      coordinates: {
        lat: parseFloat(response.latitude) || 0,
        lng: parseFloat(response.longitude) || 0,
      },
      starRating: response.class || 0,
      reviewScore: parseFloat(response.review_score) || 0,
      reviewCount: parseInt(response.review_nr) || 0,
      mainPhotoUrl: response.main_photo_url,
      amenities: response.hotel_facilities?.map((f: any) => f.name) || [],
      description: response.hotel_description,
      pricePerNight: {
        min: parseFloat(response.min_total_price) || 0,
        max: parseFloat(response.max_total_price) || 0,
        currency: response.currency_code || 'USD',
      },
      cancellationPolicy: response.free_cancellation ? 'free' : 'partial',
      breakfastIncluded: response.is_free_cancellable || false,
      distanceFromCenter: parseFloat(response.distance) || undefined,
    };
  }

  /**
   * Mock data for development/fallback
   */
  private getMockHotelData(params: BookingSearchParams): BookingSearchResponse {
    const mockHotels: BookingHotel[] = [
      {
        id: 'mock-hotel-1',
        name: 'Grand Plaza Hotel',
        address: '123 Main Street',
        city: params.destination,
        country: 'Country',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        starRating: 4,
        reviewScore: 8.5,
        reviewCount: 1234,
        mainPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
        amenities: ['WiFi', 'Pool', 'Gym', 'Spa'],
        description: 'Luxury hotel in the heart of the city',
        pricePerNight: { min: 150, max: 300, currency: 'USD' },
        cancellationPolicy: 'free',
        breakfastIncluded: true,
        distanceFromCenter: 0.5,
      },
      {
        id: 'mock-hotel-2',
        name: 'Boutique Inn',
        address: '456 Park Avenue',
        city: params.destination,
        country: 'Country',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        starRating: 3,
        reviewScore: 7.8,
        reviewCount: 567,
        mainPhotoUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
        amenities: ['WiFi', 'Restaurant', 'Bar'],
        description: 'Charming boutique hotel with modern amenities',
        pricePerNight: { min: 80, max: 150, currency: 'USD' },
        cancellationPolicy: 'partial',
        breakfastIncluded: false,
        distanceFromCenter: 1.2,
      },
      {
        id: 'mock-hotel-3',
        name: 'Budget Stay',
        address: '789 Budget Street',
        city: params.destination,
        country: 'Country',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        starRating: 2,
        reviewScore: 7.0,
        reviewCount: 234,
        mainPhotoUrl: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400',
        amenities: ['WiFi', 'Parking'],
        description: 'Affordable accommodation for budget travelers',
        pricePerNight: { min: 40, max: 80, currency: 'USD' },
        cancellationPolicy: 'non-refundable',
        breakfastIncluded: false,
        distanceFromCenter: 2.1,
      },
    ];

    return {
      hotels: mockHotels,
      totalCount: mockHotels.length,
      searchId: 'mock-search-' + Date.now(),
      location: {
        id: 'mock-dest-1',
        name: params.destination,
        country: 'Country',
      },
      averagePrice: 123,
      priceRange: { min: 40, max: 300, currency: 'USD' },
    };
  }

  /**
   * Mock hotel details for development/fallback
   */
  private getMockHotelDetails(hotelId: string): BookingHotel {
    return {
      id: hotelId,
      name: 'Mock Hotel Details',
      address: '123 Mock Street',
      city: 'Mock City',
      country: 'Mock Country',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      starRating: 4,
      reviewScore: 8.2,
      reviewCount: 1000,
      mainPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant'],
      description: 'Detailed description of the hotel with amenities and features.',
      pricePerNight: { min: 120, max: 250, currency: 'USD' },
      cancellationPolicy: 'free',
      breakfastIncluded: true,
      distanceFromCenter: 0.8,
    };
  }
}

export const bookingApi = new BookingApiService();