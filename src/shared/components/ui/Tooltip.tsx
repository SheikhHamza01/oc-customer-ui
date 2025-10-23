import React from "react";

interface TooltipProps {
  text: string;
  placement?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, placement = "top", children }) => {
  let positionClasses = "";

  switch (placement) {
    case "top":
      positionClasses = "bottom-full left-1/2 -translate-x-1/2 mb-1";
      break;
    case "bottom":
      positionClasses = "top-full left-1/2 -translate-x-1/2 mt-1";
      break;
    case "left":
      positionClasses = "right-full top-1/2 -translate-y-1/2 mr-1";
      break;
    case "right":
      positionClasses = "left-full top-1/2 -translate-y-1/2 ml-1";
      break;
    default:
      positionClasses = "bottom-full left-1/2 -translate-x-1/2 mb-1";
  }

  return (
    <div className="relative flex items-center group">
      {children}
      <span
        className={`absolute hidden group-hover:block px-2 py-1 text-[11px] 
          rounded bg-white text-black whitespace-nowrap z-10 ${positionClasses}`}
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
