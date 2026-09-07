"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Hero } from "@/components/hero";
import { Categories } from "@/components/categories";

export function HeroScreen() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate flex flex-col overflow-hidden lg:h-[calc(100svh-81px)] lg:min-h-[700px]">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero-metal-plates.jpg"
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center]"
        />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(7_13_19_/_0.78)_0%,rgb(7_13_19_/_0.42)_28%,transparent_62%)] lg:bg-[linear-gradient(to_right,rgb(7_13_19_/_0.42)_0%,rgb(7_13_19_/_0.16)_20%,transparent_38%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070d13]/85 via-transparent to-[#070d13]/35 lg:from-[#070d13]/10 lg:to-[#070d13]/6" />
      </div>

      <Hero />
      <Categories />
    </section>
  );
}
