import { ChartDonut } from "@/components/organisms/charts/ChartDonut";
import { ChartLineDots } from "@/components/organisms/charts/ChartLineDots";
import { ChartPie } from "@/components/organisms/charts/ChartPie";
import Chart from "@/components/templates/Chart";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import { Clock4, DollarSign, Package, Users } from "lucide-react";
import { DashboardSkeleton } from "@/components/molecules/skeletons/dashboard-skeleton";
import { useState, useEffect } from "react";
import {useAttireRentsSummary} from "@/hooks/attire/useAttireRentsSummary";
import useTodayDeviceAttendanceLogsSummary from "@/hooks/employee/deviceAttendance/useTodayAttendnceSummary";
import { useMonthlyBillSummary } from "@/hooks/bill/useMonthlyBillSummary";
import {useAttireRentCurrentMonthlyOverview} from "@/hooks/attire/useAttireRentCurrentMonthlyOverview";
import {RentDetailsSummary} from "@/components/organisms/summaries/rent-details-summary";

function Dashboard() {
  
  const { activeRentsCount, dueReturnsCount, overdueReturnsCount, newAttireRentsThisWeek } = useAttireRentsSummary();
  const { totalEmployees, presentCount, lateCount } = useTodayDeviceAttendanceLogsSummary();

  const attendanceRate = totalEmployees > 0
    ? Math.round(((presentCount + lateCount) / totalEmployees) * 100)
    : 0;

  const { monthlySummary } = useMonthlyBillSummary();

  const currentMonthlyOverview = useAttireRentCurrentMonthlyOverview();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }


  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Dashboard Overview
      </div>
      <div className="text-position-text ">
        Welcome back! Here's what's happening today.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-5">
        <DashboardCard
          lable={"Total Revenue"}
          lable1={"LKR 3.28M"}
          lable2={"+15%"}
          icon={DollarSign}
        />
        <DashboardCard
          lable={"Active Rentals"}
          lable1={`${activeRentsCount}`}
          lable2={newAttireRentsThisWeek > 0 
                    ? `+${newAttireRentsThisWeek} this week` 
                    : "0 this week"}
          icon={Package}
          iconbg="var(--color-light-pie-1)"
        />

        <DashboardCard
          lable={"Attendance Rate"}
          lable1={`${attendanceRate}%`}
          lable2={`${presentCount}/${totalEmployees} present`}
          icon={Users}
          iconbg="var(--color-dbcard)"
        />
        <DashboardCard
          lable={"Due Returns"}
          lable1={`${dueReturnsCount}`}
          lable2={`${overdueReturnsCount} overdue`}
          icon={Clock4}
        />
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-5 mb-5">
        <Chart
          label={"Revenue & Rentals"}
          description={"Monthly revenue and rental trends."}
        >
          <ChartLineDots chartData={monthlySummary}/>
        </Chart>
        <Chart
          label={"Rentals by Category"}
          description={"Product category distribution"}
        >
          <ChartPie data={currentMonthlyOverview} />
        </Chart>
      </div>
      <div className="lg:flex lg:flex-3   gap-6 mt-5 mb-5">
        <div className="flex flex-3/5 sm:mb-6 mb-6">
          <Chart
            label={"Today's Attendance"}
            description={"Employee attendance overview"}
          >
            <ChartDonut />
          </Chart>
        </div>

        <Chart
          label={"Upcoming & Overdue Returns"}
          description={"Rentals due for return"}
        >
          <RentDetailsSummary />
        </Chart>
      </div>
    </div>
  );
}

export default Dashboard;
