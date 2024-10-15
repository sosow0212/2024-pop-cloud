import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FilterAccordionProps } from "../types/index";

export default function FilterAccordion({
  title,
  icon,
  children,
}: FilterAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title} className="border-b border-gray-200">
        <AccordionTrigger className="text-base flex size-40 justify-between p-4">
          <div className="flex items-center gap-9">
            {icon}
            {title}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 py-5">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
