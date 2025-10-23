import type React from "react"
import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ className, children, loading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md border border-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    )
  },
)

SecondaryButton.displayName = "SecondaryButton"
