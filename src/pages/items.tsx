import DashboardCard from "@/components/molecules/cards/dashboard-card";
import { Input } from "@/components/molecules/input/input";
import Chart from "@/components/organisms/charts/Chart";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import { BanknoteArrowUp, Package, Tag } from "lucide-react";

function Items() {
  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Item Management
      </div>
      <div className="text-position-text ">
        Manage bridal attire and accessories inventory
      </div>
      <div className="grid lg:grid-cols-3  sm:grid-cols-2  gap-6 mt-5 mb-5">
        <DashboardCard
          lable={"Total Revenue"}
          lable1={"LKR 3.28M"}
          icon={Package}
        />
        <DashboardCard
          lable={"Active Rentals"}
          lable1={"28"}
          icon={Tag}
          iconbg="var(--color-light-pie-1)"
        />
        <DashboardCard
          lable={"Attendance Rate"}
          lable1={"93%"}
          icon={BanknoteArrowUp}
          iconbg="var(--color-dbcard)"
        />
      </div>
      
      <Chart height="h-20" >
        <div className=" items-center gap-2 flex w-full ">

        <Input /> 
        <NativeSelectDemo/>
        </div>
      </Chart>
    </div>
  );
}

export default Items;
