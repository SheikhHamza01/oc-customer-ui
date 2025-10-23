import type React from "react"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "completed" | "pending" | "paid" | "reading" | "signed"
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={cn("px-2 py-1 text-xs font-medium rounded-full", {
        "bg-green-100 text-green-800": status === "completed" || status === "paid",
        "bg-red-100 text-red-800": status === "pending" || status === "reading",
        "bg-blue-100 text-blue-800": status === "signed",
      })}
    >
      {children}
    </span>
  )
}
