import React from "react";

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
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b text-position-text font-extralight">
            {columns.map((col, idx) => (
              <th key={idx} className="py-3 px-2">
                {col.header}
              </th>
            ))}
            {actions && <th className="py-3 px-2">Actions</th>}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="border-b border-(--color-border) hover:bg-(--color-hover-bg) transition"
            >
              {columns.map((col, idx) => (
                <td key={idx} className="py-4 px-2 text-(--color-text)">
                  {typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}

              {actions && <td className="py-4 px-2 flex gap-4">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
