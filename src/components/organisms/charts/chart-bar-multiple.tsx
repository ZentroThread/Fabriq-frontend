"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { chartData } from "@/constants/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full [&_.recharts-cartesian-axis-tick_text]:fill-(--color-position-text)! h-[300px]"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              stroke="var(--color-position-text)"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis stroke="var(--color-position-text)" />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-pie-1)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-pie-3)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
