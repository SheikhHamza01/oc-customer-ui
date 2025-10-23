import { useTheme } from "../../../contexts/themeContext";
import { FaRegPenToSquare } from "react-icons/fa6";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import { HiArrowDownTray } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Tooltip from "@/shared/components/ui/Tooltip";
interface Props {
  type: string;
}

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(" ");
  if (parts.length >= 2) {
    return parts[0][0] + parts[1][0];
  }
  return parts[0][0];
};

const fullName1 = "Maria Amin";
const fullName2 = "Arooba Masood";

const AccountTable: React.FC<Props> = ({ type }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const TableHead = () => (
     <thead>
        <tr
          className={`bg-color-tableHeader-${theme} text-color-tableHeader-${theme} h-[41px]`}
        >
          <th className="p-[10px] font-medium">Name</th>
          <th className="p-[10px] font-medium">Nationality</th>
          <th className="p-[10px] font-medium">Country of residence</th>
          <th className="p-[10px] font-medium">Customer Type</th>
          <th className="p-[10px] font-medium">Subscription Type</th>
          <th className="p-[10px] font-medium">Status</th>
          <th className="p-[10px] font-medium">Actions</th>
        </tr>
      </thead>
  );

   const TableRow = (fullName: string, subscription: string, status?: string) => (
        <tr
          className={`bg-color-tableBody-${theme} text-color-icon-${theme} text-[12px] text-center`}
        >
          <td
            className={`p-[10px] font-medium flex items-center justify-center gap-2`}
          >
            <span
              className={`icon-user text-color-tableHeader-${theme} bg-color-name-${theme} rounded-full p-1`}
            >
              {getInitials(fullName)}
            </span>
            {fullName}
          </td>
          <td className="p-[10px] font-medium">Singapore</td>
          <td className="p-[10px] font-medium">Singapore</td>
          <td className="p-[10px] font-medium">Individual</td>
          <td className="p-[10px] font-medium">
            {type === "Standalone" ? "Stand Alone" : "Joint Account"}
          </td>
          <td className="p-[10px] font-medium">
            <span
              className={`bg-color-draftAccount-${theme} py-[4px] px-[16px] rounded-full text-color-tableHeader-${theme} `}
            >Draft</span>
          </td>
          <td className="flex items-center justify-center gap-2 p-[10px] font-medium">
             <Tooltip text="Edit Application" placement="top">
            <FaRegPenToSquare
             onClick={() => navigate("/subscription/request?step=8")} 
              className={`text-color-edit-icon-${theme} cursor-pointer`}
              size={16}
            />
            </Tooltip>
             <Tooltip text="Switch" placement="top">
            <HiOutlineSwitchHorizontal
              className={`text-color-switchIcon-${theme} cursor-pointer`}
              size={16}
            />
            </Tooltip>
             <Tooltip text="View Application" placement="top">
            <FiEye
            onClick={() => navigate("/subscription/request?step=8")} 
              className={`text-color-eyeIcon-${theme} cursor-pointer`}
              size={16}
            />
            </Tooltip>
             <Tooltip text="Transfer" placement="top">
            <HiArrowDownTray
              className={`text-color-transferIcon-${theme} cursor-pointer`}
              size={16}
            />
            </Tooltip>
             <Tooltip text="Delete Account" placement="top">
            <RiDeleteBin6Line
              className={`text-color-deleteIcon-${theme} cursor-pointer`}
              size={16}
            />
            </Tooltip>
          </td>
        </tr>
  );

  return (
   <>
      {/* First Table */}
      <table className="w-full mb-6">
        <TableHead />
        <tbody>{TableRow(fullName1, type === "Standalone" ? "Stand Alone" : "Joint Account", "Draft")}</tbody>
      </table>

      {/* Second Table Only if Joint Account */}
      {type === "Joint Account" && (
        <table className="w-full">
          <TableHead />
          <tbody>{TableRow(fullName2, "Joint Account", "Approved")}</tbody>
        </table>
      )}
    </>
  );
};
export default AccountTable;
