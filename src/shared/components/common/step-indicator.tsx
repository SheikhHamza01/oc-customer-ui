import { cn } from "@/lib/utils"

interface Step {
  id: number
  title: string
  completed: boolean
  active: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center space-x-8 py-6 bg-gray-50">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-center space-y-2">
          <div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              step.completed
                ? "bg-cyan-600 text-white"
                : step.active
                  ? "bg-cyan-600 text-white"
                  : index === currentStep
                    ? "bg-cyan-100 text-cyan-800"
                    : "bg-gray-200 text-gray-600",
            )}
          >
            {step.id}
          </div>
          <span className="text-xs text-gray-600 text-center max-w-20">{step.title}</span>
        </div>
      ))}
    </div>
  )
}
