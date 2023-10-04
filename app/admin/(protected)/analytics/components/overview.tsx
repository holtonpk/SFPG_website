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
import { formatDateMonthDay } from "@/app/admin/lib/utils";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-popover border border-border rounded-md p-3">
        <span className="h-4 w-4 rounded-full bg-primary"></span>
        <p className="label">{`Sign ups: ${payload[0].value}`}</p>
        <p className="desc">{`${label}`}</p>
      </div>
    );
  }

  return null;
};

export function Overview({
  rawData,
}: {
  rawData: { dates: string[]; values: string[] };
}) {
  const data = rawData.dates.map((item, index) => ({
    name: formatDateMonthDay(item),
    total: rawData.values[index],
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
          interval={3}
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
