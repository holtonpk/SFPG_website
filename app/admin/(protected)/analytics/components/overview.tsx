"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { formatDateShort } from "@/app/admin/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-popover border border-border rounded-md p-3">
        <span className="h-4 w-4 rounded-full bg-primary"></span>
        <p className="label">{`Visitors : ${payload[0].value}`}</p>

        <p className="desc">{`${label}`}</p>
      </div>
    );
  }

  return null;
};

export function Overview({
  siteTrafficByDateData,
}: {
  siteTrafficByDateData: { date: string; value: string }[];
}) {
  const sortedData = siteTrafficByDateData.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  const data = sortedData.map((item) => ({
    name: formatDate(item.date),
    total: item.value,
  }));
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

function formatDateYYYYMMDD(inputDate: string): string {
  if (inputDate.length !== 8) {
    throw new Error(
      "Invalid input date format. It should be in YYYYMMDD format."
    );
  }

  const year = inputDate.slice(0, 4);
  const month = inputDate.slice(4, 6);
  const day = inputDate.slice(6, 8);

  return `${day}/${month}`;
}

function dateYYYYMMDDToTimestamp(inputDate: string): number {
  if (inputDate.length !== 8) {
    throw new Error(
      "Invalid input date format. It should be in YYYYMMDD format."
    );
  }

  const year = parseInt(inputDate.slice(0, 4), 10);
  const month = parseInt(inputDate.slice(4, 6), 10) - 1; // Months are 0-indexed
  const day = parseInt(inputDate.slice(6, 8), 10);

  const date = new Date(year, month, day);
  const timestamp = date.getTime() / 1000; // Convert to Unix timestamp (seconds since epoch)

  return timestamp;
}

function timestampToMMDD(timestamp: number): string {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (months are 0-indexed) and pad with leading zero if necessary

  return `${month}/${day}`;
}

function convertToTime(dateTime: string): string {
  if (dateTime.length !== 10) {
    throw new Error("Invalid date format. Expected 'YYYYMMDDHH'.");
  }

  const year = dateTime.slice(0, 4);
  const month = dateTime.slice(4, 6);
  const day = dateTime.slice(6, 8);
  const hour = dateTime.slice(8, 10);

  const date = new Date(`${year}-${month}-${day}T${hour}:00:00Z`);
  const timeOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString("en-US", timeOptions as any);
}

function formatDate(unformattedDate: string): string {
  try {
    const date = timestampToMMDD(dateYYYYMMDDToTimestamp(unformattedDate));
    return date;
  } catch {
    return convertToTime(unformattedDate);
  }
}
