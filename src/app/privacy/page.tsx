"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CookieSettingsButton } from "@/components/ui/cookie-consent";
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
            This Privacy Policy explains how Plantrip&apos;r AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects, uses, 
            and protects your personal information. We comply with GDPR (EU), UK GDPR, CCPA (California), 
            and other applicable privacy regulations.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            <strong>Effective Date:</strong> November 7, 2025 | <strong>Version:</strong> 1.0
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Your Rights:</strong> You have the right to access, rectify, delete, or port your data. 
              Contact us at privacy@plantripr.ai to exercise these rights.
            </p>
          </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1.1 Personal Data (Article 4 GDPR)</h3>
                <p className="text-gray-600 mb-3">
                  <strong>Legal Basis:</strong> Contract performance, legitimate interests, and consent where required.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li><strong>Identity Data:</strong> Name, email address, phone number (optional)</li>
                  <li><strong>Account Data:</strong> Username, password (hashed), profile preferences</li>
                  <li><strong>Travel Data:</strong> Trip itineraries, destinations, accommodation preferences</li>
                  <li><strong>Financial Data:</strong> Payment information via secure third-party processors (Stripe, PayPal)</li>
                  <li><strong>Communication Data:</strong> Messages, support tickets, collaboration notes</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">1.2 Technical Data</h3>
                <p className="text-gray-600 mb-3">
                  <strong>Legal Basis:</strong> Legitimate interests for service improvement and security.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device ID</li>
                  <li><strong>Usage Analytics:</strong> Page views, feature usage, session duration, click patterns</li>
                  <li><strong>Location Data:</strong> Approximate location (with consent) for travel recommendations</li>
                  <li><strong>Cookies & Trackers:</strong> Essential, analytics, and preference cookies (see Cookie Policy)</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Special Categories of Data</h3>
                <p className="text-amber-700 text-sm">
                  We do not intentionally collect sensitive personal data (race, religion, health data) unless explicitly 
                  provided by you for travel accessibility needs (processed under GDPR Article 9(2)(a) - explicit consent).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Legal Basis for Processing (GDPR Art. 6)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Contract Performance (Art. 6(1)(b))</h4>
                <p className="text-sm text-gray-600">Processing necessary to provide our trip planning services, manage your account, and process payments.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Legitimate Interest (Art. 6(1)(f))</h4>
                <p className="text-sm text-gray-600">Analytics, security, fraud prevention, and service improvement based on our legitimate business interests.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Consent (Art. 6(1)(a))</h4>
                <p className="text-sm text-gray-600">Marketing communications, optional features, and non-essential cookies (you can withdraw anytime).</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Legal Obligation (Art. 6(1)(c))</h4>
                <p className="text-sm text-gray-600">Compliance with tax obligations, anti-money laundering, and other legal requirements.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-4">Service Provision & Core Functions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Trip Planning:</strong> Generate AI-powered itineraries, manage bookings, and coordinate travel logistics
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Account Management:</strong> Authenticate users, sync data across devices, and provide customer support
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Payment Processing:</strong> Handle transactions securely through certified third-party processors
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-4">AI & Personalization</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Machine Learning:</strong> Train algorithms on anonymized usage patterns to improve recommendations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Personalization:</strong> Customize suggestions based on your preferences and travel history
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-4">Legal & Security</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Fraud Prevention:</strong> Monitor transactions and account activity for suspicious behavior
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Compliance:</strong> Meet tax, financial reporting, and regulatory obligations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      <strong>Legal Claims:</strong> Defend against legal claims or cooperate with law enforcement when required
                    </span>
                  </li>
                </ul>
              </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing & Third Parties</h2>
            
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
              <p className="text-red-800 font-semibold">
                ⚠️ We do not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">4.1 Authorized Data Sharing</h3>
                <div className="grid gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Service Providers (Art. 28 GDPR)</h4>
                    <p className="text-sm text-gray-600 mb-2">Data processors operating under strict contractual obligations:</p>
                    <ul className="text-xs text-gray-600 list-disc list-inside ml-4 space-y-1">
                      <li>Cloud hosting (AWS, Google Cloud) - data encryption at rest and in transit</li>
                      <li>Payment processors (Stripe, PayPal) - PCI DSS compliant</li>
                      <li>Email services (SendGrid) - marketing and transactional emails</li>
                      <li>Analytics providers (Google Analytics, Mixpanel) - anonymized usage data</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Trip Collaborators</h4>
                    <p className="text-sm text-gray-600">Information you choose to share with fellow travelers (names, itineraries, expenses) based on your explicit sharing settings.</p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Legal Obligations</h4>
                    <p className="text-sm text-gray-600">When required by law, court order, or to protect rights, safety, and security (GDPR Art. 6(1)(c) and (f)).</p>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Business Transfers</h4>
                    <p className="text-sm text-gray-600">In case of merger, acquisition, or sale - you will be notified and can object to the transfer.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. International Data Transfers</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>Cross-Border Processing:</strong> Your data may be processed in the EU, UK, and US. 
                We ensure adequate protection through:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs bg-blue-200 px-2 py-1 rounded mt-0.5">EU</span>
                  <span>Primary data processing in EU with GDPR compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs bg-blue-200 px-2 py-1 rounded mt-0.5">UK</span>
                  <span>UK GDPR adequacy decision and Data Protection Act 2018</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono text-xs bg-blue-200 px-2 py-1 rounded mt-0.5">US</span>
                  <span>Standard Contractual Clauses (SCCs) and additional safeguards</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Active Accounts</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Account data: Duration of service use + 30 days</li>
                  <li>• Trip data: 7 years (travel insurance/tax purposes)</li>
                  <li>• Payment records: 7 years (legal/tax requirements)</li>
                  <li>• Communication logs: 3 years</li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Deleted Accounts</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Personal data: Deleted within 30 days</li>
                  <li>• Anonymized analytics: Retained indefinitely</li>
                  <li>• Legal holds: Extended as required by law</li>
                  <li>• Backup purging: 90 days maximum</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Privacy Rights</h2>
            
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-green-900 mb-2">🇪🇺 GDPR Rights (EU Residents) 🇬🇧 UK GDPR Rights (UK Residents)</h3>
              <p className="text-green-800 text-sm">
                Exercise your rights free of charge. We respond within 30 days (extendable to 60 days for complex requests).
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Art. 15</span>
                    Right of Access
                  </h4>
                  <p className="text-sm text-gray-600">
                    Request a copy of your personal data and information about how we process it.
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Art. 16</span>
                    Right to Rectification
                  </h4>
                  <p className="text-sm text-gray-600">
                    Correct inaccurate or incomplete personal information.
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Art. 17</span>
                    Right to Erasure (&quot;Right to be Forgotten&quot;)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Request deletion of your data (subject to legal retention requirements).
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Art. 18</span>
                    Right to Restriction
                  </h4>
                  <p className="text-sm text-gray-600">
                    Limit how we process your data while disputes are resolved.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Art. 20</span>
                    Right to Data Portability
                  </h4>
                  <p className="text-sm text-gray-600">
                    Receive your data in a structured, machine-readable format (JSON/CSV).
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Art. 21</span>
                    Right to Object
                  </h4>
                  <p className="text-sm text-gray-600">
                    Object to processing based on legitimate interests or for direct marketing.
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">Art. 22</span>
                    Automated Decision-Making
                  </h4>
                  <p className="text-sm text-gray-600">
                    Object to decisions based solely on automated processing (including AI profiling).
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
                    <span className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-xs">Art. 7</span>
                    Withdraw Consent
                  </h4>
                  <p className="text-sm text-gray-600">
                    Withdraw consent for processing at any time (doesn&apos;t affect prior lawful processing).
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-semibold text-yellow-900 mb-2">🇺🇸 California Residents (CCPA/CPRA Rights)</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
                <div>
                  <p><strong>Right to Know:</strong> What personal information we collect and how we use it</p>
                  <p><strong>Right to Delete:</strong> Request deletion of your personal information</p>
                </div>
                <div>
                  <p><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we don&apos;t sell data)</p>
                  <p><strong>Right to Non-Discrimination:</strong> Equal service regardless of exercising your rights</p>
                </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookie Policy</h2>
            <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-3">🍪 How We Use Cookies</h3>
              <p className="text-orange-800 mb-4">
                We use cookies and similar technologies to provide, secure, and improve our services. 
                You can manage your cookie preferences using our cookie banner or settings panel.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
                <div>
                  <p><strong>Essential Cookies:</strong> Required for site functionality, security, and authentication</p>
                  <p><strong>Analytics Cookies:</strong> Help us understand usage patterns (Google Analytics, anonymized)</p>
                </div>
                <div>
                  <p><strong>Marketing Cookies:</strong> Personalized advertising and remarketing campaigns</p>
                  <p><strong>Preference Cookies:</strong> Remember your settings and improve user experience</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-orange-100 rounded">
                <p className="text-xs text-orange-800">
                  <strong>Cookie Retention:</strong> Session cookies expire when you close your browser. 
                  Persistent cookies last up to 2 years unless deleted sooner.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Regulatory Compliance</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="w-6 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">EU</span>
                    </div>
                    GDPR Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Data Protection Officer: privacy@plantripr.ai</li>
                    <li>• Legal basis documented for all processing</li>
                    <li>• Privacy by design & default</li>
                    <li>• Regular data protection impact assessments</li>
                    <li>• EU representative: [To be appointed if needed]</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="w-6 h-4 bg-red-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">UK</span>
                    </div>
                    UK GDPR & DPA 2018
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• ICO registration: [To be registered]</li>
                    <li>• UK Data Protection Act 2018 compliance</li>
                    <li>• Post-Brexit data protection standards</li>
                    <li>• UK-specific right to object</li>
                    <li>• ICO complaints: ico.org.uk</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="w-6 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">US</span>
                    </div>
                    CCPA/CPRA Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• California Consumer Privacy Act rights</li>
                    <li>• "Do Not Sell My Personal Information"</li>
                    <li>• Authorized agent requests accepted</li>
                    <li>• 12-month disclosure obligations</li>
                    <li>• No discrimination for exercising rights</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Supervisory Authorities & Complaints</h2>
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <p className="text-red-800 mb-4">
                <strong>Right to Lodge a Complaint:</strong> You have the right to complain to your local data protection authority 
                if you believe we have not handled your personal data properly.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-red-700">
                <div>
                  <p><strong>🇪🇺 EU Residents:</strong> Contact your national data protection authority</p>
                  <p><strong>🇬🇧 UK Residents:</strong> Information Commissioner's Office (ICO)</p>
                  <p className="text-xs mt-1">Web: ico.org.uk | Phone: 0303 123 1113</p>
                </div>
                <div>
                  <p><strong>🇺🇸 California Residents:</strong> California Attorney General</p>
                  <p><strong>🇨🇦 Canadian Residents:</strong> Office of the Privacy Commissioner</p>
                  <p className="text-xs mt-1">We aim to resolve complaints directly first</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Updates to This Policy</h2>
            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>Material Changes:</strong> We may update this privacy policy from time to time. For material changes 
                that affect your rights, we will:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mb-4">
                <li>Notify you by email at least 30 days before changes take effect</li>
                <li>Display a prominent notice on our website</li>
                <li>Request renewed consent where legally required</li>
                <li>Provide clear summaries of what changed</li>
              </ul>
              <p className="text-gray-700">
                <strong>Non-Material Changes:</strong> Minor updates (like clarifications or formatting) will be posted 
                with an updated "Last Modified" date. Your continued use constitutes acceptance.
              </p>
            </div>
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
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              &copy; 2025 Plantrip&apos;r AI. Your privacy matters to us.
            </p>
            <div className="flex items-center gap-4">
              <CookieSettingsButton />
              <Link href="/contact" className="text-xs text-gray-600 hover:text-gray-900">
                Privacy Questions?
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}