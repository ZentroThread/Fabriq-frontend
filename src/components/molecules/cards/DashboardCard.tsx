import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  lable: string;
  lable1: string;
  lable2: string;
  icon: LucideIcon;
  iconbg?: string;
}

function DashboardCard({
  lable,
  lable1,
  lable2,
  iconbg,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="lg:flex-4 sm:w-auto h-auto bg-card text-position-text rounded-2xl p-6 pt-5 gap-6 shadow-md flex  ">
      <div className="flex flex-col w-full">
        <span className="text-[16px] pb-3">{lable}</span>
        <span className=" pb-3 text-[26px] text-style">{lable1}</span>
        <span className="text-shadow-text-active text-[14px]">{lable2}</span>
      </div>
      {/* You can render the icon here if you want */}
      {/* <Icon className="w-6 h-6" /> */}
      <div
        className="w-14 h-14 bg-support-button rounded-2xl p-3 text-support-button-text "
        style={{ backgroundColor: iconbg }}
      >
        {Icon && <Icon className="w-7 h-7  " />}
      </div>
    </div>
  );
}

export default DashboardCard;
