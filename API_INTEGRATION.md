# Booking.com & GetYourGuide API Integration

This document explains how to use the Booking.com and GetYourGuide API integrations in the Plantrip'r AI application.

## Quick Start

1. **Set up environment variables:**
   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   
   # Add your API keys
   BOOKING_API_KEY=your_booking_api_key_here
   GETYOURGUIDE_API_KEY=your_getyourguide_api_key_here
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```

4. **Test the APIs:**
   Visit `/api-demo` to see the APIs in action with a live demo interface.

## Architecture

### API Service Layer (`src/lib/api/`)

- **`base.ts`** - Common API client configuration and error handling
- **`booking.ts`** - Booking.com API integration for hotel search and booking
- **`getyourguide.ts`** - GetYourGuide API integration for activity search and booking
- **`index.ts`** - Combined travel API service that orchestrates both APIs

### React Query Hooks (`src/hooks/`)

- **`useBooking.ts`** - React Query hooks for hotel searches, caching, and prefetching
- **`useGetYourGuide.ts`** - React Query hooks for activity searches with infinite scroll support
- **`useTravelApi.ts`** - Combined hooks for comprehensive trip data

### UI Components (`src/components/`)

- **`HotelCard.tsx`** - Displays hotel information from Booking.com API
- **`ActivityCard.tsx`** - Displays activity information from GetYourGuide API

## Usage Examples

### Basic Hotel Search

```tsx
import { useHotelSearch } from '@/hooks';

function HotelSearchExample() {
  const { data, isLoading, error } = useHotelSearch({
    destination: 'Tokyo',
    checkIn: '2025-12-01',
    checkOut: '2025-12-07',
    adults: 2,
    currency: 'USD'
  });

  if (isLoading) return <div>Loading hotels...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.hotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
```

### Basic Activity Search

```tsx
import { useActivitySearch } from '@/hooks';

function ActivitySearchExample() {
  const { data, isLoading, error } = useActivitySearch({
    destination: 'Tokyo',
    startDate: '2025-12-01',
    endDate: '2025-12-07',
    travelers: 2,
    currency: 'USD'
  });

  if (isLoading) return <div>Loading activities...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.activities.map(activity => (
        <ActivityCard 
          key={activity.id} 
          activity={activity}
          onSelect={(activity) => console.log('Selected:', activity)}
        />
      ))}
    </div>
  );
}
```

### Combined Trip Data

```tsx
import { useTravelData } from '@/hooks';

function TripPlanningExample() {
  const { data, isLoading } = useTravelData({
    destination: 'Tokyo',
    checkIn: '2025-12-01',
    checkOut: '2025-12-07',
    travelers: 2,
    currency: 'USD'
  });

  if (isLoading) return <div>Loading trip data...</div>;

  return (
    <div>
      <h2>Hotels</h2>
      {data?.hotels?.hotels.map(hotel => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}

      <h2>Activities</h2>
      {data?.activities?.activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
```

## Features

### Booking.com Integration

- ✅ Hotel search by destination, dates, and guests
- ✅ Hotel details with photos, amenities, and ratings
- ✅ Price comparison and cancellation policies
- ✅ Star ratings and guest reviews
- ✅ Distance from city center
- ✅ Mock data fallback for development

### GetYourGuide Integration

- ✅ Activity search by destination and dates
- ✅ Activity details with highlights and descriptions
- ✅ Price information and booking options
- ✅ Category filtering (tours, museums, food, etc.)
- ✅ Duration and language information
- ✅ Instant confirmation and mobile tickets
- ✅ Skip-the-line and small group options
- ✅ Mock data fallback for development

### Advanced Features

- ✅ React Query caching and background updates
- ✅ Optimistic updates and error handling
- ✅ Infinite scroll for activity lists
- ✅ Price estimation algorithms
- ✅ Currency conversion support
- ✅ Multi-language support
- ✅ Accessibility features

## API Configuration

### Environment Variables

```bash
# Required for Booking.com API
BOOKING_API_KEY=your_booking_api_key_here

# Required for GetYourGuide API  
GETYOURGUIDE_API_KEY=your_getyourguide_api_key_here

# Optional: Rate limiting
RATE_LIMIT_PER_MINUTE=60
CACHE_TTL_SECONDS=300
```

### Rate Limiting

Both APIs have built-in rate limiting to prevent abuse:

- **Booking.com**: 60 requests per minute (configurable)
- **GetYourGuide**: 100 requests per minute (configurable)

### Caching Strategy

React Query handles caching automatically:

- **Hotels**: 5-minute stale time, 10-minute garbage collection
- **Activities**: 5-minute stale time, 15-minute garbage collection
- **Price estimates**: 10-minute stale time, 30-minute garbage collection

## Error Handling

The APIs include comprehensive error handling:

```tsx
// Network errors
if (error?.message.includes('Network error')) {
  // Handle network connectivity issues
}

// API errors
if (error?.status === 429) {
  // Handle rate limiting
}

// Validation errors
if (error?.status >= 400 && error?.status < 500) {
  // Handle client errors (bad request, unauthorized, etc.)
}
```

## Mock Data

When API keys are not configured, the system automatically falls back to realistic mock data:

- **Hotels**: 3 sample hotels with different price ranges
- **Activities**: 3 sample activities across different categories
- **Price estimates**: Dynamic calculations based on destination

## Testing

Visit `/api-demo` to test the APIs interactively:

1. Enter a destination (e.g., "Tokyo", "Paris", "New York")
2. Select check-in and check-out dates
3. Choose number of travelers
4. View live results from both APIs

## Troubleshooting

### Common Issues

1. **No results returned**: Check API key validity and rate limits
2. **Mock data showing**: Ensure API keys are set in `.env.local`
3. **Slow responses**: Check network connection and API status
4. **CORS errors**: Ensure proper API endpoint configuration

### Debug Mode

Enable React Query DevTools in development:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Already included in QueryProvider
```

### API Status Monitoring

Monitor API health in the demo page:

- Real-time status indicators
- Error reporting
- Performance metrics
- Mock data detection

## Production Deployment

### Security

- Store API keys as environment variables
- Never commit API keys to version control
- Use server-side API routes for sensitive operations
- Implement proper CORS policies

### Performance

- Enable API response compression
- Use CDN for image assets
- Implement proper caching headers
- Monitor API usage and costs

### Monitoring

- Set up error tracking (Sentry, etc.)
- Monitor API response times
- Track usage metrics
- Set up alerts for API failures

## API Documentation Links

- [Booking.com Partner API](https://developers.booking.com/)
- [GetYourGuide Partner API](https://partner-help.getyourguide.com/hc/en-us/sections/115001530405-API)

## Support

For issues with:
- **API integration**: Check this documentation and `/api-demo`
- **Booking.com API**: Contact Booking.com developer support
- **GetYourGuide API**: Contact GetYourGuide partner support
- **Application bugs**: Create an issue in the project repository