"use client";

import { Pie, PieChart, Cell, LabelList } from "recharts";
import useTodayDeviceAttendanceLogsSummary from "@/hooks/employee/deviceAttendance/useTodayAttendnceSummary";
import {
  Card,
  CardContent,
} from "@/components/ui/card";




export function ChartDonut() {

   const { totalEmployees, presentCount, lateCount,absentCount } = useTodayDeviceAttendanceLogsSummary();

  const attendanceData = [
    { name: "Present", value: presentCount, color: "#B47C5A" },
    { name: "Absent", value: absentCount, color: "#F7A1B2" },
    { name: "Leave", value: totalEmployees - (presentCount + absentCount + lateCount), color: "#CBB2A3" },
  ];
   return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-col items-center gap-6">
        {/* Donut */}
        <PieChart width={220} height={220}>
          <Pie
            data={attendanceData}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={90}
            stroke="none"
          >
            {attendanceData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}

            {/* Numbers on arcs */}
            <LabelList
              dataKey="value"
              position="outside"
              fill="#9a7b6a"
              fontSize={14}
            />
          </Pie>
        </PieChart>

        {/* Legend */}
        <div className="w-full space-y-3">
          {attendanceData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-lg">{item.name}</span>
              </div>
              <span className="font-semibold text-muted-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
