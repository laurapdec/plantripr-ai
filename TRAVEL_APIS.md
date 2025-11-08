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

## Current Implementation

The current implementation uses mock data for price estimates. To integrate real APIs:

1. **Environment Variables**: Set up API keys in `.env.local`
2. **API Service Layer**: Create services in `src/lib/api/`
3. **Real-time Updates**: Implement caching and rate limiting
4. **Error Handling**: Graceful fallbacks when APIs are unavailable

## Mock Data Structure

Currently using structured mock data in `trips/new/page.tsx` with:
- Price ranges (budget, mid-range, luxury)
- Destination information
- Activity suggestions

This provides a realistic user experience while APIs are being integrated.