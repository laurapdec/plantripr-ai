"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plane,
  Shield,
  Lock,
  Eye,
  UserCheck,
  Globe,
  Mail,
} from "lucide-react";

export default function PrivacyPage() {
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
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/privacy" className="text-gray-900 font-medium">Privacy</Link>
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

      <div className="mx-auto max-w-4xl px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-8 w-8 text-emerald-500" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, 
            and protect your personal information when you use Plantrip&apos;r AI.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: November 7, 2025
          </p>
        </div>

        {/* Privacy Principles */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-emerald-500" />
              Our Privacy Principles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Data Security</h4>
                  <p className="text-sm text-gray-600">
                    We use industry-standard encryption and security measures to protect your data.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Eye className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Transparency</h4>
                  <p className="text-sm text-gray-600">
                    We&apos;re clear about what data we collect and how we use it.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <UserCheck className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Your Control</h4>
                  <p className="text-sm text-gray-600">
                    You can access, update, or delete your personal data at any time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Globe className="h-5 w-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">GDPR Compliant</h4>
                  <p className="text-sm text-gray-600">
                    We comply with international privacy regulations including GDPR.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600 mb-2">
                  When you create an account or use our services, we may collect:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Name and email address</li>
                  <li>Profile information and preferences</li>
                  <li>Trip information and itineraries you create</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Usage Information</h3>
                <p className="text-gray-600 mb-2">
                  We automatically collect information about how you use our service:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Provide our services:</strong> Create and manage your trip plans, 
                    process payments, and enable collaboration features.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Improve our AI:</strong> Train our recommendation algorithms to 
                    provide better, more personalized trip suggestions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Communicate with you:</strong> Send important updates, 
                    support responses, and optional marketing communications.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    <strong>Security and compliance:</strong> Detect fraud, ensure platform 
                    security, and comply with legal requirements.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Multi-Currency Support</h2>
            <div className="bg-emerald-50 rounded-lg p-6">
              <p className="text-gray-700 mb-3">
                <strong>Currency Management:</strong> Plantrip&apos;r AI supports multiple currencies 
                simultaneously. You can:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Double-click the currency symbol (like US$ or €) to change your expense currency
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Track expenses in different currencies within the same trip
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    EUR and USD accounts are kept separate - no automatic mixing
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">
                    Real-time currency conversion rates for expense splitting calculations
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your data only in these limited circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
              <li><strong>Service providers:</strong> Third-party services that help us operate our platform</li>
              <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Trip collaborators:</strong> Information you choose to share with fellow travelers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Access & Portability</h4>
                <p className="text-sm text-gray-600">
                  Request a copy of your personal data in a machine-readable format.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Correction</h4>
                <p className="text-sm text-gray-600">
                  Update or correct any inaccurate personal information.
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Deletion</h4>
                <p className="text-sm text-gray-600">
                  Request deletion of your personal data (subject to legal requirements).
                </p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Opt-out</h4>
                <p className="text-sm text-gray-600">
                  Unsubscribe from marketing communications at any time.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  If you have questions about this privacy policy or want to exercise your rights, 
                  please contact us:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-emerald-500" />
                    <span className="text-gray-700">privacy@plantripr.ai</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-4 w-4 text-emerald-500" />
                    <span className="text-gray-700">Data Protection Officer: privacy@plantripr.ai</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Response Time:</strong> We aim to respond to all privacy requests 
                    within 30 days. For urgent matters, please mark your email as &quot;Urgent Privacy Request.&quot;
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-600">
              We may update this privacy policy from time to time. We&apos;ll notify you of any 
              material changes by email or through our service. Your continued use of 
              Plantrip&apos;r AI after such changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Ready to start planning?</h3>
          <p className="text-gray-600 mb-4">
            We&apos;re committed to protecting your privacy while helping you create amazing trips.
          </p>
          <Link href="/register">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white">
              Get Started Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-gray-600">
          <p>&copy; 2025 Plantrip&apos;r AI. Your privacy matters to us.</p>
        </div>
      </footer>
    </div>
  );
}