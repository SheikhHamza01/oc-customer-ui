"use client"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { useState } from "react"
import { FaUpload } from "react-icons/fa"

export default function BankForm() {
      const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) setFile(droppedFile)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) setFile(selectedFile)
  }

  const handleUpload = () => {
    if (!file) return
    alert(`Uploading: ${file.name}`)
  }

  const handleCancel = () => {
    setFile(null)
  }
  return (
   <div className="mt-4 bg-color-tableBody-light rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-color-light mb-2">Select Region *</label>
                  <Select >
                    <SelectTrigger className="border-color-light bg-white">
                      <SelectValue placeholder="United Kingdom" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="eu">European Union</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">Beneficiary Name *</label>
                    <Input className="border-color-light" placeholder="Enter Beneficiary Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">
                      Beneficiary Account Number/IBAN *
                    </label>
                    <Input className="border-color-light" placeholder="Enter Beneficiary Account Number/IBAN" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">Beneficiary Bank Name *</label>
                    <Input className="border-color-light" placeholder="Enter Beneficiary Bank Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">
                      Beneficiary Bank Swift/BIC/Sort Code *
                    </label>
                    <Input className="border-color-light" placeholder="Enter Beneficiary Bank Swift/BIC/Sort Code" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">Beneficiary Bank Currency *</label>
                    <Input className="border-color-light" placeholder="Enter Bank Currency" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">
                      Is This A Default Account For This Currency? *
                    </label>
                    <Select>
                      <SelectTrigger className="border-color-light bg-white">
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">Intermediary Bank Name *</label>
                    <Input className="border-color-light" placeholder="Enter Intermediary Bank Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">
                      Intermediary Bank Swift/BIC *
                    </label>
                    <Input className="border-color-light" placeholder="Enter Intermediary Bank Swift/BIC" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">ABA/Routing Number *</label>
                    <Input className="border-color-light" placeholder="Enter ABA/Routing Number" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">Bank Account Expiry Date *</label>
                    <Input className="border-color-light" type="date" placeholder="dd/mm/yyyy" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">
                      Beneficiary Bank Account Currency *
                    </label>
                    <Input className="border-color-light" placeholder="Enter Beneficiary Bank Account Currency" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">FFC A/C Name *</label>
                    <Input className="border-color-light" placeholder="Enter FFC A/C Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">Payment Reference</label>
                    <Input className="border-color-light" placeholder="Enter Payment Reference" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-color-light mb-2">Beneficiary Bank Address</label>
                    <Input className="border-color-light" placeholder="Enter Beneficiary Bank Address" />
                  </div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-color-light mb-2">Payment Reference</label>
            <Input className="border-color-light" placeholder="Enter Payment Reference" />
          </div>
          <div>
            <label className="block text-sm font-medium text-color-light mb-2">Beneficiary Bank Address</label>
            <Input className="border-color-light" placeholder="Enter Beneficiary Bank Address" />
          </div>
        </div>

        {/* Drag & Drop Upload */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition py-[5rem] ${
            isDragging ? "border-green-500 bg-green-50" : "border-gray-300"
          }`}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf"
            id="file-upload"
            className="hidden"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="flex flex-col items-center space-y-2">
            <FaUpload className="w-8 h-8 text-green-500" />
            {file ? (
              <p className="text-sm text-gray-700">{file.name}</p>
            ) : (
              <>
                <p className="text-sm text-gray-500">Drag & Drop Your Document here</p>
                <p className="text-xs text-gray-400">Max File Size: 7MB (PDF)</p>
              </>
            )}
          </label>
        </div>

        {/* Upload + Cancel Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-6"
            onClick={handleUpload}
            disabled={!file}
          >
            Upload
          </Button>
          <Button
            variant="outline"
            className="border-gray-300 text-gray-600 px-6"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>

                <Button className="bg-green-500 hover:bg-green-600 text-white">Add Bank</Button>
              </div>
            </div>
  )
}
