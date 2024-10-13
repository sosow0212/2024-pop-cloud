import React from "react";

import { Button } from "@/components/ui/button";

interface TagButtonListProps {
  items: string[];
  selectedItems: string[];
  onChange: (selectedItems: string[]) => void;
}

function TagButtonList({ items, selectedItems, onChange }: TagButtonListProps) {
  const handleItemChange = (item: string) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    onChange(updatedItems);
  };

  return (
    <div className="flex flex-wrap gap-6 py-7">
      {items.map((item) => (
        <Button
          key={item}
          variant="outline"
          onClick={() => handleItemChange(item)}
          className={`h-30 rounded-10 px-6 text-12-400 transition-colors
            ${
              selectedItems.includes(item)
                ? "bg-blue-5 text-white hover:bg-blue-7"
                : "bg-white text-black hover:bg-blue-1"
            }`}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}

export default TagButtonList;
