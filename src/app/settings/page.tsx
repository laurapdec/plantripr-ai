"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CurrencySelect, Currency } from "@/components/ui/currency-select";
import { 
  Settings,
  DollarSign,
  Map,
  Users,
  Bookmark,
  Globe,
  LinkIcon,
  Save,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  CreditCard,
  Smartphone,
  Shield,
} from "lucide-react";

type MapStyle = "roadmap" | "satellite" | "hybrid" | "terrain";
type TripTemplate = "weekend-city" | "beach-week" | "adventure-hiking" | "business-trip" | "family-vacation" | "backpacking" | "luxury-travel" | "custom";

interface UserSettings {
  // Currency & Financial
  defaultCurrency: Currency;
  autoConvertCurrency: boolean;
  expenseCategories: string[];
  budgetAlerts: boolean;
  
  // Trip Planning
  defaultTripTemplate: TripTemplate;
  autoSuggestActivities: boolean;
  preferredTripLength: number;
  planningHorizonDays: number;
  
  // Maps & Navigation
  mapStyle: MapStyle;
  showTraffic: boolean;
  showPublicTransit: boolean;
  useMetricUnits: boolean;
  
  // Collaboration
  defaultTripVisibility: "private" | "friends" | "public";
  allowGuestInvites: boolean;
  autoAcceptFriendTrips: boolean;
  
  // Integrations
  connectedServices: {
    googleCalendar: boolean;
    spotify: boolean;
  };
  autoSyncCalendar: boolean;
  bookingPreferences: {
    preferredChains: string[];
    roomPreferences: string[];
    loyaltyPrograms: string[];
    allowsPets: boolean;
    prefersTerrace: boolean;
  };
}

const tripTemplates = [
  { value: "weekend-city", label: "Weekend City Break", description: "2-3 days exploring urban destinations" },
  { value: "beach-week", label: "Beach Vacation", description: "5-7 days of relaxation by the sea" },
  { value: "adventure-hiking", label: "Adventure & Hiking", description: "Active trips with outdoor activities" },
  { value: "business-trip", label: "Business Travel", description: "Efficient planning for work trips" },
  { value: "family-vacation", label: "Family Vacation", description: "Family-friendly activities and accommodations" },
  { value: "backpacking", label: "Backpacking Adventure", description: "Budget-conscious long-term travel" },
  { value: "luxury-travel", label: "Luxury Experience", description: "Premium accommodations and experiences" },
  { value: "custom", label: "Custom Template", description: "Create your own planning template" },
];

