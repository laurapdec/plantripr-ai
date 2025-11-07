"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plane,
  Sparkles,
  Users,
  MapPin,
  Calendar,
  Wallet,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-gray-200">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500">
              <Plane className="h-4 w-4 text-white" />
            </span>
            <div className="font-semibold tracking-tight text-xl">
              Plantrip'r <span className="text-emerald-500">AI</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6 bg-emerald-100 text-emerald-700">
          <Sparkles className="mr-2 h-3 w-3" />
          AI-Powered Trip Planning
        </Badge>
        
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Plan Epic Trips with
          <span className="text-emerald-500 block mt-2">AI Assistance</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Tell our AI copilot your travel goals and watch it craft the perfect itinerary. 
          Collaborate with friends, split expenses, and never miss a detail.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <Link href="/register">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white">
              Start Planning <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            <Image 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop"
              alt="Trip planning interface"
              width={1200} 
              height={600}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to plan amazing trips
          </h2>
          <p className="text-lg text-gray-600">
            From AI-powered suggestions to expense splitting, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Sparkles className="h-8 w-8 text-emerald-500 mb-2" />
              <CardTitle>AI Trip Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Describe your ideal trip and let our AI create a detailed itinerary with activities, 
                restaurants, and hidden gems.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>Collaborate with Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Invite travel companions, vote on activities, and plan together in real-time. 
                Everyone stays in the loop.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Wallet className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle>Smart Expense Splitting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track expenses and automatically calculate who owes what. 
                No more awkward money conversations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle>Interactive Maps</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                See your itinerary on interactive maps with real-time navigation and 
                location-based recommendations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle>Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Drag-and-drop itinerary builder with smart scheduling that accounts for 
                travel times and opening hours.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Star className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>Local Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get insider tips and local recommendations powered by real traveler reviews 
                and AI analysis.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Plan your trip in 3 simple steps
            </h2>
            <p className="text-lg text-gray-600">
              From idea to itinerary in minutes, not hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Describe Your Trip</h3>
              <p className="text-gray-600">
                Tell us your destination, dates, budget, and what you're looking for. 
                Be as specific or general as you like.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Creates Your Plan</h3>
              <p className="text-gray-600">
                Our AI analyzes millions of travel data points to craft a personalized 
                itinerary just for you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Customize & Enjoy</h3>
              <p className="text-gray-600">
                Fine-tune your itinerary, invite friends, and head out on your 
                perfectly planned adventure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to plan your next adventure?
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Join thousands of travelers who trust Plantrip'r AI for their perfect trips.
        </p>
        
        <Link href="/register">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white">
            Start Planning for Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            Free to get started
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            Cancel anytime
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500">
                  <Plane className="h-4 w-4 text-white" />
                </span>
                <div className="font-semibold">Plantrip'r AI</div>
              </div>
              <p className="text-gray-600 mb-4">
                AI-powered trip planning that makes travel planning effortless and fun.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/examples">Examples</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2025 Plantrip'r AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}