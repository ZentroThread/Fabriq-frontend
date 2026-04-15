import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { chartConfig, chartData } from "@/constants/data";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ChartLineMultiple() {
  return (
    <Card>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-(--color-position-text)!"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={false}
              tickMargin={5}
              stroke="var(--color-position-text)"
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis stroke="var(--color-position-text)" />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-pie-2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-pie-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
