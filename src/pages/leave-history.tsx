import Chart from "@/components/templates/Chart";
import { Calendar } from "@/components/ui/calendar";
import { leaveRecords } from "@/constants/data";
import { useState } from "react";

export default function LeaveHistory() {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const leaveDates = leaveRecords.map((item) => new Date(item.date));

  return (
    <div className=" flex  gap-10 ">
      <Chart>
        <div className="w-2/3 space-y-4">
          <h2 className="text-2xl font-semibold text-style mb-4">
            Leave History
          </h2>

          <div className="flex flex-col gap-6 px-5">
            {leaveRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between bg-(--color-leave-history-bg) 
                       px-6 py-4 w-full rounded-2xl hover:scale-105 border border-(--color-border) shadow-sm"
              >
                <p className="text-position-text font-medium">
                  {record.id}. {record.remark}
                </p>

                <span className="text-sm text-position-text font-light">
                  {new Date(record.date).toLocaleDateString()}
                </span>
              </div>
            ))}

            {selectedDay && (
              <p className="text-sm mt-2 text-(--color-light-gray-medium)">
                Selected date: {selectedDay.toDateString()}
              </p>
            )}
          </div>
        </div>
      </Chart>

      <div className="w-1/3 flex flex-col mt-5 items-center space-y-6">
        <div
          className="w-35 h-35 rounded-2xl bg-(--color-avatar-bg) 
                        border-1 border-(--color-avatar-border) shadow"
        ></div>

        <button
          className="w-40 py-2 bg-(--color-button) text-(--color-button-text) 
                           rounded-md shadow hover:bg-(--color-button-hover) transition"
        >
          + Add New
        </button>

        <div className="w-auto border border-(--color-border) rounded-md p-4 bg-(--color-card) shadow">
          <Calendar
            mode="multiple"
            selected={leaveDates}
            onSelect={(days) =>
              setSelectedDay(
                Array.isArray(days) ? (days[0] ?? null) : (days ?? null)
              )
            }
            modifiers={{
              leave: leaveDates,
              today: new Date(),
            }}
            modifiersStyles={{
              leave: {
                backgroundColor: "var(--color-light-pink)",
                color: "var(--color-light-black)",
                borderRadius: "6px",
                fontWeight: "bold",
                border: "none",
                outline: "none",
              },
              today: {
                backgroundColor: "var(--color-light-pink)",
                color: "var(--color-accent-foreground)",
                borderRadius: "6px",
                fontWeight: "bold",
                border: "none",
                outline: "none",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
