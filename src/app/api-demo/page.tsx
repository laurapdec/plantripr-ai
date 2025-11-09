'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, MapPin, Building2, Activity, Car, AlertCircle } from 'lucide-react';
import { useHotelSearch, useActivitySearch, useUberEstimates } from '@/hooks';
import { HotelCard } from '@/components/HotelCard';
import { ActivityCard } from '@/components/ActivityCard';
import { UberOptionsList } from '@/components/UberRideCard';

export default function ApiDemoPage() {
  const [destination, setDestination] = useState('Tokyo');
  const [checkIn, setCheckIn] = useState('2025-12-01');
  const [checkOut, setCheckOut] = useState('2025-12-07');
  const [travelers, setTravelers] = useState(2);
  const [activeTab, setActiveTab] = useState('hotels');
  
  // Uber specific state
  const [pickupAddress, setPickupAddress] = useState('Tokyo Station, Tokyo, Japan');
  const [dropoffAddress, setDropoffAddress] = useState('Shibuya Station, Tokyo, Japan');
  
  // Mock coordinates for demo (in real app, use geocoding service)
  const pickupCoords = { lat: 35.6812, lng: 139.7671 }; // Tokyo Station
  const dropoffCoords = { lat: 35.6580, lng: 139.7016 }; // Shibuya Station

  const { 
    data: hotelData, 
    isLoading: hotelsLoading,
    error: hotelError
  } = useHotelSearch({
    destination,
    checkIn,
    checkOut,
    adults: travelers,
    currency: 'USD'
  });

  const { 
    data: activityData, 
    isLoading: activitiesLoading,
    error: activityError
  } = useActivitySearch({
    destination,
    startDate: checkIn,
    endDate: checkOut,
    travelers,
    currency: 'USD',
    limit: 10
  });

  const { 
    data: uberData, 
    isLoading: uberLoading,
    error: uberError
  } = useUberEstimates({
    pickup: {
      latitude: pickupCoords.lat,
      longitude: pickupCoords.lng,
      address: pickupAddress,
    },
    destination: {
      latitude: dropoffCoords.lat,
      longitude: dropoffCoords.lng,
      address: dropoffAddress,
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Travel API Demo
          </h1>
          <p className="text-gray-600">
            Testing Booking.com, GetYourGuide, and Uber API integration
          </p>
        </div>

        {/* Search Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                />
              </div>
              <div>
                <Label htmlFor="checkin">Check-in</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="checkout">Check-out</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="travelers">Travelers</Label>
                <Input
                  id="travelers"
                  type="number"
                  min="1"
                  max="10"
                  value={travelers}
                  onChange={(e) => setTravelers(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>
            
            {/* Uber specific controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t">
              <div>
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input
                  id="pickup"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter pickup address"
                />
              </div>
              <div>
                <Label htmlFor="dropoff">Dropoff Location</Label>
                <Input
                  id="dropoff"
                  value={dropoffAddress}
                  onChange={(e) => setDropoffAddress(e.target.value)}
                  placeholder="Enter dropoff address"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Results Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hotels" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Hotels
              {hotelsLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activities
              {activitiesLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            </TabsTrigger>
            <TabsTrigger value="transportation" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              Transportation
              {uberLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            </TabsTrigger>
          </TabsList>

          {/* Hotels Tab */}
          <TabsContent value="hotels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Hotels from Booking.com API
                </CardTitle>
                {hotelData && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hotelData.hotels.length} hotels found</span>
                    </div>
                    {hotelData.priceRange && (
                      <Badge variant="secondary">
                        ${hotelData.priceRange.min} - ${hotelData.priceRange.max} {hotelData.priceRange.currency}
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {hotelsLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-3 text-lg">Loading hotels...</span>
                  </div>
                )}

                {hotelError && (
                  <div className="flex items-center gap-3 text-red-600 p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Error loading hotels</p>
                      <p className="text-sm">{hotelError instanceof Error ? hotelError.message : 'Unknown error occurred'}</p>
                    </div>
                  </div>
                )}

                {hotelData && !hotelsLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotelData.hotels.slice(0, 6).map((hotel) => (
                      <HotelCard 
                        key={hotel.id} 
                        hotel={hotel} 
                        onSelect={(hotel) => console.log('Selected hotel:', hotel)}
                      />
                    ))}
                  </div>
                )}

                {hotelData && hotelData.hotels.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No hotels found for this search</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activities from GetYourGuide API
                </CardTitle>
                {activityData && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{activityData.activities.length} activities found</span>
                    </div>
                    {activityData.priceRange && (
                      <Badge variant="secondary">
                        ${activityData.priceRange.min} - ${activityData.priceRange.max} {activityData.priceRange.currency}
                      </Badge>
                    )}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {activitiesLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-3 text-lg">Loading activities...</span>
                  </div>
                )}

                {activityError && (
                  <div className="flex items-center gap-3 text-red-600 p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Error loading activities</p>
                      <p className="text-sm">{activityError instanceof Error ? activityError.message : 'Unknown error occurred'}</p>
                    </div>
                  </div>
                )}

                {activityData && !activitiesLoading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activityData.activities.slice(0, 6).map((activity) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        onSelect={(activity) => console.log('Selected activity:', activity)}
                        onViewDetails={(activity) => console.log('View details:', activity)}
                      />
                    ))}
                  </div>
                )}

                {activityData && activityData.activities.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No activities found for this search</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transportation Tab */}
          <TabsContent value="transportation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Ride Options from Uber API
                </CardTitle>
                {uberData && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{uberData.total_distance.toFixed(1)} mi • {Math.round(uberData.estimated_trip_time / 60)} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      <span>{uberData.prices.length} ride options</span>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {uberLoading && (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-3 text-lg">Loading ride options...</span>
                  </div>
                )}

                {uberError && (
                  <div className="flex items-center gap-3 text-red-600 p-4 bg-red-50 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <div>
                      <p className="font-medium">Error loading ride options</p>
                      <p className="text-sm">{uberError instanceof Error ? uberError.message : 'Unknown error occurred'}</p>
                    </div>
                  </div>
                )}

                {uberData && !uberLoading && (
                  <div className="space-y-4">
                    {/* Trip Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Trip Summary</h4>
                        <Badge variant="outline">{uberData.currency}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">From</p>
                          <p className="font-medium">{uberData.pickup_location.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">To</p>
                          <p className="font-medium">{uberData.destination_location.name}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Distance</p>
                          <p className="font-medium">{uberData.total_distance.toFixed(1)} miles</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Est. Time</p>
                          <p className="font-medium">{Math.round(uberData.estimated_trip_time / 60)} minutes</p>
                        </div>
                      </div>
                    </div>

                    {/* Ride Options */}
                    <UberOptionsList
                      prices={uberData.prices}
                      timeEstimates={uberData.times}
                      products={uberData.products}
                      onSelectRide={(price) => console.log('Selected ride:', price)}
                    />
                  </div>
                )}

                {uberData && uberData.prices.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No ride options available for this route</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* API Status */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${hotelError ? 'bg-red-500' : hotelsLoading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <div>
                  <p className="font-medium">Booking.com API</p>
                  <p className="text-sm text-gray-500">
                    {hotelError ? 'Using mock data' : hotelsLoading ? 'Loading...' : 'Mock data loaded'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${activityError ? 'bg-red-500' : activitiesLoading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <div>
                  <p className="font-medium">GetYourGuide API</p>
                  <p className="text-sm text-gray-500">
                    {activityError ? 'Using mock data' : activitiesLoading ? 'Loading...' : 'Mock data loaded'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${uberError ? 'bg-red-500' : uberLoading ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                <div>
                  <p className="font-medium">Uber API</p>
                  <p className="text-sm text-gray-500">
                    {uberError ? 'Using mock data' : uberLoading ? 'Loading...' : 'Mock data loaded'}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Currently using mock data for demonstration. 
                To enable real API calls, add your API keys to the .env.local file and restart the development server.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}