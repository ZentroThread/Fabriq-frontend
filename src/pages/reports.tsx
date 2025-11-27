import AddButton from "@/components/atoms/button/add-button";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import { Download, DollarSign, Package, Users, Clock4 } from "lucide-react";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import Chart from "@/components/organisms/charts/Chart";
import { ChartBarMultiple } from "@/components/organisms/charts/chart-bar-multiple";
import { ChartPie } from "@/components/organisms/charts/ChartPie";
import { ChartLineMultiple } from "@/components/organisms/charts/chart-line-multiple";
import { TableDemo } from "@/components/organisms/tables/table-demo";

function Reports() {
  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Reports & Analytics
      </div>
      <div className="text-position-text ">
        Comprehensive business insights and reports
      </div>
      <div className=" flex gap-2 lg:mr-5 lg:ml-auto mt-5 sm:ml-0 sm:mr-auto">
        <NativeSelectDemo />
        <AddButton text="Export" icon={<Download />} />
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
          lable1={"28"}
          lable2={"+8 this week"}
          icon={Package}
          iconbg="var(--color-light-pie-1)"
        />
        <DashboardCard
          lable={"Attendance Rate"}
          lable1={"93%"}
          lable2={"14/15 present"}
          icon={Users}
          iconbg="var(--color-dbcard)"
        />
        <DashboardCard
          lable={"Due Returns"}
          lable1={"12"}
          lable2={"2 overdue"}
          icon={Clock4}
        />
      </div>
      <div className="grid sm:grid-cols-1 sm:w-full lg:grid-cols-2 gap-6 mt-5 mb-5 ">
        <Chart
          label={"Revenue & Rentals"}
          description={"Monthly revenue and rental trends."}
        >
          <ChartBarMultiple />
        </Chart>
        <Chart
          label={"Rentals by Category"}
          description={"Product category distribution"}
        >
          <ChartPie />
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
          <TableDemo />
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
