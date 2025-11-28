import RentalDateRangePicker from "@/components/molecules/input/RentalDateRangePicker"

const RentalDuration = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow text-position-text">
      <h2 className="text-2xl text-style mb-2">Rental Duration</h2>
      <p className="mb-6 text-position-text">Set the rental start and return dates</p>

      <RentalDateRangePicker startDate={{}} endDate={{}} />
      
    </div>
  )
}

export default RentalDuration
