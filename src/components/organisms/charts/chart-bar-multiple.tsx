import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/utils/style";
import { chartConfig } from "@/constants/data";

interface ChartDataPoint {
  month: string;
  profit: number;
  revenue: number;
}

interface ChartBarMultipleProps {
  data: ChartDataPoint[];
  className?: string;
}

export function ChartBarMultiple({ data, className }: ChartBarMultipleProps) {
  const hasData = data && data.length > 0;

  return (
    <Card
      className={cn(
        "shadow-lg hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      <CardContent className="p-4">
        {!hasData ? (
          <div className="flex h-[350px] w-full items-center justify-center text-muted-foreground">
            No data available
          </div>
        ) : (
          <ChartContainer className="w-full h-[350px]" config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--color-border)"
                />
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
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="profit"
                  radius={[6, 6, 0, 0]}
                  fill={chartConfig.profit.color}
                  barSize={18}
                />
                <Bar
                  dataKey="revenue"
                  radius={[6, 6, 0, 0]}
                  fill={chartConfig.revenue.color}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
