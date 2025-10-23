
"use client";

import { useState } from "react";
import Header from "./components/Header";
import LiveVideo from "./components/LiveVideo";
import VCIPInstructions from "./components/VCIPInstructions";
import PrivacyNotice from "./components/PrivacyNotice";
import { useTheme } from "../../../contexts/themeContext";

interface VCIPProps {
  onNext: () => void;
  onBack: () => void;
}

export default function VCIP({ onNext, onBack }: VCIPProps) {
  const { theme } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [capturedVideo, setCapturedVideo] = useState<string | null>(null);

  const handleVideoCapture = (videoData: string) => {
    setCapturedVideo(videoData);
  };

  const handleVideoRetake = () => {
    setCapturedVideo(null);
  };

  return (
    <div className="flex-1 p-8 bg-color-stepper-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LiveVideo 
          isRecording={isRecording} 
          setIsRecording={setIsRecording}
          capturedVideo={capturedVideo}
          onCapture={handleVideoCapture}
          onRetake={handleVideoRetake}
        />
        <VCIPInstructions />
      </div>

      <PrivacyNotice />
    </div>
  );
}
