import Button from "@/components/atoms/button/add-button";
import Chart from "@/components/templates/Chart";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function EmployeeProfile() {
  const navigate = useNavigate();

  const showSalaryHistory = (id: string) => {
    navigate(`/salary-history/${id}`);
  };

  const showLeaveHistory = (id: string) => {
    navigate(`/leave-history/${id}`);
  };

  return (
    <div className="p-3 sm:p-5 flex flex-col">
      <Chart className="h-full flex flex-col justify-between relative md:flex-1">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <span className="text-style justify-center text-xl sm:text-2xl flex items-center">
            Employee Name
          </span>
          <span className="justify-center flex items-center text-position-text font-light text-sm sm:text-base">
            Role
          </span>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:pl-10 gap-6">
          {/* Profile Image - Shows first on mobile */}
          <div className="flex justify-center lg:hidden mb-6">
            <div className="flex flex-col relative items-center">
              <div className="bg-main-bg w-32 h-32 sm:w-35 sm:h-35 rounded-2xl border-avatar-border border-1"></div>
              <Button text="Update" width="w-32 sm:w-35" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="w-full lg:flex-1">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Employee Name
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Employee ID
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Role
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Address
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  District
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Date of Birth
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Age
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Gender
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Joined Date
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <label className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">
                  Bank Acc Number
                </label>
                <Input className="w-full sm:flex-1 max-w-full sm:max-w-80" />
              </div>
            </div>
          </div>

          {/* Profile Image - Shows on desktop only */}
          <div className="hidden lg:flex justify-end items-start pr-10">
            <div className="flex flex-col relative items-center">
              <div className="bg-main-bg w-35 h-35 rounded-2xl border-avatar-border border-1"></div>
              <Button text="Update" width="w-35" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-end mt-6 gap-1 sm:gap-2 lg:pr-10">
          <Button
            bordercolor="border-border-card3"
            bgcolor="bg-bg-card3"
            textcolor="text-black"
            hoverbg="hover:bg-hover-red"
            hovertext="hover:text-background"
            text="Salary History"
            width="w-full sm:w-35"
            onClick={() => showSalaryHistory("1")}
          />
          <Button
            bordercolor="border-border-card2"
            bgcolor="bg-bg-card2"
            hovertext="hover:text-background"
            textcolor="text-black"
            text="Leave History"
            width="w-full sm:w-35"
            onClick={() => showLeaveHistory("1")}
          />
          <Button
            bordercolor="border-border-add"
            bgcolor="bg-bg-add"
            hoverbg="hover:bg-hover-green"
            hovertext="hover:text-background"
            textcolor="text-black"
            text="Update"
            width="w-full sm:w-35"
          />
        </div>
      </Chart>
    </div>
  );
}
