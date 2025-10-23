import { useTheme } from "../../../contexts/themeContext";
import { MdOutlineDashboard } from "react-icons/md";
import { TbUserSquareRounded } from "react-icons/tb";
import { HiMiniUsers } from "react-icons/hi2";
import { TbFileSearch } from "react-icons/tb";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Sidebar = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState("Accounts");
    const menuItems = [
    { name: "Dashboard", icon: <MdOutlineDashboard className="text-[24px]" />,path: "/dashboard" },
    { name: "Profile", icon: <TbUserSquareRounded className="text-[24px]" /> },
    { name: "Accounts", icon: <HiMiniUsers className="text-[24px]" />,path: "/subscription/list" },
    { name: "Walk Through", icon: <TbFileSearch className="text-[24px]" /> },
  ];

   const handleClick = (item: any) => {
    setActiveItem(item.name);
    if (item.path) {
      navigate(item.path); // 🔹 navigate on click
    }
  };

  return (
  <aside className="w-[244px] min-h-screen flex flex-col gap-[24px]">
    <div className="h-[76px] flex items-center justify-center">
      <img src="/src/assets/OneConstellation.png" alt="Logo" className="h-[60px]" />
    </div>
    <nav className={`flex flex-col flex-1 gap-[16px] min-h-screen bg-color-sidebar-${theme} p-[24px] rounded-tr-[12px]`}>
      <div className="flex flex-col gap-[10px]">
        {menuItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleClick(item)}
              className={`flex items-center p-[16px] gap-[14px] rounded-[10px] cursor-pointer 
                ${
                  activeItem === item.name
                    ? `bg-color-active-sidebarItem-${theme} text-color-sidebarText-${theme} `
                    : `hover:bg-[#00b6e3]/20`
                }`}
            >
              <span
                className={`${
                  activeItem === item.name
                    ? `text-color-sidebarText-${theme}`
                    : `text-color-sidebarText-${theme}`
                }`}
              >
                {item.icon}
              </span>
              <h2
                className={`text-[18px] font-normal ${
                  activeItem === item.name
                    ? `text-color-sidebarText-${theme} `
                    : `text-color-sidebarText-${theme}`
                }`}
              >
                {item.name}
              </h2>
            </div>
          ))}
      
      </div>
      
    </nav>
  </aside>
);
}
export default Sidebar;