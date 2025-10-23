"use client";

import { useState } from "react";
import { Input } from "../../../../shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../shared/components/ui/select";
import { FaEye, FaDownload, FaTrashAlt } from "react-icons/fa"
import { Button } from "../../../../shared/components/ui/button";
import { Badge } from "../../../../shared/components/ui/badge";
import { UploadedTable } from "./UploadedTable";
import { FileUploadArea } from "./FileUploadArea";
import { useTheme } from "../../../../contexts/themeContext";

export const IdentificationForm = () => {
    const {theme} = useTheme();
  const [uploadedDocs] = useState([
    {
      id: 1,
      type: "National ID Card",
      issuedCountry: "Singapore",
      amount: "SG 1,000",
      currency: "SGD",
      status: "Completed",
      date: "22-7-2025",
    },
  ]);

  return (
    <>
      {/* Inputs */}
      <div className={`p-[16px] rounded-[8px] bg-color-tableBody-${theme}`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-6`}>
        <div>
          <label className={`block text-[16px] font-medium font-roboto text-color-muted-${theme} mb-2`}>
            Document Type*
          </label>
          <Select>
            <SelectTrigger className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}>
              <SelectValue placeholder="National ID Card" />
            </SelectTrigger>
            <SelectContent className={`max-h-60 overflow-y-auto bg-color-inputField-${theme}`}>
              <SelectItem value="national-id">National ID Card</SelectItem>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="driving-license">Driving License</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={`block text-[16px] font-medium font-roboto text-color-muted-${theme} mb-2`}>
            Document Number*
          </label>
        <Input
            placeholder="Enter Document Number Here"
            className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}
          />
        </div>
        <div>
          <label className={`block text-[16px] font-medium font-roboto text-color-muted-${theme} mb-2`}>
            Issued Date*
          </label>
          <Select>
            <SelectTrigger className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}>
              <SelectValue placeholder="National ID Card" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="national-id">National ID Card</SelectItem>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="driving-license">Driving License</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={`block text-[16px] font-medium font-roboto text-color-muted-${theme} mb-2`}>
            Expiry Date*
          </label>
          <Select>
            <SelectTrigger className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}>
              <SelectValue placeholder="Singapore" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="singapore">Singapore</SelectItem>
              <SelectItem value="malaysia">Malaysia</SelectItem>
              <SelectItem value="thailand">Thailand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
        <div>
          <label className={`block text-[16px] font-medium font-roboto text-color-muted-${theme} mb-2`}>
            Document Description (Optional)
          </label>
        <Input
            placeholder="Enter Document Description Here"
            className={`bg-color-inputField-${theme} border border-color-${theme} rounded-[8px] py-[10px] px-[20px] h-[50px] placeholder-color-${theme} placeholder-opacity-70 text-[14px]`}
          />
        </div>
        </div>

      <FileUploadArea/>

        {/* Progress Bar */}
      <div className="bg-gray-100 rounded-[full] h-[63px] flex flex-col w-full justify-center px-4 py-[3rem] border rounded-[15px] mb-6">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-color-muted-${theme} font-medium text-[14px]`}>
            National ID Card - (Front)
          </span>
          <span
            className={`text-color-muted-${theme} text-opacity-70 flex justify-end font-medium text-[14px]`}
          >
            x
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
        <div className="flex items-center justify-between gap-2">
          <span className={`text-color-${theme} font-medium text-[14px]`}>
            60% Uploaded
          </span>
          <span
            className={`text-color-muted-${theme} text-opacity-70 flex justify-end font-medium text-[14px]`}
          >
            354 KB/sec
          </span>
        </div>
      </div>

      <Button className="bg-green-500 hover:bg-green-600 text-white mb-6">
        Submit
      </Button>

      {/* Uploaded docs */}
      <UploadedTable
        columns={[
          "Document Type",
          "Issued Country",
          "Amount",
          "Currency",
          "Status",
          "E-Sign",
          "Date",
          "Actions",
        ]}
        rows={uploadedDocs}
        renderRow={(doc) => (
          <tr key={doc.id} className={`bg-color-tableBody-${theme} text-color-icon-${theme} text-[12px] text-center`}>
            <td className="px-4 py-3 text-sm">{doc.type}</td>
            <td className="px-4 py-3 text-sm">{doc.issuedCountry}</td>
            <td className="px-4 py-3 text-sm">{doc.amount}</td>
            <td className="px-4 py-3 text-sm">{doc.currency}</td>
            <td className="px-4 py-3 text-sm">
              <Badge className={doc.status === "Completed" ? "bg-green-500" : "bg-red-500"}>
                {doc.status}
              </Badge>
            </td>
            <td className="px-4 py-3 text-sm">{doc.status === "Completed" ? "No" : "Yes"}</td>
            <td className="px-4 py-3 text-sm">{doc.date}</td>
            <td className="px-4 py-3 text-sm">
              <div className="flex space-x-2">
                <Button><FaEye /></Button>
                <Button><FaDownload /></Button>
                <Button><FaTrashAlt /></Button>
              </div>
            </td>
          </tr>
        )}
      />
    </>
  );
};
