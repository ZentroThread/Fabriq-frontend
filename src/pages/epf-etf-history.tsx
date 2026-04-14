import { useState } from "react";
import EtfRecordTable from "@/components/organisms/payroll/etf-record-table";
import { EpfEtfHistorySkeleton } from "@/components/molecules/skeletons/epf-etf-history-skeleton";
import EpfRecordTable from "@/components/organisms/payroll/epf-record-table";
import {
  useGetEpfRecord,
  useGetEtfRecord,
} from "@/hooks/employee/payroll/usePayroll";
import MonthYearSelect from "@/components/organisms/selection/month-years-select";
import SectionHeader from "@/components/molecules/header/section-header";
import { currentMonth, currentYear } from "@/utils/date";
import CustomButton from "@/components/atoms/button/custom-button";

export default function EpfEtfHistoryPage() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [activeTab, setActiveTab] = useState<"EPF" | "ETF">("EPF");

  const { data: epfRecords, isLoading: epfLoading } = useGetEpfRecord(
    Number(selectedMonth),
    Number(selectedYear)
  );
  const { data: etfRecords, isLoading: etfLoading } = useGetEtfRecord(
    Number(selectedMonth),
    Number(selectedYear)
  );

  if (epfLoading || etfLoading) {
    return <EpfEtfHistorySkeleton />;
  }

  return (
    <div className="space-y-6 p-6 bg-(--color-main-bg) min-h-screen">
      {/* Header */}
      <SectionHeader
        title="EPF & ETF History"
        description="View the history of Employees' Provident Fund (EPF) and Employees' Trust Fund (ETF) contributions for selected months and years."
      />

      {/* Month & Year Selector Card */}
      <div className="bg-(--color-card) p-5 rounded-xl shadow-md flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <MonthYearSelect
          month={selectedMonth}
          year={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
      </div>

      {/* Tabs Card */}
      <div className="bg-(--color-card) rounded-xl shadow-md">
        {/* Tabs */}
        <div className="flex border-b border-(--color-border) rounded-t-xl overflow-hidden py-1 px-2 gap-4">
          {["EPF", "ETF"].map((tab) => (
            <CustomButton
              key={tab}
              text={`${tab} Records`}
              onClick={() => setActiveTab(tab as "EPF" | "ETF")}
              width="flex-1"
              height="h-10"
              padding="py-2"
              textcolor={
                activeTab === tab
                  ? "text-[var(--color-text-active)]"
                  : "text-[var(--color-position-text)]"
              }
              bgcolor={
                activeTab === tab
                  ? "bg-[var(--color-card)] shadow-inner"
                  : "bg-[var(--color-sidebar-button-inactive)]"
              }
              hoverbg={
                activeTab === tab ? "" : "hover:bg-[var(--color-hover-bg)]"
              }
            />
          ))}
        </div>

        {/* Table Container */}
        <div className="p-6">
          {activeTab === "EPF" ? (
            <EpfRecordTable data={epfRecords || []} />
          ) : (
            <EtfRecordTable data={etfRecords || []} />
          )}
        </div>
      </div>
    </div>
  );
}
