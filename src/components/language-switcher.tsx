"use client";

import { useEffect, useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LOCALES = [
  { id: "en", label: "EN" },
  { id: "uk", label: "UA" },
] as const;

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const current = LOCALES.find((item) => item.id === locale) ?? LOCALES[0];
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const triggerClass = cn(
    "inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium tracking-[0.08em] text-white/90 transition-colors duration-200 hover:text-copper",
    className
  );

  if (!mounted) {
    return (
      <span className={triggerClass} aria-label="Language">
        <Globe className="size-[15px] text-copper" strokeWidth={1.6} />
        <span>{current.label}</span>
        <ChevronDown className="size-3.5 opacity-70" strokeWidth={1.8} />
      </span>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-medium tracking-[0.08em] text-white/90 transition-colors duration-200 hover:text-copper",
          className
        )}
        aria-label="Language"
      >
        <Globe className="size-[15px] text-copper" strokeWidth={1.6} />
        <span>{current.label}</span>
        <ChevronDown className="size-3.5 opacity-70" strokeWidth={1.8} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-[7.5rem] rounded-[6px] border border-white/12 bg-[#111820] p-1.5 text-white shadow-[0_16px_40px_rgb(0_0_0_/_0.45)]"
      >
        {LOCALES.map((item) => (
          <DropdownMenuItem
            key={item.id}
            className={cn(
              "cursor-pointer rounded-[3px] text-[13px] tracking-[0.08em] focus:bg-copper/18 focus:text-copper",
              item.id === locale ? "bg-copper/15 text-copper" : "text-white/85",
            )}
            onClick={() => {
              router.replace(pathname, { locale: item.id });
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
