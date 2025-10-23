"use client"

import { Button } from "../../../shared/components/ui/button"
import ApplicationForm from "./components/ApplicationForm"
import DocumentsSection from "./components/DocumentSection"
import { Badge } from "../../../shared/components/ui/badge"
import { FaEye, FaDownload, FaTrashAlt } from "react-icons/fa"

interface ApplicationProps {
  onNext: () => void
  onBack: () => void
}

export function Application({ onNext, onBack }: ApplicationProps) {
  const applicationDocuments = [
    { type: "Subscription Agreement", date: "22.7.2025", amount: "TBC", currency: "USD", status: "Pending", eSign: "Yes", deadline: "22.7.2025" },
    { type: "USDC (ERC-20)", date: "22.7.2025", amount: "100", currency: "USD", status: "Pending", eSign: "Yes", deadline: "22.7.2025" },
  ]

  const transactionDocuments = [
    { type: "Subscription Agreement", shares: "Lorem Ipsum", currency: "USD", remarks: "Lorem Ipsum", status: "Live", date: "22.7.2025" },
    { type: "USDC (ERC-20)", shares: "Lorem Ipsum", currency: "USD", remarks: "Lorem Ipsum", status: "Pending", date: "22.7.2025" },
  ]

  const applicationColumns = [
    { key: "type", label: "Document Type" },
    { key: "date", label: "Date" },
    { key: "amount", label: "Amount" },
    { key: "currency", label: "Currency" },
    { key: "status", label: "Status", render: (val: string) => <Badge>{val}</Badge> },
    { key: "eSign", label: "E-Sign" },
    { key: "deadline", label: "Deadline" },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="flex gap-2">
          <Button className="p-1"><FaEye className="w-4 h-4" /></Button>
          <Button className="p-1"><FaDownload className="w-4 h-4" /></Button>
          <Button className="p-1 text-red-500"><FaTrashAlt className="w-4 h-4" /></Button>
        </div>
      ),
    },
  ]

  const transactionColumns = [
    { key: "type", label: "Document Type" },
    { key: "shares", label: "No. Of Shares" },
    { key: "currency", label: "Currency" },
    { key: "remarks", label: "Compliance Remarks" },
    { key: "status", label: "Status", render: (val: string) => <Badge>{val}</Badge> },
    { key: "date", label: "Date" },
    {
      key: "actions",
      label: "Actions",
      render: () => (
        <div className="flex gap-2">
          <Button className="p-1"><FaEye className="w-4 h-4" /></Button>
          <Button className="p-1"><FaDownload className="w-4 h-4" /></Button>
          <Button className="p-1 text-red-500"><FaTrashAlt className="w-4 h-4" /></Button>
        </div>
      ),
    },
  ]

  return (
    <div className="flex-1 p-8 bg-color-stepper-light">
      <div className="mx-auto space-y-6">

        <ApplicationForm />

        <DocumentsSection title="Application Documents" columns={applicationColumns} data={applicationDocuments} />

        <DocumentsSection title="Transaction Documents" columns={transactionColumns} data={transactionDocuments} />
      </div>

    </div>
  )
}
