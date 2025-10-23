"use client"

import { FaBell } from "react-icons/fa"
import { MdDarkMode } from "react-icons/md"
import { FiExternalLink } from "react-icons/fi"

export function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg leading-tight">ONE</span>
              <span className="text-gray-600 text-xs leading-tight">CONSTELLATION</span>
            </div>
          </div>

          {/* Fund Info */}
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-4 h-4 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              </svg>
            </div>
            <span className="text-gray-600">First Sentier</span>
            <span className="text-gray-600">Investors</span>
            <span className="font-semibold text-blue-600 ml-4">FSI FUND</span>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">M</span>
            </div>
            <span className="text-gray-700 font-medium">Maria Amin</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FaBell className="w-5 h-5 text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 text-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">1</span>
              </div>
            </div>
            <MdDarkMode className="w-5 h-5 text-gray-400" />
            <FiExternalLink className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  )
}
