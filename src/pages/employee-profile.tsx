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
  }

  return (
    <div className="p-5 flex flex-col">
      <Chart className="h-full flex flex-col justify-between relative">
        <div className="mb-10 ">
          <span className="text-style justify-center text-2xl flex items-center">
            Employee Name
          </span>
          <span className="justify-center flex items-center text-position-text font-light">
            Role
          </span>
        </div>
        <div className="flex justify-between ">
          <div>
            {/* ...existing code... */}
            <div className="gap-3 flex items-center justify-between ">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Employee Name
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Employee ID
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Role
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Address
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                District
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Date of Birth
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Age
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Gender
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Joined Date
              </label>
              <Input className="w-80"></Input>
            </div>
            <br />
            <div className="gap-3 flex items-center">
              <label
                htmlFor="name"
                className="text-position-text font-light w-40"
              >
                Bank Acc Number
              </label>
              <Input className="w-80"></Input>
            </div>

            {/* ...existing code... */}
          </div>
          {/* image */}
          <div className="flex justify-end items-center mb-auto mt-">
            <div className="flex flex-col relative">
              <div className="bg-main-bg w-35 h-35 rounded-2xl border-avatar-border border-1"></div>
              <Button text={"Update"} width="w-35" />
            </div>
          </div>
        </div>
        {/* Button group at bottom-right corner */}
        <div className="flex justify-end mt-6">
          <div className="flex gap-2">
            <Button
              bordercolor="border-border-card3"
              bgcolor="bg-bg-card3"
              textcolor="text-black"
              hoverbg="hover:bg-hover-red"
              hovertext="hover:text-background"
              text={"Salary History"}
              onClick={() => showSalaryHistory("1")}
            />
            <Button
              bordercolor="border-border-card2"
              bgcolor="bg-bg-card2"
              hovertext="hover:text-background"
              textcolor="text-black"
              text={"Leave History"}
              onClick={() => showLeaveHistory("1")}
            />
            <Button
              bordercolor="border-border-add"
              bgcolor="bg-bg-add"
              hoverbg="hover:bg-hover-green"
              hovertext="hover:text-background"
              textcolor="text-black"
              text={"Update"}
            />
          </div>
        </div>
      </Chart>
    </div>
  );
}
