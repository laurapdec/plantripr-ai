"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plane,
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Wallet,
  ArrowRight,
  Compass,
  Camera,
  Mountain,
  Waves,
  Building2,
  TreePine,
  Star,
  Clock,
  Bell,
  Settings,
} from "lucide-react";

const tripTypes = [
  { id: "adventure", name: "Adventure", icon: Mountain, color: "text-orange-500", desc: "Hiking, outdoor activities" },
  { id: "relaxation", name: "Beach & Relaxation", icon: Waves, color: "text-blue-500", desc: "Beaches, spas, chill vibes" },
  { id: "cultural", name: "Cultural", icon: Building2, color: "text-purple-500", desc: "Museums, history, local culture" },
  { id: "nature", name: "Nature", icon: TreePine, color: "text-green-500", desc: "National parks, wildlife" },
  { id: "photography", name: "Photography", icon: Camera, color: "text-pink-500", desc: "Scenic spots, Instagram-worthy" },
];

const popularDestinations = [
  {
    id: "patagonia",
    name: "Patagonia, Argentina",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop",
    type: "Adventure",
    duration: "7-10 days",
    budget: "$$",
    highlights: ["Torres del Paine", "Glaciers", "Hiking trails"],
  },
  {
    id: "japan",
    name: "Japan (Tokyo & Kyoto)",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop",
    type: "Cultural", 
    duration: "10-14 days",
    budget: "$$$",
    highlights: ["Cherry blossoms", "Temples", "Food scene"],
  },
  {
    id: "bali",
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?q=80&w=400&auto=format&fit=crop",
    type: "Relaxation",
    duration: "7-12 days", 
    budget: "$",
    highlights: ["Beaches", "Temples", "Rice terraces"],
  },
  {
    id: "iceland",
    name: "Iceland Ring Road",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
    type: "Nature",
    duration: "8-12 days",
    budget: "$$$",
    highlights: ["Northern lights", "Waterfalls", "Hot springs"],
  },
  {
    id: "peru",
    name: "Peru (Machu Picchu)",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=400&auto=format&fit=crop",
    type: "Adventure",
    duration: "10-14 days", 
    budget: "$$",
    highlights: ["Machu Picchu", "Inca Trail", "Cusco"],
  },
  {
    id: "greece",
    name: "Greek Islands",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=400&auto=format&fit=crop",
    type: "Relaxation",
    duration: "7-10 days",
    budget: "$$", 
    highlights: ["Santorini", "Mykonos", "Mediterranean cuisine"],
  },
];

export default function ExplorePage() {
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [customTrip, setCustomTrip] = useState({
    destination: "",
    duration: "",
    travelers: "",
    budget: "",
    description: "",
  });

  const toggleTripType = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleCustomTripChange = (field: string, value: string) => {
    setCustomTrip(prev => ({ ...prev, [field]: value }));
  };

  const generateTrip = () => {
    console.log("Generating trip with:", { selectedTypes, customTrip });
    // Navigate to trip creation/AI generation
    window.location.href = "/trips/new";
  };

  const selectDestination = (destination: any) => {
    console.log("Selected destination:", destination);
    // Pre-fill trip with destination data and navigate
    window.location.href = `/trips/new?destination=${destination.id}`;
  };

  const handleNotifications = () => {
    // TODO: Implement notifications functionality
    alert("Notifications feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-gray-200">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
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
              <Link href="/explore" className="text-gray-900 font-medium">Explore</Link>
              <Link href="/trips" className="text-gray-600 hover:text-gray-900">Trips</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" onClick={handleNotifications}>
              <Bell className="h-4 w-4" />
            </Button>
            <Link href="/settings">
              <Button size="icon" variant="ghost">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/32?img=1" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI Trip Planning
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell our AI what you're looking for, or choose from curated destinations. 
            We'll create a personalized itinerary in seconds.
          </p>
        </div>

        {/* Step Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step === 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <Compass className="h-4 w-4" />
              Browse Destinations
            </button>
            <div className="w-8 h-px bg-gray-300"></div>
            <button
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step === 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
            >
              <Sparkles className="h-4 w-4" />
              Custom AI Trip
            </button>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-12">
            {/* Trip Type Filter */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What kind of trip interests you?</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {tripTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => toggleTripType(type.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedTypes.includes(type.id)
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <type.icon className={`h-6 w-6 ${type.color} mb-2`} />
                    <h3 className="font-semibold text-sm">{type.name}</h3>
                    <p className="text-xs text-gray-600">{type.desc}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Destinations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Popular Destinations</h2>
                <div className="text-sm text-gray-600">
                  {selectedTypes.length > 0 && `Filtered by: ${selectedTypes.join(', ')}`}
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularDestinations
                  .filter(dest => 
                    selectedTypes.length === 0 || 
                    selectedTypes.some(type => 
                      tripTypes.find(t => t.id === type)?.name === dest.type
                    )
                  )
                  .map((destination) => (
                    <Card 
                      key={destination.id} 
                      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => selectDestination(destination)}
                    >
                      <div className="relative h-48">
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-gray-800">
                            {destination.type}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{destination.name}</h3>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {destination.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Wallet className="h-4 w-4" />
                            Budget: {destination.budget}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {destination.highlights.map((highlight, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full bg-emerald-500 hover:bg-emerald-400">
                          Plan This Trip <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </section>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-500" />
                  Describe Your Perfect Trip
                </CardTitle>
                <p className="text-gray-600">
                  Tell our AI about your travel dreams and we'll create a custom itinerary just for you.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="destination">Where do you want to go?</Label>
                    <Input
                      id="destination"
                      placeholder="e.g., Japanese countryside, European cities..."
                      value={customTrip.destination}
                      onChange={(e) => handleCustomTripChange('destination', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="duration">How long?</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 1 week, 10 days..."
                      value={customTrip.duration}
                      onChange={(e) => handleCustomTripChange('duration', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="travelers">How many travelers?</Label>
                    <Input
                      id="travelers"
                      placeholder="e.g., 2 adults, family of 4..."
                      value={customTrip.travelers}
                      onChange={(e) => handleCustomTripChange('travelers', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Budget range?</Label>
                    <Input
                      id="budget"
                      placeholder="e.g., $2000 total, budget-friendly..."
                      value={customTrip.budget}
                      onChange={(e) => handleCustomTripChange('budget', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Describe your ideal trip</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Mix of adventure and relaxation. Love hiking, local food, avoiding crowds. Want to see cherry blossoms and visit traditional villages..."
                    value={customTrip.description}
                    onChange={(e) => handleCustomTripChange('description', e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips for better results:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Mention your interests (food, culture, nature, photography)</li>
                    <li>• Include travel style preferences (luxury, budget, backpacking)</li>
                    <li>• Note any constraints (accessibility, dietary restrictions)</li>
                    <li>• Mention specific must-see places or experiences</li>
                  </ul>
                </div>

                <Button 
                  onClick={generateTrip}
                  className="w-full bg-emerald-500 hover:bg-emerald-400"
                  disabled={!customTrip.destination || !customTrip.description}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate My Perfect Trip
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
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