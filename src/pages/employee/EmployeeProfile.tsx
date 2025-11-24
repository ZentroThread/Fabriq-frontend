import { useNavigate } from "react-router-dom";

export default function EmployeeProfile() {

const navigate = useNavigate();

  const showSalaryHistory = (id: String) => {
    navigate(`/salary-history/${id}`);
  };

  return (
    <div className="min-h-screen bg-main-bg flex justify-center py-10">
      <div className="w-full max-w-lg bg-(--color-card) shadow-lg rounded-2xl p-8">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full bg-avatar-bg border-4 border-(--color-avatar-border)" />
          <h2 className="mt-4 text-xl font-semibold text-(--color-heading-text)">
            employee name
          </h2>
          <p className="text-position-text text-sm">role</p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-y-4 text-(--color-text)">
          <p className="font-medium">Employee Name</p>
          <p>John Doe</p>

          <p className="font-medium">Employee ID</p>
          <p>10345</p>

          <p className="font-medium">Role</p>
          <p>Manager</p>

          <p className="font-medium">Address</p>
          <p>Colombo</p>

          <p className="font-medium">District</p>
          <p>Gampaha</p>

          <p className="font-medium">Date of Birth</p>
          <p>1995-06-22</p>

          <p className="font-medium">Age</p>
          <p>29</p>

          <p className="font-medium">Gender</p>
          <p>Male</p>

          <p className="font-medium">Joined Date</p>
          <p>2020-08-10</p>

          <p className="font-medium">Bank Acc Number</p>
          <p>12345678</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button 
            onClick={() => showSalaryHistory("1")} 
            className="px-4 py-2 bg-(--color-secondary) hover:bg-(--color-hover-bg) rounded-lg shadow"
            >
            Salary History
          </button>
          <button className="px-4 py-2 bg-(--color-secondary) hover:bg-(--color-hover-bg) rounded-lg shadow">
            Leave History
          </button>
        </div>

        {/* Update button */}
        <button className="w-full mt-6 py-3 bg-support-button hover:bg-(--color-support-button-hover) text-(--color-support-button-text) rounded-xl shadow">
          Update
        </button>
      </div>
    </div>
  );
}
