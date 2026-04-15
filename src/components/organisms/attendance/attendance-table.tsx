import Table from "@/components/molecules/Table/table";
import type { Attendance } from "@/schemas/attendance.schema";

type AttendanceWithId = Attendance & { id: string | number } & {
  employeeName: string | null;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "PRESENT":
      return "green";
    case "ABSENT":
      return "red";
    case "LATE":
      return "orange";
    case "ON_LEAVE":
      return "blue";
    default:
      return "gray";
  }
};

const columns = [
  { header: "Date", accessor: (row: AttendanceWithId) => row.date },
  {
    header: "Employee Name",
    accessor: (row: AttendanceWithId) => row.employeeName,
  },
  {
    header: "Status",
    accessor: (row: AttendanceWithId) => (
      <span style={{ color: getStatusColor(row.status), fontWeight: 600 }}>
        {row.status}
      </span>
    ),
  },
  {
    header: "Check-In Time",
    accessor: (row: AttendanceWithId) =>
      row.checkIn === null ? "N/A" : row.checkIn,
  },
  {
    header: "Check-Out Time",
    accessor: (row: AttendanceWithId) =>
      row.checkOut === null ? "N/A" : row.checkOut,
  },
];

type AttendanceTableProps = {
  data: AttendanceWithId[];
};

export default function AttendanceTable({
  data: attendanceRecords,
}: AttendanceTableProps) {
  return <Table columns={columns} data={attendanceRecords} />;
}
