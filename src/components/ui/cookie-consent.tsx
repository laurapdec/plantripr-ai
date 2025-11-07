"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { 
  Cookie, 
  Settings, 
  Shield, 
  BarChart3, 
  Heart, 
  ExternalLink,
  X 
} from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true, // Always required
  analytics: false,
  marketing: false,
  preferences: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem("plantrip-cookie-consent");
    const savedPreferences = localStorage.getItem("plantrip-cookie-preferences");
    
    if (consent) {
      setHasConsented(true);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    } else {
      // Show banner after a short delay
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (newPreferences: CookiePreferences) => {
    const finalPreferences = { ...newPreferences, essential: true };
    setPreferences(finalPreferences);
    localStorage.setItem("plantrip-cookie-preferences", JSON.stringify(finalPreferences));
    localStorage.setItem("plantrip-cookie-consent", new Date().toISOString());
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);
    
    // Here you would typically initialize analytics/marketing scripts based on preferences
    if (finalPreferences.analytics) {
      // Initialize Google Analytics, Mixpanel, etc.
      console.log("Analytics cookies enabled");
    }
    if (finalPreferences.marketing) {
      // Initialize marketing pixels, remarketing, etc.
      console.log("Marketing cookies enabled");
    }
  };

  const acceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const acceptEssential = () => {
    savePreferences(defaultPreferences);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: key === "essential" ? true : value, // Essential always true
    }));
  };

  if (hasConsented && !showSettings) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-start gap-4">
              <Cookie className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">We use cookies to improve your experience</h3>
                <p className="text-sm text-gray-600 mb-4">
                  We use essential cookies to make our site work. We'd also like to set analytics and marketing 
                  cookies to help us improve and personalize your experience. You can manage your preferences at any time.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="bg-emerald-500 hover:bg-emerald-400 text-white">
                    Accept All
                  </Button>
                  <Button variant="outline" onClick={acceptEssential}>
                    Essential Only
                  </Button>
                  <Sheet open={showSettings} onOpenChange={setShowSettings}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Customize
                      </Button>
                    </SheetTrigger>
                    <CookieSettingsSheet 
                      preferences={preferences}
                      onUpdatePreference={updatePreference}
                      onSave={() => savePreferences(preferences)}
                      onClose={() => setShowSettings(false)}
                    />
                  </Sheet>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowBanner(false)}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Settings Management (when reopened) */}
      {showSettings && hasConsented && (
        <Sheet open={showSettings} onOpenChange={setShowSettings}>
          <CookieSettingsSheet 
            preferences={preferences}
            onUpdatePreference={updatePreference}
            onSave={() => savePreferences(preferences)}
            onClose={() => setShowSettings(false)}
          />
        </Sheet>
      )}
    </>
  );
}

interface CookieSettingsSheetProps {
  preferences: CookiePreferences;
  onUpdatePreference: (key: keyof CookiePreferences, value: boolean) => void;
  onSave: () => void;
  onClose: () => void;
}

function CookieSettingsSheet({ preferences, onUpdatePreference, onSave, onClose }: CookieSettingsSheetProps) {
  return (
    <SheetContent className="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <Cookie className="h-5 w-5 text-emerald-500" />
          Cookie Settings
        </SheetTitle>
      </SheetHeader>
      
      <div className="space-y-6 mt-6">
        <div className="text-sm text-gray-600">
          <p className="mb-4">
            Manage your cookie preferences. Essential cookies are required for the site to function 
            and cannot be disabled. You can change these settings at any time.
          </p>
          
          <div className="p-3 bg-blue-50 rounded-lg mb-4">
            <p className="text-blue-800 text-xs">
              <strong>GDPR & Privacy Compliance:</strong> We respect your privacy choices and will only 
              use the cookies you approve. See our <a href="/privacy" className="underline">Privacy Policy</a> for details.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Essential Cookies */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  Essential Cookies
                </div>
                <Switch checked={true} disabled />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Required for the website to function. These include authentication, security, and basic functionality.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Examples:</strong> Login sessions, security tokens, form submissions
              </p>
            </CardContent>
          </Card>

          {/* Analytics Cookies */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-blue-500" />
                  Analytics Cookies
                </div>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => onUpdatePreference("analytics", checked)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Help us understand how you use our site so we can improve performance and user experience.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Providers:</strong> Google Analytics, Mixpanel (anonymized data)
              </p>
            </CardContent>
          </Card>

          {/* Marketing Cookies */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  Marketing Cookies
                </div>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => onUpdatePreference("marketing", checked)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Used to show you personalized ads and measure advertising effectiveness across platforms.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Providers:</strong> Google Ads, Facebook Pixel, LinkedIn Insight Tag
              </p>
            </CardContent>
          </Card>

          {/* Preferences Cookies */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-green-500" />
                  Preference Cookies
                </div>
                <Switch 
                  checked={preferences.preferences}
                  onCheckedChange={(checked) => onUpdatePreference("preferences", checked)}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600">
                Remember your choices and preferences to provide a more personalized experience.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                <strong>Examples:</strong> Language settings, theme preferences, notification settings
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={onSave} className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white">
            Save Preferences
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>

        <div className="text-center pt-4">
          <a 
            href="/privacy" 
            className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center justify-center gap-1"
          >
            View Full Privacy Policy
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </SheetContent>
  );
}

// Component to trigger cookie settings from anywhere in the app
export function CookieSettingsButton() {
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const savedPreferences = localStorage.getItem("plantrip-cookie-preferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: key === "essential" ? true : value,
    }));
  };

  const savePreferences = (newPreferences: CookiePreferences) => {
    const finalPreferences = { ...newPreferences, essential: true };
    setPreferences(finalPreferences);
    localStorage.setItem("plantrip-cookie-preferences", JSON.stringify(finalPreferences));
    setShowSettings(false);
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowSettings(true)}
        className="text-xs text-gray-600 hover:text-gray-900"
      >
        <Cookie className="h-3 w-3 mr-1" />
        Cookie Settings
      </Button>

      <Sheet open={showSettings} onOpenChange={setShowSettings}>
        <CookieSettingsSheet 
          preferences={preferences}
          onUpdatePreference={updatePreference}
          onSave={() => savePreferences(preferences)}
          onClose={() => setShowSettings(false)}
        />
      </Sheet>
    </>
  );
}