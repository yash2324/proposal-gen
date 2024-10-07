import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useFormStore from "../stores/formStore";

const CompanyInfoForm = () => {
  const { companyInfo, setCompanyInfo } = useFormStore();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  return (
    <div
      id="company-info"
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Company Information
      </h3>
      {[
        { id: "name", label: "Name" },
        { id: "address", label: "Address" },
        { id: "phone", label: "Phone" },
        { id: "email", label: "Email" },
        { id: "logo", label: "Logo URL" },
        { id: "website", label: "Website" },
      ].map((field) => (
        <div key={field.id}>
          <Label htmlFor={`company-${field.id}`}>{field.label}</Label>
          <Input
            id={`company-${field.id}`}
            name={field.id}
            value={companyInfo[field.id as keyof typeof companyInfo] || ""}
            onChange={handleInputChange}
            className="w-full mt-1"
          />
        </div>
      ))}
      <div>
        <Label htmlFor="company-executive-summary">Executive Summary</Label>
        <Textarea
          id="company-executive-summary"
          name="executiveSummary"
          value={companyInfo.executiveSummary || ""}
          onChange={handleInputChange}
          className="w-full mt-1"
        />
      </div>
    </div>
  );
};

export default CompanyInfoForm;
