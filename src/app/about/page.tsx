"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plane,
  MapPin,
  Sparkles,
  Heart,
  ExternalLink,
  Linkedin,
  Globe,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-gray-200">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <Link href="/landing" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500">
              <Plane className="h-4 w-4 text-white" />
            </span>
            <div className="font-semibold tracking-tight text-xl">
              Plantrip&apos;r <span className="text-emerald-500">AI</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="text-gray-900 font-medium">About</Link>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About Plantrip&apos;r AI
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          We&apos;re passionate travelers and technologists who believe that planning the perfect trip 
          should be exciting, not overwhelming. That&apos;s why we created Plantrip&apos;r AI.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              Travel planning shouldn&apos;t take weeks of research and endless spreadsheets. 
              We combine the power of artificial intelligence with real traveler insights 
              to create personalized itineraries in minutes, not hours.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Whether you&apos;re planning a weekend getaway or a month-long adventure, 
              Plantrip&apos;r AI helps you discover hidden gems, optimize your schedule, 
              and collaborate seamlessly with your travel companions.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                AI-Powered Planning
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-emerald-500" />
                Made by Travelers
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-500" />
                Global Coverage
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop"
              alt="Travel planning"
              width={600}
              height={400}
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Two passionate travelers and tech enthusiasts building the future of trip planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Myriam */}
            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">MT</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Myriam Tsafack</h3>
                  <p className="text-gray-600 mb-4">Chief Executive Officer & Co-Founder</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Visionary leader passionate about creating intuitive user experiences and leveraging AI 
                    to solve real-world travel challenges. Drives strategic direction and loves exploring hidden gems 
                    and local cultures around the world.
                  </p>
                  <a 
                    href="https://linkedin.com/in/myriam-tsafack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <Linkedin className="h-4 w-4" />
                    Connect on LinkedIn
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Laura */}
            <Card className="text-center p-8">
              <CardContent className="space-y-4">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">LP</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Laura Pereira de Castro</h3>
                  <p className="text-gray-600 mb-4">Chief Technology Officer & Co-Founder</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Technical visionary and full-stack developer who architects scalable AI solutions. 
                    Leads engineering innovation while believing technology should 
                    simplify life&apos;s adventures and outdoor exploration.
                  </p>
                  <a 
                    href="https://laurapdec.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Believe</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI Should Enhance, Not Replace</h3>
            <p className="text-gray-600 text-sm">
              We use AI to handle the tedious research and logistics, so you can focus 
              on the excitement of discovering new places and creating memories.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Travel Brings Us Together</h3>
            <p className="text-gray-600 text-sm">
              The best trips are shared experiences. Our collaborative tools make it easy 
              to plan together, split costs fairly, and keep everyone in the loop.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Every Trip Should Be Personal</h3>
            <p className="text-gray-600 text-sm">
              Your travel style is unique. We create personalized recommendations 
              that match your interests, budget, and travel preferences.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-blue-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Plan Your Next Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of travelers who trust Plantrip&apos;r AI to create their perfect trips.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white">
                Start Planning for Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-600">
          <p>&copy; 2025 Plantrip&apos;r AI. Built with ❤️ for travelers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}