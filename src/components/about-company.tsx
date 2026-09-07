"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const SIDE_CARDS = [
  { key: "certified" as const, image: "/about/about-certified.png" },
  { key: "team" as const, image: "/about/about-team.png" },
];

const PHOTO_MASK =
  "linear-gradient(to right, #000 48%, transparent 92%), linear-gradient(to top, #000 58%, transparent 100%)";

export function AboutCompany() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="surface-mottled relative flex min-h-0 flex-col justify-center overflow-hidden bg-[#04080c] py-12 sm:py-14 lg:min-h-svh lg:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-0 hidden h-[58%] w-[54%] max-w-[860px] lg:block"
        style={{
          maskImage: PHOTO_MASK,
          WebkitMaskImage: PHOTO_MASK,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <Image
          src="/about/about-profiles-photo.jpg"
          alt=""
          fill
          sizes="54vw"
          className="object-cover object-left-bottom"
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1520px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-0 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:pr-12 xl:pr-16">
          <div className="relative max-w-[32rem] rounded-[14px] bg-[rgb(4_8_12_/_0.55)] p-5 sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.28em] text-copper uppercase sm:text-[12px]">
              {t("eyebrow")}
            </p>

            <h2 className="mt-5 text-[2.1rem] font-bold leading-[1.08] tracking-[-0.035em] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
              {t("title")}
            </h2>

            <p className="mt-6 text-[14px] leading-[1.75] text-[#8f99a3] sm:text-[15px]">
              {t("paragraph1")}
            </p>
            <p className="mt-5 text-[14px] leading-[1.75] text-[#8f99a3] sm:text-[15px]">
              {t("paragraph2")}
            </p>

            <a
              href="#advantages"
              className="mt-8 inline-flex h-[52px] w-full max-w-[22rem] items-center justify-center gap-6 rounded-[6px] border border-copper/70 bg-[rgb(4_8_12_/_0.45)] px-6 text-[14px] font-medium text-white transition-[border-color,background-color,box-shadow] duration-300 hover:border-copper hover:bg-copper/[0.12] hover:shadow-[0_0_18px_rgb(199_122_69_/_0.18)] sm:w-fit sm:justify-start"
            >
              {t("cta")}
              <ArrowRight className="size-4 text-copper" strokeWidth={1.8} />
            </a>
          </div>

          <div className="relative mt-10 h-[210px] overflow-hidden sm:h-[260px] lg:hidden">
            <Image
              src="/about/about-profiles-photo.jpg"
              alt={t("imageAlt")}
              fill
              sizes="100vw"
              className="object-cover object-left-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04080c] via-transparent to-transparent" />
          </div>
        </div>

        <div className="grid gap-4 lg:h-[62vh] lg:max-h-[620px] lg:min-h-[420px] lg:grid-rows-[minmax(0,0.95fr)_minmax(0,1fr)] lg:border-l lg:border-white/[0.09] lg:pl-12 xl:pl-16">
          <article className="rounded-[14px] border border-white/[0.08] bg-[linear-gradient(145deg,#10151b_0%,#0a0e13_60%,#080b0f_100%)] p-6 sm:p-7">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
              <span className="relative size-[124px] shrink-0 sm:size-[150px]">
                <Image
                  src="/about/about-reserves.png"
                  alt=""
                  fill
                  sizes="150px"
                  className="object-contain mix-blend-lighten"
                />
              </span>
              <div className="min-w-0">
                <p className="text-[2.1rem] font-bold leading-none tracking-[-0.03em] text-copper sm:text-[2.6rem]">
                  {t("stat.value")}{" "}
                  <span className="text-[1.5rem] font-semibold text-white sm:text-[1.85rem]">
                    {t("stat.unit")}
                  </span>
                </p>
                <p className="mt-3 text-[16px] text-white sm:text-[17px]">
                  {t("stat.title")}
                </p>
                <p className="mt-3 max-w-[26rem] text-[13px] leading-[1.7] text-[#8f99a3] sm:text-[14px]">
                  {t("stat.text")}
                </p>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2">
            {SIDE_CARDS.map((card) => (
              <article
                key={card.key}
                className="flex h-full flex-col rounded-[14px] border border-white/[0.08] bg-[linear-gradient(145deg,#10151b_0%,#0a0e13_60%,#080b0f_100%)] p-6 sm:p-7"
              >
                <span className="relative size-[100px] sm:size-[116px]">
                  <Image
                    src={card.image}
                    alt=""
                    fill
                    sizes="116px"
                    className="object-contain object-left mix-blend-lighten"
                  />
                </span>
                <h3 className="mt-6 text-[17px] font-semibold text-copper sm:text-[18px]">
                  {t(`cards.${card.key}.title`)}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.7] text-[#8f99a3] sm:text-[14px]">
                  {t(`cards.${card.key}.text`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
