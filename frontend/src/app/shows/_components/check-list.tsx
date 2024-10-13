import React from "react";

import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxListProps {
  items: string[];
  selectedItems: string[];
  onChange: (selectedItems: string[]) => void;
}

function CheckboxList({ items, selectedItems, onChange }: CheckboxListProps) {
  const handleItemChange = (item: string) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    onChange(updatedItems);
  };

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center">
          <Checkbox
            id={item}
            checked={selectedItems.includes(item)}
            onCheckedChange={() => handleItemChange(item)}
            className="mb-7 size-18 rounded-sm border-gray-300"
          />
          <label htmlFor={item} className="mb-7 ml-5 text-16-400">
            {item}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxList;
