"use client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useTheme } from "../../../contexts/themeContext";
import FundCode from "./components/fundCode";
import { Card } from "../../../shared/components/ui/card";
import { IoIosArrowDown } from "react-icons/io";

export const SetupAccount = () => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState<
    "new" | "existing" | null
  >(null);

  const [applicationType, setApplicationType] = useState<
    "individual" | "corporate" | null
  >(null);
  const [identityMethod, setIdentityMethod] = useState<
    "manual" | "singpass" | "adhar" | "pan" | null
  >(null);
  const [fundCode, setFundCode] = useState("");
  const [hasFundCode, setHasFundCode] = useState(false);

  return (
    <div className={`bg-color-stepper-${theme} rounded-[12px] p-[16px]`}>
      {!hasFundCode ? (
        <FundCode
          fundCode={fundCode}
          setFundCode={setFundCode}
          onSubmit={() => setHasFundCode(true)}
        />
      ) : (
        <>
          <div className="flex flex-col gap-[24px]">
            <div className={`flex flex-col gap-[16px]`}>
              <h1
                className={`text-color-muted-${theme} text-[18px] font-medium`}
              >
                Account Description
              </h1>
              <div
                className={`bg-color-input-field-${theme} rounded-[8px] py-[10px] px-[12px] h-[50px] `}
              >
                <span
                  className={`text-color-filterIcon-${theme} font-normal text-[14px]`}
                >
                  Designer's Entity
                </span>
              </div>
            </div>

            {/* Choose Account Type */}
            <div className="flex flex-col gap-[16px]">
              <h1
                className={`text-color-muted-${theme} text-[18px] font-medium`}
              >
                Choose Your Account Type
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  className={`p-6 cursor-pointer border-2 transition-colors
        ${
          selectedOption === "existing"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme} bg-white`
        }`}
                  onClick={() => setSelectedOption("existing")}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 bg-color-application-${theme} rounded-[10px] flex items-center justify-center`}
                    >
                      <FaUser size={26} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <h2
                        className={`text-color-muted-${theme} font-medium text-[18px]`}
                      >
                        Use Existing Identity
                      </h2>
                      <p
                        className={`text-color-muted-${theme} text-opacity-70 font-normal text-[14px]`}
                      >
                        Select from identities you have already created in the
                        system
                      </p>
                    </div>
                  </div>
                </Card>
                <Card
                  className={`p-6 cursor-pointer border-2 transition-colors
        ${
          selectedOption === "new"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme} bg-white`
        }`}
                  onClick={() => setSelectedOption("new")}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 bg-color-application-${theme} rounded-[10px] flex items-center justify-center`}
                    >
                      <BsStars size={26} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <h2
                        className={`text-color-muted-${theme} font-medium text-[18px]`}
                      >
                        Create New Identity{" "}
                      </h2>
                      <p
                        className={`text-color-muted-${theme} text-opacity-70 font-normal text-[14px]`}
                      >
                        Setup an fresh Identity for this account from scratch{" "}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Applying As */}

            {selectedOption == "existing" ? (
              <>
                <div className="relative w-full">
                  <select
                    className={`appearance-none bg-color-inputField-${theme} border border-color-${theme} rounded-[6px] h-[54px] px-[20px] text-[18px] text-color-muted-${theme} placeholder-color-${theme} w-full`}
                  >
                    <option>Select an Identity</option>
                  </select>
                  <IoIosArrowDown
                    size={18}
                    className={`absolute right-[10px] top-1/2 -translate-y-1/2 text-color-icon-${theme}`}
                  />
                </div>
              </>
            ) : (
              selectedOption == "new" && (
                <>
                  <div className="flex flex-col gap-[16px]">
                    <h1
                      className={`text-color-muted-${theme} text-[18px] font-medium`}
                    >
                      Are you applying as:
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                      <Card
                        className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          applicationType === "individual"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                        onClick={() => setApplicationType("individual")}
                      >
                        <div className="h-[54px] flex justify-center items-center ">
                          <h2
                            className={`text-color-muted-${theme} font-medium text-[18px]`}
                          >
                            Individual
                          </h2>
                        </div>
                      </Card>
                      <Card
                        className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          applicationType === "corporate"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                        onClick={() => setApplicationType("corporate")}
                      >
                        <div className="h-[54px] flex justify-center items-center ">
                          <h2
                            className={`text-color-muted-${theme} font-medium text-[18px]`}
                          >
                            Corporate
                          </h2>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {applicationType == "individual" ? (
                    <div className="flex flex-col gap-[16px]">
                      <h1
                        className={`text-color-muted-${theme} text-[18px] font-medium`}
                      >
                        How would you like to create your identity?
                      </h1>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card
                          className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          identityMethod === "manual"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                          onClick={() => setIdentityMethod("manual")}
                        >
                          <div className="h-[54px] flex justify-center items-center ">
                            <h2
                              className={`text-color-muted-${theme} font-medium text-[18px]`}
                            >
                              Manual
                            </h2>
                          </div>
                        </Card>
                        <Card
                          className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          identityMethod === "singpass"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                          onClick={() => setIdentityMethod("singpass")}
                        >
                          <div className="h-[54px] flex justify-center items-center ">
                            <h2
                              className={`text-color-muted-${theme} font-medium text-[18px]`}
                            >
                              Singpass
                            </h2>
                          </div>
                        </Card>
                        <Card
                          className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          identityMethod === "adhar"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                          onClick={() => setIdentityMethod("adhar")}
                        >
                          <div className="h-[54px] flex justify-center items-center ">
                            <h2
                              className={`text-color-muted-${theme} font-medium text-[18px]`}
                            >
                              Adhar
                            </h2>
                          </div>
                        </Card>
                      </div>
                    </div>
                  ) : (
                    applicationType == "corporate" && (
                      <div className="flex flex-col gap-[16px]">
                        <h1
                          className={`text-color-muted-${theme} text-[18px] font-medium`}
                        >
                          How would you like to create your identity?
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card
                            className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          identityMethod === "manual"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                            onClick={() => setIdentityMethod("manual")}
                          >
                            <div className="h-[54px] flex justify-center items-center ">
                              <h2
                                className={`text-color-muted-${theme} font-medium text-[18px]`}
                              >
                                Manual
                              </h2>
                            </div>
                          </Card>
                          <Card
                            className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          identityMethod === "singpass"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                            onClick={() => setIdentityMethod("singpass")}
                          >
                            <div className="h-[54px] flex justify-center items-center ">
                              <h2
                                className={`text-color-muted-${theme} font-medium text-[18px]`}
                              >
                                Singpass
                              </h2>
                            </div>
                          </Card>
                          <Card
                            className={`h-[54px] cursor-pointer border-2 transition-colors
        ${
          identityMethod === "pan"
            ? `border-[3px] border-color-selected-${theme} bg-color-selected-${theme}`
            : `border border-color-${theme}`
        }`}
                            onClick={() => setIdentityMethod("pan")}
                          >
                            <div className="h-[54px] flex justify-center items-center ">
                              <h2
                                className={`text-color-muted-${theme} font-medium text-[18px]`}
                              >
                                Pan
                              </h2>
                            </div>
                          </Card>
                        </div>
                      </div>
                    )
                  )}
                </>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};
