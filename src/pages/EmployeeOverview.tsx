
import  Button  from "@/components/atoms/button/add-button";
import { Calendar, Plus, Search, XCircle } from "lucide-react";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { employees } from "@/constants/data";

import EmployeeCard from "@/components/molecules/cards/employee-card";

export default function EmployeeOverview() {

  const navigate = useNavigate();

  
  

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

  const handleRowClick = (id: string) => {
   console.log("Clicked employee ID:", id);
   navigate(`/emp/${id}`);
  } 
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
      <div className="flex justify-between items-center md:flex-row flex-col gap-4">
        <div className="text-style text-[30px] font-semibold">
        Employee Management
      </div>
      <div className="text-position-text ">
        Manage staff, attendance, and payroll
      </div>

        <div className="flex gap-2 lg:mr-5 lg:ml-auto  sm:ml-0 sm:mr-auto">
        <Button text={"Add New Item"} width="w-45" icon={<Plus />} />
      </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-5">
        <EmployeeCard
          lable={"Total Revenue"}
          lable1={"LKR 3.28M"}
          
          
        />
        <EmployeeCard
          lable={"Active Rentals"}
          lable1={"28"}
          
          
         
        />
        <EmployeeCard
          lable={"Attendance Rate"}
          lable1={"93%"}
          
         
          
        />
        
      </div>

      {/* Employee List */}
      <div className="rounded-2xl shadow-md p-6 bg-(--color-layout-bg) overflow-auto">

        {/* List Header */}
        <div className="flex justify-between items-center mb-6 md:flex-row flex-col gap-4">
          <div className="md:flex-1">
            <h2 className="text-xl font-semibold text-(--color-heading-text)">Employee List</h2>
            <p className="text-sm text-muted-foreground">
              View and manage all employees
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center border border-(--color-border) rounded-xl px-4 py-2 bg-(--color-sidebar-button-inactive)">
            <Search className="w-5 h-5 text-(--muted-foreground)" />
            <input
              type="text"
              placeholder="Search employees..."
              className="bg-transparent focus:outline-none ml-2 text-(--color-foreground)"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left overflow-x-auto">
          <thead>
            <tr className="border-b border-(--color-border) text-muted-foreground">
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
            {employees.map((emp, index) => (
              <tr
                key={index}
                className="border-b border-(--color-border) hover:bg-(--color-hover-bg) transition cursor-pointer"
                onClick={()=>handleRowClick(emp.id)}
              >
                <td className="py-4 flex items-center gap-3 text-(--color-text)">
                  <div className="w-10 h-10 rounded-full bg-avatar-bg border border-(--color-avatar-border) flex items-center justify-center font-semibold">
                    {emp.initials}
                  </div>
                  {emp.name}
                </td>

                <td className="text-muted-foreground">{emp.role}</td>
                <td className="text-(--color-text)">{emp.phone}</td>
                <td className="text-(--color-text)">LKR {emp.salary}</td>

                <td className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium 
                ${getStatusStyle(
                      emp.status
                    )}`}>
                  {getIcon(emp.status)}
                  {emp.status} 
                </td>

                <td className="text-muted-foreground">{emp.joinDate}</td>

                <td className="flex gap-4 text-xl">
                  <div className="flex items-center gap-4">
                    <CheckCircle className="text-[#d1a47c] w-5 h-5" />
                    <Pencil className="text-[#d1a47c] w-5 h-5" />
                    <Trash2 className="text-[#fa7f83] w-5 h-5" />
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
