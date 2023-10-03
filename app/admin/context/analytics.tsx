"use client";
import React, { useContext, useState, useEffect, createContext } from "react";

interface AnalyticsContextType {
  analyticsData: any;
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null);

export function useAnalytics() {
  return useContext(AnalyticsContext);
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      fetch("/api/admin/get-analytics").then((res) => {
        setAnalyticsData(res);
      });
    };
    fetchAnalyticsData();
  }, []);

  const value = { analyticsData };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}
