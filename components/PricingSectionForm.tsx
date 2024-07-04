import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useFormStore from "../stores/formStore";

const PricingSectionForm = () => {
  const { pricingSection, setPricingSection } = useFormStore();

  const addItem = () => {
    setPricingSection({
      ...pricingSection,
      items: [...pricingSection.items, { description: "", amount: 0 }],
    });
  };

  const updateItem = (
    index: number,
    field: "description" | "amount",
    value: string | number
  ) => {
    const newItems = [...pricingSection.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setPricingSection({
      ...pricingSection,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + Number(item.amount), 0),
    });
  };

  return (
    <div id="pricing-section" className="space-y-4">
      <h3 className="text-xl font-bold">Pricing Section</h3>
      {pricingSection.items.map((item, index) => (
        <div key={index} className="space-y-2 border p-4 rounded">
          <div>
            <Label htmlFor={`item-description-${index}`}>Description</Label>
            <Input
              id={`item-description-${index}`}
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor={`item-amount-${index}`}>Amount</Label>
            <Input
              id={`item-amount-${index}`}
              type="number"
              value={item.amount}
              onChange={(e) =>
                updateItem(index, "amount", Number(e.target.value))
              }
            />
          </div>
        </div>
      ))}
      <Button variant={"outline"} onClick={addItem}>
        Add Item
      </Button>
      <div>
        <Label htmlFor="total-amount">Total Amount</Label>
        <Input
          id="total-amount"
          type="number"
          value={pricingSection.totalAmount}
          readOnly
        />
      </div>
      <div>
        <Label htmlFor="currency">Currency</Label>
        <Input
          id="currency"
          value={pricingSection.currency}
          onChange={(e) =>
            setPricingSection({ ...pricingSection, currency: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default PricingSectionForm;
