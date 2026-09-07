"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CATEGORIES = [
  { key: "aluminum" as const, image: "/categories/aluminum.png" },
  { key: "brass" as const, image: "/categories/brass.png" },
  { key: "copper" as const, image: "/categories/copper.png" },
  { key: "bronze" as const, image: "/categories/bronze.png" },
  { key: "motors" as const, image: "/categories/motors.png" },
];

export function Categories() {
  const t = useTranslations("categories");

  return (
    <section id="catalog" className="relative z-10 lg:shrink-0">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
      />

      <div className="mx-auto grid max-w-[1520px] items-center gap-7 px-5 py-7 sm:px-8 lg:grid-cols-[minmax(220px,300px)_1fr] lg:gap-10 lg:px-12 lg:pt-5 lg:pb-7 xl:gap-12 xl:px-16">
        <div className="max-w-[320px]">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-copper uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-[1.6rem] font-bold leading-[1.14] tracking-[-0.03em] text-white sm:text-[1.8rem] lg:text-[1.9rem]">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h2>
          <p className="mt-3 text-[13px] leading-[1.6] text-[#8f99a3]">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((item) => (
            <Link
              key={item.key}
              href={`/catalog?category=${item.key}`}
              className="hover-glow group relative flex min-w-0 aspect-[4/5] flex-col rounded-[14px] border border-copper/45 bg-[rgb(10_15_22_/_0.72)] hover:border-copper/65 hover:bg-[rgb(10_15_22_/_0.82)] last:col-span-2 sm:last:col-span-1 lg:aspect-auto lg:h-[158px] lg:last:col-span-1"
            >
              <span className="relative flex min-h-0 flex-1 items-center justify-center px-2 pt-3">
                <Image
                  src={item.image}
                  alt=""
                  width={200}
                  height={200}
                  unoptimized
                  className="h-full max-h-[104px] w-auto max-w-[88%] object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
              </span>
              <span className="flex min-w-0 items-center justify-between gap-2 px-2.5 pt-1 pb-3 sm:px-3.5">
                <span className="min-w-0 text-[12px] leading-tight font-medium text-white sm:text-[13px]">
                  {t(`items.${item.key}`)}
                </span>
                <ArrowRight
                  className="size-3.5 shrink-0 text-white/70 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:text-copper"
                  strokeWidth={1.8}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
