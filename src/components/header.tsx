"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/catalog", key: "catalog" as const },
  { href: "/calculator", key: "calculator" as const },
  { href: "/services", key: "services" as const },
  { href: "/contacts", key: "contacts" as const },
];

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgb(184_106_59_/_0.16)] bg-[#070d13]/94 pt-[env(safe-area-inset-top)]">
      <div className="mx-auto grid h-[72px] max-w-[1520px] grid-cols-[minmax(0,1fr)_auto] items-center px-4 sm:h-[80px] sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12 xl:px-16">
        <Logo className="justify-self-start" />

        <nav
          className="hidden items-center gap-8 xl:gap-11 lg:flex"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative text-[14px] font-medium transition-colors duration-300 hover:text-copper",
                  active ? "text-copper" : "text-white/82"
                )}
              >
                {t(`nav.${item.key}`)}
                {active ? (
                  <span className="absolute -top-3 left-0 h-px w-full bg-copper" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-self-end gap-3 sm:gap-5">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link
            href="/contacts"
            className="hidden h-[38px] items-center rounded-[4px] border border-copper px-[18px] text-[13px] font-medium tracking-[0.02em] text-copper transition-all duration-200 hover:bg-copper/10 hover:shadow-[0_0_18px_rgb(199_122_69_/_0.22)] sm:inline-flex"
          >
            {t("cta")}
          </Link>
          <button
            type="button"
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[4px] border border-white/10 text-white lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0b121a] lg:hidden"
          >
          <nav className="mx-auto flex max-w-[1520px] flex-col gap-1 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="cursor-pointer py-2.5 text-[15px] font-medium text-white/90 transition-colors hover:text-copper"
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-white/10 pt-4 min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between">
              <LanguageSwitcher />
              <Link
                href="/contacts"
                className="inline-flex h-10 items-center justify-center rounded-[4px] border border-copper px-4 text-[13px] font-medium text-copper"
                onClick={() => setOpen(false)}
              >
                {t("cta")}
              </Link>
            </div>
          </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
