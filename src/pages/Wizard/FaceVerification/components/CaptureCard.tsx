import { ReactNode, useRef } from "react";
import { useTheme } from "../../../../contexts/themeContext";
import { useCamera } from "../../../../hooks/use-camera";
import { FaCamera, FaRedo, FaCheck } from "react-icons/fa";

interface CaptureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  placeholderIcon: ReactNode;
  placeholderTitle: string;
  placeholderText: string;
  buttonText: string;
  onCapture: (imageData: string) => void;
  onRetake?: () => void;
  capturedImage?: string | null;
}

const CaptureCard = ({
  icon,
  title,
  description,
  placeholderIcon,
  placeholderTitle,
  placeholderText,
  buttonText,
  onCapture,
  onRetake,
  capturedImage: propCapturedImage,
}: CaptureCardProps) => {
  const { theme } = useTheme();
  const {
    isActive,
    isCapturing,
    hasPermission,
    error,
    capturedImage,
    startCamera,
    stopCamera,
    capturePhoto,
    retakePhoto,
    clearError,
    videoRef,
    canvasRef,
  } = useCamera();

  const handleStartCamera = async () => {
    await startCamera();
  };

  const handleCapture = async () => {
    const imageData = await capturePhoto();
    if (imageData) {
      onCapture(imageData);
      // Don't stop camera immediately - let the captured image show
      // stopCamera();
    }
  };

  const handleRetake = () => {
    retakePhoto();
    onRetake?.();
  };

  const handleStopCamera = () => {
    stopCamera();
  };

  return (
    <div className={`bg-color-accountCard-${theme} rounded-lg`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 bg-color-createAccountButton-${theme} dark:bg-color-createAccountButton-dark rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <h3 className={`text-lg font-semibold text-color-${theme} font-roboto`}>{title}</h3>
            <p className={`text-opacity-70 font-roboto text-[14px] text-color-muted-${theme}`}>{description}</p>
          </div>
        </div>

        {/* Camera Preview or Placeholder */}
        <div className={`border-2 border-dashed border-color-${theme} rounded-lg mb-6 relative overflow-hidden h-[364px]`}>
          {/* Always render video element but conditionally show it */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover ${isActive && !propCapturedImage ? 'block' : 'hidden'}`}
            style={{ transform: 'scaleX(-1)' }} // Mirror the video for better UX
          />
          
          {propCapturedImage ? (
            // Captured Image Preview - Always show when captured
            <div className="relative h-[364px]">
              <img
                src={propCapturedImage}
                alt="Captured"
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirror the captured image for consistency
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <FaCheck className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium">Photo captured successfully!</p>
                </div>
              </div>
            </div>
          ) : isActive ? (
            // Live Camera Feed Overlay
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center pointer-events-none">
              <div className="text-center text-white">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <FaCamera className="w-8 h-8" />
                </div>
                <p className="text-sm font-medium">Position your {title.toLowerCase()} in the frame</p>
              </div>
            </div>
          ) : (
            // Placeholder
            <div className="p-16 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                {placeholderIcon}
              </div>
              <h4 className={`text-lg font-semibold text-color-${theme} font-roboto`}>{placeholderTitle}</h4>
              <p className={`text-opacity-70 font-roboto text-[14px] text-color-muted-${theme}`}>{placeholderText}</p>
            </div>
          )}

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Error Message */}
        {error && (
          <div className={`bg-red-50 border border-red-200 rounded-lg p-3 mb-4`}>
            <p className="text-red-600 text-sm">{error}</p>
            <button
              onClick={clearError}
              className="text-red-600 text-xs underline mt-1"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {!propCapturedImage && !isActive && (
            <button
              className={`w-full bg-transparent text-color-activeAccounts-${theme} py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border border-color-button-${theme}`}
              onClick={handleStartCamera}
              disabled={isCapturing}
            >
              <FaCamera className="w-4 h-4" />
              {buttonText}
            </button>
          )}

          {!propCapturedImage && isActive && (
            <div className="flex gap-2">
              <button
                className={`flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors`}
                onClick={handleStopCamera}
              >
                Cancel
              </button>
              <button
                className={`flex-1 bg-transparent text-color-activeAccounts-${theme} py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 border border-color-button-${theme}`}
                onClick={handleCapture}
                disabled={isCapturing}
              >
                {isCapturing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Capturing...
                  </>
                ) : (
                  <>
                    <FaCamera className="w-4 h-4" />
                    Capture
                  </>
                )}
              </button>
            </div>
          )}

          {propCapturedImage && (
            <button
              className={`w-full bg-transparent text-color-activeAccounts-${theme} py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border border-color-button-${theme}`}
              onClick={handleRetake}
            >
              <FaRedo className="w-4 h-4" />
              Re-capture
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptureCard;
