import { ChevronRight, Phone, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/logo";

const NAV = [
  { href: "/catalog", key: "catalog" as const },
  { href: "/services", key: "services" as const },
  { href: "/#about", key: "about" as const },
  { href: "/#advantages", key: "quality" as const },
  { href: "/services", key: "delivery" as const },
  { href: "/contacts", key: "contacts" as const },
];

const PRODUCTS = [
  { href: "/catalog?category=aluminum", key: "aluminum" as const },
  { href: "/catalog?category=brass", key: "brass" as const },
  { href: "/catalog?category=copper", key: "copper" as const },
  { href: "/catalog?category=bronze", key: "bronze" as const },
];

function FooterList({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
        {title}
      </h3>
      <div className="mt-2 h-px w-12 bg-copper" />
      <ul className="mt-5">
        {items.map((item) => (
          <li key={item.label} className="border-b border-white/[0.08]">
            <Link
              href={item.href}
              className="flex items-center justify-between py-3 text-[14px] text-white/85 transition-colors hover:text-copper"
            >
              {item.label}
              <ChevronRight className="size-3.5 text-copper" strokeWidth={2} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function SiteFooter() {
  const t = await getTranslations("footer");

  return (
    <footer className="surface-mottled relative flex min-h-0 flex-col overflow-hidden border-t border-white/[0.08] bg-[#020407] lg:min-h-svh">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-[25%] w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute inset-y-0 left-[50%] w-px bg-gradient-to-b from-transparent via-copper/10 to-transparent" />
        <div className="absolute inset-y-0 left-[75%] w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute inset-x-0 top-[14%] h-px bg-gradient-to-r from-transparent via-copper/12 to-transparent" />
        <div className="absolute inset-x-0 bottom-[22%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute -bottom-52 left-1/2 size-[720px] -translate-x-1/2 rounded-full border border-copper/[0.07]" />
        <div className="absolute -bottom-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full border border-white/[0.04]" />
        <div className="absolute -right-[6%] top-[12%] h-px w-[38%] -rotate-[14deg] bg-gradient-to-r from-transparent via-copper/10 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1520px] flex-1 content-center gap-10 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:gap-12 lg:px-12 lg:py-16 xl:px-16">
        <div>
          <Logo />
          <p className="mt-5 max-w-[280px] text-[14px] leading-7 text-[#8f99a3]">
            {t("description")}
          </p>
          <p className="mt-6 text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
            {t("slogan")}
          </p>
        </div>

        <FooterList
          title={t("navigation")}
          items={NAV.map((item) => ({ href: item.href, label: t(`nav.${item.key}`) }))}
        />
        <FooterList
          title={t("products")}
          items={PRODUCTS.map((item) => ({
            href: item.href,
            label: t(`productItems.${item.key}`),
          }))}
        />

        <div>
          <h3 className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
            {t("contactTrust")}
          </h3>
          <div className="mt-2 h-px w-12 bg-copper" />

          <div className="mt-6 flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[4px] border border-copper/50 text-copper">
              <Phone className="size-4" strokeWidth={1.7} />
            </span>
            <div>
              <a href="tel:+380504090707" className="text-[15px] text-white">
                +380 50 409 07 07
              </a>
              <p className="mt-0.5 text-[12px] text-[#8f99a3]">{t("hours")}</p>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-[4px] border border-copper/50 text-copper">
              <Mail className="size-4" strokeWidth={1.7} />
            </span>
            <div>
              <a href="mailto:info@expomet.ua" className="text-[15px] text-white">
                info@expomet.ua
              </a>
              <p className="mt-0.5 text-[12px] text-[#8f99a3]">{t("reply")}</p>
            </div>
          </div>

          <div className="mt-6 border-t border-white/[0.08] pt-5">
            <p className="text-[12px] font-semibold tracking-[0.16em] text-copper uppercase">
              {t("isoTitle")}
            </p>
            <p className="mt-1 text-[12px] text-[#8f99a3]">{t("isoText")}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-[1520px] flex-col gap-3 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-[12px] text-[#8f99a3] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12 xl:px-16">
          <p>{t("copyright")}</p>
          <p className="flex flex-wrap gap-x-3 gap-y-1 text-copper">
            <Link href="/privacy" className="hover:underline">
              {t("privacy")}
            </Link>
            <span className="text-white/25">|</span>
            <Link href="/cookies" className="hover:underline">
              {t("cookies")}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
