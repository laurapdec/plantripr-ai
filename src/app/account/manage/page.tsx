"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CookieSettingsButton } from "@/components/ui/cookie-consent";
import { 
  Plane,
  User,
  Shield,
  Download,
  Trash2,
  Eye,
  EyeOff,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Settings,
  Bell,
  Globe,
  Lock,
  Mail,
  Smartphone,
  CreditCard,
  FileText,
  Calendar,
  ExternalLink,
  Database,
} from "lucide-react";

export default function ManageAccountPage() {
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "2024-03-15",
    lastLogin: "2025-11-07T10:30:00Z",
    tripCount: 12,
    dataSize: "2.4 MB"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user.name,
    email: user.email,
    bio: "Travel enthusiast exploring the world one trip at a time.",
    timezone: "America/New_York",
    language: "English"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: false,
    tripUpdates: true,
    expenseAlerts: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: false,
    shareTrips: true,
    analytics: true
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState(0);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [dataExportStatus, setDataExportStatus] = useState<"idle" | "preparing" | "ready" | "downloaded">("idle");
  const [exportProgress, setExportProgress] = useState(0);

  const handleSaveProfile = () => {
    // Here you would save to your backend
    console.log("Saving profile:", editedProfile);
    setIsEditing(false);
  };

  const handleExportData = () => {
    setDataExportStatus("preparing");
    setExportProgress(0);
    
    // Simulate data preparation
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDataExportStatus("ready");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownloadData = () => {
    // Simulate download
    const data = {
      profile: editedProfile,
      trips: [],
      expenses: [],
      preferences: { notifications, privacy },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plantripr-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    setDataExportStatus("downloaded");
  };

  const handleDeleteAccount = () => {
    if (deleteStep === 0) {
      setDeleteStep(1);
    } else if (deleteStep === 1 && deleteConfirmText === "DELETE MY ACCOUNT") {
      // Here you would actually delete the account
      console.log("Account deletion initiated");
      alert("Account deletion request submitted. You will receive a confirmation email.");
      setShowDeleteConfirm(false);
      setDeleteStep(0);
      setDeleteConfirmText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/90 border-b border-gray-200">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
          <Link href="/trips" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-500">
              <Plane className="h-4 w-4 text-white" />
            </span>
            <div className="font-semibold tracking-tight text-xl">
              Plantrip&apos;r
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/trips" className="text-gray-600 hover:text-gray-900">Trips</Link>
            <Link href="/account/manage" className="text-gray-900 font-medium">Account</Link>
            <Link href="/settings" className="text-gray-600 hover:text-gray-900">Settings</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900">Support</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/trips">
              <Button variant="ghost">Back to Trips</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-emerald-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Account Management</h1>
              <p className="text-gray-600">Manage your profile, privacy settings, and data</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Profile Information */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-emerald-500" />
                  Profile Information
                </CardTitle>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-gray-900">{user.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <Input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <p className="text-gray-900">{user.email}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <Textarea
                        rows={3}
                        value={editedProfile.bio}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <Input
                          value={editedProfile.timezone}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, timezone: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <Input
                          value={editedProfile.language}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, language: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={handleSaveProfile} className="bg-emerald-500 hover:bg-emerald-400">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </>
                )}

                {!isEditing && (
                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-600">Member Since</div>
                      <div className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Trips</div>
                      <div className="font-medium">{user.tripCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Last Login</div>
                      <div className="font-medium">{new Date(user.lastLogin).toLocaleDateString()}</div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Public Profile</div>
                  <div className="text-sm text-gray-600">Allow others to find and view your profile</div>
                </div>
                <Switch
                  checked={privacy.profilePublic}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, profilePublic: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Trip Sharing</div>
                  <div className="text-sm text-gray-600">Allow sharing trips with other users</div>
                </div>
                <Switch
                  checked={privacy.shareTrips}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, shareTrips: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Usage Analytics</div>
                  <div className="text-sm text-gray-600">Help improve Plantrip&apos;r with anonymous usage data</div>
                </div>
                <Switch
                  checked={privacy.analytics}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, analytics: checked }))}
                />
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Cookie Preferences</h4>
                <CookieSettingsButton />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium">Email Notifications</div>
                    <div className="text-sm text-gray-600">Receive updates via email</div>
                  </div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium">Push Notifications</div>
                    <div className="text-sm text-gray-600">Receive push notifications on your device</div>
                  </div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium">Trip Updates</div>
                    <div className="text-sm text-gray-600">Updates about your trips and bookings</div>
                  </div>
                </div>
                <Switch
                  checked={notifications.tripUpdates}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, tripUpdates: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  <div>
                    <div className="font-medium">Expense Alerts</div>
                    <div className="text-sm text-gray-600">Notifications about expense splitting and payments</div>
                  </div>
                </div>
                <Switch
                  checked={notifications.expenseAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, expenseAlerts: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-emerald-500" />
                Your Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">GDPR Rights</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Under GDPR, UK GDPR, and CCPA, you have rights regarding your personal data.
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-xs text-blue-700">
                  <div>• Right to access your data</div>
                  <div>• Right to rectify inaccurate data</div>
                  <div>• Right to erase your data</div>
                  <div>• Right to data portability</div>
                </div>
              </div>

              {/* Data Export */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium mb-2">Export Your Data</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Download all your personal data in a machine-readable format (JSON). 
                  Includes trips, expenses, preferences, and account information.
                </p>
                
                {dataExportStatus === "idle" && (
                  <Button onClick={handleExportData} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Prepare Data Export
                  </Button>
                )}

                {dataExportStatus === "preparing" && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Preparing your data...</span>
                    </div>
                    <Progress value={exportProgress} className="h-2" />
                  </div>
                )}

                {dataExportStatus === "ready" && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Your data export is ready!</span>
                    </div>
                    <Button onClick={handleDownloadData} className="bg-emerald-500 hover:bg-emerald-400">
                      <Download className="h-4 w-4 mr-2" />
                      Download Data ({user.dataSize})
                    </Button>
                  </div>
                )}

                {dataExportStatus === "downloaded" && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Data downloaded successfully!</span>
                  </div>
                )}
              </div>

              {/* Account Deletion */}
              <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
                <p className="text-sm text-red-800 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                
                <Button 
                  variant="destructive" 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowDeleteConfirm(false)}>
            <div className="bg-white p-6 rounded-2xl max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="text-center mb-6">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Account</h3>
                {deleteStep === 0 ? (
                  <div>
                    <p className="text-gray-600 mb-4">
                      This will permanently delete your account and all data including:
                    </p>
                    <ul className="text-sm text-gray-600 text-left space-y-1 mb-6">
                      <li>• All trip plans and itineraries</li>
                      <li>• Expense records and sharing data</li>
                      <li>• Profile information and preferences</li>
                      <li>• Collaboration history with other users</li>
                    </ul>
                    <p className="text-sm text-red-600 font-medium">
                      This action cannot be undone.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-4">
                      Type <strong>DELETE MY ACCOUNT</strong> to confirm deletion:
                    </p>
                    <Input
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      placeholder="DELETE MY ACCOUNT"
                      className="mb-4"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteStep(0);
                    setDeleteConfirmText("");
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={deleteStep === 1 && deleteConfirmText !== "DELETE MY ACCOUNT"}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  {deleteStep === 0 ? "Continue" : "Delete Forever"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 mt-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              &copy; 2025 Plantrip&apos;r. Your privacy and data rights are protected.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                Privacy Policy
                <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                Support
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}