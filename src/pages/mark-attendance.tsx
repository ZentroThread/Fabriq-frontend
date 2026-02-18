import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useMarkAttendance } from "@/hooks/employee/attendance/useAttendance";
import { useEmployees } from "@/hooks/employee/employeeDetails/useEmployess";
import {
  MarkAttendanceSchema,
  type MarkAttendance,
} from "@/schemas/attendance.schema";
import type { Employee } from "@/types/employee.type";
import { getErrorMessage, swalSuccess, swalError } from "@/utils/swal";

type Direction = "IN" | "OUT";
type PunchedState = Record<string, Direction | undefined>;

/* ─── Helpers ───────────────────────────────────────────────────────────── */
const formatForBackend = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
};

const getInitials = (first: string, last: string) =>
  `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();

/* ─── Sub Components ───────────────────────────────────────────────────── */
interface EmployeeAvatarProps {
  employee: Employee;
  size?: "sm" | "md" | "lg";
}

const EmployeeAvatar = ({ employee, size = "md" }: EmployeeAvatarProps) => {
  const sizes = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-semibold text-white shrink-0`}
      style={{
        background: `linear-gradient(
          135deg,
          var(--color-avatar-gradient-from),
          var(--color-avatar-gradient-to)
        )`,
        boxShadow: "0 4px 12px var(--color-shadow)",
      }}
    >
      {getInitials(employee.empFirstName, employee.empLastName)}
    </div>
  );
};

const StatusBadge = ({ status }: { status?: Direction }) => {
  if (!status) return null;
  const isIn = status === "IN";

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{
        backgroundColor: isIn
          ? "color-mix(in srgb, var(--color-green) 15%, transparent)"
          : "color-mix(in srgb, var(--color-red) 15%, transparent)",
        color: isIn ? "var(--color-green)" : "var(--color-red)",
        border: `1px solid ${
          isIn ? "var(--color-green)" : "var(--color-red)"
        }`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{
          backgroundColor: isIn
            ? "var(--color-green)"
            : "var(--color-red)",
        }}
      />
      {status}
    </span>
  );
};

