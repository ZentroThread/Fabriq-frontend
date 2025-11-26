import Button from "@/components/atoms/button/add-button";
import DashboardCard from "@/components/molecules/cards/dashboard-card";
import { ItemCard } from "@/components/molecules/cards/item-card";
import { Input } from "@/components/molecules/input/input";
import Chart from "@/components/organisms/charts/Chart";
import { NativeSelectDemo } from "@/components/organisms/selection/native-selection-demo";
import { BanknoteArrowUp, Package, Plus, Tag } from "lucide-react";
import nilame1 from "@/assets/items/nilame1.jpeg";

function Items() {
  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Item Management
      </div>
      <div className="text-position-text ">
        Manage bridal attire and accessories inventory
      </div>
      <div className="flex gap-2 lg:mr-5 lg:ml-auto  sm:ml-0 sm:mr-auto">
        <Button text={"Add New Item"} width="w-45" icon={<Plus />} />
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

      <Chart height="h-20" padding="p-2 pl-6">
        <div className="gap-2 flex pr-5 items-center">
          <Input />
          <NativeSelectDemo />
        </div>
      </Chart>

      <div
        className="pt-5  grid gap-6 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4"
      >
        <ItemCard
          title={"Nilame Suit1"}
          description={"Black color with purls"}
          price={"LKR 8,000"}
          stock="3 "
          image={nilame1}
        />
        <ItemCard
          title={"Nilame Suit1"}
          description={"Black color with purls"}
          price={"LKR 8,000"}
          stock="3 "
          image={nilame1}
        />
        <ItemCard
          title={"Nilame Suit1"}
          description={"Black color with purls"}
          price={"LKR 8,000"}
          stock="3 "
          image={nilame1}
        />
        <ItemCard
          title={"Nilame Suit1"}
          description={"Black color with purls"}
          price={"LKR 8,000"}
          stock="3 "
          image={nilame1}
        />
        <ItemCard
          title={"Nilame Suit1"}
          description={"Black color with purls"}
          price={"LKR 8,000"}
          stock="3 "
          image={nilame1}
        />
        <ItemCard
          title={"Nilame Suit1"}
          description={"Black color with purls"}
          price={"LKR 8,000"}
          stock="3 "
          image={nilame1}
        />
      </div>
    </div>
  );
}

export default Items;
