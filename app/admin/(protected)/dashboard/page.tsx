"use client";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/app/admin/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/admin/components/ui/tabs";
import { OverviewCard } from "@/app/admin/(protected)/dashboard/components/overview";
import { CalendarDateRangePicker } from "@/app/admin/(protected)/dashboard/components/date-range-picker";
import { RecentSales } from "@/app/admin/(protected)/dashboard/components/recent-sales";
import { siteConfig } from "@/config/site";
import { SalesData } from "@/app/admin/types/index";
import { Icons } from "@/app/admin/components/icons";

type SalesDataFull = {
  totalRevenue: number;
  totalProfit: number;
  totalSales: number;
  data: SalesData[];
};

const fetchData = async (): Promise<SalesDataFull> => {
  const salesDataRes = await fetch(
    `${siteConfig.url}/api/admin/shopify/sales-data`,
    {
      cache: "no-cache",
    }
  );

  if (!salesDataRes.ok) {
    throw new Error("Failed to fetch sales data");
  }

  const data = (await salesDataRes.json()) as SalesData[];

  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalProfit = data.reduce((acc, curr) => acc + curr.profit, 0);
  const totalSales = data.length;

  const salesData = {
    totalRevenue,
    totalProfit,
    totalSales,
    data,
  };

  return salesData as SalesDataFull;
};

// Example usage:
fetchData()
  .then((result) => {
    console.log("Sales Data:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

export default function DashboardPage() {
  // const data = await getData();
  const [data, setData] = useState<SalesDataFull | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      try {
        const salesDataRes = await fetchData();
        setData(salesDataRes);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getData();
  }, []);

  const revenuePercentChange = data?.data
    ? calculatePercentChange(data.data, "revenue")
    : "--";
  const profitPercentChange = data?.data
    ? calculatePercentChange(data.data, "profit")
    : "--";
  const totalSalesPercentChange = data?.data
    ? calculateTotalSalesPercentChange(data.data)
    : "--";

  return (
    <>
      <div className=" flex-col flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Sales Dashboard
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${data?.totalRevenue ? data.totalRevenue : "--"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {typeof revenuePercentChange === "number"
                    ? (revenuePercentChange > 0 ? "+" : "") +
                      revenuePercentChange.toFixed(2) +
                      "% from last week"
                    : "--"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profit</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${data?.totalProfit ? data.totalProfit : "--"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {typeof profitPercentChange === "number"
                    ? (profitPercentChange > 0 ? "+" : "") +
                      profitPercentChange.toFixed(2) +
                      "% from last week"
                    : "--"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data?.totalSales ? data.totalSales : "--"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {typeof totalSalesPercentChange === "number"
                    ? (totalSalesPercentChange > 0 ? "+" : "") +
                      totalSalesPercentChange.toFixed(2) +
                      "% from last week"
                    : "--"}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 relative">
              <CardHeader>
                <CardTitle>Sales </CardTitle>
              </CardHeader>
              <CardContent className="pl-2 min-h-[200px] md:min-h-[400px]">
                {data?.data && <OverviewCard salesData={data.data} />}
                {loading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-4 md:col-span-3 relative">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  {data?.data ? getTodayTotalCount(data.data) : "--"} sales
                  today
                </CardDescription>
              </CardHeader>
              <CardContent className=" min-h-[200px] md:min-h-[400px]">
                {data?.data && <RecentSales data={data.data} />}
                {loading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function getWeeklyTotal(
  data: SalesData[],
  property: keyof SalesData,
  startDate: Date,
  endDate: Date
): number {
  const weeklyData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= endDate;
  });

  const weeklyTotal = weeklyData.reduce((acc, item) => {
    const propertyValue = item[property];

    // Check if the property is a number, then add it to the accumulator
    if (typeof propertyValue === "number") {
      return acc + propertyValue;
    }

    // Handle the case when the property is an object with firstName and lastName
    // You can decide how to calculate the total in this case.
    // For example, concatenate the first names and last names and count them.
    if (typeof propertyValue === "object") {
      // Example: Concatenate first names and last names and count characters
      return acc + (propertyValue.firstName + propertyValue.lastName).length;
    }

    // Handle other cases or return the accumulator as is
    return acc;
  }, 0);

  return weeklyTotal;
}

function calculatePercentChange(
  data: SalesData[],
  property: keyof SalesData
): number {
  const today = new Date();

  // Calculate the start and end of the previous week
  const previousWeekStart = new Date(today);
  previousWeekStart.setDate(today.getDate() - (today.getDay() + 7));
  previousWeekStart.setHours(0, 0, 0, 0);

  const previousWeekEnd = new Date(today);
  previousWeekEnd.setDate(today.getDate() - (today.getDay() + 1));
  previousWeekEnd.setHours(23, 59, 59, 999);

  // Calculate the start and end of the current week
  const currentWeekStart = new Date(today);
  currentWeekStart.setDate(today.getDate() - today.getDay());
  currentWeekStart.setHours(0, 0, 0, 0);

  const currentWeekEnd = new Date(today);
  currentWeekEnd.setDate(today.getDate() + (6 - today.getDay()));
  currentWeekEnd.setHours(23, 59, 59, 999);

  const previousWeekTotal = getWeeklyTotal(
    data,
    property,
    previousWeekStart,
    previousWeekEnd
  );
  const currentWeekTotal = getWeeklyTotal(
    data,
    property,
    currentWeekStart,
    currentWeekEnd
  );

  if (previousWeekTotal === 0) {
    return currentWeekTotal === 0 ? 0 : 100; // Avoid division by zero
  }

  const percentChange =
    ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;

  return percentChange as number;
}

function getWeeklyDataCount(
  data: SalesData[],
  startDate: Date,
  endDate: Date
): number {
  const weeklyData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= startDate && itemDate <= endDate;
  });

  return weeklyData.length;
}

function calculateTotalSalesPercentChange(data: SalesData[]): number {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - today.getDay());
  startDate.setHours(0, 0, 0, 0);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (6 - today.getDay()));
  endDate.setHours(23, 59, 59, 999);

  const previousWeekStart = new Date(startDate);
  previousWeekStart.setDate(startDate.getDate() - 7);

  const currentWeekTotal = getWeeklyDataCount(data, startDate, endDate);
  const previousWeekTotal = getWeeklyDataCount(
    data,
    previousWeekStart,
    startDate
  );

  if (previousWeekTotal === 0) {
    return currentWeekTotal === 0 ? 0 : 100; // Avoid division by zero
  }

  const percentChange =
    ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100;

  return percentChange;
}

function getTodayTotalCount(data: SalesData[]): number {
  const today = new Date();
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const todayData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    return itemDate >= todayStart && itemDate <= todayEnd;
  });

  return todayData.length;
}
