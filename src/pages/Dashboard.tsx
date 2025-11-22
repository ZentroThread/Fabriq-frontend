import { ChartDonut } from "@/components/charts/ChartDonut";
import { ChartLineDots } from "@/components/charts/ChartLineDots";
import { ChartPie } from "@/components/charts/ChartPie";
import Chart from "@/components/common/Chart";
import DashboardCard from "@/components/common/DashboardCard";
import { Clock4, DollarSign, Package, Users } from "lucide-react";

function Dashboard() {
  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Dashboard Overview
      </div>
      <div className="text-position-text ">
        Welcome back! Here's what's happening today.
      </div>
      <div className="flex flex-4 gap-6 mt-5 mb-5">
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
          iconbg="var(--color-pie-3)"
        />
      </div>
      <div className="flex flex-2 gap-6 mt-5 mb-5">
        <Chart
          label={"Revenue & Rentals"}
          description={"Monthly revenue and rental trends."}
          
        >
          <ChartLineDots/>
        </Chart>
        <Chart
          label={"Rentals by Category"}
          description={"Product category distribution"}
        >
          <ChartPie/>
          </Chart>
      </div>
      <div className="flex flex-3 gap-6 mt-5 mb-5">
        <div className="flex flex-3/5">
          <Chart
            label={"Today's Attendance"}
            description={"Employee attendance overview"}
          >
            <ChartDonut/>
            </Chart>
        </div>

        <Chart
          label={"Upcoming & Overdue Returns"}
          description={"Items that need to be returned soon"}
        />
      </div>
    </div>
  );
}

export default Dashboard;
