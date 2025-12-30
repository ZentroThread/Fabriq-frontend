import Button from "@/components/atoms/button/add-button";
import Chart from "@/components/templates/Chart";
import EmployeeForm from "@/components/organisms/employee/employee-form";
import useEmployeeProfile from "@/hooks/employee/employeeDetails/useEmployeeProfile";

export default function EmployeeProfile() {

  const {states,actions} = useEmployeeProfile();

  if(states.isLoading) {
    return <div>Loading...</div>;
  }
  if(states.isError) {
    return <div>Error loading employee data.</div>;
  }

  return (
    <div className="p-3 sm:p-5 flex flex-col">
      <Chart className="h-full flex flex-col justify-between relative md:flex-1">
        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <span className="text-style justify-center text-xl sm:text-2xl flex items-center">
            {states.employee?.empFirstName ?? ""} {states.employee?.empLastName ?? ""}
          </span>
          <span className="justify-center flex items-center text-position-text font-light text-sm sm:text-base">
            {states.employee?.role}
          </span>
        </div>

        {/* Main Content */}
        <EmployeeForm
          employee={states.employee}
          isEditing={states.isEditing}
          formData={states.formData}
          handleChange={actions.handleChange}
          handleBankChange={actions.handleBankChange}
        />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-end mt-6 gap-1 sm:gap-2 lg:pr-10">
          <Button
            bordercolor="border-border-card2"
            bgcolor="bg-bg-card2"
            hovertext="hover:text-background"
            hoverbg="hover:bg-light-brown"
            textcolor="text-black"
            text="Production Records"
            width="w-full sm:w-35"
            onClick={() => actions.showProductionRecords(states.employee?.empCode ?? "")}
          />
          <Button
            bordercolor="border-border-card2"
            bgcolor="bg-bg-card2"
            hovertext="hover:text-background"
            hoverbg="hover:bg-light-brown"
            textcolor="text-black"
            text="Advance Payment"
            width="w-full sm:w-35"
            onClick={() => actions.showAdvancePaymentRecords(states.employee?.empCode ?? "")}
          />
          <Button
            bordercolor="border-border-card3"
            bgcolor="bg-bg-card3"
            textcolor="text-black"
            hoverbg="hover:bg-red"
            hovertext="hover:text-background"
            text="Salary History"
            width="w-full sm:w-35"
            onClick={() => actions.showSalaryHistory(states.employee?.empCode ?? "")}
          />
          <Button
            bordercolor="border-border-card2"
            bgcolor="bg-bg-card2"
            hovertext="hover:text-background"
            hoverbg="hover:bg-light-brown"
            textcolor="text-black"
            text="Leave History"
            width="w-full sm:w-35"
            onClick={() => actions.showLeaveHistory(states.employee?.empCode ?? "")}
          />
         <Button
            bordercolor="border-border-add"
            bgcolor="bg-bg-red"
            textcolor="text-black"
            text={states.isEditing ? "Update" : "Edit"}
            width="w-full sm:w-35"
            onClick={() => {
              if (states.isEditing) {
                actions.handleUpdate();
              } else {
                actions.startEditing();
              }
            }}
          />

        </div>
      </Chart>
    </div>
  );
}
