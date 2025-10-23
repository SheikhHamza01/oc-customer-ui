import { Input } from "../../../../shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../shared/components/ui/select";
import { useTheme } from "../../../../contexts/themeContext";

const ContactInfo = () => {
  const {theme} = useTheme()
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <label className={`text-[16px] font-medium text-color-muted-${theme}`}>
            Primary Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter Your Email Address"
            className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}
          />
        </div>
         <div className="flex flex-col gap-[10px]">
          <label className={`text-[16px] font-medium text-color-muted-${theme}`}>
            Secondary Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter Your Email Address"
            className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}
          />
        </div>
      </div>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
        <div className="flex flex-col gap-[10px]">
          <label className={`text-[16px] font-medium text-color-muted-${theme}`}>
            Primary Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter Your Email Address"
            className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}
          />
        </div>
       <div className="flex flex-col gap-[10px]">
         <label className={`text-[16px] font-medium text-color-muted-${theme}`}>
            Contact Type <span className="text-red-500">*</span>
          </label>
          <Select>
            <SelectTrigger className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}
          >
              <SelectValue placeholder="Select Contact Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="home">Home</SelectItem>
              <SelectItem value="work">Work</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
