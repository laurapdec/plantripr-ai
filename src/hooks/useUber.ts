import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { uberApi, type UberSearchParams, type UberEstimateResponse, type UberProduct } from '@/lib/api/uber';

// Query keys for React Query caching
export const uberKeys = {
  all: ['uber'] as const,
  products: (lat: number, lng: number) => [...uberKeys.all, 'products', lat, lng] as const,
  estimates: (params: UberSearchParams) => [...uberKeys.all, 'estimates', params] as const,
  priceEstimates: (params: UberSearchParams) => [...uberKeys.all, 'price-estimates', params] as const,
  timeEstimates: (lat: number, lng: number, productId?: string) => 
    [...uberKeys.all, 'time-estimates', lat, lng, productId] as const,
  rideDetails: (requestId: string) => [...uberKeys.all, 'ride-details', requestId] as const,
};

/**
 * Hook to get available Uber products at a location
 */
export function useUberProducts(latitude: number, longitude: number, enabled: boolean = true) {
  return useQuery({
    queryKey: uberKeys.products(latitude, longitude),
    queryFn: () => uberApi.getProducts(latitude, longitude),
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 10 * 60 * 1000, // 10 minutes (products don't change frequently)
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
}

/**
 * Hook to get comprehensive ride estimates (products, prices, times)
 */
export function useUberEstimates(params: UberSearchParams, enabled: boolean = true) {
  return useQuery({
    queryKey: uberKeys.estimates(params),
    queryFn: () => uberApi.getRideEstimates(params),
    enabled: enabled && !!params.pickup.latitude && !!params.pickup.longitude && 
             !!params.destination.latitude && !!params.destination.longitude,
    staleTime: 2 * 60 * 1000, // 2 minutes (prices change frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: true, // Refetch when user comes back to ensure fresh prices
  });
}

/**
 * Hook to get price estimates only
 */
export function useUberPriceEstimates(params: UberSearchParams, enabled: boolean = true) {
  return useQuery({
    queryKey: uberKeys.priceEstimates(params),
    queryFn: () => uberApi.getPriceEstimates(params),
    enabled: enabled && !!params.pickup.latitude && !!params.pickup.longitude && 
             !!params.destination.latitude && !!params.destination.longitude,
    staleTime: 1 * 60 * 1000, // 1 minute (prices are dynamic)
    gcTime: 3 * 60 * 1000, // 3 minutes
    retry: 2,
  });
}

/**
 * Hook to get time estimates for pickup
 */
export function useUberTimeEstimates(
  latitude: number, 
  longitude: number, 
  productId?: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: uberKeys.timeEstimates(latitude, longitude, productId),
    queryFn: () => uberApi.getTimeEstimates(latitude, longitude, productId),
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 30 * 1000, // 30 seconds (pickup times change very frequently)
    gcTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
    refetchInterval: 30 * 1000, // Auto-refresh every 30 seconds for real-time updates
  });
}

/**
 * Hook to get ride details by request ID
 */
export function useUberRideDetails(requestId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: uberKeys.rideDetails(requestId),
    queryFn: () => uberApi.getRideDetails(requestId),
    enabled: enabled && !!requestId,
    staleTime: 5 * 1000, // 5 seconds (ride status changes frequently)
    gcTime: 1 * 60 * 1000, // 1 minute
    retry: 3,
    refetchInterval: 5 * 1000, // Auto-refresh every 5 seconds for live tracking
  });
}

/**
 * Hook for requesting a ride (mutation)
 */
export function useRequestUberRide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      start_latitude: number;
      start_longitude: number;
      end_latitude: number;
      end_longitude: number;
      product_id?: string;
    }) => uberApi.requestRide(params),
    onSuccess: (data) => {
      if (data) {
        // Cache the ride details
        queryClient.setQueryData(uberKeys.rideDetails(data.request_id), data);
        // Invalidate estimates since a ride has been requested
        queryClient.invalidateQueries({ queryKey: uberKeys.all });
      }
    },
    onError: (error) => {
      console.error('Failed to request Uber ride:', error);
    },
  });
}

/**
 * Hook to invalidate all Uber-related queries
 */
export function useInvalidateUberData() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: uberKeys.all,
    });
  };
}

/**
 * Hook for pre-fetching Uber estimates
 */
export function usePrefetchUberEstimates() {
  const queryClient = useQueryClient();

  return (params: UberSearchParams) => {
    queryClient.prefetchQuery({
      queryKey: uberKeys.estimates(params),
      queryFn: () => uberApi.getRideEstimates(params),
      staleTime: 2 * 60 * 1000,
    });
  };
}

/**
 * Hook to get cached Uber estimates without triggering a new request
 */
export function useUberEstimatesCache(params: UberSearchParams): UberEstimateResponse | undefined {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(uberKeys.estimates(params));
}

/**
 * Custom hook for location-based Uber data
 * Automatically fetches products and time estimates for a given location
 */
export function useUberLocationData(
  latitude: number, 
  longitude: number,
  options?: { 
    enabled?: boolean; 
    autoRefresh?: boolean;
  }
) {
  const { enabled = true, autoRefresh = false } = options || {};

  const products = useUberProducts(latitude, longitude, enabled);
  
  const timeEstimates = useQuery({
    queryKey: uberKeys.timeEstimates(latitude, longitude),
    queryFn: () => uberApi.getTimeEstimates(latitude, longitude),
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 30 * 1000,
    refetchInterval: autoRefresh ? 30 * 1000 : false,
  });

  return {
    products,
    timeEstimates,
    isLoading: products.isLoading || timeEstimates.isLoading,
    error: products.error || timeEstimates.error,
    refetch: () => {
      products.refetch();
      timeEstimates.refetch();
    }
  };
}

/**
 * Hook for comparing ride options between pickup and destination
 */
export function useUberRideComparison(
  pickupCoords: { lat: number; lng: number; address?: string },
  destinationCoords: { lat: number; lng: number; address?: string },
  enabled: boolean = true
) {
  const params: UberSearchParams = {
    pickup: {
      latitude: pickupCoords.lat,
      longitude: pickupCoords.lng,
      address: pickupCoords.address,
    },
    destination: {
      latitude: destinationCoords.lat,
      longitude: destinationCoords.lng,
      address: destinationCoords.address,
    },
  };

  const estimates = useUberEstimates(params, enabled);

  return {
    ...estimates,
    data: estimates.data ? {
      ...estimates.data,
      // Add convenience methods for getting cheapest, fastest options
      cheapestOption: estimates.data.prices.length > 0 
        ? estimates.data.prices.reduce((prev, curr) => 
            (prev.low_estimate || 0) < (curr.low_estimate || 0) ? prev : curr
          )
        : null,
      fastestOption: estimates.data.times.length > 0
        ? estimates.data.times.reduce((prev, curr) => 
            prev.estimate < curr.estimate ? prev : curr
          )
        : null,
      recommendedOption: estimates.data.prices.length > 0
        ? estimates.data.prices.find(p => p.display_name === 'UberX') || estimates.data.prices[0]
        : null,
    } : undefined,
  };
}