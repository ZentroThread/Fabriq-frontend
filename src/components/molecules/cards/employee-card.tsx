interface DashboardCardProps {
  lable: string;
  lable1: string;

  width?: string;
}

function EmployeeCard({
  lable,
  lable1,

  width = "w-auto",
}: DashboardCardProps) {
  return (
    <div
      className={`${width} h-auto bg-card text-position-text rounded-2xl p-6 pt-5 gap-6 shadow-md flex  hover:scale-105`}
    >
      <div className="flex flex-col w-full">
        <span className="text-[16px] pb-3">{lable}</span>
        <span className=" pb-3 text-[26px] text-style">{lable1}</span>
      </div>
      {/* You can render the icon here if you want */}
      {/* <Icon className="w-6 h-6" /> */}
    </div>
  );
}

export default EmployeeCard;
