// Base API client configuration
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  error?: string;
}

export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

export interface Location {
  id: string;
  name: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const createApiClient = (baseUrl: string, apiKey?: string) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'Plantrip-AI/1.0.0'
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  return {
    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
      const url = new URL(`${baseUrl}${endpoint}`);
      
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.append(key, String(value));
          }
        });
      }

      try {
        const response = await fetch(url.toString(), {
          method: 'GET',
          headers,
        });

        if (!response.ok) {
          throw new ApiError(
            `API request failed: ${response.statusText}`,
            response.status
          );
        }

        return await response.json();
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    async post<T>(endpoint: string, data?: any): Promise<T> {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'POST',
          headers,
          body: data ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
          throw new ApiError(
            `API request failed: ${response.statusText}`,
            response.status
          );
        }

        return await response.json();
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
  };
};