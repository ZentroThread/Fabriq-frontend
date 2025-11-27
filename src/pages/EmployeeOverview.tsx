import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Search, XCircle } from "lucide-react";
import { CheckCircle, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeOverview() {

  const navigate = useNavigate();

  const employees = [
    { initials: "NP",id:"1", name: "Nimal Perera", role: "Sales Assistant", phone: "077-2345678", salary: "38,000", status: "Present", joinDate: "2024-02-20" },
    { initials: "KF",id:"2", name: "Kumari Fernando", role: "Sales Assistant", phone: "077-3456789", salary: "38,000", status: "Leave", joinDate: "2024-03-10" },
    { initials: "RD",id:"3", name: "Roshan Dias", role: "Stock Manager", phone: "077-4567890", salary: "50,000", status: "Present", joinDate: "2023-11-05" },
    { initials: "SW",id:"4", name: "Sanduni Wijesinghe", role: "Designer", phone: "077-5678901", salary: "55,000", status: "Absent", joinDate: "2024-04-01" },
  ];
  

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
    <div className="p-6 space-y-10 bg-(--main-bg) min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center md:flex-row flex-col gap-4">
        <h1 className="text-3xl font-semibold text-(--color-heading-text)">
          Employee Management
        </h1>

        <Button className="rounded-xl px-5 py-2 bg-support-button text-support-button-text hover:bg-support-button-hover">
          + Add Employee
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card className="rounded-2xl shadow-md bg-(--color-card) text-(--color-card-foreground) border-(--color-border)">
          <CardContent className="p-6">
            <p className="text-muted-foreground ">Total Employees</p>
            <p className="text-2xl font-semibold mt-2">{employees.length}</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md bg-(--color-card) text-(--color-card-foreground) border-(--color-border)">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Present Today</p>
            <p className="text-2xl font-semibold mt-2">2 / 4</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-md bg-(--color-card) text-(--color-card-foreground) border-(--color-border)">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Total Monthly Salary</p>
            <p className="text-2xl font-semibold mt-2">LKR 181,000</p>
          </CardContent>
        </Card>

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
