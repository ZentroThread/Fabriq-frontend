"use client";

import { Pie, PieChart, Cell } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type PieData = {
  category: "saree" | "nilame" | "jwelary";
  totalRentals: number;
  percentage: number;
};

interface ChartPieProps {
  data: PieData[];
}
interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  value: number | string;
}

const chartConfig = {
  saree: {
    label: "Bridal Sarees",
    color: "var(--color-pie-1)",
  },
  nilame: {
    label: "Nilame Suits",
    color: "var(--color-pie-2)",
  },
  jwelary: {
    label: "Bridal Jewellery",
    color: "var(--color-pie-3)",
  },
} satisfies ChartConfig;

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: LabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold pointer-events-none"
    >
      {`Rs. ${value.toLocaleString()}`}
    </text>
  );
};

export function RevenueByCategoryPie({ data }: ChartPieProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No revenue data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0" />

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            {/* Tooltip */}
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, _name, props) => {
                    const payload = props.payload as PieData;

                    return [
                      `Rs. ${Number(value).toLocaleString()}`,
                      `${payload.percentage.toFixed(2)}%`,
                    ];
                  }}
                />
              }
            />

            {/* Pie */}
            <Pie
              data={data}
              dataKey="totalRentals"
              nameKey="category"
              stroke="transparent"
              labelLine={false}
              label={renderLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.category].color}
                />
              ))}
            </Pie>

            {/* Legend */}
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
