"use client"

import { Button } from "../../../shared/components/ui/button"
import { FaCheckCircle } from "react-icons/fa"
import { useTheme } from "@/contexts/themeContext"
import { FaRegPenToSquare } from "react-icons/fa6"
import { Tooltip } from "../../../shared/components/ui/Tooltip"
import { useNavigate } from "react-router-dom"

interface SummaryProps {
  onBack: () => void
}

export function Summary({ onBack }: SummaryProps) {
  const { theme } = useTheme()
  const navigate = useNavigate();
  const completedSections = [
    { name: "Particular Form", completed: true, step: 2 },
    { name: "Document Upload", completed: true, step: 3 },
    { name: "Face Verification", completed: false, step: 4 },
     { name: "VCIP", completed: true, step: 5 },
    { name: "Bank/Wallets", completed: false, step: 6 },
    { name: "Application Document", completed: true, step: 7 },
  ]

  return (
    <div className={` bg-color-stepper-${theme} rounded-[12px] w-full p-[16px]`}>

     
        <div className="flex flex-col gap-[16px]">
          {completedSections.map((section, index) => (
            <div key={index} className={`flex items-center justify-between py-[10px] px-[20px] border-2  rounded-lg  ${section.completed ? `border-color-button-${theme}` : `border-color-steps-incomplete-${theme}`}`}>
              <span className={`font-medium text-color-muted-${theme}`}>{section.name}</span>
              <div className="flex items-center gap-[16px]">
                {section.completed ? (<p className={`text-color-activeAccounts-${theme}`}>Completed</p>) : ( <p className={`text-color-alertIcon-${theme}`}>Incomplete</p>)}
                <FaCheckCircle className={`${section.completed ? `text-color-activeAccounts-${theme}` : `text-color-alertIcon-${theme}`} w-5 h-5`} />
                 <Tooltip text="Edit" placement="top">
            <FaRegPenToSquare
             onClick={() => navigate(`/subscription/request?step=${section.step}`)}
              className={`text-color-muted-text-${theme} cursor-pointer`}
              size={18}
            />
            </Tooltip>
              </div>
            </div>
          ))}
        </div>

  
      </div>
   
  )
}
