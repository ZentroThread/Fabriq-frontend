import {useGetAdvanceByEmpAndMonthYear} from '@/hooks/employee/useEmployeeAdvance';

export default function EmpAdvancePaymentSummary(props:{empId:number, year:number, month:number}) {

const {data: fetchedAdvancePayments} = useGetAdvanceByEmpAndMonthYear(props.empId, props.year.toString(), props.month.toString());

  return(
    <div className="space-y-6 p-6 bg-card rounded-2xl shadow-md lg:col-span-2 flex flex-col">
      <h2 className="text-position-text">Advance Payment Summary</h2>
      <div>
        <table className="w-full text-left overflow-x-auto gap-4">
          <thead>
            <tr className="border-b text-position-text font-extralight">    
              <th className="py-3">Date</th>
              <th >Reason for Advance Payment</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {(fetchedAdvancePayments)?.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-(--color-border) hover:bg-(--color-hover-bg) transition py-5"    
              >
                <td className="text-(--color-text)">{payment.date}</td>  
                <td className="text-muted-foreground py-5">{payment.reason}</td>
                <td className="text-(--color-text)">{payment.amount}</td>

              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="text-position-text">Total Advance Payments: 
          Rs.{(fetchedAdvancePayments?.reduce((total, payment) => total + payment.amount, 0) || 0)}</h2>
      </div>
    </div>
  )
}
