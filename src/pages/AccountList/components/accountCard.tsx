import AccountTable from "../components/accountTable";
import { useTheme } from "../../../contexts/themeContext";
import fundLogo from "../../../assets/First-Sentier-Investors.png";
import { BiSupport } from "react-icons/bi";
import { VscBellDot } from "react-icons/vsc";
import { TbAlertTriangleFilled } from "react-icons/tb";


interface Props {
  type: string;
}

const AccountCard: React.FC<Props> = ({ type }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`bg-color-accountCard-${theme} p-[16px] rounded-[12px] w-full flex flex-col gap-[16px]`}
    >
      <div className={`flex flex-col items-center gap-[17px] w-full`}>
        <div className="flex items-center justify-between gap-2 w-full">
          <div className={`flex items-center gap-[16px]`}>
            <img src={fundLogo} alt="First Sentier" className="h-[32px]" />
            <span
              className={`font-bold text-[18px] text-color-accountType-${theme}`}
            >
              {type}
            </span>
            <VscBellDot className={`text-[#FD4765] cursor-pointer`} size={20} />
          </div>
          <div className={`flex items-center gap-2`}>
            <BiSupport
              className={`text-color-filterIcon-${theme} cursor-pointer`}
              size={18}
            />

            <span
              className={`text-[14px] font-normal text-color-filterIcon-${theme} cursor-pointer`}
            >
              Support
            </span>
          </div>
        </div>
        <AccountTable type={type} />
      </div>

      <div className="h-[63px] flex flex-col w-full justify-center p-[16px]">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-color-muted-${theme} font-medium text-[14px]`}>
            Application Progress
          </span>
          <span
            className={`text-color-muted-${theme} text-opacity-70 flex justify-end font-medium text-[14px]`}
          >
            60%
          </span>
        </div>
        <div
          className={`w-full bg-color-progressBar-${theme} rounded h-2 mt-1 mb-2`}
        >
          <div
            className={`bg-color-active-progressBar-${theme} h-2 rounded`}
            style={{ width: "60%" }}
          />
        </div>
      </div>
      <div className={`bg-color-warning-notification-${theme} text-color-accountType-${theme} rounded-[8px] h-[59px] py-[8px] px-2 flex items-center gap-2 text-[16px]`}>

    <span className="flex items-center gap-2">
      <TbAlertTriangleFilled className={`text-color-alertIcon-${theme}`} size={20} />
      <b>Missing Documents:</b> Click on notification icon to view your missing documents
    </span>
  </div>
    </div>
  );
};
export default AccountCard;
