"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  CalendarClock,
  Clock,
  Crosshair,
  Droplets,
  ExternalLink,
  Headset,
  ShieldCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CARDS = [
  {
    key: "cutting" as const,
    href: "/contacts",
    image: "/services/card-cutting.jpg",
    number: "01",
  },
  {
    key: "sales" as const,
    href: "/catalog",
    image: "/services/card-sales.jpg",
    number: "02",
  },
  {
    key: "motors" as const,
    href: "/catalog?category=motors",
    image: "/services/card-motors.jpg",
    number: "03",
  },
] as const;

const BENEFITS = [
  { key: "precision" as const, icon: Crosshair },
  { key: "thermal" as const, icon: ShieldCheck },
  { key: "speed" as const, icon: Clock },
  { key: "quality" as const, icon: Award },
];

const FEATURES = [
  { key: "jet" as const, icon: Droplets },
  { key: "materials" as const, icon: ShieldCheck },
  { key: "standards" as const, icon: Award },
  { key: "turnaround" as const, icon: CalendarClock },
  { key: "support" as const, icon: Headset },
];

export function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div className="bg-[#07090d]">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          <Image
            src="/services/hero-waterjet.jpg"
            alt=""
            fill
            priority
            sizes="70vw"
            className="object-cover object-[78%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090d] from-[38%] via-[#07090d]/72 via-[58%] to-[#07090d]/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-[#07090d]/30" />
        </div>

        <div className="relative mx-auto grid max-w-[1520px] items-center gap-10 px-5 pt-8 pb-12 sm:px-8 lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.78fr)] lg:px-12 lg:pt-12 lg:pb-14 xl:px-16">
          <div className="max-w-[680px]">
            <p className="text-[12px] text-[#8f99a3]">
              <Link href="/" className="hover:text-copper">
                {t("crumbHome")}
              </Link>
              {" / "}
              {t("crumb")}
            </p>
            <p className="mt-7 text-[11px] font-semibold tracking-[0.28em] text-copper uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="mt-4 text-[2.2rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.85rem] lg:text-[3.25rem]">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-[34rem] text-[15px] leading-7 text-[#8f99a3] sm:text-[16px] sm:leading-8">
              {t("intro")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contacts"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_52%,#d9965c_100%)] px-6 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.2),0_10px_24px_rgb(160_86_46_/_0.28)] transition-all hover:brightness-[1.06] sm:w-auto"
              >
                {t("order")}
                <ArrowRight className="size-4" strokeWidth={2.2} />
              </Link>
              <Link
                href="/contacts"
                className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-[4px] border border-white/25 bg-transparent px-6 text-[14px] font-medium text-white transition-colors hover:border-copper hover:text-copper sm:w-auto"
              >
                {t("contact")}
                <ExternalLink className="size-4" strokeWidth={1.8} />
              </Link>
            </div>
            <div className="mt-11 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-4">
              {BENEFITS.map((item) => (
                <div key={item.key} className="flex items-start gap-2.5">
                  <item.icon
                    className="mt-0.5 size-[18px] shrink-0 text-copper"
                    strokeWidth={1.7}
                  />
                  <p className="text-[12px] leading-5 font-medium text-white/90 sm:text-[13px]">
                    {t(`benefits.${item.key}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative h-[240px] overflow-hidden rounded-[12px] sm:h-[320px] lg:hidden">
            <Image
              src="/services/hero-waterjet.jpg"
              alt={t("heroAlt")}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1520px] px-5 py-4 sm:px-8 lg:px-12 lg:py-6 xl:px-16">
        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group relative overflow-hidden rounded-[12px] border border-copper/45 bg-[#10151c] transition-[border-color,box-shadow] duration-300 hover:border-copper hover:shadow-[0_0_0_1px_rgb(199_122_69_/_0.28),0_18px_40px_rgb(0_0_0_/_0.35)]"
            >
              <div className="relative isolate h-[200px] overflow-hidden sm:h-[220px]">
                <span className="absolute top-4 left-4 z-10 text-[13px] font-semibold tracking-[0.14em] text-copper">
                  {card.number}
                </span>
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="origin-center scale-[1.08] object-cover will-change-transform [backface-visibility:hidden] [transform:translateZ(0)] transition-transform duration-500 ease-out group-hover:scale-[1.14]"
                />
              </div>
              <div className="relative z-10 bg-[#10151c] px-5 pt-5 pb-5">
                <h2 className="text-[21px] font-semibold text-white">
                  {t(`cards.${card.key}.title`)}
                </h2>
                <p className="mt-2 text-[14px] leading-6 text-[#8f99a3] md:min-h-[3.6rem]">
                  {t(`cards.${card.key}.text`)}
                </p>
                <div className="mt-5 flex justify-end">
                  <span className="text-copper transition-transform group-hover:translate-x-0.5">
                    <ArrowRight className="size-5" strokeWidth={2} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 border-t border-white/[0.06] bg-[#080b10]">
        <div className="mx-auto grid max-w-[1520px] gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-10 lg:px-12 lg:py-14 xl:px-16">
          {FEATURES.map((item) => (
            <div key={item.key} className="max-w-[280px]">
              <item.icon className="size-8 text-copper" strokeWidth={1.5} />
              <h3 className="mt-5 text-[15px] font-semibold text-white">
                {t(`features.${item.key}.title`)}
              </h3>
              <p className="mt-2 text-[13px] leading-6 text-[#8f99a3]">
                {t(`features.${item.key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
