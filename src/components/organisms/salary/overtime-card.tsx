import ReadOnlyField from "@/components/molecules/input/read-only-field";
import {type PayRollResponseType } from "@/types/payroll-type";

type Props = {
  data: PayRollResponseType;
  className?: string; 
};

export default function OvertimeCard({ data, className }: Props) {
  return (
      <div className={`space-y-6 p-6 bg-card rounded-2xl shadow-md flex flex-col ${className}`}>
          <h2 className="text-position-text">Overtime</h2>
          <div className="grid grid-cols-1  gap-6 items-stretch">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              
              <div className="space-y-3 ">
                <h4 className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">Double OT</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <ReadOnlyField label="Double OT Hours" value={`0`} readonly={false} />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <ReadOnlyField label="Double OT Amount (per hour)" value={`Rs.${0}`} />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <ReadOnlyField label="Total Double OT" value={`Rs.${0}`} />
                </div>
              </div>

              <div className="space-y-3 ">
                <h4 className="text-position-text font-light w-full sm:w-32 md:w-40 text-sm sm:text-base">Single OT</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <ReadOnlyField label="Single OT Hours" value={`0`} readonly={false} />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <ReadOnlyField label="Single OT Amount (per hour)" value={`Rs.0`} />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <ReadOnlyField label="Total Single OT" value={`Rs.${data.overtimePay}`} />
                </div>
                </div>
            </div>

          </div>
        </div>
  )
}

