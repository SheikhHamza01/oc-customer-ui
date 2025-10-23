'use client';
import { useTheme } from "../../../../contexts/themeContext";


interface UploadedTableProps {
  columns: string[];
  rows: any[];
  renderRow: (row: any) => React.ReactNode;
}

export const UploadedTable = ({ columns, rows, renderRow }: UploadedTableProps) => {
  const { theme } = useTheme();
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 rounded-lg">
        <thead className={`bg-color-tableHeader-${theme} text-color-tableHeader-${theme} h-[41px]`}>
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-4 py-3 text-center text-[14px] font-roboto font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows.map(renderRow)}</tbody>
      </table>
    </div>
  );
};
