
import Chart from "../charts/Chart"

import React from "react"

import { Calendar28 } from "../date-picker/calender"

const RentalDuration = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date)
  return (
    <div className=" text-position-text ">
      
      <Chart
          label={"Rental Duration"}
          description={"Set the rental start and return dates"}
          height="h-auto"
        >
          <label htmlFor="orderdate" className="font-light">Start Date</label>
          <Calendar28/>
<br />
          <label htmlFor="orderdate" className="font-light">End Date</label>
          <Calendar28/>

        </Chart>
    </div>
  )
}

export default RentalDuration
