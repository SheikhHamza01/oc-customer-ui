import { FaVideo, FaCamera, FaStop, FaPlay } from "react-icons/fa";
import { Button } from "../../../../shared/components/ui/button";
import { useCamera } from "../../../../hooks/use-camera";
import { useTheme } from "../../../../contexts/themeContext";

interface LiveVideoProps {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  capturedVideo?: string | null;
  onCapture?: (videoData: string) => void;
  onRetake?: () => void;
}

export default function LiveVideo({ 
  isRecording, 
  setIsRecording, 
  capturedVideo: propCapturedVideo,
  onCapture,
  onRetake 
}: LiveVideoProps) {
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

  const handleStopCamera = () => {
    stopCamera();
    setIsRecording(false);
  };

  const handleStartRecording = async () => {
    if (!isActive) {
      await startCamera();
    }
    setIsRecording(true);
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    // Capture the current video frame as an image
    const imageData = await capturePhoto();
    if (imageData && onCapture) {
      onCapture(imageData);
    }
    stopCamera();
  };

  const handleRetake = () => {
    retakePhoto();
    setIsRecording(false);
    onRetake?.();
  };

  return (
    <div className={`bg-color-accountCard-${theme} rounded-lg`}>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 bg-color-createAccountButton-${theme} dark:bg-color-createAccountButton-dark rounded-lg flex items-center justify-center`}>
            <FaVideo className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`text-lg font-semibold text-color-${theme} font-roboto`}>Live Video</h3>
            <p className={`text-opacity-70 font-roboto text-[14px] text-color-muted-${theme}`}>
              For your privacy, captured videos are automatically blurred
            </p>
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
            className={`w-full h-full object-cover ${isActive && !propCapturedVideo ? 'block' : 'hidden'}`}
            style={{ transform: 'scaleX(-1)' }} // Mirror the video for better UX
          />
          
          {propCapturedVideo ? (
            // Captured Video Preview - Always show when captured
            <div className="relative h-[364px]">
              <img
                src={propCapturedVideo}
                alt="Captured Video"
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirror the captured video for consistency
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center ">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <FaVideo className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-medium">Video captured successfully!</p>
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
                <p className="text-sm font-medium">Position your face in the frame</p>
                {isRecording && (
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Recording...</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Placeholder
            <div className="p-16 text-center h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <FaCamera className="w-8 h-8 text-white" />
              </div>
              <h4 className={`text-lg font-semibold text-color-${theme} font-roboto`}>
                Position your face in the frame
              </h4>
              <p className={`text-opacity-70 font-roboto text-[14px] text-color-muted-${theme}`}>
                Make sure your face is well-lit and clearly visible
              </p>
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
          {!propCapturedVideo && !isActive && (
            <Button
              className={`w-full bg-transparent text-color-activeAccounts-${theme} py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border border-color-button-${theme}`}
              onClick={handleStartCamera}
              disabled={isCapturing}
            >
              <FaCamera className="w-4 h-4" />
              Start Camera
            </Button>
          )}

          {!propCapturedVideo && isActive && !isRecording && (
            <div className="flex gap-2">
              <Button
                className="flex-1 bg-red-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                onClick={handleStopCamera}
              >
                <FaStop className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                className={`flex-1 bg-transparent text-color-activeAccounts-${theme} py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border border-color-button-${theme}`}
                onClick={handleStartRecording}
              >
                <FaPlay className="w-4 h-4" />
                Start Recording
              </Button>
            </div>
          )}

          {!propCapturedVideo && isActive && isRecording && (
            <Button
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
              onClick={handleStopRecording}
            >
              <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
              Stop Recording
            </Button>
          )}

          {propCapturedVideo && (
            <Button
              className={`w-full bg-transparent text-color-activeAccounts-${theme} py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity border border-color-button-${theme}`}
              onClick={handleRetake}
            >
              <FaCamera className="w-4 h-4" />
              Re-capture
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
