"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { 
  Plane,
  MapPin,
  Calendar,
  Users,
  Wallet,
  ArrowRight,
  Bell,
  Settings,
  Sparkles,
  Clock,
  Star,
  LogOut,
  User,
} from "lucide-react";

// Mock API data for destinations with price estimates
const destinationData = {
  japan: {
    name: "Japan",
    cities: ["Tokyo", "Kyoto", "Osaka"],
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop",
    priceEstimates: {
      budget: { min: 1200, max: 1800, description: "Hostels, local food, public transport" },
      mid: { min: 2500, max: 3500, description: "Mid-range hotels, mix of local/tourist spots" },
      luxury: { min: 5000, max: 8000, description: "Luxury hotels, fine dining, private tours" }
    }
  },
  patagonia: {
    name: "Patagonia, Argentina",
    cities: ["El Calafate", "El Chalten", "Bariloche"],
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop",
    priceEstimates: {
      budget: { min: 800, max: 1200, description: "Camping, local food, bus travel" },
      mid: { min: 1800, max: 2800, description: "Mid-range lodges, guided tours" },
      luxury: { min: 4000, max: 6500, description: "Luxury lodges, private guides, helicopter tours" }
    }
  },
  thailand: {
    name: "Thailand",
    cities: ["Bangkok", "Chiang Mai", "Phuket"],
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=400&auto=format&fit=crop",
    priceEstimates: {
      budget: { min: 600, max: 1000, description: "Hostels, street food, local transport" },
      mid: { min: 1400, max: 2200, description: "Mid-range hotels, mix of experiences" },
      luxury: { min: 3500, max: 5500, description: "Luxury resorts, spa treatments, private tours" }
    }
  }
};

