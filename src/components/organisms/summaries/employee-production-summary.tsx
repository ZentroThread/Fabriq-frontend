import {useEmployeeProdByEmpAndMonthYear} from '@/hooks/employee/productionRecord/useEmployeeProduction';

export default function EmpProductionSummary(props:{empId:number, month:number, year:number}) {
 
  const {data : prodByDate} = useEmployeeProdByEmpAndMonthYear(props.empId,String(props.month),String(props.year));
  
  return(
    <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md lg:col-span-2 flex flex-col">
      <h2 className="text-position-text">Production Summary</h2>
      <table className="w-full text-left overflow-x-auto gap-4">
        <thead>
          <tr className="border-b text-position-text font-extralight">
            <th className="py-3">Product Name</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {(prodByDate)?.map((prod) => (
            <tr
              key={prod.productionName + prod.date}
              className="border-b border-(--color-border) hover:bg-(--color-hover-bg) transition py-5"    
            >
              <td className="text-muted-foreground py-5">{prod.productionName}</td>
              <td className="text-(--color-text)">{prod.date}</td>
              <td className="text-(--color-text)">{prod.quantity}</td>
              <td className="text-(--color-text)">{prod.ratePerProduct}</td>
              <td className="text-(--color-text)">{prod.quantity * prod.ratePerProduct}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-position-text">Total Production: 
        Rs.{(prodByDate?.reduce((total, prod) => total + (prod.quantity * prod.ratePerProduct), 0) || 0)}</h2>
    </div>
  )
}
