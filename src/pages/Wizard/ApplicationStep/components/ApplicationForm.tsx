"use client"

import { useState } from "react"
import { Button } from "../../../../shared/components/ui/button"
import { Input } from "../../../../shared/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/components/ui/select"

export default function ApplicationForm() {
  const [selectedApplication, setSelectedApplication] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("")

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-color-light mb-4">Choose your Application</h3>

      <Select value={selectedApplication} onValueChange={setSelectedApplication}>
        <SelectTrigger className="w-full mb-4 border-color-light bg-white">
          <SelectValue placeholder="Choose application to sign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="subscription">Subscription Agreement</SelectItem>
          <SelectItem value="usdc">USDC (ERC-20)</SelectItem>
        </SelectContent>
      </Select>

      <div className="bg-color-tableBody-light rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4">
        <div>
          <label className="block text-sm font-medium font-roboto text-color-light mb-2">Amount *</label>
          <Input
          className="border-color-light"
            placeholder="Enter Investment / Commitment Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-roboto font-medium text-color-light mb-2">Currency *</label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="border-color-light bg-white">
              <SelectValue placeholder="Select Currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="bg-green-500 hover:bg-green-600 text-white px-8">Sign</Button>
    </div>
  )
}
