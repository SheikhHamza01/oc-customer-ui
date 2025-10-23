"use client";

import { ReactNode } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useTheme } from "../../../../contexts/themeContext";

interface SectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export const Section = ({ title, isOpen, onToggle, children }: SectionProps) => {
    const { theme } = useTheme();
  return (
    <>
    <div className={`bg-color-stepper-${theme} rounded-[12px] p-[16px]`}>
    <div className={`bg-color-inputField-${theme} border border-color-${theme} text-color-muted-${theme} cursor-pointer items-center justify-between px-[20px] rounded-[8px] gap-[8px] mb-[16px]`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-3 rounded-t-lg"
      >
        <span className={`font-medium font-roboto text-color-muted-${theme} text-[18px]`}>{title}</span>
        {isOpen ? <FaChevronDown className={`w-3 h-3 text-color-icon-${theme}`}/> :
         <FaChevronRight className={`w-3 h-3 text-color-icon-${theme}`}/>}
      </button>
    </div>
    <div>
        {isOpen && <div className="p-4">{children}</div>}
    </div>
    </div>
    </>
  );
};
