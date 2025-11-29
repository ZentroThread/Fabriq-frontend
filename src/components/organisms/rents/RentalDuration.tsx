import RentalDateRangePicker from "@/components/molecules/input/rentalDateRangePicker"

const RentalDuration = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl text-style mb-2">Rental Duration</h2>
      <p className="text-muted-foreground mb-6">Set the rental start and return dates</p>

      <RentalDateRangePicker startDate={{}} endDate={{}} />
      
    </div>
  )
}

export default RentalDuration
