import { createApiClient, ApiError, type PriceRange, type Location } from './base';

// GetYourGuide API Types
export interface GetYourGuideActivity {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  location: Location;
  duration: {
    min: number; // in minutes
    max?: number;
    unit: 'minutes' | 'hours' | 'days';
  };
  price: PriceRange;
  originalPrice?: PriceRange;
  currency: string;
  rating: {
    average: number;
    count: number;
  };
  images: {
    thumbnail: string;
    gallery: string[];
  };
  category: string;
  subcategory?: string;
  tags: string[];
  highlights: string[];
  included: string[];
  excluded?: string[];
  meetingPoint?: string;
  cancellationPolicy: {
    type: 'free' | 'partial' | 'non-refundable';
    deadline?: string; // e.g., "24 hours before"
    details?: string;
  };
  instantConfirmation: boolean;
  mobileTicket: boolean;
  skipTheLine?: boolean;
  smallGroup?: boolean;
  privateGroup?: boolean;
  languages: string[];
  ageRestriction?: {
    min?: number;
    max?: number;
  };
  accessibility?: {
    wheelchairAccessible: boolean;
    details?: string;
  };
}

export interface GetYourGuideSearchParams {
  destination: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  travelers?: number;
  currency?: string;
  language?: string;
  category?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  duration?: 'short' | 'half-day' | 'full-day' | 'multi-day';
  features?: ('skip-the-line' | 'instant-confirmation' | 'mobile-ticket' | 'small-group' | 'private')[];
  sortBy?: 'price' | 'rating' | 'popularity' | 'duration';
  offset?: number;
  limit?: number;
}

export interface GetYourGuideSearchResponse {
  activities: GetYourGuideActivity[];
  totalCount: number;
  hasMore: boolean;
  searchId: string;
  location: Location;
  categories: Array<{ name: string; count: number }>;
  priceRange: PriceRange;
  filters: {
    availableCategories: string[];
    availableFeatures: string[];
    availableDurations: string[];
  };
}

export interface GetYourGuideBookingOption {
  optionId: string;
  title: string;
  description?: string;
  price: PriceRange;
  availableDates: string[];
  maxParticipants?: number;
  requirements?: string[];
}

class GetYourGuideApiService {
  private client;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GETYOURGUIDE_API_KEY || '';
    
