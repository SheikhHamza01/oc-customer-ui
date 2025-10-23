import { ReactNode } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useTheme } from "../../../../contexts/themeContext";

interface SectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

const Section = ({ title, isOpen, onToggle, children }: SectionProps) => {
  const {theme} = useTheme()
  return (
    <div className="flex flex-col gap-[8px]">
      <div
        className={`bg-color-inputField-${theme} border border-color-${theme} text-color-muted-${theme} cursor-pointer flex items-center justify-between py-[10px] px-[20px] rounded-[8px]`}
        onClick={onToggle}
      >
        <span className={`font-medium text-color-muted-${theme} text-[18px]`}>{title}</span>
        {isOpen ? (
          <FaChevronUp className={`w-3 h-3 text-color-icon-${theme}`} />
        ) : (
          <FaChevronDown className={`w-3 h-3 text-color-icon-${theme}`} />
        )}
      </div>
      {isOpen && (
        <div className={`p-[16px] rounded-[8px] bg-color-tableBody-${theme}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Section;
