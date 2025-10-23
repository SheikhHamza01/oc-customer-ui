"use client"

import { ReactNode } from "react"
import { useTheme } from "../../../../contexts/themeContext";

interface Column {
  key: string
  label: string
  render?: (row: any) => ReactNode
}

interface ReusableTableProps {
  columns: Column[]
  data: any[]
}

export default function ReusableTable({ columns, data }: ReusableTableProps) {
      const { theme } = useTheme();

  return (
    <div className="overflow-x-auto bg-white ">
      <table className="w-full">
        <thead>
          <tr className={`bg-color-tableHeader-${theme} text-color-tableHeader-${theme} h-[41px]`}>
            {columns.map((col) => (
              <th key={col.key}  className="p-[10px] font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr 
              key={idx} 
              className={`${
                idx % 2 === 0 
                  ? `bg-[#E9F6FF]` 
                  : `bg-[#D2E9F6]`
                  // : `bg-color-tableBody-${theme}`
              } text-color-icon-${theme} text-[12px] text-center`}
            >
              {columns.map((col) => (
                <td key={col.key} className={`p-[10px] font-medium`}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