const mapStyleOptions = [
  { value: "roadmap", label: "Roadmap" },
  { value: "satellite", label: "Satellite" },
  { value: "hybrid", label: "Hybrid" },
  { value: "terrain", label: "Terrain" },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    defaultCurrency: "USD",
    autoConvertCurrency: false,
    expenseCategories: ["Accommodation", "Food", "Transportation", "Activities", "Shopping"],
    budgetAlerts: true,
    
    defaultTripTemplate: "custom",
    autoSuggestActivities: true,
    preferredTripLength: 7,
    planningHorizonDays: 30,
    
    mapStyle: "roadmap",
    showTraffic: true,
    showPublicTransit: true,
    useMetricUnits: true,
    
    defaultTripVisibility: "friends",
    allowGuestInvites: true,
    autoAcceptFriendTrips: false,
    
    connectedServices: {
      googleCalendar: false,
      spotify: false,
    },
    autoSyncCalendar: false,
    bookingPreferences: {
      preferredChains: [],
      roomPreferences: [],
      loyaltyPrograms: [],
      allowsPets: false,
      prefersTerrace: false,
    },
  });

  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const addCategory = () => {
    if (newCategory.trim() && !settings.expenseCategories.includes(newCategory.trim())) {
      updateSetting("expenseCategories", [...settings.expenseCategories, newCategory.trim()]);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  const removeCategory = (categoryToRemove: string) => {
    updateSetting("expenseCategories", settings.expenseCategories.filter(cat => cat !== categoryToRemove));
  };

  const updateConnectedService = (service: keyof UserSettings["connectedServices"], enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      connectedServices: {
        ...prev.connectedServices,
        [service]: enabled
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically save to your backend
      localStorage.setItem("plantrip-user-settings", JSON.stringify(settings));
      
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/trips" className="text-emerald-600 hover:text-emerald-500">
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="h-8 w-8 text-emerald-500" />
                Settings & Preferences
              </h1>
              <p className="text-gray-600 mt-1">Customize your travel planning experience</p>
            </div>
          </div>
          
          {saveStatus === "success" && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
              <CheckCircle className="h-5 w-5" />
              Settings saved!
            </div>
          )}
          
          {saveStatus === "error" && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              Failed to save settings
            </div>
          )}
        </div>

        {/* Currency & Financial Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              Currency & Financial Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Default Currency</Label>
              <CurrencySelect
                value={settings.defaultCurrency}
                onValueChange={(value: Currency) => updateSetting("defaultCurrency", value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Auto-convert currencies</Label>
                <p className="text-xs text-gray-600">Automatically convert expenses to your default currency</p>
              </div>
              <Switch 
                checked={settings.autoConvertCurrency}
                onCheckedChange={(checked) => updateSetting("autoConvertCurrency", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Budget alerts</Label>
                <p className="text-xs text-gray-600">Get notified when approaching budget limits</p>
              </div>
              <Switch 
                checked={settings.budgetAlerts}
                onCheckedChange={(checked) => updateSetting("budgetAlerts", checked)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Default Expense Categories</Label>
              <div className="flex flex-wrap gap-2">
                {settings.expenseCategories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="text-xs group relative">
                    {category}
                    <button
                      onClick={() => removeCategory(category)}
                      className="ml-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {isAddingCategory ? (
                  <div className="flex items-center gap-1">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addCategory();
                        }
                        if (e.key === 'Escape') {
                          setIsAddingCategory(false);
                          setNewCategory("");
                        }
                      }}
                      placeholder="Category name"
                      className="h-6 text-xs w-32"
                      autoFocus
                    />
                    <Button
                      onClick={addCategory}
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs px-2"
                    >
                      Add
                    </Button>
                    <Button
                      onClick={() => {
                        setIsAddingCategory(false);
                        setNewCategory("");
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-6 text-xs px-1"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setIsAddingCategory(true)}
                    variant="outline"
                    size="sm"
                    className="h-6 text-xs"
                  >
                    + Add Category
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trip Planning Templates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-emerald-500" />
              Trip Planning Templates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Default Trip Template</Label>
              <Select 
                value={settings.defaultTripTemplate} 
                onValueChange={(value: TripTemplate) => updateSetting("defaultTripTemplate", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tripTemplates.map((template) => (
                    <SelectItem key={template.value} value={template.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{template.label}</span>
                        <span className="text-xs text-gray-600">{template.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">Preferred Trip Length (days)</Label>
                <Input
                  type="number"
                  value={settings.preferredTripLength}
                  onChange={(e) => updateSetting("preferredTripLength", parseInt(e.target.value) || 5)}
                  className="w-full"
                  min="1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">Planning Horizon (days ahead)</Label>
                <Input
                  type="number"
                  value={settings.planningHorizonDays}
                  onChange={(e) => updateSetting("planningHorizonDays", parseInt(e.target.value) || 30)}
                  className="w-full"
                  min="1"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Auto-suggest activities</Label>
                <p className="text-xs text-gray-600">Automatically recommend activities based on destination</p>
              </div>
              <Switch 
                checked={settings.autoSuggestActivities}
                onCheckedChange={(checked) => updateSetting("autoSuggestActivities", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Maps & Navigation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-emerald-500" />
              Maps & Navigation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Default Map Style</Label>
              <Select 
                value={settings.mapStyle} 
                onValueChange={(value: MapStyle) => updateSetting("mapStyle", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mapStyleOptions.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Show traffic</Label>
                  <p className="text-xs text-gray-600">Display real-time traffic information</p>
                </div>
                <Switch 
                  checked={settings.showTraffic}
                  onCheckedChange={(checked) => updateSetting("showTraffic", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Public transit</Label>
                  <p className="text-xs text-gray-600">Show public transportation options</p>
                </div>
                <Switch 
                  checked={settings.showPublicTransit}
                  onCheckedChange={(checked) => updateSetting("showPublicTransit", checked)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Use metric units</Label>
                <p className="text-xs text-gray-600">Display distances in kilometers instead of miles</p>
              </div>
              <Switch 
                checked={settings.useMetricUnits}
                onCheckedChange={(checked) => updateSetting("useMetricUnits", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Collaboration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-emerald-500" />
              Collaboration & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Default Trip Visibility</Label>
              <Select 
                value={settings.defaultTripVisibility} 
                onValueChange={(value: "private" | "friends" | "public") => updateSetting("defaultTripVisibility", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">
                    <div className="flex flex-col">
                      <span className="font-medium">Private</span>
                      <span className="text-xs text-gray-600">Only you can see your trips</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="friends">
                    <div className="flex flex-col">
                      <span className="font-medium">Friends</span>
                      <span className="text-xs text-gray-600">Friends can see and join your trips</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="public">
                    <div className="flex flex-col">
                      <span className="font-medium">Public</span>
                      <span className="text-xs text-gray-600">Anyone can discover your trips</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Allow guest invites</Label>
                  <p className="text-xs text-gray-600">Let trip members invite others who aren't on the platform</p>
                </div>
                <Switch 
                  checked={settings.allowGuestInvites}
                  onCheckedChange={(checked) => updateSetting("allowGuestInvites", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto-accept friend invitations</Label>
                  <p className="text-xs text-gray-600">Automatically join trips when friends invite you</p>
                </div>
                <Switch 
                  checked={settings.autoAcceptFriendTrips}
                  onCheckedChange={(checked) => updateSetting("autoAcceptFriendTrips", checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connected Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-emerald-500" />
              Connected Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Google Calendar</Label>
                  <p className="text-xs text-gray-600">Sync trips with your calendar</p>
                </div>
                <Switch 
                  checked={settings.connectedServices.googleCalendar}
                  onCheckedChange={(checked) => updateConnectedService("googleCalendar", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Spotify</Label>
                  <p className="text-xs text-gray-600">Create collaborative playlists for your trips</p>
                </div>
                <Switch 
                  checked={settings.connectedServices.spotify}
                  onCheckedChange={(checked) => updateConnectedService("spotify", checked)}
                />
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Auto-sync calendar</Label>
                <p className="text-xs text-gray-600">Automatically add trip events to your calendar</p>
              </div>
              <Switch 
                checked={settings.autoSyncCalendar}
                onCheckedChange={(checked) => updateSetting("autoSyncCalendar", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Booking Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-500" />
              Booking Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Pet-friendly accommodations</Label>
                  <p className="text-xs text-gray-600">Prefer places that allow pets</p>
                </div>
                <Switch 
                  checked={settings.bookingPreferences.allowsPets}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    bookingPreferences: {
                      ...prev.bookingPreferences,
                      allowsPets: checked
                    }
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Terrace/Balcony</Label>
                  <p className="text-xs text-gray-600">Prefer rooms with outdoor space</p>
                </div>
                <Switch 
                  checked={settings.bookingPreferences.prefersTerrace}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    bookingPreferences: {
                      ...prev.bookingPreferences,
                      prefersTerrace: checked
                    }
                  }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-white"
          >
            {isSaving ? "Saving..." : "Save All Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}