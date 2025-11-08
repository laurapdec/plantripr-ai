"use client";

import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    // Redirect to My Trips page
    window.location.href = "/my-trips";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Redirecting...</h1>
        <p className="text-gray-600">Taking you to My Trips</p>
      </div>
    </div>
  );
}