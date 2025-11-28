import RentalDateRangePicker from "@/components/molecules/input/RentalDateRangePicker"
import Chart from "../charts/Chart"

const RentalDuration = () => {
  return (
    <div className=" text-position-text">
      
      <Chart
          label={"Rental Duration"}
          description={"Set the rental start and return dates"}
          height="h-auto"
        >
          <RentalDateRangePicker startDate={{}} endDate={{}} />

        </Chart>
    </div>
  )
}

export default RentalDuration
