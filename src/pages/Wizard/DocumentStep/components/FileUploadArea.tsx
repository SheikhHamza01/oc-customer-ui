import { FaUpload } from "react-icons/fa";
import { Button } from "../../../../shared/components/ui/button";
import { useTheme } from "../../../../contexts/themeContext";

export const FileUploadArea = () => {
    const {theme} = useTheme();

  return (
    <>
        <div className="py-[16px] px-[32px] h-[364px] border-[3px] border-dashed border-gray-300 rounded-lg my-6 flex flex-col items-center text-center space-y-6">
        {/* Upload Icon */}
        <div className="w-16 h-16 bg-cyan-200 rounded-[12px] flex items-center justify-center mt-[2rem]">
            <FaUpload className="w-8 h-8 text-cyan-600" />
        </div>

        {/* Title + Subtitle */}
        <div className="my-4 space-y-1">
            <h3 className={`text-[18px] font-medium font-roboto text-color-muted-${theme}`}>
            Drag & Drop Your Document here
            </h3>
            <p className={`text-[14px] font-medium font-roboto text-color-${theme}`}>
            Max File Size: 5MB
            </p>
        </div>

        {/* File Type Badges */}
        <div className="flex gap-2 flex-wrap justify-center my-4">
            <p
            className={`text-[14px] font-medium font-roboto text-color-${theme} bg-gray-200 rounded-[12px] px-[12px] py-[6px]`}
            >
            PDF
            </p>
            <p
            className={`text-[14px] font-medium font-roboto text-color-${theme} bg-gray-200 rounded-[12px] px-[12px] py-[6px]`}
            >
            JPG
            </p>
            <p
            className={`text-[14px] font-medium font-roboto text-color-${theme} bg-gray-200 rounded-[12px] px-[12px] py-[6px]`}
            >
            PNG
            </p>
        </div>

        {/* Buttons */}
            <div className="flex justify-center gap-[10px] flex-wrap my-6">
            <Button
                className={`w-[300px] h-[48px] flex justify-center items-center border border-[2px] border-color-selected-${theme} text-[20px] font-medium font-roboto text-color-activeAccounts-${theme}`}
            >
                Browse File
            </Button>
            <Button
                className={`w-[300px] h-[48px] flex justify-center items-center border border-[2px] border-color-${theme} text-[20px] font-medium font-roboto text-color-${theme}`}
            >
                Take Photo
            </Button>
            </div>

        </div>
    </>
  );
};
