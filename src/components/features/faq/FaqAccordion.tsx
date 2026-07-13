"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Faq } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";

interface FaqAccordionProps {
  faq: Faq;
}

function FaqAccordion({ faq }: FaqAccordionProps) {
  const [open, setOpen] = useState(false);
  const { getLocalizedField } = useLanguage();

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <span className="pr-4 font-medium text-gray-900">
          {getLocalizedField(faq, "question")}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 flex-shrink-0 text-gray-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="border-t border-gray-200 px-4 pb-4 pt-3">
          <p className="text-gray-600">{getLocalizedField(faq, "answer")}</p>
        </div>
      )}
    </div>
  );
}

export { FaqAccordion };
