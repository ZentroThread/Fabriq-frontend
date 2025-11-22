import { CheckCircle } from "lucide-react";
export  function SalaryHistory() {

    const salaryData = [
        { month: 'November', total: null, status: 'add' },
        { month: 'October', total: 'LKR 60,000', status: 'paid' },
        { month: 'September', total: 'LKR 60,000', status: 'paid' },
    ];

    return (
      <div className="w-full max-w-4xl mt-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-(--color-heading-text)">Salary History</h1>
          <p className="text-(--color-text) text-sm mt-1">
            View and manage your salary records.
          </p>
        </div>
        <div>
          <div className="flex flex-col items-center mb-6 md:flex-row md:items-start md:gap-4">
            <div className="w-20 h-20 rounded-full bg-avatar-bg border-2 border-(--color-avatar-border)" />
            <div>
               <h2 className="mt-4 text-xl font-semibold text-(--color-heading-text)">
                employee name
              </h2>
              <p className="text-position-text text-sm">role</p>
              </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-start">
            <select className="p-2 rounded-lg border border-(--color-border) bg-(--color-card) text-(--color-text)">
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
          </div>
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm">
          
            {/* Table Head */}
            <thead className="bg-(--color-card) border-b border-(--color-border)">
              <tr>
                <th className="text-left py-3 px-4 text-(--color-heading-text) font-semibold">Month</th>
                <th className="text-left py-3 px-4 text-(--color-heading-text) font-semibold">Total</th>
                <th className="text-left py-3 px-4 text-(--color-heading-text) font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {salaryData.map((salary) => (
                <tr key={salary.month} className="bg-(--color-card) border-b border-(--color-border) hover:bg-(--color-hover-bg) transition">
                  <td className="py-4 px-4 font-medium text-(--color-text)">{salary.month}</td>
                  <td className={`py-4 px-4 ${salary.total ? 'font-semibold text-(--color-heading-text)' : 'text-muted-foreground'}`}>
                    {salary.total ? salary.total : '--'}
                  </td>
                  <td className="py-4 px-4">
                    {salary.status === 'paid' ? (
                      <div className="flex items-center gap-4">
                        <CheckCircle className="w-5 h-5 text-green-500 text-(--color-text-active)" />
                      </div>
                    ) : (
                      <span className="text-(--color-text-active) font-medium cursor-pointer">
                        Add
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
  );
}
