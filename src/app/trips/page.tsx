"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { 
  Plane,
  Plus,
  Search,
  MapPin,
  Calendar,
  Users,
  MoreHorizontal,
  Settings,
  Bell,
  Sparkles,
  Heart,
  Clock,
  ArrowRight,
  Compass,
  LogOut,
  User,
} from "lucide-react";

// Mock data
const mockTrips = [
  {
    id: "trip-1",
    title: "Andes Mountain Adventure",
    destination: "Patagonia, Argentina",
    startDate: "2026-01-12",
    endDate: "2026-01-18",
    status: "active",
    cover: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop",
    collaborators: [
      { name: "Laura", avatar: "https://i.pravatar.cc/32?img=1" },
      { name: "David", avatar: "https://i.pravatar.cc/32?img=5" },
    ],
    daysLeft: 45,
  },
  {
    id: "trip-2", 
    title: "Japan Cherry Blossom",
    destination: "Tokyo & Kyoto, Japan",
    startDate: "2026-03-20",
    endDate: "2026-03-30",
    status: "planning",
    cover: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop",
    collaborators: [
      { name: "Nina", avatar: "https://i.pravatar.cc/32?img=3" },
    ],
    daysLeft: 112,
  },
  {
    id: "trip-3",
    title: "European Summer",
    destination: "Paris → Barcelona → Rome",
    startDate: "2026-06-15",
    endDate: "2026-06-28",
    status: "draft",
    cover: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?q=80&w=400&auto=format&fit=crop",
    collaborators: [],
    daysLeft: 199,
  },
];

const recentActivity = [
  {
    id: "1",
    type: "ai_suggestion",
    message: "AI suggested 3 new activities for your Andes trip",
    trip: "Andes Mountain Adventure",
    time: "2 hours ago",
    icon: Sparkles,
  },
  {
    id: "2", 
    type: "collaboration",
    message: "David added Manush Brewery to the itinerary",
    trip: "Andes Mountain Adventure", 
    time: "1 day ago",
    icon: Users,
  },
  {
    id: "3",
    type: "expense",
    message: "Laura paid $480 for cabin deposit",
    trip: "Andes Mountain Adventure",
    time: "2 days ago", 
    icon: Users,
  },
];

export default function TripsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTrips = mockTrips.filter(trip =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-emerald-100 text-emerald-800";
      case "planning": return "bg-blue-100 text-blue-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Trips 🗺️
              </h1>
              <p className="text-gray-600">
                You have 3 active trips and 2 upcoming adventures planned.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/explore">
                <Button variant="outline">
                  <Compass className="mr-2 h-4 w-4" />
                  Explore
                </Button>
              </Link>
              <Link href="/trips/new">
                <Button className="bg-emerald-500 hover:bg-emerald-400">
                  <Plus className="mr-2 h-4 w-4" />
                  Plan New Trip
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search & Filter */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search trips by name or destination..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Active Trips */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Trips</h2>
              </div>

              <div className="grid gap-6">
                {filteredTrips.map((trip) => (
                  <Card key={trip.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                    <Link href={`/trips/${trip.id}`}>
                      <div className="flex">
                        <div className="w-48 h-32 relative flex-shrink-0">
                          <Image
                            src={trip.cover}
                            alt={trip.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{trip.title}</h3>
                              <div className="flex items-center text-gray-600 text-sm mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                {trip.destination}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(trip.status)}>
                                {trip.status}
                              </Badge>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {trip.daysLeft} days left
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {trip.collaborators.length > 0 && (
                                <div className="flex -space-x-2">
                                  {trip.collaborators.map((collab, i) => (
                                    <Avatar key={i} className="w-6 h-6 border-2 border-white">
                                      <AvatarImage src={collab.avatar} />
                                      <AvatarFallback className="text-xs">{collab.name[0]}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              )}
                              <span className="text-xs text-gray-500">
                                {trip.collaborators.length + 1} traveler{trip.collaborators.length > 0 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>

              {filteredTrips.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No trips found matching your search.</p>
                  <Link href="/explore">
                    <Button variant="outline">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Discover destinations
                    </Button>
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/trips/new">
                  <Button className="w-full justify-start bg-emerald-500 hover:bg-emerald-400">
                    <Plus className="mr-2 h-4 w-4" />
                    Plan New Trip
                  </Button>
                </Link>
                <Link href="/explore">
                  <Button variant="outline" className="w-full justify-start">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get AI Inspiration
                  </Button>
                </Link>
                <Link href="/trips">
                  <Button variant="ghost" className="w-full justify-start">
                    <Heart className="mr-2 h-4 w-4" />
                    View Saved Places
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <activity.icon className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.trip} • {activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Link href="/activity" className="text-sm text-emerald-600 hover:text-emerald-700">
                    View all activity <ArrowRight className="inline h-3 w-3 ml-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Travel Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Trips planned</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Countries visited</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Travel buddies</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total expenses saved</span>
                  <span className="font-semibold text-emerald-600">$2,340</span>
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