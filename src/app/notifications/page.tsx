"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { 
  Plane,
  Bell,
  Settings,
  Check,
  Trash2,
  Filter,
  ArrowLeft,
  Calendar,
  Users,
  Wallet,
  Sparkles,
  Shield,
  User,
  LogOut,
} from "lucide-react";

interface Notification {
  id: string;
  type: 'trip' | 'expense' | 'ai' | 'security' | 'social';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "trip",
    title: "Trip reminder",
    message: "Your Andes Mountain Adventure starts in 3 days",
    time: "2 hours ago",
    isRead: false,
    priority: "high"
  },
  {
    id: "2",
    type: "ai",
    title: "New activity suggestion",
    message: "AI found 3 new activities for your Japan trip",
    time: "5 hours ago",
    isRead: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "expense",
    title: "Expense split update",
    message: "David paid $240 for hotel booking",
    time: "1 day ago",
    isRead: true,
    priority: "medium"
  },
  {
    id: "4",
    type: "social",
    title: "New trip invite",
    message: "Nina invited you to join 'European Summer' trip",
    time: "2 days ago",
    isRead: false,
    priority: "high"
  },
  {
    id: "5",
    type: "security",
    title: "Account security",
    message: "New device login detected from iPhone",
    time: "3 days ago",
    isRead: true,
    priority: "medium"
  },
  {
    id: "6",
    type: "ai",
    title: "Price drop alert",
    message: "Flight prices to Japan dropped by 25%",
    time: "1 week ago",
    isRead: true,
    priority: "high"
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'trip' | 'expense' | 'ai'>('all');

  const handleLogout = () => {
    console.log("Logging out...");
    window.location.href = "/login";
  };

  const handleManageAccount = () => {
    window.location.href = "/account/manage";
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trip': return Calendar;
      case 'expense': return Wallet;
      case 'ai': return Sparkles;
      case 'social': return Users;
      case 'security': return Shield;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    if (priority === 'high') return 'text-red-500';
    if (type === 'ai') return 'text-emerald-500';
    if (type === 'trip') return 'text-blue-500';
    if (type === 'expense') return 'text-purple-500';
    return 'text-gray-500';
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.isRead;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
              <Link href="/trips" className="text-gray-600 hover:text-gray-900">Trips</Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filteredNotifications.slice(0, 3).map((notif) => (
                  <DropdownMenuItem key={notif.id}>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{notif.title}</p>
                      <p className="text-xs text-gray-500">{notif.message}</p>
                      <p className="text-xs text-gray-400">{notif.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/trips" className="text-emerald-600 hover:text-emerald-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-3 bg-red-500">
                    {unreadCount} new
                  </Badge>
                )}
              </h1>
              <p className="text-gray-600">Stay updated on your trips and activities</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark all read
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  All notifications
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('unread')}>
                  Unread only
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilter('trip')}>
                  Trip updates
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('expense')}>
                  Expense alerts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('ai')}>
                  AI suggestions
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            const iconColor = getNotificationColor(notification.type, notification.priority);
            
            return (
              <Card 
                key={notification.id} 
                className={`transition-all hover:shadow-md ${!notification.isRead ? 'border-l-4 border-l-emerald-500 bg-emerald-50/50' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${iconColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${!notification.isRead ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          )}
                          {notification.priority === 'high' && (
                            <Badge variant="destructive" className="text-xs">High</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!notification.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {filteredNotifications.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-500">
                  {filter === 'unread' ? 'All caught up! No unread notifications.' : 'You\'ll see notifications here when you have updates.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}