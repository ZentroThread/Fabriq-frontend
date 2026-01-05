import MonthYearSelect from "@/components/organisms/selection/month-years-select";
import SectionHeader from "@/components/molecules/header/section-header";
import SingleDatePicker from "@/components/organisms/calender/single-date-picker";

type EmployeeMonthlyPageTemplateProps = {

  title: string;
  description?: string;

  form: React.ReactNode;
  table: React.ReactNode;

  selectedDay: Date | null;
  onDaySelect: (date: Date | null) => void;

  selectedMonth: string;
  selectedYear: string;
  onMonthChange: (month: string) => void;
  onYearChange: (year: string) => void;

};

export default function EmployeeMonthlyPageTemplate(props: EmployeeMonthlyPageTemplateProps) {
  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8">

      {/* Header */}
      <SectionHeader
        title={props.title}
        description={props.description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

         {/* Form Section */}
        <div className="lg:col-span-2 ">
          {props.form}
        </div>

         {/* Calendar Section */}
         <div className="lg:col-span-1">
           <SingleDatePicker
              selectedDay={props.selectedDay}
              onDaySelect={props.onDaySelect}
            />
         </div>

      </div>

      {/* Table Section */}
      <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md lg:col-span-2 flex flex-col">
        <MonthYearSelect
          month={props.selectedMonth}
          year={props.selectedYear}
          onMonthChange={props.onMonthChange}
          onYearChange={props.onYearChange}
          yearRange={5}
        />
        {props.table}
      </div>
      
    </div>

  )
}
