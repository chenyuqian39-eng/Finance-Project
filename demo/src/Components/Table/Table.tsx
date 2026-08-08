import type { ReactNode } from "react";

export interface TableColumn<T> {
  label: string;
  render: (row: T) => ReactNode;
}

interface Props<T> {
  data: readonly T[];
  columns: readonly TableColumn<T>[];
  getRowKey: (row: T) => string;
}

const Table = <T,>({ data, columns, getRowKey }: Props<T>) => (
  <div className="overflow-x-auto rounded-lg bg-white shadow">
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.label}
              scope="col"
              className="whitespace-nowrap p-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500"
            >
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {data.map((row) => (
          <tr key={getRowKey(row)} className="hover:bg-slate-50">
            {columns.map((column) => (
              <td
                key={column.label}
                className="whitespace-nowrap p-4 text-sm text-slate-900"
              >
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
