import { DatePickerInput } from "./DatePickerInput";

interface RentalDateRangePickerProps {
  startDate: {
    value?: Date
    onChange?: (date?: Date) => void
  }
  endDate: {
    value?: Date
    onChange?: (date?: Date) => void
  }
}

const RentalDateRangePicker = ({ startDate, endDate }: RentalDateRangePickerProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <DatePickerInput 
        label="Start Date"
        value={startDate.value}
        onChange={startDate.onChange}
      />

      <DatePickerInput 
        label="Expected Return Date"
        value={endDate.value}
        onChange={endDate.onChange}
      />
    </div>
  )
}

export default RentalDateRangePicker;
