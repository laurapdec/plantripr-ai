# Travel APIs for Plantrip'r AI

## Recommended APIs for Price Estimates and Travel Data

### 1. **Flight Prices**
- **Skyscanner API**: Real-time flight prices and availability
- **Amadeus API**: Flight search, pricing, and booking
- **Google Flights API**: Flight prices and schedules

### 2. **Hotel Prices**
- **Booking.com API**: Hotel availability and pricing
- **Expedia API**: Accommodation prices and availability
- **Hotels.com API**: Hotel search and pricing

### 3. **Activity Prices**
- **Viator API**: Tours and activity pricing
- **GetYourGuide API**: Experience and activity booking
- **TripAdvisor API**: Activity recommendations and pricing

### 4. **General Travel Data**
- **Google Places API**: Destination information and photos
- **OpenWeatherMap API**: Weather data for destinations
- **ExchangeRate-API**: Currency conversion rates

### 5. **Transportation**
- **Rome2Rio API**: Multi-modal transport options and pricing
- **Uber API**: Ride pricing estimates
- **Car rental APIs**: Hertz, Avis, Enterprise APIs

## Current Implementation ✅

The application now includes **full API integration** for both Booking.com and GetYourGuide:

### ✅ **Implemented APIs**

1. **Booking.com API** (`src/lib/api/booking.ts`)
   - Hotel search by destination, dates, and guests
   - Hotel details with photos, amenities, and ratings
   - Price comparison and cancellation policies
   - React Query hooks for caching and background updates

2. **GetYourGuide API** (`src/lib/api/getyourguide.ts`)
   - Activity search with filtering by category, price, and duration
   - Activity details with highlights and booking options
   - Support for skip-the-line, instant confirmation, and mobile tickets
   - Infinite scroll and advanced search capabilities

### 🔧 **Setup Instructions**

1. **Environment Variables**: Add API keys to `.env.local`:
   ```bash
   BOOKING_API_KEY=your_booking_api_key_here
   GETYOURGUIDE_API_KEY=your_getyourguide_api_key_here
   ```

2. **React Query Integration**: Automatic caching and error handling
   ```tsx
   import { useHotelSearch, useActivitySearch } from '@/hooks';
   ```

3. **UI Components**: Ready-to-use components
   ```tsx
   import { HotelCard, ActivityCard } from '@/components';
   ```

4. **Live Demo**: Test at `/api-demo` with interactive search

### 📁 **File Structure**

```
src/
├── lib/api/
│   ├── base.ts              # Common API client
│   ├── booking.ts           # Booking.com integration
│   ├── getyourguide.ts      # GetYourGuide integration
│   └── index.ts             # Combined API service
├── hooks/
│   ├── useBooking.ts        # Hotel search hooks
│   ├── useGetYourGuide.ts   # Activity search hooks
│   └── useTravelApi.ts      # Combined trip data hooks
├── components/
│   ├── HotelCard.tsx        # Hotel display component
│   └── ActivityCard.tsx     # Activity display component
└── app/
    ├── api-demo/            # Live API testing page
    └── trips/new/           # Updated trip creation with APIs
```

### 🎯 **Features**

- **Real-time data** from live APIs with mock fallbacks
- **Smart caching** using React Query (5-10 minute cache)
- **Error handling** with graceful degradation
- **Rate limiting** protection (60 req/min Booking, 100 req/min GetYourGuide)
- **Currency support** for international travelers
- **Mobile responsive** cards and interfaces
- **Accessibility** features built-in

### 🚀 **Usage Example**

```tsx
// Hotel search with caching
const { data: hotels, isLoading } = useHotelSearch({
  destination: 'Tokyo',
  checkIn: '2025-12-01',
  checkOut: '2025-12-07',
  adults: 2,
  currency: 'USD'
});

// Activity search with filters
const { data: activities } = useActivitySearch({
  destination: 'Tokyo',
  category: ['Walking Tours', 'Museums'],
  minRating: 4.5,
  maxPrice: 100
});
```

## Mock Data Structure

Currently using structured mock data in `trips/new/page.tsx` with:
- Price ranges (budget, mid-range, luxury)
- Destination information
- Activity suggestions

This provides a realistic user experience while APIs are being integrated.