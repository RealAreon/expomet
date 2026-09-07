"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Option<T extends string> = {
  value: T;
  label: string;
};

export function DarkSelect<T extends string>({
  value,
  onChange,
  options,
  className,
  "aria-label": ariaLabel,
}: {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  className?: string;
  "aria-label"?: string;
}) {
  const current = options.find((option) => option.value === value) ?? options[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={ariaLabel}
        className={cn(
          "inline-flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-[6px] border border-white/10 bg-[#10151c] px-3 text-left text-[13px] text-white outline-none transition-colors hover:border-copper/50 focus-visible:border-copper",
          className,
        )}
      >
        <span className="min-w-0 truncate">{current?.label}</span>
        <ChevronDown className="size-4 shrink-0 text-white/55" strokeWidth={1.8} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        data-lenis-prevent=""
        onWheel={(event) => event.stopPropagation()}
        className="max-h-72 overflow-y-auto overscroll-contain rounded-[8px] border border-white/12 bg-[#111820] p-1.5 text-white shadow-[0_18px_44px_rgb(0_0_0_/_0.5)]"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            className={cn(
              "cursor-pointer rounded-[5px] px-3 py-2 text-[13px] text-white/88 focus:bg-copper/18 focus:text-copper",
              option.value === value && "bg-copper/15 text-copper",
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
