import { useTheme } from "../../contexts/themeContext";
import AccountCard from "./components/accountCard";
import { FiSearch } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Header } from "../../shared/components/ui/header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AccountList = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
    const [filterType, setFilterType] = useState("all"); 

     const accounts = [
    { type: "Standalone" },
    { type: "Corporate" },
    { type: "Joint Account" },
  ];

  const filteredAccounts =
    filterType === "all"
      ? accounts
      : accounts.filter((acc) =>
          acc.type.toLowerCase().includes(filterType.toLowerCase())
        );

  return (
    <section className="flex flex-col gap-[24px]">
      <Header title="My Accounts" showSearch={true} />
      <div className={`flex flex-col gap-5`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative w-[254px]">
              <input
                className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[6px] h-[40px] pl-[8px] text-[12px] text-color-muted-${theme} placeholder-color-${theme} placeholder-opacity-70 w-full`}
                placeholder="Search Accounts"
              />
              <FiSearch
                size={18}
                className={`absolute right-[10px] top-1/2 -translate-y-1/2 text-color-icon-${theme}`}
              />
            </div>
            <div className="relative w-[190px]">
              <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
                className={`appearance-none bg-color-inputField-${theme} border border-color-${theme} rounded-[6px] h-[40px] px-[20px] text-[16px] text-color-muted-${theme} placeholder-color-${theme} w-[190px]`}
              >
                <option value="all">All</option>
                 <option value="standalone">Standalone</option>
                 <option value="corporate">Corporate</option>
                 <option value="joint">Joint</option>

              </select>
              <IoIosArrowDown
                size={18}
                className={`absolute right-[10px] top-1/2 -translate-y-1/2 text-color-icon-${theme}`}
              />
            </div>
            <button
              className={`relative flex items-center justify-between gap-[10px] bg-color-inputField-${theme} border border-color-${theme} rounded-[6px] h-[40px] px-[12px] text-[16px] text-color-muted-${theme} w-[156px]`}
            >
              <span className="ml-2">More Filters</span>
              <CiFilter
                size={20}
                className={`text-color-filterIcon-${theme}`}
              />
            </button>
          </div>

          <button
            className={`bg-color-createAccountButton-${theme} text-color-createAccountButton-${theme} px-[20px] h-[44px] rounded-[8px] font-[500px] text-[20px]`}
      onClick={() => navigate("/subscription/request")}
          >
            Create an Account
          </button>
        </div>
        <div className={`flex justify-between items-center gap-4 px-[16px] w-full`}>
          <div
            className={`p-[10px] w-full text-color-icon-${theme} text-[14px]`}
          >
            <span>Showing 3 of 30 accounts</span>
          </div>

          <div className="flex justify-end items-center gap-[8px] w-full ">
            <div className="flex gap-1 items-center p-[10px] h-[36px]">
              <span className={`text-color-activeAccounts-${theme}`}>Active</span>
              <span className={`text-color-icon-${theme}`}>: 0</span>
            </div>
           <div className="flex gap-1 items-center p-[10px] h-[36px]">
              <span className={`text-color-draftAccounts-${theme}`}>Draft</span>
              <span className={`text-color-icon-${theme}`}>: 3</span>
            </div>
            <div className="flex gap-1 items-center p-[10px] h-[36px]">
              <span className={`text-color-pendingAccounts-${theme}`}>Pending</span>
              <span className={`text-color-icon-${theme}`}>: 10</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {/* <AccountCard type="Standalone" />
        <AccountCard type="Corporate" />
        <AccountCard type="Joint Account" /> */}
        {filteredAccounts.map((acc, i) => (
          <AccountCard key={i} type={acc.type} />
        ))}
      </div>
    </section>
  );
};

export default AccountList;
