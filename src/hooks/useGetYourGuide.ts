import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { travelApi, type GetYourGuideSearchParams, type GetYourGuideSearchResponse, type GetYourGuideActivity } from '@/lib/api';

// Query keys for React Query caching
export const getYourGuideKeys = {
  all: ['getyourguide'] as const,
  search: (params: GetYourGuideSearchParams) => [...getYourGuideKeys.all, 'search', params] as const,
  activity: (id: string) => [...getYourGuideKeys.all, 'activity', id] as const,
  categories: (destination: string) => [...getYourGuideKeys.all, 'categories', destination] as const,
  bookingOptions: (activityId: string, date?: string, travelers?: number) => 
    [...getYourGuideKeys.all, 'booking-options', activityId, date, travelers] as const,
};

/**
 * Hook to search for activities using GetYourGuide API
 */
export function useActivitySearch(params: GetYourGuideSearchParams, enabled: boolean = true) {
  return useQuery({
    queryKey: getYourGuideKeys.search(params),
    queryFn: () => travelApi.activities.searchActivities(params),
    enabled: enabled && !!params.destination,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
    retry: (failureCount, error) => {
      if (failureCount >= 2) return false;
      if (error instanceof Error && error.message.includes('4')) return false;
      return true;
    },
  });
}

/**
 * Hook to get detailed activity information
 */
