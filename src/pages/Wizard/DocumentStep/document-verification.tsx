"use client";

import { useState } from "react";
import { Section } from "./components/Section";
import { IdentificationForm } from "./components/IdentificationForm";
import { useTheme } from "@/contexts/themeContext";

interface DocumentVerificationProps {
  onNext: () => void;
  onBack: () => void;
}

export function DocumentVerification({ onNext, onBack }: DocumentVerificationProps) {
  const [expandedSections, setExpandedSections] = useState({
    identification: false,
    proofOfAddress: false,
    proofOfWalletOwnership: false,
  });

  const {theme} = useTheme();

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return ( 
    // <div className="flex flex-col gap-[16px] ">
      <div className={`bg-color-stepper-${theme} rounded-[12px] p-[16px]`}>
      <Section
        title="Form of Identification"
        isOpen={expandedSections.identification}
        onToggle={() => toggleSection("identification")}
      >
        <IdentificationForm />
      </Section>

      <Section
        title="Proof of Address"
        isOpen={expandedSections.proofOfAddress}
        onToggle={() => toggleSection("proofOfAddress")}
      >
        <IdentificationForm />
      </Section>

      <Section
        title="Proof of Wallet Ownership"
        isOpen={expandedSections.proofOfWalletOwnership}
        onToggle={() => toggleSection("proofOfWalletOwnership")}
      >
        <IdentificationForm />
      </Section>
    </div>
  );
}
