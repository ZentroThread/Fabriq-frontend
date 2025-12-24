import Button from "@/components/atoms/button/add-button";
import { Calendar, Plus, Search, XCircle } from "lucide-react";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
//import { employees } from "@/constants/data";

import EmployeeCard from "@/components/molecules/cards/employee-card";
import { Input } from "@/components/ui/input";
import { useEmployees } from "@/hooks/employee/useEmployess";
import {useDeleteEmployee} from "@/hooks/employee/useDeleteEmployee";
//import {useEmployeeStore} from "@/store/employee-store";

export default function EmployeeOverview() {
  const navigate = useNavigate();

  const {data:employees,error,isLoading} = useEmployees();
  const {mutate:deleteEmployee} = useDeleteEmployee();
  //const {searchText,setSearchText} = useEmployeeStore();

  const [searchText, setSearchText] = useState("");

  const filteredEmployees = employees?.filter((emp) =>
    `${emp.empFirstName} ${emp.empLastName} ${emp.empCode}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-200 text-green-800";
      case "Leave":
        return "bg-yellow-200 text-yellow-700";
      case "Absent":
        return "bg-red-200 text-red-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const handleRowClick = (id: string | number) => {
    console.log("Clicked employee ID:", id);
    navigate(`/emp/${id}`);
  };

  const handleDeleteEmp = (code: string | number) => {
    console.log("Deleted employee ID:", code);
    if (confirm("Are you sure you want to delete this employee?"+code)) {
      deleteEmployee(code.toString());
    }
  };

  const getIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="text-green-600 w-5 h-5" />;
      case "Leave":
        return <Calendar className="text-yellow-600 w-5 h-5" />;
      case "Absent":
        return <XCircle className="text-red-600 w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-5 flex flex-col">
      {/* Header */}

      <div className="text-style text-[30px] font-semibold">
        Employee Management
      </div>
      <div className="text-position-text ">
        Manage staff, attendance, and payroll
      </div>

      <div className="flex gap-2 lg:mr-5 lg:ml-auto  sm:ml-0 sm:mr-auto">
        <Button text={"Add Employee"} width="w-45" icon={<Plus />} onClick={() => navigate("/add-employee")} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-5">
        <EmployeeCard lable={"Total Revenue"} lable1={"LKR 3.28M"} />
        <EmployeeCard lable={"Active Rentals"} lable1={"28"} />
        <EmployeeCard lable={"Attendance Rate"} lable1={"93%"} />
      </div>

      {/* Employee List */}
      <div className="rounded-2xl shadow-md p-6 bg-card overflow-auto">
        {/* List Header */}
        <div className="flex mb-6 md:flex-row flex-col gap-4">
          <div className="md:flex-1">
            <h2 className="text-xl font-semibold text-style">Employee List</h2>
            <p className="text-sm text-position-text">
              View and manage all employees
            </p>
          </div>

          {/* Search */}
          <div className="gap-2 flex pr-5 items-center relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-position-text pointer-events-none" />
            <Input 
              type="text"
              placeholder="Search employees..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

    
        {/* Table */}
        <table className="w-full text-left overflow-x-auto">
          <thead>
            <tr className="border-b text-position-text font-extralight">
              <th className="py-3">Employee</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees?.map((emp) => (
              <tr
                key={emp.empCode}
                className="border-b border-(--color-border) hover:bg-(--color-hover-bg) transition "    
              >
                <td className="py-4 flex items-center gap-3 text-(--color-text)">
                  <div className="w-10 h-10 rounded-full bg-avatar-bg border border-(--color-avatar-border) flex items-center justify-center font-semibold">
                    {emp.empFirstName.charAt(0)}{emp.empLastName.charAt(0)}
                  </div>
                  {emp.empFirstName} {emp.empLastName}
                </td>

                <td className="text-muted-foreground">{emp.role}</td>
                <td className="text-(--color-text)">{emp.mobileNumber}</td>
                <td className="text-(--color-text)">LKR {emp.basicSalary}</td>

                <td
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium 
                ${getStatusStyle("present")}`}
                >
                  {getIcon("present")}
                  {"present"}
                </td>

                <td className="text-muted-foreground">{emp.joinedDate}</td>

                <td className="flex gap-4 text-xl">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="text-[#d1a47c] w-5 h-5" />
                    <Pencil className="text-[#d1a47c] w-5 h-5 cursor-pointer" onClick={() => handleRowClick(emp.empCode)}/>
                    <Trash2 className="text-[#fa7f83] w-5 h-5 cursor-pointer" onClick={() => handleDeleteEmp(emp.empCode)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