export function useActivityDetails(activityId: string, currency?: string, language?: string) {
  return useQuery({
    queryKey: getYourGuideKeys.activity(activityId),
    queryFn: () => travelApi.activities.getActivityDetails(activityId, currency, language),
    enabled: !!activityId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to get activity categories for a destination
 */
export function useActivityCategories(destination: string, enabled: boolean = true) {
  return useQuery({
    queryKey: getYourGuideKeys.categories(destination),
    queryFn: () => travelApi.activities.getCategories(destination),
    enabled: enabled && !!destination,
    staleTime: 30 * 60 * 1000, // 30 minutes (categories don't change often)
    gcTime: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Hook to get booking options for an activity
 */
export function useActivityBookingOptions(activityId: string, date?: string, travelers?: number) {
  return useQuery({
    queryKey: getYourGuideKeys.bookingOptions(activityId, date, travelers),
    queryFn: () => travelApi.activities.getBookingOptions(activityId, date, travelers),
    enabled: !!activityId,
    staleTime: 2 * 60 * 1000, // 2 minutes (booking availability changes frequently)
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook for pre-fetching activity search results
 */
export function usePrefetchActivities() {
  const queryClient = useQueryClient();

  return (params: GetYourGuideSearchParams) => {
    queryClient.prefetchQuery({
      queryKey: getYourGuideKeys.search(params),
      queryFn: () => travelApi.activities.searchActivities(params),
      staleTime: 5 * 60 * 1000,
    });
  };
}

/**
 * Hook to get cached activity search results without triggering a new request
 */
export function useActivitySearchCache(params: GetYourGuideSearchParams): GetYourGuideSearchResponse | undefined {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(getYourGuideKeys.search(params));
}

/**
 * Hook for infinite scroll / pagination with activities
 */
export function useInfiniteActivitySearch(baseParams: GetYourGuideSearchParams) {
  return useInfiniteQuery({
    queryKey: [...getYourGuideKeys.search(baseParams), 'infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      const params = {
        ...baseParams,
        offset: (pageParam as number) * (baseParams.limit || 20),
      };
      return travelApi.activities.searchActivities(params);
    },
    enabled: !!baseParams.destination,
    staleTime: 5 * 60 * 1000,
    getNextPageParam: (lastPage: GetYourGuideSearchResponse, pages: GetYourGuideSearchResponse[]) => {
      return lastPage.hasMore ? pages.length : undefined;
    },
    initialPageParam: 0,
  });
}

/**
 * Hook for optimistic activity search with mutation
 */
export function useOptimisticActivitySearch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: GetYourGuideSearchParams) => travelApi.activities.searchActivities(params),
    onSuccess: (data, params) => {
      // Cache the successful result
      queryClient.setQueryData(getYourGuideKeys.search(params), data);
    },
    onError: (error, params) => {
      console.error('Activity search failed:', error);
    },
  });
}

/**
 * Hook to invalidate activity-related queries
 */
export function useInvalidateActivities() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({
      queryKey: getYourGuideKeys.all,
    });
  };
}

/**
 * Custom hook for smart activity search with filters and sorting
 */
export function useSmartActivitySearch(
  params: GetYourGuideSearchParams,
  options?: {
    enabled?: boolean;
    autoRefresh?: boolean;
  }
) {
  const { enabled = true, autoRefresh = false } = options || {};
  
  return useQuery({
    queryKey: getYourGuideKeys.search(params),
    queryFn: () => travelApi.activities.searchActivities(params),
    enabled: enabled && !!params.destination,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: autoRefresh,
    refetchInterval: autoRefresh ? 5 * 60 * 1000 : false, // Auto-refresh every 5 minutes if enabled
  });
}

/**
 * Hook for searching activities by multiple categories
 */
export function useMultiCategoryActivitySearch(
  destination: string,
  categories: string[],
  baseParams?: Omit<GetYourGuideSearchParams, 'destination' | 'category'>
) {
  return useQuery({
    queryKey: [...getYourGuideKeys.all, 'multi-category', destination, categories, baseParams],
    queryFn: async () => {
      const promises = categories.map(category => 
        travelApi.activities.searchActivities({
          destination,
          category: [category],
          ...baseParams,
        })
      );
      
      const results = await Promise.allSettled(promises);
      
      const activitiesByCategory = results.reduce((acc, result, index) => {
        if (result.status === 'fulfilled') {
          acc[categories[index]] = result.value;
        }
        return acc;
      }, {} as Record<string, GetYourGuideSearchResponse>);

      // Combine all activities for overall stats
      const allActivities = Object.values(activitiesByCategory)
        .flatMap(response => response.activities);

      return {
        activitiesByCategory,
        allActivities,
        totalCount: allActivities.length,
      };
    },
    enabled: !!destination && categories.length > 0,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook for getting activity recommendations based on preferences
 */
export function useActivityRecommendations(
  destination: string,
  preferences?: {
    budget?: 'low' | 'medium' | 'high';
    interests?: string[];
    duration?: 'short' | 'medium' | 'long';
    groupSize?: number;
  }
) {
  return useQuery({
    queryKey: [...getYourGuideKeys.all, 'recommendations', destination, preferences],
    queryFn: async () => {
      const searchParams: GetYourGuideSearchParams = {
        destination,
        limit: 20,
      };

      // Apply budget filters
      if (preferences?.budget === 'low') {
        searchParams.maxPrice = 50;
      } else if (preferences?.budget === 'high') {
        searchParams.minPrice = 100;
      }

      // Apply duration filters
      if (preferences?.duration) {
        searchParams.duration = preferences.duration === 'short' ? 'short' : 
                                 preferences.duration === 'medium' ? 'half-day' : 'full-day';
      }

      // Apply group size filters
      if (preferences?.groupSize && preferences.groupSize <= 10) {
        searchParams.features = ['small-group'];
      }

      const results = await travelApi.activities.searchActivities(searchParams);

      // Filter by interests if provided
      if (preferences?.interests && preferences.interests.length > 0) {
        results.activities = results.activities.filter(activity => 
          preferences.interests!.some(interest => 
            activity.tags.some(tag => 
              tag.toLowerCase().includes(interest.toLowerCase())
            ) ||
            activity.category.toLowerCase().includes(interest.toLowerCase())
          )
        );
      }

      return results;
    },
    enabled: !!destination,
    staleTime: 15 * 60 * 1000, // 15 minutes for recommendations
  });
}