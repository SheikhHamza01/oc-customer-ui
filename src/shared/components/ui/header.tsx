"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { MdNotifications, MdDarkMode, MdLogout } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { useTheme } from "../../../contexts/themeContext";
import { FiSearch } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import { FaArrowRightFromBracket } from "react-icons/fa6";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subTitle?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  actions?: React.ReactNode;
  showSearch?: boolean; 
  fundLogo?: string;
}

export function Header({
  title,
  subTitle,
  breadcrumbs,
  actions,
  className,
  showSearch = false,
  fundLogo,
  ...props
}: HeaderProps) {
  const { theme } = useTheme();
  return (
    <header
      className={[
        `flex items-center justify-between px-6 transition-colors bg-color-header-${theme} rounded-[12px] h-[76px] py-[16px] px-[20px]`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <div className="flex items-center gap-[24px]">
        {fundLogo && (
          <img src={fundLogo} alt="Fund Logo" className="h-[60px] rounded-md" />
        )}
        <h1
          className={`uppercase text-[22px] font-roboto font-bold text-color-accountType-${theme}`}
        >
          {title}
        </h1>
        {subTitle && (
          <>
          <h1
          className={`uppercase text-[22px] font-roboto font-bold text-color-accountType-${theme}`}
        >
          |
        </h1>
          <h1
          className={`uppercase text-[22px] font-roboto font-bold text-color-activeAccounts-${theme}`}
        >
          {subTitle}
        </h1>
        </>
        )}
        {showSearch && (
        <div className="relative w-[254px]">
          <input
            className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[6px] h-[40px] pl-[8px] text-[12px] text-color-muted-${theme} placeholder-color-${theme} placeholder-opacity-70 w-full`}
            placeholder="Search Region"
          />
          <div
            className={`absolute right-0 top-0 h-[40px] w-[40px] flex items-center justify-center border-r border-t border-b border-color-${theme} bg-color-createAccountButton-${theme} rounded-r-[6px]`}
          >
            <FiSearch size={18} className={`text-color-tableHeader-${theme}`} />
          </div>
        </div>
        )}
      </div>

      <div className="flex items-center gap-[30px]">
        <div className="flex items-center gap-[10px]">
          <img src="/src/assets/logo.png" alt="Logo" className="h-[31px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-[5px]">
                <span
                  className={`text-color-muted-${theme} text-[16px] font-normal`}
                >
                  Maria Amin
                </span>
                <IoIosArrowDown size={20} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <MdNotifications className="mr-2 h-4 w-4" />
                Notifications
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdLogout className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex gap-[20px]">
          <FiMoon size={20} className={`text-color-accountType-${theme}`} />
          <FaArrowRightFromBracket
            size={20}
            className={`text-color-alertIcon-${theme}`}
          />
        </div>
      </div>
    </header>
  );
}