export default function NewTripPage() {
  const [destination, setDestination] = useState<string>("");
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [tripName, setTripName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [travelers, setTravelers] = useState<number>(2);
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [showPriceEstimates, setShowPriceEstimates] = useState<boolean>(false);
  
  // Flexible dates options
  const [isFlexibleDates, setIsFlexibleDates] = useState<boolean>(false);
  const [flexibleMonth, setFlexibleMonth] = useState<string>("");
  const [flexibleDuration, setFlexibleDuration] = useState<string>("7"); // days
  const [flexibleWeekend, setFlexibleWeekend] = useState<boolean>(false);
  
  // Additional options
  const [hasPets, setHasPets] = useState<boolean>(false);

  // Get destination from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const destinationParam = urlParams.get('destination');
    if (destinationParam && destinationData[destinationParam as keyof typeof destinationData]) {
      setDestination(destinationParam);
      const destData = destinationData[destinationParam as keyof typeof destinationData];
      setTripName(`Trip to ${destData.name}`);
      setShowPriceEstimates(true);
    }
  }, []);

  const handleNotifications = () => {
    // TODO: Implement notifications functionality
    alert("Notifications feature coming soon!");
  };

  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log("Logging out...");
    // Clear user session and redirect to login
    window.location.href = "/login";
  };

  const handleManageAccount = () => {
    window.location.href = "/account/manage";
  };

  const handleCreateTrip = () => {
    if (!departureLocation) {
      alert("Please enter where you're departing from");
      return;
    }

    if (!isFlexibleDates && (!startDate || !endDate)) {
      alert("Please select your travel dates or enable flexible dates");
      return;
    }

    if (isFlexibleDates && !flexibleMonth) {
      alert("Please select a preferred month for flexible dates");
      return;
    }
    
    const tripData = {
      name: tripName,
      destination,
      departureLocation,
      isFlexibleDates,
      ...(isFlexibleDates 
        ? { 
            flexibleMonth, 
            flexibleDuration: parseInt(flexibleDuration),
            flexibleWeekend 
          }
        : { startDate, endDate }
      ),
      travelers,
      hasPets,
      budget: selectedBudget
    };
    
    console.log("Creating trip:", tripData);
    // TODO: Create trip and redirect
    window.location.href = `/trips/trip-${Date.now()}`;
  };

  const currentDestination = destination ? destinationData[destination as keyof typeof destinationData] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Same as trips page */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-gray-200">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <Link href="/explore" className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500">
                <Plane className="h-4 w-4 text-white" />
              </span>
              <div className="font-semibold tracking-tight text-xl">
                Plantrip'r <span className="text-emerald-500">AI</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/explore" className="text-gray-600 hover:text-gray-900">Explore</Link>
              <Link href="/trips" className="text-gray-900 font-medium">Trips</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Bell className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Trip reminder</p>
                    <p className="text-xs text-gray-500">Your Andes trip starts in 3 days</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">New activity suggestion</p>
                    <p className="text-xs text-gray-500">AI found 3 new activities for Japan trip</p>
                    <p className="text-xs text-gray-400">5 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Expense split update</p>
                    <p className="text-xs text-gray-500">David paid $240 for hotel booking</p>
                    <p className="text-xs text-gray-400">1 day ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center">
                  <span className="text-sm text-emerald-600">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User Avatar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-emerald-200 transition-all">
                  <AvatarImage src="https://i.pravatar.cc/32?img=1" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Laura Rodriguez</p>
                    <p className="text-xs text-gray-500">laura@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleManageAccount}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Manage Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/trips" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mb-2 inline-flex items-center">
            ← Back to Trips
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Plan Your Trip
          </h1>
          <p className="text-gray-600">
            Tell us about your travel plans and we'll help you create the perfect itinerary.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Departure Location - Main Input */}
                <div>
                  <Label htmlFor="departure" className="text-sm font-medium text-gray-700">
                    Where are you departing from? *
                  </Label>
                  <Input
                    id="departure"
                    placeholder="Enter your departure city or airport"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    className="mt-1"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">This helps us calculate accurate prices and travel times</p>
                </div>

                {/* Trip Name */}
                <div>
                  <Label htmlFor="tripName" className="text-sm font-medium text-gray-700">
                    Trip Name
                  </Label>
                  <Input
                    id="tripName"
                    placeholder="Give your trip a name"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    className="mt-1"
                  />
                </div>

                {/* Destination Display */}
                {currentDestination && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Destination</Label>
                    <div className="mt-1 flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                        <Image
                          src={currentDestination.image}
                          alt={currentDestination.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{currentDestination.name}</h3>
                        <p className="text-sm text-gray-600">
                          Popular cities: {currentDestination.cities.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">
                      Travel Dates
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="flexible-dates" className="text-sm text-gray-600">
                        My dates are flexible
                      </Label>
                      <Switch 
                        id="flexible-dates"
                        checked={isFlexibleDates}
                        onCheckedChange={setIsFlexibleDates}
                      />
                    </div>
                  </div>

                  {!isFlexibleDates ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                          Start Date
                        </Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                          End Date
                        </Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-700 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">Flexible Date Options</span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Preferred Month
                          </Label>
                          <Select value={flexibleMonth} onValueChange={setFlexibleMonth}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Any month works" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2026-01">January 2026</SelectItem>
                              <SelectItem value="2026-02">February 2026</SelectItem>
                              <SelectItem value="2026-03">March 2026</SelectItem>
                              <SelectItem value="2026-04">April 2026</SelectItem>
                              <SelectItem value="2026-05">May 2026</SelectItem>
                              <SelectItem value="2026-06">June 2026</SelectItem>
                              <SelectItem value="2026-07">July 2026</SelectItem>
                              <SelectItem value="2026-08">August 2026</SelectItem>
                              <SelectItem value="2026-09">September 2026</SelectItem>
                              <SelectItem value="2026-10">October 2026</SelectItem>
                              <SelectItem value="2026-11">November 2026</SelectItem>
                              <SelectItem value="2026-12">December 2026</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-700">
                            Trip Duration
                          </Label>
                          <Select value={flexibleDuration} onValueChange={setFlexibleDuration}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 days</SelectItem>
                              <SelectItem value="5">5 days</SelectItem>
                              <SelectItem value="7">1 week</SelectItem>
                              <SelectItem value="10">10 days</SelectItem>
                              <SelectItem value="14">2 weeks</SelectItem>
                              <SelectItem value="21">3 weeks</SelectItem>
                              <SelectItem value="30">1 month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="flexible-weekend"
                          checked={flexibleWeekend}
                          onCheckedChange={setFlexibleWeekend}
                        />
                        <Label htmlFor="flexible-weekend" className="text-sm text-gray-600">
                          I prefer to travel on weekends
                        </Label>
                      </div>

                      <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
                        <strong>💡 Tip:</strong> Flexible dates can save you up to 40% on flights and accommodations! 
                        We'll find the best deals within your preferred timeframe.
                      </div>
                    </div>
                  )}
                </div>

                {/* Number of Travelers */}
                <div>
                  <Label htmlFor="travelers" className="text-sm font-medium text-gray-700">
                    Number of Travelers
                  </Label>
                  <div className="mt-1 flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{travelers}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTravelers(travelers + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="has-pets"
                    checked={hasPets}
                    onCheckedChange={setHasPets}
                  />
                  <Label htmlFor="has-pets" className="text-sm text-gray-600">
                    I'm traveling with pets 🐕
                  </Label>
                </div>

                {/* Create Trip Button */}
                <Button 
                  onClick={handleCreateTrip}
                  className="w-full bg-emerald-500 hover:bg-emerald-400"
                  size="lg"
                >
                  Create Trip
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Price Estimates Sidebar */}
          <div>
            {showPriceEstimates && currentDestination && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Price Estimates
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Estimated costs per person for {flexibleDuration || '7'} days
                    {isFlexibleDates && (
                      <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                        Save 15-40% with flexible dates
                      </Badge>
                    )}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(currentDestination.priceEstimates).map(([type, estimate]) => {
                    // Calculate flexible date savings (15-30% discount)
                    const flexSavings = isFlexibleDates ? 0.75 : 1; // 25% average savings
                    const adjustedMin = Math.round(estimate.min * flexSavings);
                    const adjustedMax = Math.round(estimate.max * flexSavings);
                    
                    return (
                      <div
                        key={type}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          selectedBudget === type
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedBudget(type)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium capitalize">{type}</h3>
                          <div className="flex flex-col items-end gap-1">
                            {isFlexibleDates && (
                              <div className="text-xs text-gray-500 line-through">
                                ${estimate.min.toLocaleString()} - ${estimate.max.toLocaleString()}
                              </div>
                            )}
                            <Badge variant={type === 'luxury' ? 'default' : 'secondary'}>
                              ${adjustedMin.toLocaleString()} - ${adjustedMax.toLocaleString()}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{estimate.description}</p>
                        {isFlexibleDates && (
                          <div className="mt-2 text-xs text-green-600 font-medium">
                            💰 You save ~${(estimate.min * 0.25).toLocaleString()} - ${(estimate.max * 0.25).toLocaleString()} with flexible dates!
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Sparkles className="h-3 w-3" />
                      Prices updated using live travel APIs
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Suggestions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  AI Travel Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <p>Best time to visit {currentDestination?.name || "your destination"} is during shoulder season for better prices</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Star className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <p>Book accommodations 2-3 months in advance for the best deals</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-emerald-500 mt-0.5" />
                    <p>Consider staying in neighborhoods outside city centers to save money</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-emerald-500">
                  <Plane className="h-4 w-4 text-white" />
                </span>
                <div className="font-semibold text-lg">
                  Plantrip'r <span className="text-emerald-400">AI</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Plan smarter trips with AI-powered recommendations and collaborative tools.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/explore" className="hover:text-white">Explore</Link></li>
                <li><Link href="/trips" className="hover:text-white">My Trips</Link></li>
                <li><Link href="/settings" className="hover:text-white">Settings</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Plantrip'r AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}