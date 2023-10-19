"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/admin/components/ui/tabs";
import {
  Area,
  AreaChart,
  Tooltip,
  CartesianGrid,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { formatDateMonthDay } from "@/app/admin/lib/utils";

import { SalesData } from "@/app/admin/types/index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import { Icons } from "@/app/admin/components/icons";

export function OverviewCard({ salesData }: { salesData: SalesData[] }) {
  // Assuming you have your sales data in the 'salesData' array

  // Create an object to store the combined data
  const combinedData: { [date: string]: number } = {};

  // Iterate through the sales data and combine revenue for the same date
  salesData.forEach((item) => {
    const formattedDate = formatDateMonthDay(item.createdAt);
    if (combinedData[formattedDate]) {
      combinedData[formattedDate] += item.revenue;
    } else {
      combinedData[formattedDate] = item.revenue;
    }
  });

  // Ensure there are always 7 days of data, filling in any missing days with 0 revenue
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = formatDateMonthDay(date.toISOString());
    if (!combinedData[formattedDate]) {
      combinedData[formattedDate] = 0;
    }
  }

  // Sort the combined data by date and convert it to an array of objects
  const combinedDataArray = Object.keys(combinedData)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .map((date) => ({
      name: date,
      total: combinedData[date],
    }));

  console.log(combinedDataArray);

  return (
    <Tabs defaultValue="bar" className="w-full flex flex-col">
      <TabsList className="absolute right-6 top-6">
        <TabsTrigger value="bar">
          <Icons.barChart className="h-5 w-5" />
        </TabsTrigger>
        <TabsTrigger value="line">
          <Icons.lineChart className="h-5 w-5" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bar">
        <BarOverview data={combinedDataArray} />
      </TabsContent>
      <TabsContent value="line">
        <LineOverview data={combinedDataArray} />
      </TabsContent>
    </Tabs>
  );
}

export function LineOverview({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.3}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          interval={1}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          padding={{ top: 0 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          dataKey="total"
          //   className="fill-primary"
          stroke="hsl(var(--primary))"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarOverview({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />

        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-popover border border-border rounded-md p-3">
        <span className="h-4 w-4 rounded-full bg-primary"></span>
        <p className="label">{`Revenue: ${payload[0].value}`}</p>
        <p className="desc">{`${label}`}</p>
      </div>
    );
  }

  return null;
};
