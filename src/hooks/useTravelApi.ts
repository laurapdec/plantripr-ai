import { useQuery } from '@tanstack/react-query';
import { travelApi } from '@/lib/api';

/**
 * Hook to get comprehensive travel data (hotels + activities)
 */
export function useTravelData(params: {
  destination: string;
  checkIn?: string;
  checkOut?: string;
  travelers?: number;
  currency?: string;
}, enabled: boolean = true) {
  return useQuery({
    queryKey: ['travel-data', params],
    queryFn: () => travelApi.getTripData(params),
    enabled: enabled && !!params.destination,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: 2,
  });
}

/**
 * Hook to get price estimates for a destination
 */
export function usePriceEstimates(
  destination: string,
  travelers: number = 2,
  nights: number = 7,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['price-estimates', destination, travelers, nights],
    queryFn: () => travelApi.getPriceEstimates(destination, travelers, nights),
    enabled: enabled && !!destination,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });
}