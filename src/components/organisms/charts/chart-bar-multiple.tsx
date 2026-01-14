"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// Chart config for legend & colors
const chartConfig = {
  profit: {
    label: "Profit",
    color: "var(--color-light-pie-1)", // pink
  },
  revenue: {
    label: "Revenue",
    color: "var(--color-light-pie-2)", // brown
  },
};

export const description = "Monthly Profit & Revenue Bar Chart";

export function ChartBarMultiple({
  data,
}: {
  data: { month: string; profit: number; revenue: number }[];
}) {
  if (!data || data.length === 0) return null;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">

      <CardContent className="p-4">
        <ChartContainer className="w-full h-[350px]" config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="month"
                stroke="var(--color-position-text)"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                style={{ fontWeight: 500 }}
              />
              <YAxis
                stroke="var(--color-position-text)"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip cursor={{ fill: "rgba(0,0,0,0.05)" }} content={<ChartTooltipContent />} />
 
              <Bar dataKey="profit" radius={[6, 6, 0, 0]} fill="var(--color-light-pie-1)" barSize={18} />

              <Bar dataKey="revenue" radius={[6, 6, 0, 0]} fill="var(--color-light-pie-2)" barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
