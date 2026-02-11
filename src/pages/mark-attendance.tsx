import { useState } from "react";
import { useMarkAttendance } from "@/hooks/employee/attendance/useAttendance";
import { useEmployees } from "@/hooks/employee/employeeDetails/useEmployess";
import { MarkAttendanceSchema, type MarkAttendance } from "@/schemas/attendance.schema";
import type { Employee } from "@/types/employee.type";

type Direction = "IN" | "OUT";

export const Mark_Attendance = () => {
  const { data: employees, isLoading } = useEmployees();
  const { mutate: markAttendance, isPending } = useMarkAttendance();

  const [selectedEmp, setSelectedEmp] = useState<string>("");
  const [direction, setDirection] = useState<Direction>("IN");
  const [error, setError] = useState<string | null>(null);

  // 🔒 Track which employees have punched and their last direction
  const [punchedMap, setPunchedMap] = useState<Record<string, Direction>>({});

  // Format ISO for backend (remove Z and milliseconds)
  const formatForBackend = (date: Date) => {
    return date.toISOString().replace("Z", "").split(".")[0];
  };

  const handleSubmit = () => {
    setError(null);

    if (!selectedEmp) {
      setError("Please select an employee");
      return;
    }

    const payload: MarkAttendance = {
      UserID: selectedEmp,
      LogDate: formatForBackend(new Date()),
      Direction: direction,
    };

    const parsed = MarkAttendanceSchema.safeParse(payload);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    markAttendance(parsed.data, {
      onSuccess: () => {
        // 🔒 Save last direction for this employee
        setPunchedMap((prev) => ({
          ...prev,
          [selectedEmp]: direction,
        }));
      },
      onError: (error: Error) => {
        return setError(error.message || "Failed to mark attendance");
      },
    });
  };

  // Determine if IN/OUT should be disabled
  const isInDisabled = punchedMap[selectedEmp] === "IN";
  const isOutDisabled = punchedMap[selectedEmp] === "OUT";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-main-bg">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 text-text-color">
          Mark Attendance
        </h2>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">
            {error}
          </div>
        )}

        {/* Employee Select */}
        <div className="mb-4">
          <label className="block text-sm mb-2 text-text-color">Employee</label>
          <select
            value={selectedEmp}
            onChange={(e) => setSelectedEmp(e.target.value)}
            className="w-full rounded-lg px-3 py-2 bg-input border border-input text-text-color focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select employee</option>
            {!isLoading &&
              employees?.map((emp: Employee) => (
                <option key={emp.id} value={emp.empCode}>
                  {emp.empCode} — {emp.empFirstName} {emp.empLastName}
                </option>
              ))}
          </select>
        </div>

        {/* Direction Buttons */}
        <div className="mb-6">
          <label className="block text-sm mb-2 text-text-color">Direction</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setDirection("IN")}
              disabled={isInDisabled || !selectedEmp}
              className={`flex-1 py-2 rounded-lg font-medium transition
                ${
                  isInDisabled
                    ? "bg-green/50 text-white cursor-not-allowed"
                    : direction === "IN"
                    ? "bg-green text-white shadow-md"
                    : "bg-hover-bg text-text-color hover:bg-hover-bg/70"
                }`}
            >
              IN
            </button>

            <button
              type="button"
              onClick={() => setDirection("OUT")}
              disabled={isOutDisabled || !selectedEmp}
              className={`flex-1 py-2 rounded-lg font-medium transition
                ${
                  isOutDisabled
                    ? "bg-red/50 text-white cursor-not-allowed"
                    : direction === "OUT"
                    ? "bg-red text-white shadow-md"
                    : "bg-hover-bg text-text-color hover:bg-hover-bg/70"
                }`}
            >
              OUT
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedEmp || isPending || (isInDisabled && direction === "IN") || (isOutDisabled && direction === "OUT")}
          className="w-full py-3 rounded-xl bg-button text-button-text hover:bg-button-hover transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Marking..." : "Mark Attendance"}
        </button>
      </div>
    </div>
  );
};
