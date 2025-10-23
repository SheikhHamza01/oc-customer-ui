"use client"

import DataTable from "./DataTable"

interface DocumentsSectionProps {
  title: string
  columns: any[]
  data: any[]
}

export default function DocumentsSection({ title, columns, data }: DocumentsSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-color-light mb-4">{title}</h3>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
