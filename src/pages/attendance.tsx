import AttendanceCard from "@/components/molecules/cards/attendance-card";
import Chart from "@/components/atoms/frame/frame";
import { Calendar28 } from "@/components/organisms/date-picker/calender";
import { AttendanceSkeleton } from "@/components/molecules/skeletons/attendance-skeleton";
import { CircleCheck, CircleX, Clock4, FingerprintPattern } from "lucide-react";
import useTodayDeviceAttendanceLogsSummary from "@/hooks/employee/deviceAttendance/useTodayAttendnceSummary";
import AttendanceTable from "@/components/organisms/attendance/attendance-table";
import { useDailyAttendanceTableSummary } from "@/hooks/employee/attendance/useDailyAttendanceTableSummary";
import { useState } from "react";
import { formatDate } from "@/utils/date";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { presentCount, absentCount, lateCount, isLoading } =
    useTodayDeviceAttendanceLogsSummary();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { dailyAttendance } = useDailyAttendanceTableSummary(
    selectedDate ? formatDate(selectedDate) : "",
    searchTerm
  );

  if (isLoading) {
    return <AttendanceSkeleton />;
  }

  return (
    <div className="p-5 flex flex-col ">
      <div className="text-style text-[30px] font-semibold">
        Attendance Management
      </div>
      <div className="text-position-text ">
        Track employee attendance with fingerprint scanning
      </div>
      <div className="lg:flex lg:flex-3   gap-6 mt-5 mb-5">
        <div className="flex flex-3/5 sm:mb-6 mb-6">
          <Chart
            label={"Scan Fingerprint"}
            description={"Place finger on scanner to check in/out"}
            height="h-120"
          >
            <div className="flex justify-center items-center">
              <FingerprintPattern className="text-text-active bg-pie-3 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 p-8 m-6 sm:p-10 rounded-full shadow-2xl" />
            </div>
            <Link
              className="flex justify-center items-center mx-auto px-10 py-4 bg-support-button 
      hover:bg-support-button-hover text-support-button-text 
      font-semibold rounded-2xl text-[20px] mb-5"
              to="/mark-attendance"
            >
              Scan Fingerprint
            </Link>
          </Chart>
        </div>

        <Chart
          label={"Today's Summary"}
          description={"Real-time attendance statistics"}
          height="h-120"
        >
          <br />
          <AttendanceCard
            label={"Present"}
            icon={<CircleCheck />}
            label1={presentCount.toString()}
            bgcolor={"var(--color-bg-card1)"}
            iconcolor="var(--color-icon-card1)"
            bordercolor="var( --color-border-card1)"
          />
          <br />
          <AttendanceCard
            label={"Late"}
            icon={<Clock4 />}
            label1={lateCount.toString()}
            bgcolor={"var(--color-bg-card2)"}
            iconcolor="var(--color-icon-card2)"
            bordercolor="var( --color-border-card2)"
          />
          <br />
          <AttendanceCard
            label={"Absent"}
            icon={<CircleX />}
            label1={absentCount.toString()}
            bgcolor={"var(--color-bg-card3)"}
            iconcolor="var(--color-icon-card3)"
            bordercolor="var( --color-border-card3)"
          />
          <br />
        </Chart>
      </div>
      <div>
        <Chart
          label={"Attendance Log"}
          description={"View and filter attendance records"}
          height="h-100"
        >
          <div className="flex justify-between items-center w-full">
            <div></div>

            <div className="flex gap-2 items-center mb-2">
              <Calendar28 onDateChange={(date) => setSelectedDate(date)} />
              <Input
                className="w-full sm:flex-1 max-w-full sm:max-w-80 h-12 rounded-2xl"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <AttendanceTable
            data={dailyAttendance.map((item) => ({ ...item, id: item.empId }))}
          />
        </Chart>
      </div>
    </div>
  );
}

export default Attendance;
