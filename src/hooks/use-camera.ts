import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface CameraState {
  isActive: boolean;
  isCapturing: boolean;
  hasPermission: boolean;
  error: string | null;
  capturedImage: string | null;
}

export interface CameraControls {
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  capturePhoto: () => Promise<string | null>;
  retakePhoto: () => void;
  clearError: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const useCamera = (): CameraState & CameraControls => {
  const [isActive, setIsActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      setIsCapturing(false);

      console.log('Starting camera...');

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user', // Front camera for selfies
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      console.log('Camera stream obtained:', stream);
      streamRef.current = stream;
      setHasPermission(true);
      setIsActive(true);

      // Attach stream to video element
      if (videoRef.current) {
        console.log('Attaching stream to video element...');
        videoRef.current.srcObject = stream;
        
        // Wait for the video to load and start playing
        await new Promise<void>((resolve, reject) => {
          const video = videoRef.current!;
          
          const onLoadedMetadata = () => {
            console.log('Video metadata loaded, attempting to play...');
            video.play()
              .then(() => {
                console.log('Video is now playing');
                video.removeEventListener('loadedmetadata', onLoadedMetadata);
                video.removeEventListener('error', onError);
                resolve();
              })
              .catch((playError) => {
                console.error('Video play error:', playError);
                video.removeEventListener('loadedmetadata', onLoadedMetadata);
                video.removeEventListener('error', onError);
                reject(playError);
              });
          };
          
          const onError = (error: Event) => {
            console.error('Video error:', error);
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            reject(error);
          };
          
          video.addEventListener('loadedmetadata', onLoadedMetadata);
          video.addEventListener('error', onError);
          
          // Fallback timeout
          setTimeout(() => {
            console.log('Video setup timeout, resolving anyway...');
            video.removeEventListener('loadedmetadata', onLoadedMetadata);
            video.removeEventListener('error', onError);
            resolve(); // Resolve anyway to not block the UI
          }, 3000);
        });
      } else {
        console.error('Video element not found');
        setError('Video element not available');
      }
    } catch (err) {
      console.error('Camera access error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Camera access denied or not available. Please check your camera permissions.';
      setError(errorMessage);
      setHasPermission(false);
      setIsActive(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsActive(false);
    setCapturedImage(null);
  }, []);

  const capturePhoto = useCallback(async (): Promise<string | null> => {
    if (!videoRef.current || !canvasRef.current) {
      setError('Camera not ready');
      return null;
    }

    try {
      setIsCapturing(true);
      setError(null);

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) {
        setError('Canvas context not available');
        return null;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to base64 image
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageData);
      
      return imageData;
    } catch (err) {
      console.error('Capture error:', err);
      setError('Failed to capture photo');
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, []);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return {
    // State
    isActive,
    isCapturing,
    hasPermission,
    error,
    capturedImage,
    
    // Controls
    startCamera,
    stopCamera,
    capturePhoto,
    retakePhoto,
    clearError,
    
    // Refs for video and canvas elements
    videoRef,
    canvasRef,
  };
};