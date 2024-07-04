import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import useFormStore from "../stores/formStore";

const CompanyInfoForm = () => {
  const { companyInfo, setCompanyInfo } = useFormStore();
  return (
    <div id="company-info" className="space-y-4">
      <h3 className="text-xl font-bold">Company Information</h3>
      <div>
        <Label htmlFor="company-name">Name</Label>
        <Input
          id="company-name"
          name="company-name"
          value={companyInfo.name || ""}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, name: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="company-address">Address</Label>
        <Input
          id="company-address"
          name="company-address"
          value={companyInfo.address || ""}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, address: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="company-phone">Phone</Label>
        <Input
          id="company-phone"
          name="company-phone"
          value={companyInfo.phone || ""}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, phone: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="company-email">Email</Label>
        <Input
          id="company-email"
          name="company-email"
          value={companyInfo.email || ""}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, email: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="company-logo">Logo URL</Label>
        <Input
          id="company-logo"
          name="company-logo"
          value={companyInfo.logo || ""}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, logo: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="company-website">Website</Label>
        <Input
          id="company-website"
          name="company-website"
          value={companyInfo.website || ""}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, website: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor="company-executive-summary">Executive Summary</Label>
        <Textarea
          id="company-executive-summary"
          name="company-executive-summary"
          value={companyInfo.executiveSummary || ""}
          onChange={(e) =>
            setCompanyInfo({ ...companyInfo, executiveSummary: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default CompanyInfoForm;
