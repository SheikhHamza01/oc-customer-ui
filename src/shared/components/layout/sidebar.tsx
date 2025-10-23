"use client"

import { MdDashboard } from "react-icons/md"
import { FaUser } from "react-icons/fa"
import { MdCreditCard } from "react-icons/md"
import { FaRoute } from "react-icons/fa"
import { MdSwapHoriz } from "react-icons/md"

export function Sidebar() {
  const sidebarItems = [
    { icon: MdDashboard, label: "Dashboard", active: true },
    { icon: FaUser, label: "Profile", active: false },
    { icon: MdCreditCard, label: "Accounts", active: false },
    { icon: FaRoute, label: "Walkthrough", active: false },
    { icon: MdSwapHoriz, label: "Switch", active: false },
  ]

  return (
    <aside className="w-64 bg-cyan-700 min-h-screen">
      <nav className="py-6">
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center space-x-3 px-6 py-3 text-white hover:bg-cyan-800 cursor-pointer ${
              item.active ? "bg-cyan-800 border-r-4 border-white" : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}
