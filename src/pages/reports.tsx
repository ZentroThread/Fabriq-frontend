import AddButton from "@/components/atoms/button/add-button";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import { Download, DollarSign, Package,TrendingUp } from "lucide-react";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import Chart from "@/components/templates/Chart";
import { ChartBarMultiple } from "@/components/organisms/charts/chart-bar-multiple";
import { ChartLineMultiple } from "@/components/organisms/charts/chart-line-multiple";
import { TableDemo } from "@/components/organisms/tables/table-demo";
import { ReportsSkeleton } from "@/components/molecules/skeletons/reports-skeleton";
import { useState, useEffect } from "react";
import { useMonthlyBillSummary } from "@/hooks/bill/useMonthlyBillSummary";
import {useTotalSalary} from "@/hooks/employee/payroll/useTotalSalary";
import {useTotalProfit} from "@/hooks/profit/useTotalProfit";
import {useMonthlyProfitRevenue} from "@/hooks/profit/useMonthlyProfitRevenue";
import {RevenueByCategoryPie} from "@/components/organisms/charts/revenue-by-category-pie";
import {useAttireRentSummaryByDateRange} from "@/hooks/attire/useAttireRentSummaryByDateRange";
import {TopSellingProdTable} from "@/components/organisms/tables/top-selling-prod-table";
import {useTopSellingProductsByDateRange} from "@/hooks/attire/useAttireRentSummaryByDateRange";

function Reports() {

  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("");
  const {summaryForSelectedMonthRange , totalOrdersByMonthRange } = useMonthlyBillSummary(timeRange);
  const { totalSalary } = useTotalSalary(timeRange);
  const { totalProfit } = useTotalProfit(timeRange);
  const { chartData } = useMonthlyProfitRevenue(timeRange);
  const attireRentSummary = useAttireRentSummaryByDateRange(timeRange);
  const topSellingProducts = useTopSellingProductsByDateRange(timeRange);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ReportsSkeleton />;
  }

  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Reports & Analytics
      </div>
      <div className="text-position-text ">
        Comprehensive business insights and reports
      </div>
      <div className=" flex gap-2 lg:mr-5 lg:ml-auto mt-5 sm:ml-0 sm:mr-auto">
        <NativeSelectDemo
          option="Time Range"
          value={timeRange}
          onValueChange={setTimeRange}
          value1="last-month"
          value2="last-3-months"
          value3="last-6-months"
          string1="Last Month"
          string2="Last 3 Months"
          string3="Last 6 Months"
        />
        <AddButton text="Export" icon={<Download />} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-5">
        <DashboardCard
                  lable={"Total Revenue"}
                  lable1={`LKR ${((summaryForSelectedMonthRange.reduce((acc, curr) => acc + curr.total, 0)/1000000).toFixed(2)).toLocaleString()}M`}
                  lable2={""}
                  icon={DollarSign}
                />
        <DashboardCard
          lable={"Total Profits"}
          lable1={`LKR ${((totalProfit/1000000).toFixed(2)).toLocaleString()}M`}
          lable2={""}
          icon={TrendingUp}
          iconbg="var(--color-light-pie-1)"
        />
        <DashboardCard
          lable={"Total Orders"}
          lable1={`${totalOrdersByMonthRange}`}
          lable2={""}
          icon={Package}
          iconbg="var(--color-dbcard)"
        />
        <DashboardCard
          lable={"Total Salary"}
          lable1={`LKR ${((totalSalary/1000000).toFixed(2)).toLocaleString()}M`}
          lable2={""}
          icon={DollarSign}
          iconbg="var(--color-light-pie-1)"
        />
      </div>
      <div className="grid sm:grid-cols-1 sm:w-full lg:grid-cols-2 gap-6 mt-5 mb-5 ">
        <Chart
          label={"Revenue & Rentals"}
          description={"Monthly revenue and rental trends."}
        >
          <ChartBarMultiple data={chartData} />
        </Chart>
        <Chart
          label={"Rentals by Category"}
          description={"Product category distribution"}
        >
          <RevenueByCategoryPie data={attireRentSummary} />

        </Chart>
      </div>
      <div className="">
        <Chart
          label={"Rentals by Category"}
          description={"Product category distribution"}
        >
          <ChartLineMultiple />
        </Chart>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-5 mb-5">
        <Chart
          label={"Top Selling Products"}
          description={"Best performing products by revenue"}
        >
          <TopSellingProdTable tableData={topSellingProducts} />
        </Chart>
        <Chart
          label={"Salary Report by Role"}
          description={"Employee salary breakdown"}
        >
          <TableDemo />
        </Chart>
      </div>
    </div>
  );
}

export default Reports;
