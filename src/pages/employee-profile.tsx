import Button from "@/components/atoms/button/custom-button";
import Chart from "@/components/atoms/frame/frame";
import EmployeeForm from "@/components/organisms/employee/employee-form";
import useEmployeeProfile from "@/hooks/employee/employeeDetails/useEmployeeProfile";
import LoadingFallback from "@/components/ui/loading";

export default function EmployeeProfile() {
  const { states, actions } = useEmployeeProfile();

  if (states.isLoading) {
    return <LoadingFallback label="Loading employee..." />;
  }

  if (states.isError) {
    return <div className="p-4 text-red-500">Error loading employee data.</div>;
  }

  return (
    <div className="p-3 sm:p-5 flex flex-col gap-6">
      <Chart className="flex flex-col gap-6 relative">
        <header className="text-center">
          <h1 className="text-xl sm:text-2xl text-style">
            {states.employee?.empFirstName} {states.employee?.empLastName}
          </h1>
          <p className="text-position-text font-light text-sm sm:text-base">
            {states.employee?.role}
          </p>
        </header>

        <section>
          <EmployeeForm
            employee={states.employee}
            isEditing={states.isEditing}
            formData={states.formData}
            imagePreview={states.imagePreview}
            onImageChange={actions.handleImageChange}
            handleChange={actions.handleChange}
            handleBankChange={actions.handleBankChange}
          />
        </section>

        <footer className="mt-10 ">
          <div className="h-0.5 bg-border" />

          <div className="pt-6">
            <div className="mb-6">
              <h3 className="text-sm text-style mb-3">Employee Actions</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <Button
                  text="Production Records"
                  width="w-full"
                  bordercolor="border-border-card2"
                  bgcolor="bg-bg-card2"
                  hoverbg="hover:bg-light-brown"
                  hovertext="hover:text-background"
                  textcolor="text-black"
                  onClick={actions.showProductionRecords}
                />

                <Button
                  text="Advance Payment"
                  width="w-full"
                  bordercolor="border-border-card2"
                  bgcolor="bg-bg-card2"
                  hoverbg="hover:bg-light-brown"
                  hovertext="hover:text-background"
                  textcolor="text-black"
                  onClick={actions.showAdvancePaymentRecords}
                />

                <Button
                  text="Salary History"
                  width="w-full"
                  bordercolor="border-border-card3"
                  bgcolor="bg-bg-card3"
                  hoverbg="hover:bg-red"
                  hovertext="hover:text-background"
                  textcolor="text-black"
                  onClick={actions.showSalaryHistory}
                />
              </div>
            </div>

            <div className="h-px bg-border mb-6" />

            <div className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <Button
                text={states.isEditing ? "Update Employee" : "Edit Employee"}
                width="w-full sm:w-40"
                onClick={() =>
                  states.isEditing
                    ? actions.handleUpdate()
                    : actions.startEditing()
                }
              />
            </div>
          </div>
        </footer>
      </Chart>
    </div>
  );
}
