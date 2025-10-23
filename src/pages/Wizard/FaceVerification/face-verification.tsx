"use client";

import { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { MdCreditCard } from "react-icons/md";
import CaptureCard from "./components/CaptureCard";
import { useTheme } from "../../../contexts/themeContext";

interface FaceVerificationProps {
  onNext: () => void;
  onBack: () => void;
  onComplete?: (isComplete: boolean) => void;
}

export function FaceVerification({ onNext, onBack, onComplete }: FaceVerificationProps) {
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [documentImage, setDocumentImage] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleSelfieCapture = (imageData: string) => {
    setSelfieImage(imageData);
  };

  const handleSelfieRetake = () => {
    setSelfieImage(null);
  };

  const handleDocumentCapture = (imageData: string) => {
    setDocumentImage(imageData);
  };

  const handleDocumentRetake = () => {
    setDocumentImage(null);
  };

  const isStepComplete = Boolean(selfieImage && documentImage);

  // Update the wizard navigation state based on completion
  useEffect(() => {
    onComplete?.(isStepComplete);
  }, [isStepComplete, onComplete]);

  return (
    <div className={`flex-1 p-8 bg-color-stepper-${theme} rounded-lg shadow`}>
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Selfie Section */}
          <CaptureCard
            icon={<FaCamera className="w-5 h-5 text-white" />}
            title="Live Selfie"
            description="For your privacy, captured images are automatically blurred"
            placeholderIcon={<FaCamera className="w-8 h-8 text-white" />}
            placeholderTitle="Position your face in the frame"
            placeholderText="Make sure your face is well-lit and clearly visible"
            buttonText="Start Camera"
            onCapture={handleSelfieCapture}
            onRetake={handleSelfieRetake}
            capturedImage={selfieImage}
          />

          {/* Document Section */}
          <CaptureCard
            icon={<MdCreditCard className="w-5 h-5 text-white" />}
            title="ID Card / Passport"
            description="For your privacy, captured images are automatically blurred"
            placeholderIcon={<MdCreditCard className="w-8 h-8 text-white" />}
            placeholderTitle="Position your document in the frame"
            placeholderText="Ensure all details are clearly visible and not blurred"
            buttonText="Start Camera"
            onCapture={handleDocumentCapture}
            onRetake={handleDocumentRetake}
            capturedImage={documentImage}
          />
        </div>

        {/* Progress Indicator */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-800">Verification Progress</span>
            <span className="text-sm text-blue-600">
              {[selfieImage, documentImage].filter(Boolean).length}/2 completed
            </span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${([selfieImage, documentImage].filter(Boolean).length / 2) * 100}%` }}
            />
          </div>
          {!isStepComplete && (
            <p className="text-sm text-blue-600 mt-2">
              Complete both photo captures to continue to the next step.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}