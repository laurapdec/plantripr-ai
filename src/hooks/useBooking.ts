import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { travelApi, type BookingSearchParams, type BookingSearchResponse, type BookingHotel } from '@/lib/api';

// Query keys for React Query caching
export const bookingKeys = {
  all: ['booking'] as const,
  search: (params: BookingSearchParams) => [...bookingKeys.all, 'search', params] as const,
  hotel: (id: string) => [...bookingKeys.all, 'hotel', id] as const,
};

/**
 * Hook to search for hotels using Booking.com API
 */
export function useHotelSearch(params: BookingSearchParams, enabled: boolean = true) {
  return useQuery({
    queryKey: bookingKeys.search(params),
    queryFn: () => travelApi.booking.searchHotels(params),
    enabled: enabled && !!params.destination && !!params.checkIn && !!params.checkOut,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Retry up to 2 times, but not for 4xx errors
      if (failureCount >= 2) return false;
      if (error instanceof Error && error.message.includes('4')) return false;
      return true;
    },
  });
}

/**
 * Hook to get detailed hotel information
 */
export function useHotelDetails(hotelId: string, checkIn?: string, checkOut?: string) {
  return useQuery({
    queryKey: bookingKeys.hotel(hotelId),
    queryFn: () => travelApi.booking.getHotelDetails(hotelId, checkIn, checkOut),
    enabled: !!hotelId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook for pre-fetching hotel search results
 */
export function usePrefetchHotels() {
  const queryClient = useQueryClient();

  return (params: BookingSearchParams) => {
    queryClient.prefetchQuery({
      queryKey: bookingKeys.search(params),
      queryFn: () => travelApi.booking.searchHotels(params),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook to get cached hotel search results without triggering a new request
 */
export function useHotelSearchCache(params: BookingSearchParams): BookingSearchResponse | undefined {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(bookingKeys.search(params));
}

/**
 * Hook to search hotels with optimistic updates and caching
 */
export function useOptimisticHotelSearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: BookingSearchParams) => travelApi.booking.searchHotels(params),
    onSuccess: (data, params) => {
      // Cache the successful result
      queryClient.setQueryData(bookingKeys.search(params), data);
    },
    onError: (error, params) => {
      console.error('Hotel search failed:', error);
      // Could implement toast notifications here
    },
  });
}

/**
 * Hook to invalidate hotel-related queries (useful after user preferences change)
 */
export function useInvalidateHotels() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: bookingKeys.all,
    });
  };
}

/**
 * Custom hook for smart hotel search with debouncing and caching
 */
export function useSmartHotelSearch(
  params: BookingSearchParams,
  options?: {
    enabled?: boolean;
    debounceMs?: number;
  }
) {
  const { enabled = true, debounceMs = 500 } = options || {};
  
  return useQuery({
    queryKey: bookingKeys.search(params),
    queryFn: async () => {
      // Add artificial delay for debouncing if needed
      if (debounceMs > 0) {
        await new Promise(resolve => setTimeout(resolve, debounceMs));
      }
      return travelApi.booking.searchHotels(params);
    },
    enabled: enabled && !!params.destination && !!params.checkIn && !!params.checkOut,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    // Prevent refetching while user is still typing
    refetchOnMount: false,
  });
}

/**
 * Hook for batch hotel details fetching
 */
export function useBatchHotelDetails(hotelIds: string[], checkIn?: string, checkOut?: string) {
  return useQuery({
    queryKey: [...bookingKeys.all, 'batch', hotelIds.sort(), checkIn, checkOut],
    queryFn: async () => {
      const promises = hotelIds.map(id => 
        travelApi.booking.getHotelDetails(id, checkIn, checkOut)
      );
      const results = await Promise.allSettled(promises);
      
      return results
        .map((result, index) => ({
          hotelId: hotelIds[index],
          data: result.status === 'fulfilled' ? result.value : null,
          error: result.status === 'rejected' ? result.reason : null,
        }))
        .filter(item => item.data !== null);
    },
    enabled: hotelIds.length > 0,
    staleTime: 10 * 60 * 1000,
  });
}