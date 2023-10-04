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
import { CalendarDateRangePicker } from "@/app/admin/(protected)/analytics/components/date-range-picker";
import { MainNav } from "@/app/admin/(protected)/analytics/components/main-nav";
import { Overview } from "@/app/admin/(protected)/analytics/components/overview";
import AnalyticsFeed from "@/app/admin/(protected)/analytics/components/analytics-feed";
import { Search } from "@/app/admin/(protected)/analytics/components/search";
import TeamSwitcher from "@/app/admin/(protected)/analytics/components/team-switcher";
import { UserNav } from "@/app/admin/(protected)/analytics/components/user-nav";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

const getData = async () => {
  // fetch data from '/api/admin/klaviyo'
  const res = await fetch(`${siteConfig.url}/api/admin/klaviyo/klaviyo-lists`, {
    cache: "no-cache",
  });
  const data = await res.json();

  const res2 = await fetch(
    `${siteConfig.url}/api/admin/klaviyo/klaviyo-metrics`,
    {
      cache: "no-cache",
    }
  );

  const data2 = await res2.json();

  const res3 = await fetch(
    `${siteConfig.url}/api/admin/klaviyo/klaviyo-lists-recent`,
    {
      cache: "no-cache",
    }
  );

  const data3 = await res3.json();

  return {
    listData: data,
    listMetrics: data2,
    percentChange: calculatePercentDifferenceString(data2),
    recent: data3,
  };
};

export default async function DashboardPage() {
  const Data = await getData();

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {Data.listData.name || "--"}
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Data.listData.profile_count || "--"}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Data.percentChange || "--"}
                </p>
              </CardContent>
            </Card>

            <Card className="hover:border-primary cursor-not-allowed">
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
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">
                  -- from last month
                </p>
              </CardContent>
            </Card>

            {/* <Card>
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
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card> */}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview rawData={Data.listMetrics} />
              </CardContent>
            </Card>
            {Data.recent && <AnalyticsFeed data={Data.recent.profiles} />}
          </div>
          {/* </TabsContent>
          </Tabs> */}
        </div>
      </div>
    </>
  );
}

interface Data {
  dates: string[];
  values: number[];
}

function calculatePercentDifferenceString(data: Data): string {
  // Calculate the sum of values for this week
  const thisWeekSum = data.values
    .slice(-7)
    .reduce((acc, value) => acc + value, 0);

  // Calculate the sum of values for last week
  const lastWeekSum = data.values
    .slice(-14, -7)
    .reduce((acc, value) => acc + value, 0);

  // Calculate the percentage difference
  const percentDifference = ((thisWeekSum - lastWeekSum) / lastWeekSum) * 100;

  // Generate the result string
  const resultString =
    percentDifference > 0
      ? `+${percentDifference.toFixed(2)}% from last week`
      : `${percentDifference.toFixed(2)}% from last week`;

  return resultString;
}
