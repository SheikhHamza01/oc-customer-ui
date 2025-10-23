"use client"

import { useState, ReactNode } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

interface CollapsibleSectionProps {
  title: string
  children: ReactNode
}

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg border border-gray-500 shadow-sm mb-4">
      <button
        className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-color-light"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <FaChevronUp className="w-4 h-4" /> : <FaChevronDown className="w-4 h-4" />}
      </button>
      {open && <div className="p-4 border-t border-gray-200">{children}</div>}
    </div>
  )
}
