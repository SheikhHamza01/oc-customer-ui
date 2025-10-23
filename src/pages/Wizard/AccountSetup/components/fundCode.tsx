"use client";
import React, { useState } from "react";
import { useTheme } from "../../../../contexts/themeContext";
import { TbAlertTriangleFilled, TbBrowserPlus } from "react-icons/tb";
import { LiaUserEditSolid } from "react-icons/lia";
import { FiSearch } from "react-icons/fi";
import { LuInfo } from "react-icons/lu";


interface FundCodeProps {
  fundCode: string;
  setFundCode: (value: string) => void;
  onSubmit: () => void;
}

const FundCode = ({ fundCode, setFundCode, onSubmit }: FundCodeProps) => {
  const { theme } = useTheme();
  const [error, setError] = useState("");
  const [selectedOption, setSelectedOption] = useState<
    "single" | "joint" | null
  >(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fundCode.trim() === "") {
      setError("Fund code is required");
      return;
    }
    setError("");
    onSubmit();
  };

  return (
    <div className="flex flex-col items-center gap-[24px] w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[72px] w-full">
        <div
          onClick={() => setSelectedOption("single")}
          className={`flex flex-col justify-center items-center gap-[10px] cursor-pointer rounded-[12px] p-[20px] text-center transition
           ${
             selectedOption === "single"
               ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
               : `border border-color-${theme} bg-white`
           }`}
        >
          <div
            className={`w-10 h-10 bg-color-application-${theme} rounded-[10px] flex items-center justify-center`}
          >
            <TbBrowserPlus size={26} className="text-white" />
          </div>
          <h2 className={`text-color-muted-${theme} font-medium text-[18px]`}>
            New Application
          </h2>
          <p
            className={`text-color-muted-${theme} text-opacity-70 font-normal text-[14px]`}
          >
            Start a fresh application for AFS Fund. Perfect for new investors
          </p>
        </div>

        <div
          onClick={() => setSelectedOption("joint")}
          className={`flex flex-col justify-center items-center gap-[10px] cursor-pointer rounded-[12px] p-[20px] text-center transition
             ${
               selectedOption === "joint"
                 ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
                 : `border border-color-${theme} bg-white`
             }`}
        >
          <div
            className={`w-10 h-10 bg-color-application-${theme} rounded-[10px] flex items-center justify-center`}
          >
            <LiaUserEditSolid size={26} className="text-white" />
          </div>
          <h2 className={`text-color-muted-${theme} font-medium text-[18px]`}>
            Join Existing Application
          </h2>
          <p
            className={`text-color-muted-${theme} text-opacity-70 font-normal text-[14px]`}
          >
            Continue with a previously started application using your access
            code.
          </p>
        </div>
      </div>

      {/* Step 2: Show form only after option selected */}
      {selectedOption && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-full"
        >
          <div className="relative w-full">
            <div className="flex flex-col gap-[16px]">
              <input
                className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[6px] pl-[20px] py-[10px] text-[16px] text-color-muted-${theme} placeholder-color-${theme} placeholder-opacity-70 w-full`}
                type="text"
                value={fundCode}
                onChange={(e) => setFundCode(e.target.value)}
                placeholder="Enter Fund Code"
              />
              {!error && selectedOption == "single" ? (
                <div
                  className={`bg-color-info-text-${theme} text-color-accountType-${theme} rounded-[8px] h-[59px] py-[8px] px-2 flex items-center gap-2 text-[16px]`}
                >
                  <span className="flex items-center gap-2">
                    <LuInfo
                      className={`text-color-info-text-${theme}`}
                      size={20}
                    />
                    <p>
                      <b>Account code:</b> Please enter the account joining code
                      which you would have received from Compliance (e.g.
                      DEMO-01).
                    </p>
                  </span>
                </div>
              ): (
                selectedOption == "joint" && !error && (
                  <div
                    className={`bg-color-info-text-${theme} text-color-accountType-${theme} rounded-[8px] h-[59px] py-[8px] px-2 flex items-center gap-2 text-[16px]`}
                  >
                    <span className="flex items-center gap-2">
                      <LuInfo
                        className={`text-color-info-text-${theme}`}
                        size={20}
                      />
                      <p>
                        <b>Account code:</b> Please enter the unique joining code sent to you via email. Since the primary joint account holder has initiated the application and added you as a secondary joint account holder (e.g. DEMO-01).
                      </p>
                    </span>
                  </div>
                )
              )}
              {error && (
                <div
                  className={`bg-color-warning-notification-${theme} text-color-accountType-${theme} rounded-[8px] h-[59px] py-[8px] px-2 flex items-center gap-2 text-[16px]`}
                >
                  <span className="flex items-center gap-2">
                    <TbAlertTriangleFilled
                      className={`text-color-alertIcon-${theme}`}
                      size={20}
                    />
                    <p>{error}</p>
                  </span>
                </div>
              )}
            </div>
            <button
              type="submit"
              className={`absolute right-0 top-0 h-[46px] w-[46px] flex items-center justify-center border-r border-t border-b border-color-${theme} bg-color-createAccountButton-${theme} rounded-r-[6px]`}
            >
              <FiSearch
                size={18}
                className={`text-color-tableHeader-${theme}`}
              />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FundCode;
