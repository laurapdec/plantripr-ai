# Travel API Integration for Plantrip'r AI

This project integrates three major travel APIs to provide comprehensive travel planning capabilities:

## 📚 API Services Implemented

### 🏨 Booking.com API
**File:** `/src/lib/api/booking.ts`

- **Hotel Search**: Search for hotels by destination, dates, and travelers
- **Hotel Details**: Get detailed information about specific properties
- **Price Estimates**: Real-time pricing and availability
- **Mock Data**: Comprehensive fallback data for development

**Key Features:**
- Real-time hotel availability and pricing
- Advanced filtering (price range, amenities, ratings)
- Multi-currency support
- Error handling with fallback to mock data

### 🎯 GetYourGuide API
**File:** `/src/lib/api/getyourguide.ts`

- **Activity Search**: Find tours, experiences, and attractions
- **Category Browsing**: Browse by activity types and themes
- **Booking Options**: Get pricing and availability for activities
- **Review Integration**: Access user reviews and ratings

**Key Features:**
- Comprehensive activity catalog
- Advanced search filters (duration, price, rating)
- Real-time availability checking
- Multi-language support

### 🚗 Uber API
**File:** `/src/lib/api/uber.ts`

- **Ride Estimates**: Get price and time estimates for trips
- **Product Listings**: Available ride types (UberX, UberXL, etc.)
- **Real-time Pricing**: Dynamic pricing with surge calculations
- **Route Optimization**: Distance and time calculations

**Key Features:**
- Real-time ride estimates and pricing
- Multiple vehicle option comparisons
- ETA calculations
- Support for pickup/dropoff locations

## 🔧 Technical Implementation

### React Query Hooks
**Files:** `/src/hooks/useBooking.ts`, `/src/hooks/useGetYourGuide.ts`, `/src/hooks/useUber.ts`

- **Caching Strategy**: Intelligent data caching for performance
- **Real-time Updates**: Live data synchronization
- **Error Handling**: Graceful degradation with retry logic
- **Loading States**: Comprehensive loading and error states

### React Components
**Files:** `/src/components/HotelCard.tsx`, `/src/components/ActivityCard.tsx`, `/src/components/UberRideCard.tsx`

- **Hotel Cards**: Display hotel information with pricing, amenities, and ratings
- **Activity Cards**: Show tours/activities with duration, reviews, and booking options
- **Uber Cards**: Present ride options with pricing, vehicle types, and ETAs

### Demo Application
**File:** `/src/app/api-demo/page.tsx`

- **Tabbed Interface**: Separate tabs for Hotels, Activities, and Transportation
- **Search Controls**: Interactive forms for destination, dates, and preferences
- **Real-time Results**: Live API data with loading states
- **Error Handling**: Graceful fallbacks with informative error messages

## 🚀 Getting Started

### 1. Installation
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### 2. Environment Configuration
Create a `.env.local` file with your API keys:

```env
# Booking.com API (RapidAPI)
BOOKING_API_KEY=your_booking_api_key_here
BOOKING_API_HOST=booking-com.p.rapidapi.com

# GetYourGuide API (RapidAPI) 
GETYOURGUIDE_API_KEY=your_getyourguide_api_key_here
GETYOURGUIDE_API_HOST=getyourguide.p.rapidapi.com

# Uber API (Direct)
UBER_CLIENT_ID=your_uber_client_id_here
UBER_CLIENT_SECRET=your_uber_client_secret_here
UBER_SERVER_TOKEN=your_uber_server_token_here
```

### 3. View Demo
Navigate to `http://localhost:3000/api-demo` to see the comprehensive API demo.

## 🎯 Demo Features

### Hotels Tab
- **Search Form**: Destination, check-in/out dates, number of travelers
- **Hotel Cards**: Display hotel name, location, price, rating, and amenities
- **Price Filtering**: Real-time price range filtering
- **Booking Integration**: Direct links to booking pages

