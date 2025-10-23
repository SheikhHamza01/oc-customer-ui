"use client"
import { useTheme } from "../../../../contexts/themeContext";


interface Column {
  key: string
  label: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
}

export default function DataTable({ columns, data }: DataTableProps) {
        const { theme } = useTheme();
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
         <tr className={`bg-color-tableHeader-${theme} text-color-tableHeader-${theme} h-[41px] `}>
            {columns.map((col, i) => (
              <th key={i}  className="p-[10px] font-medium">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={`${
                rowIndex % 2 === 0 
                  ? `bg-[#E9F6FF]` 
                  : `bg-[#D2E9F6]`
                  // : `bg-color-tableBody-${theme}`
              } bg-color-tableBody-${theme} text-color-icon-${theme} text-[12px] text-center`}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}  className={`p-[10px] font-medium`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
