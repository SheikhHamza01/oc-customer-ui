"use client"

import { Button } from "../../../../shared/components/ui/button"
import { Badge } from "../../../../shared/components/ui/badge"
import { FaEye, FaDownload, FaTrash } from "react-icons/fa"
import ReusableTable from "./ReusableTable"

export default function WalletsTable({ wallets }: { wallets: any[] }) {
  const columns = [
    { key: "id", label: "Crypto" },
    { key: "type", label: "Type" },
    { key: "exchange", label: "Exchange" },
    { key: "address", label: "Address" },
    {
      key: "status",
      label: "Document Upload Status",
      render: (row: any) => (
        <Badge className={row.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <div className="flex gap-2" style={{ justifyContent: 'center' }}>
          <Button className="p-1"><FaEye className="w-4 h-4" /></Button>
          <Button className="p-1"><FaDownload className="w-4 h-4" /></Button>
          <Button className="p-1 text-red-500"><FaTrash className="w-4 h-4" /></Button>
        </div>
      ),
    },
  ]

  return <ReusableTable columns={columns} data={wallets} />
}
