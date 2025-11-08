// Main API exports and combined services
export * from './base';
export * from './booking';
export * from './getyourguide';

import { bookingApi } from './booking';
import { getYourGuideApi } from './getyourguide';

// Combined travel API service
export class TravelApiService {
  booking = bookingApi;
  activities = getYourGuideApi;

  /**
   * Get comprehensive trip data including hotels and activities
   */
  async getTripData(params: {
    destination: string;
    checkIn?: string;
    checkOut?: string;
    travelers?: number;
    currency?: string;
  }) {
    const [hotels, activities] = await Promise.allSettled([
      this.booking.searchHotels({
        destination: params.destination,
        checkIn: params.checkIn || '',
        checkOut: params.checkOut || '',
        adults: params.travelers || 2,
        currency: params.currency,
      }),
      this.activities.searchActivities({
        destination: params.destination,
        startDate: params.checkIn,
        endDate: params.checkOut,
        travelers: params.travelers,
        currency: params.currency,
      }),
    ]);

    return {
      hotels: hotels.status === 'fulfilled' ? hotels.value : null,
      activities: activities.status === 'fulfilled' ? activities.value : null,
      errors: [
        ...(hotels.status === 'rejected' ? [hotels.reason] : []),
        ...(activities.status === 'rejected' ? [activities.reason] : []),
      ],
    };
  }

  /**
   * Get price estimates for a destination
   */
  async getPriceEstimates(destination: string, travelers: number = 2, nights: number = 7) {
    try {
      const tripData = await this.getTripData({
        destination,
        travelers,
      });

      const hotels = tripData.hotels?.hotels || [];
      const activities = tripData.activities?.activities || [];

      if (hotels.length === 0 && activities.length === 0) {
        return null;
      }

      // Calculate hotel price ranges per night
      const hotelPrices = hotels.map(h => h.pricePerNight.min);
      const minHotelPrice = Math.min(...hotelPrices) * nights;
      const maxHotelPrice = Math.max(...hotelPrices) * nights;

      // Calculate activity price ranges (assume 3-5 activities)
      const activityPrices = activities.map(a => a.price.min);
      const minActivityPrice = activityPrices.slice(0, 3).reduce((sum, price) => sum + price, 0);
      const maxActivityPrice = activityPrices.slice(0, 5).reduce((sum, price) => sum + price, 0);

      return {
        budget: {
          min: Math.round((minHotelPrice + minActivityPrice) * 0.7), // Budget options
          max: Math.round((minHotelPrice + minActivityPrice) * 1.1),
          description: 'Budget hotels, local activities, public transport',
        },
        mid: {
          min: Math.round(minHotelPrice + minActivityPrice),
          max: Math.round((minHotelPrice + maxActivityPrice) * 1.3),
          description: 'Mid-range hotels, mix of activities',
        },
        luxury: {
          min: Math.round(maxHotelPrice + maxActivityPrice),
          max: Math.round((maxHotelPrice + maxActivityPrice) * 1.5),
          description: 'Luxury accommodations, premium experiences',
        },
      };
    } catch (error) {
      console.error('Price estimation error:', error);
      return null;
    }
  }
}

export const travelApi = new TravelApiService();