interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  actions?: (row: T) => React.ReactNode;
}

function Table<T extends { id: string | number }>({ columns, data, actions }: TableProps<T>) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="text-left p-2 border-b">
              {col.header}
            </th>
          ))}
          {actions && <th className="text-left p-2 border-b">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100 transition">
            {columns.map((col, idx) => (
              <td key={idx} className="p-2">
                {typeof col.accessor === "function" ? col.accessor(row) : (row[col.accessor] as React.ReactNode)}
              </td>
            ))}
            {actions && <td className="p-2">{actions(row)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
