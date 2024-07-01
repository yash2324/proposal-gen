import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CompanyInfoForm = () => {
  return (
    <div className="space-y-4" id="company-info">
      <h3 className="text-xl font-bold">Company Information</h3>
      <div>
        <Label htmlFor="company-name">Name</Label>
        <Input id="company-name" name="company-name" />
      </div>
      <div>
        <Label htmlFor="company-address">Address</Label>
        <Input id="company-address" name="company-address" />
      </div>
      <div>
        <Label htmlFor="company-phone">Phone</Label>
        <Input id="company-phone" name="company-phone" />
      </div>
      <div>
        <Label htmlFor="company-email">Email</Label>
        <Input id="company-email" name="company-email" />
      </div>
      <div>
        <Label htmlFor="company-logo">Logo URL</Label>
        <Input id="company-logo" name="company-logo" />
      </div>
      <div>
        <Label htmlFor="company-website">Website</Label>
        <Input id="company-website" name="company-website" />
      </div>
    </div>
  );
};

export default CompanyInfoForm;