### Activities Tab  
- **Activity Search**: Find tours and experiences by destination
- **Category Filters**: Filter by activity type, duration, and price
- **Review Display**: Show user ratings and review snippets
- **Booking Options**: View pricing and availability

### Transportation Tab
- **Route Input**: Pickup and dropoff location selection
- **Ride Options**: Compare different vehicle types and pricing
- **Time Estimates**: Real-time ETA calculations
- **Price Comparison**: Side-by-side pricing for different ride types

## 📊 API Status Monitoring

The demo page includes real-time API status indicators:

- **🟢 Green**: API responding normally
- **🟡 Yellow**: Loading/Processing
- **🔴 Red**: Error (fallback to mock data)

## 🔄 Development Mode

When API keys are not configured, the system automatically falls back to comprehensive mock data:

- **Hotels**: 20+ realistic hotel entries with varied pricing and amenities
- **Activities**: 15+ diverse tours and experiences
- **Transportation**: Complete Uber product lineup with realistic pricing

## 📝 Usage Examples

### Search Hotels
```typescript
const { data, isLoading, error } = useHotelSearch({
  destination: 'Tokyo',
  checkIn: '2025-12-01',
  checkOut: '2025-12-07',
  adults: 2,
  currency: 'USD'
});
```

### Find Activities
```typescript
const { data, isLoading, error } = useActivitySearch({
  destination: 'Tokyo',
  startDate: '2025-12-01',
  endDate: '2025-12-07',
  travelers: 2,
  currency: 'USD'
});
```

### Get Uber Estimates
```typescript
const { data, isLoading, error } = useUberEstimates({
  pickup: {
    latitude: 35.6812,
    longitude: 139.7671,
    address: 'Tokyo Station, Tokyo, Japan'
  },
  destination: {
    latitude: 35.6580,
    longitude: 139.7016,
    address: 'Shibuya Station, Tokyo, Japan'
  }
});
```

## 🏗️ Architecture

```
src/
├── lib/api/           # API service layer
│   ├── base.ts        # Base API client with common functionality
│   ├── booking.ts     # Booking.com API integration
│   ├── getyourguide.ts # GetYourGuide API integration
│   ├── uber.ts        # Uber API integration
│   └── index.ts       # Unified TravelApiService
├── hooks/             # React Query hooks
│   ├── useBooking.ts  # Hotel search hooks
│   ├── useGetYourGuide.ts # Activity search hooks
│   ├── useUber.ts     # Transportation hooks
│   └── index.ts       # Hook exports
├── components/        # React components
│   ├── HotelCard.tsx  # Hotel display component
│   ├── ActivityCard.tsx # Activity display component
│   ├── UberRideCard.tsx # Transportation component
│   └── ui/            # Shared UI components
└── app/
    └── api-demo/      # Demo application
        └── page.tsx   # Comprehensive API showcase
```

## 🔧 Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: React Query for server state
- **HTTP Client**: Fetch API with error handling
- **Icons**: Lucide React
- **Validation**: Zod schemas (configured but not shown in demo)

## 📈 Performance Features

- **Caching**: Intelligent query caching with React Query
- **Memoization**: Component-level performance optimizations
- **Lazy Loading**: Progressive component loading
- **Error Boundaries**: Graceful error handling
- **Mock Fallbacks**: Instant development experience

## 🔐 Security & Error Handling

- **API Key Protection**: Server-side API key management
- **Rate Limiting**: Built-in request throttling
- **Error Boundaries**: Graceful degradation on failures
- **Input Validation**: Client and server-side validation
- **CORS Handling**: Proper cross-origin request management

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile and tablet devices
- **Grid Layouts**: Responsive card grids for different screen sizes
- **Touch-Friendly**: Large tap targets and smooth interactions
- **Progressive Enhancement**: Works with or without JavaScript

---

**Demo URL**: `http://localhost:3000/api-demo`

This comprehensive integration provides a complete travel planning ecosystem with hotels, activities, and transportation all in one place! 🚀