import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { chartConfig } from "@/constants/data";

type ChartDataItem = {
  month: string; 
  total: number;
};

interface ChartLineDotsProps {
  chartData: ChartDataItem[];
}

export function ChartLineDots({ chartData }: ChartLineDotsProps) {

  const formattedData = chartData.map((item) => {
    const date = new Date(item.month + "-01");
    const monthLabel = new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
    return { ...item, month: monthLabel };
  });

  return (
    <Card>
      <CardHeader />
      <CardContent>
        <ChartContainer config={chartConfig}>
          <div className="w-full h-[250px] sm:h-[300px] [&_.recharts-cartesian-axis-tick_text]:fill-(--color-position-text)">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData}
                margin={{ left: 5, right: 10, top: 10, bottom: 5 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="var(--color-position-text)"
                  tickLine
                  axisLine
                  tickMargin={5}
                />
                <YAxis stroke="var(--color-position-text)" />
  

                {/* Tooltip for hover */}
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white border rounded shadow p-2 text-sm">
                          <div className="font-medium">{data.month}</div>
                          <div>Total: {data.total}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Line
                  dataKey="total"
                  type="natural"
                  stroke="var(--color-support-button)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "var(--color-support-button)" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center text-sm" />
    </Card>
  );
}
