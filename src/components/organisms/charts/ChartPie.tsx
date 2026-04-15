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
  value: number;
  percentage: number;
};

interface ChartPieProps {
  data: PieData[];
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

export function ChartPie({ data }: ChartPieProps) {
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
                      `${value} rentals`,
                      `${payload.percentage.toFixed(2)}%`,
                    ];
                  }}
                />
              }
              contentStyle={{ backgroundColor: "transparent", border: "none" }}
            />

            {/* Pie */}
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              stroke="transparent"
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
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center text-(--color-chart-text)"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