/* ─── Main Component ───────────────────────────────────────────────────── */
export const Mark_Attendance = () => {
  const { data: employees = [], isLoading } = useEmployees();
  const { mutate: markAttendance, isPending } = useMarkAttendance();

  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [direction, setDirection] = useState<Direction>("IN");
  const [search, setSearch] = useState("");
  const [punchedMap, setPunchedMap] = useState<PunchedState>({});
  const [showDropdown, setShowDropdown] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredEmployees = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return [];
    return employees
      .filter(
        (e) =>
          e.empCode.toLowerCase().includes(term) ||
          e.empFirstName.toLowerCase().includes(term) ||
          e.empLastName.toLowerCase().includes(term)
      )
      .slice(0, 8);
  }, [search, employees]);

  const selectEmployee = useCallback(
    (emp: Employee) => {
      setSelectedEmp(emp);
      setSearch(`${emp.empCode} — ${emp.empFirstName} ${emp.empLastName}`);
      setShowDropdown(false);
      setDirection(punchedMap[emp.empCode] === "IN" ? "OUT" : "IN");
    },
    [punchedMap]
  );

  const clearSelection = () => {
    setSelectedEmp(null);
    setSearch("");
    setShowDropdown(false);
    searchRef.current?.focus();
  };

  const handleSubmit = () => {
    if (!selectedEmp) return swalError("Please select an employee.");

    const payload: MarkAttendance = {
      UserID: selectedEmp.empCode,
      LogDate: formatForBackend(new Date()),
      Direction: direction,
    };

    const parsed = MarkAttendanceSchema.safeParse(payload);
    if (!parsed.success)
      return swalError(parsed.error.issues[0].message);

    markAttendance(parsed.data, {
      onSuccess: () => {
        setPunchedMap((p) => ({
          ...p,
          [selectedEmp.empCode]: direction,
        }));
        swalSuccess("Attendance marked successfully");
        clearSelection();
      },
      onError: (e) =>
        swalError("Failed to mark attendance", getErrorMessage(e)),
    });
  };

  const canSubmit = !!selectedEmp && !isPending;

  // const timeStr = now.toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // });
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: "var(--color-main-bg)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden"
        style={{
          backgroundColor: "var(--color-card)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 24px 48px var(--color-shadow)",
        }}
      >
        {/* Header */}
        <div
          className="px-7 pt-8 pb-6 flex justify-between"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <div>
            <p
              className="text-[10px] font-semibold tracking-[0.25em] uppercase"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              HR Module
            </p>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--color-foreground)" }}
            >
              Mark Attendance
            </h1>
          </div>

          <div className="text-right">
            <p
              className="text-3xl font-mono font-bold"
              style={{ color: "var(--color-foreground)" }}
            >
              {/* {timeStr} */}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              {dateStr}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-7 space-y-6">
          {/* Search */}
          <div ref={containerRef} className="relative">
            <label className="text-[11px] font-semibold tracking-widest uppercase">
              Employee
            </label>

            <input
              ref={searchRef}
              value={search}
              disabled={isLoading}
              placeholder="Search by ID or name"
              onChange={(e) => {
                setSearch(e.target.value);
                setSelectedEmp(null);
                setShowDropdown(true);
              }}
              className="w-full mt-2 rounded-xl px-4 py-3 text-sm outline-none"
              style={{
                backgroundColor: "var(--color-input)",
                border: "1px solid var(--color-input-border)",
              }}
            />

            {showDropdown && filteredEmployees.length > 0 && (
              <div
                className="absolute w-full mt-2 rounded-xl overflow-hidden z-50"
                style={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 16px 32px var(--color-shadow)",
                }}
              >
                {filteredEmployees.map((emp) => (
                  <button
                    key={emp.empCode}
                    onClick={() => selectEmployee(emp)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left"
                  >
                    <EmployeeAvatar employee={emp} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {emp.empFirstName} {emp.empLastName}
                      </p>
                      <p className="text-xs">{emp.empCode}</p>
                    </div>
                    <StatusBadge status={punchedMap[emp.empCode]} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direction */}
          <div>
            <label
              className="block text-[11px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Direction
            </label>

            <div
              className="grid grid-cols-2 gap-2 p-1 rounded-xl"
              style={{ backgroundColor: "var(--color-muted)" }}
            >
              <button
                onClick={() => setDirection("IN")}
                disabled={
                  selectedEmp ? punchedMap[selectedEmp.empCode] === "IN" : true
                }
                className="py-3 rounded-lg font-semibold text-sm transition"
                style={{
                  backgroundColor:
                    direction === "IN"
                      ? "var(--color-green)"
                      : "transparent",
                  color:
                    direction === "IN"
                      ? "var(--color-button-text)"
                      : "var(--color-foreground)",
                  opacity:
                    selectedEmp &&
                    punchedMap[selectedEmp.empCode] !== "IN"
                      ? 1
                      : 0.5,
                }}
              >
                Clock In
              </button>

              <button
                onClick={() => setDirection("OUT")}
                disabled={
                  selectedEmp ? punchedMap[selectedEmp.empCode] !== "IN" : true
                }
                className="py-3 rounded-lg font-semibold text-sm transition"
                style={{
                  backgroundColor:
                    direction === "OUT"
                      ? "var(--color-red)"
                      : "transparent",
                  color:
                    direction === "OUT"
                      ? "var(--color-button-text)"
                      : "var(--color-foreground)",
                  opacity:
                    selectedEmp &&
                    punchedMap[selectedEmp.empCode] === "IN"
                      ? 1
                      : 0.5,
                }}
              >
                Clock Out
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full py-3.5 rounded-xl font-semibold transition"
            style={{
              backgroundColor: canSubmit
                ? "var(--color-button)"
                : "var(--color-muted)",
              color: canSubmit
                ? "var(--color-button-text)"
                : "var(--color-muted-foreground)",
            }}
          >
            {isPending ? "Processing…" : "Mark Attendance"}
          </button>
        </div>
      </div>
    </div>
  );
};