    // GetYourGuide Partner API base URL
    this.client = createApiClient('https://partner-api.getyourguide.com/v1', this.apiKey);
  }

  /**
   * Search for activities and tours in a destination
   */
  async searchActivities(params: GetYourGuideSearchParams): Promise<GetYourGuideSearchResponse> {
    try {
      if (!this.apiKey) {
        console.warn('GetYourGuide API key not configured, using mock data');
        return this.getMockActivityData(params);
      }

      const searchParams = {
        q: params.destination,
        currency_code: params.currency || 'USD',
        language_code: params.language || 'en',
        ...(params.startDate && { start_date: params.startDate }),
        ...(params.endDate && { end_date: params.endDate }),
        ...(params.travelers && { travelers: params.travelers }),
        ...(params.category && { categories: params.category.join(',') }),
        ...(params.minPrice && { min_price: params.minPrice }),
        ...(params.maxPrice && { max_price: params.maxPrice }),
        ...(params.minRating && { min_rating: params.minRating }),
        ...(params.features && { features: params.features.join(',') }),
        sort: params.sortBy || 'popularity',
        offset: params.offset || 0,
        limit: params.limit || 20,
      };

      const response = await this.client.get<any>('/activities', searchParams);
      
      return this.transformGetYourGuideResponse(response, params);
    } catch (error) {
      console.error('GetYourGuide API Error:', error);
      // Fallback to mock data on error
      return this.getMockActivityData(params);
    }
  }

  /**
   * Get detailed information about a specific activity
   */
  async getActivityDetails(activityId: string, currency?: string, language?: string): Promise<GetYourGuideActivity | null> {
    try {
      if (!this.apiKey) {
        console.warn('GetYourGuide API key not configured, using mock data');
        return this.getMockActivityDetails(activityId);
      }

      const response = await this.client.get<any>(`/activities/${activityId}`, {
        currency_code: currency || 'USD',
        language_code: language || 'en'
      });

      return this.transformActivityDetails(response);
    } catch (error) {
      console.error('GetYourGuide Activity Details Error:', error);
      return this.getMockActivityDetails(activityId);
    }
  }

  /**
   * Get available booking options for an activity
   */
  async getBookingOptions(activityId: string, date?: string, travelers?: number): Promise<GetYourGuideBookingOption[]> {
    try {
      if (!this.apiKey) {
        console.warn('GetYourGuide API key not configured, using mock data');
        return this.getMockBookingOptions(activityId);
      }

      const response = await this.client.get<any>(`/activities/${activityId}/options`, {
        ...(date && { date }),
        ...(travelers && { travelers })
      });

      return response.booking_options?.map(this.transformBookingOption) || [];
    } catch (error) {
      console.error('GetYourGuide Booking Options Error:', error);
      return this.getMockBookingOptions(activityId);
    }
  }

  /**
   * Get available categories for a destination
   */
  async getCategories(destination: string): Promise<Array<{ name: string; count: number }>> {
    try {
      if (!this.apiKey) {
        console.warn('GetYourGuide API key not configured, using mock data');
        return this.getMockCategories();
      }

      const response = await this.client.get<any>('/categories', {
        destination
      });

      return response.categories || [];
    } catch (error) {
      console.error('GetYourGuide Categories Error:', error);
      return this.getMockCategories();
    }
  }

  /**
   * Transform GetYourGuide API response to our format
   */
  private transformGetYourGuideResponse(response: any, params: GetYourGuideSearchParams): GetYourGuideSearchResponse {
    const activities: GetYourGuideActivity[] = (response.data || []).map(this.transformActivityData);

    return {
      activities,
      totalCount: response.total_count || activities.length,
      hasMore: response.has_more || false,
      searchId: response.search_id || 'search-' + Date.now(),
      location: {
        id: response.location?.id || 'unknown',
        name: params.destination,
        country: response.location?.country || '',
        coordinates: response.location?.coordinates,
      },
      categories: response.categories || [],
      priceRange: {
        min: Math.min(...activities.map(a => a.price.min)),
        max: Math.max(...activities.map(a => a.price.max)),
        currency: params.currency || 'USD',
      },
      filters: {
        availableCategories: response.filters?.categories || [],
        availableFeatures: response.filters?.features || [],
        availableDurations: response.filters?.durations || [],
      },
    };
  }

  /**
   * Transform individual activity data
   */
  private transformActivityData = (activity: any): GetYourGuideActivity => ({
    id: activity.activity_id?.toString() || '',
    title: activity.title || '',
    description: activity.description || '',
    shortDescription: activity.abstract || '',
    location: {
      id: activity.location?.location_id || '',
      name: activity.location?.name || '',
      country: activity.location?.country?.name || '',
      coordinates: activity.location?.coordinates ? {
        lat: activity.location.coordinates.lat,
        lng: activity.location.coordinates.lng,
      } : undefined,
    },
    duration: {
      min: activity.duration?.min || 60,
      max: activity.duration?.max,
      unit: activity.duration?.unit || 'minutes',
    },
    price: {
      min: parseFloat(activity.price?.min) || 0,
      max: parseFloat(activity.price?.max) || 0,
      currency: activity.price?.currency || 'USD',
    },
    originalPrice: activity.original_price ? {
      min: parseFloat(activity.original_price.min) || 0,
      max: parseFloat(activity.original_price.max) || 0,
      currency: activity.original_price.currency || 'USD',
    } : undefined,
    currency: activity.currency || 'USD',
    rating: {
      average: parseFloat(activity.rating?.average) || 0,
      count: parseInt(activity.rating?.count) || 0,
    },
    images: {
      thumbnail: activity.pictures?.[0]?.thumbnail || '',
      gallery: activity.pictures?.map((p: any) => p.large) || [],
    },
    category: activity.category?.name || '',
    subcategory: activity.subcategory?.name,
    tags: activity.tags || [],
    highlights: activity.highlights || [],
    included: activity.included || [],
    excluded: activity.excluded || [],
    meetingPoint: activity.meeting_point,
    cancellationPolicy: {
      type: activity.cancellation_policy?.type || 'partial',
      deadline: activity.cancellation_policy?.deadline,
      details: activity.cancellation_policy?.details,
    },
    instantConfirmation: activity.instant_confirmation || false,
    mobileTicket: activity.mobile_ticket || false,
    skipTheLine: activity.skip_the_line || false,
    smallGroup: activity.small_group || false,
    privateGroup: activity.private_group || false,
    languages: activity.languages || ['English'],
    ageRestriction: activity.age_restriction ? {
      min: activity.age_restriction.min,
      max: activity.age_restriction.max,
    } : undefined,
    accessibility: activity.accessibility ? {
      wheelchairAccessible: activity.accessibility.wheelchair_accessible || false,
      details: activity.accessibility.details,
    } : undefined,
  });

  /**
   * Transform activity details
   */
  private transformActivityDetails(response: any): GetYourGuideActivity {
    return this.transformActivityData(response);
  }

  /**
   * Transform booking options
   */
  private transformBookingOption = (option: any): GetYourGuideBookingOption => ({
    optionId: option.option_id?.toString() || '',
    title: option.title || '',
    description: option.description,
    price: {
      min: parseFloat(option.price?.min) || 0,
      max: parseFloat(option.price?.max) || 0,
      currency: option.price?.currency || 'USD',
    },
    availableDates: option.available_dates || [],
    maxParticipants: option.max_participants,
    requirements: option.requirements || [],
  });

  /**
   * Mock data for development/fallback
   */
  private getMockActivityData(params: GetYourGuideSearchParams): GetYourGuideSearchResponse {
    const mockActivities: GetYourGuideActivity[] = [
      {
        id: 'mock-activity-1',
        title: 'City Walking Tour',
        description: 'Explore the historic city center with a local guide and discover hidden gems.',
        shortDescription: 'Historic city walking tour with local guide',
        location: {
          id: 'dest-1',
          name: params.destination,
          country: 'Country',
          coordinates: { lat: 40.7589, lng: -73.9851 },
        },
        duration: { min: 180, unit: 'minutes' },
        price: { min: 25, max: 35, currency: 'USD' },
        currency: 'USD',
        rating: { average: 4.8, count: 1234 },
        images: {
          thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=300',
          gallery: [
            'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=600',
            'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600',
          ],
        },
        category: 'Walking Tours',
        tags: ['Cultural', 'Historic', 'Small Group'],
        highlights: [
          'Visit historic landmarks',
          'Learn local history',
          'Small group experience',
          'Professional guide',
        ],
        included: ['Professional guide', 'Walking route map'],
        meetingPoint: 'Central Square, near the fountain',
        cancellationPolicy: { type: 'free', deadline: '24 hours before' },
        instantConfirmation: true,
        mobileTicket: true,
        skipTheLine: false,
        smallGroup: true,
        privateGroup: false,
        languages: ['English', 'Spanish'],
      },
      {
        id: 'mock-activity-2',
        title: 'Food & Wine Experience',
        description: 'Taste local specialties and wines in traditional restaurants and markets.',
        shortDescription: 'Local food and wine tasting experience',
        location: {
          id: 'dest-1',
          name: params.destination,
          country: 'Country',
          coordinates: { lat: 40.7589, lng: -73.9851 },
        },
        duration: { min: 240, unit: 'minutes' },
        price: { min: 85, max: 120, currency: 'USD' },
        currency: 'USD',
        rating: { average: 4.9, count: 567 },
        images: {
          thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300',
          gallery: [
            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
            'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600',
          ],
        },
        category: 'Food & Drink',
        tags: ['Culinary', 'Local Culture', 'Wine Tasting'],
        highlights: [
          'Taste traditional dishes',
          'Visit local markets',
          'Wine pairing experience',
          'Meet local chefs',
        ],
        included: ['Food tastings', 'Wine samples', 'Local guide', 'Market visit'],
        meetingPoint: 'Main Market Entrance',
        cancellationPolicy: { type: 'free', deadline: '48 hours before' },
        instantConfirmation: true,
        mobileTicket: true,
        skipTheLine: false,
        smallGroup: true,
        privateGroup: false,
        languages: ['English', 'French'],
      },
      {
        id: 'mock-activity-3',
        title: 'Museum Skip-the-Line Tour',
        description: 'Discover world-famous art collections with priority access and expert commentary.',
        shortDescription: 'Skip-the-line museum tour with expert guide',
        location: {
          id: 'dest-1',
          name: params.destination,
          country: 'Country',
          coordinates: { lat: 40.7589, lng: -73.9851 },
        },
        duration: { min: 120, unit: 'minutes' },
        price: { min: 45, max: 65, currency: 'USD' },
        currency: 'USD',
        rating: { average: 4.7, count: 2341 },
        images: {
          thumbnail: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300',
          gallery: [
            'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600',
            'https://images.unsplash.com/photo-1576767969165-ed5bc82d53e8?w=600',
          ],
        },
        category: 'Museums & Culture',
        tags: ['Art', 'Culture', 'Skip the Line'],
        highlights: [
          'Skip entrance lines',
          'Expert art historian guide',
          'Famous masterpieces',
          'Interactive experience',
        ],
        included: ['Skip-the-line access', 'Expert guide', 'Audio headsets'],
        meetingPoint: 'Museum Main Entrance',
        cancellationPolicy: { type: 'partial', deadline: '24 hours before' },
        instantConfirmation: true,
        mobileTicket: true,
        skipTheLine: true,
        smallGroup: false,
        privateGroup: false,
        languages: ['English', 'Italian', 'German'],
      },
    ];

    return {
      activities: mockActivities,
      totalCount: mockActivities.length,
      hasMore: false,
      searchId: 'mock-search-' + Date.now(),
      location: {
        id: 'mock-dest-1',
        name: params.destination,
        country: 'Country',
      },
      categories: [
        { name: 'Walking Tours', count: 15 },
        { name: 'Food & Drink', count: 8 },
        { name: 'Museums & Culture', count: 12 },
      ],
      priceRange: { min: 25, max: 120, currency: 'USD' },
      filters: {
        availableCategories: ['Walking Tours', 'Food & Drink', 'Museums & Culture'],
        availableFeatures: ['skip-the-line', 'instant-confirmation', 'small-group'],
        availableDurations: ['short', 'half-day', 'full-day'],
      },
    };
  }

  /**
   * Mock activity details for development/fallback
   */
  private getMockActivityDetails(activityId: string): GetYourGuideActivity {
    return {
      id: activityId,
      title: 'Mock Activity Details',
      description: 'Detailed description of the mock activity with full information.',
      shortDescription: 'Mock activity for testing purposes',
      location: {
        id: 'mock-location',
        name: 'Mock City',
        country: 'Mock Country',
        coordinates: { lat: 40.7589, lng: -73.9851 },
      },
      duration: { min: 180, unit: 'minutes' },
      price: { min: 50, max: 75, currency: 'USD' },
      currency: 'USD',
      rating: { average: 4.5, count: 500 },
      images: {
        thumbnail: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=300',
        gallery: [
          'https://images.unsplash.com/photo-1539650116574-75c0c6d73469?w=600',
        ],
      },
      category: 'Mock Category',
      tags: ['Test', 'Mock', 'Development'],
      highlights: ['Mock highlight 1', 'Mock highlight 2'],
      included: ['Mock inclusion 1', 'Mock inclusion 2'],
      meetingPoint: 'Mock meeting point',
      cancellationPolicy: { type: 'free', deadline: '24 hours before' },
      instantConfirmation: true,
      mobileTicket: true,
      skipTheLine: false,
      smallGroup: true,
      privateGroup: false,
      languages: ['English'],
    };
  }

  /**
   * Mock booking options for development/fallback
   */
  private getMockBookingOptions(activityId: string): GetYourGuideBookingOption[] {
    return [
      {
        optionId: 'mock-option-1',
        title: 'Standard Experience',
        description: 'Regular group experience',
        price: { min: 50, max: 50, currency: 'USD' },
        availableDates: ['2025-11-15', '2025-11-16', '2025-11-17'],
        maxParticipants: 15,
      },
      {
        optionId: 'mock-option-2',
        title: 'Private Experience',
        description: 'Private group up to 6 people',
        price: { min: 200, max: 200, currency: 'USD' },
        availableDates: ['2025-11-15', '2025-11-16'],
        maxParticipants: 6,
      },
    ];
  }

  /**
   * Mock categories for development/fallback
   */
  private getMockCategories(): Array<{ name: string; count: number }> {
    return [
      { name: 'Walking Tours', count: 15 },
      { name: 'Food & Drink', count: 8 },
      { name: 'Museums & Culture', count: 12 },
      { name: 'Outdoor Activities', count: 6 },
      { name: 'Transportation', count: 4 },
    ];
  }
}

export const getYourGuideApi = new GetYourGuideApiService();