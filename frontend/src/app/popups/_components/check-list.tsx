import React from "react";

import { Checkbox } from "@/components/ui/checkbox";

import { CheckboxListProps } from "../types/index";

function CheckboxList({ items }: CheckboxListProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center">
          <Checkbox
            id={item}
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
