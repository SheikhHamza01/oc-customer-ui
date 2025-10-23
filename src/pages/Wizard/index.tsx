"use client";

import { useEffect, useState } from "react";
import { SetupAccount } from "./AccountSetup";
import IdentitySetup from "./IdentityStep/identity-setup";
import { DocumentVerification } from "./DocumentStep/document-verification";
import { FaceVerification } from "./FaceVerification/face-verification";
import VCIP  from "./VCIPStep/vcip";
import BankAndWallet from "./BankWalletStep/bank-and-wallet";
import { Application } from "./ApplicationStep/application";
import { Summary } from "./SummaryStep/summary";
import { Header } from "../../shared/components/ui/header";
import { Button } from "../../shared/components/ui/button";
import { useTheme } from "../../contexts/themeContext";
import {  useLocation, useNavigate } from "react-router-dom";

export function Index() {
  const [currentStep, setCurrentStep] = useState(1);
  const location = useLocation();
  const [faceVerificationComplete, setFaceVerificationComplete] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

   useEffect(() => {
    const query = new URLSearchParams(location.search);
    const step = query.get("step");
    if (step) {
      setCurrentStep(Number(step));
    }
  }, [location]);
  
  


  const steps = [
    { number: 1, label: "Setup account", active: currentStep === 1, heading: "Let's Start With The Basics!", description: "Start a new application or continue with the existing one" },
    { number: 2, label: "Identity Setup", active: currentStep === 2, heading: "Step 2: Identity Step", description: "Please fill your application to get started" },
    { number: 3, label: "Document Verification", active: currentStep === 3,heading: "Step 3: Document Verification", description: [
  "Upload clear photos of your identity documents and verify them with our system.",
  "Make sure all details are clearly visible and not blurred.",
] },
    { number: 4, label: "Face Verification", active: currentStep === 4,heading: " Step 4: Face Verification", description:  [ "Complete your KYC and AML/CFT verification by capturing clear photos.","This secure process helps us verify your identity and protect your account."] },
    { number: 5, label: "VCIP", active: currentStep === 5,heading: "Step 5: VCIP - Video Based Customer Identification Process", description: "Complete your identity verification through our secure video process" },
    { number: 6, label: "Bank/Wallets", active: currentStep === 6,heading: "Step 6: Bank/Wallets", description: "Add your bank accounts and cryptocurrency wallets for transactions" },
    { number: 7, label: "Application", active: currentStep === 7,heading: "Step 7: Sign Your Application", description: "You're almost done! Just sign this one document to complete your application." },
    { number: 8, label: "Summary", active: currentStep === 8,heading: "Step 8: Summary", description: "Almost done! Review your information and complete setup"},
  ];

  const handleNext = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    }

    if (currentStep === 8) {
      navigate("/subscription/list");
  }
}

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFaceVerificationComplete = (isComplete: boolean) => {
    setFaceVerificationComplete(isComplete);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <SetupAccount/>;
      case 2:
        return <IdentitySetup />;
      case 3:
        return <DocumentVerification onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <FaceVerification onNext={handleNext} onBack={handleBack} onComplete={handleFaceVerificationComplete} />;
      case 5:
        return <VCIP onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <BankAndWallet onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <Application onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <Summary onBack={handleBack} />;
      default:
        return <SetupAccount />;
    }
  };

  const isNextDisabled = currentStep === 4 && !faceVerificationComplete;

  return (
    <div className="flex flex-col gap-[24px]">
      <Header
        title="FSI Fund"
        fundLogo="/src/assets/First-Sentier-Investors.png"
      />

      <div className="flex">
        {/* Main Content */}
        <main className="flex flex-col w-full gap-[24px]">
          {/* Progress Steps */}
          <div
            className={`flex flex-col gap-[16px] items-center justify-center bg-color-stepper-${theme} py-[16px] rounded-[12px] w-full`}
          >
            <div
              className={`flex items-start justify-center gap-[48px] py-[16px] px-[8px]`}
            >
              {steps.map((step, index) => {
                return (
                  <div
                    key={step.number}
                    className="flex flex-col items-center relative min-w-[90px] px-2"
                  >
                    <div
                      className={`w-[40px] h-[40px] rounded-full flex items-center justify-center text-base font-medium ${
                        step.number === currentStep
                          ? `border-2 border-color-stepperActive-${theme} text-color-stepper-active-${theme}` // current
                          : currentStep > step.number
                          ? `bg-color-stepper-completed-${theme} text-color-stepper-inactive-${theme}` // completed
                          : `bg-color-stepper-inactive-${theme} text-color-stepper-inactive-${theme}` // inactive
                      }`}
                    >
                      {step.number}
                    </div>
                    <span
                      className={`text-[13px] mt-3 text-center max-w-20 ${
                        step.number === currentStep
                          ? `text-color-stepper-active-${theme}`
                          : currentStep > step.number
                          ? `text-color-stepper-completed-${theme}`
                          : `text-color-stepper-inactivelabel-${theme}`
                      }`}
                      style={{ minHeight: "32px", maxWidth: "80px" }}
                    >
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute w-20 h-px top-6 left-20 hidden md:block
                        ${
                          currentStep > step.number
                            ? `bg-color-stepper-completed-${theme}` // completed line
                            : `bg-color-stepper-inactive-${theme}` // inactive line
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col items-center gap-[8px] h-[108px]">
              <h1 className={`text-color-muted-${theme} text-[24px] font-bold font-roboto`}>{steps[currentStep - 1]?.heading}</h1>
              <p className={`font-normal text-color-muted-${theme} text-opacity-70 text-[14px]`}>{steps[currentStep - 1]?.description}</p>
            </div>
          </div>
          {renderCurrentStep()}

          {/* Back & Next buttons */}
         <div className="flex justify-between mb-8">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handleBack} className={`border border-color-${theme} rounded-[6px] h-[40px] w-[190px] px-[20px] text-[20px] text-color-filterIcon-${theme}`}>
                Back
              </Button>
            ) : (
              <div />
            )}

            <Button onClick={handleNext} 
              className={`bg-color-createAccountButton-${theme} text-color-createAccountButton-${theme} px-[20px] h-[44px] w-[190px] rounded-[8px] font-[500px] text-[20px]`}
              disabled={isNextDisabled}>
              {currentStep === 1 ? "Join" : "Save & Next"}
            </Button>
          </div>
        </main>
      </div>
      
    </div>
  );
}