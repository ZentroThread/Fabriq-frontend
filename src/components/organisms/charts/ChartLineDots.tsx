"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";
import { chartData } from "@/constants/data";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart with dots";

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

export function ChartLineDots() {
  return (
    <Card>
      <CardHeader>
        {/* <CardTitle>Line Chart - Dots</CardTitle>
        <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div className="w-full h-[250px] sm:h-[300px] [&_.recharts-cartesian-axis-tick_text]:fill-(--color-position-text)!">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 5,
                  right: 10,
                  top: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-position-text)"
                  tickLine={true}
                  axisLine={true}
                  tickMargin={5}
                  tickFormatter={(value: string) => value.slice(0, 3)}
                />
                <YAxis stroke="var(--color-position-text)" />
                <ChartTooltip
                  cursor={true}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="desktop"
                  type="natural"
                  stroke="var(--color-support-button)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-support-button)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center   text-sm">
        {/* <div className="flex gap-2 leading-none font-medium text-position-text">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
      </CardFooter>
    </Card>
  );
}
