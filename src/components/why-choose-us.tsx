"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const CARDS = [
  { key: "speed" as const, image: "/advantages/speed.png" },
  { key: "warranty" as const, image: "/advantages/warranty.png" },
  { key: "quality" as const, image: "/advantages/quality.png" },
  { key: "range" as const, image: "/advantages/range.png" },
];

export function WhyChooseUs() {
  const t = useTranslations("why");

  return (
    <section
      id="advantages"
      className="surface-mottled relative flex min-h-0 flex-col justify-center overflow-hidden bg-[#070d13] py-14 pb-20 sm:py-16 sm:pb-24 lg:min-h-svh lg:py-20 lg:pb-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-[21%] w-px bg-gradient-to-b from-transparent via-copper/12 to-transparent" />
        <div className="absolute inset-y-0 left-[52%] w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute inset-y-0 right-[9%] w-px bg-gradient-to-b from-transparent via-copper/10 to-transparent" />
        <div className="absolute inset-x-0 top-[16%] h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-gradient-to-r from-transparent via-copper/10 to-transparent" />
        <div className="absolute top-1/2 -right-40 size-[620px] -translate-y-1/2 rounded-full border border-copper/[0.07]" />
        <div className="absolute top-1/2 -right-24 size-[420px] -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="absolute -left-[6%] top-[10%] h-px w-[42%] rotate-[16deg] bg-gradient-to-r from-transparent via-copper/12 to-transparent" />
        <div className="absolute -left-[4%] bottom-[8%] h-px w-[34%] -rotate-[12deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1520px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(260px,380px)_1fr] lg:gap-14 lg:px-12 xl:px-16">
        <div>
          <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.28em] text-copper uppercase sm:text-[12px]">
            <span className="h-4 w-px bg-copper" />
            {t("eyebrow")}
          </p>
          <div className="mt-3 h-px w-24 bg-copper/60" />
          <h2 className="mt-5 max-w-[16ch] text-[1.85rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[2.5rem] lg:text-[2.9rem]">
            {t("title")}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:h-[58vh] lg:max-h-[560px] lg:min-h-[400px] lg:gap-5">
          {CARDS.map((card) => (
            <article
              key={card.key}
              className="flex h-full min-w-0 items-center gap-4 rounded-[10px] border border-copper/25 bg-[linear-gradient(145deg,#11161d_0%,#0b1015_58%,#080b0f_100%)] p-4 shadow-[0_16px_38px_rgb(0_0_0_/_0.3)] sm:gap-6 sm:p-7"
            >
              <span className="relative size-[72px] shrink-0 sm:size-[96px] lg:size-[132px]">
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="132px"
                  className="object-contain mix-blend-lighten"
                />
              </span>
              <div className="min-w-0">
                <h3 className="text-[18px] font-semibold leading-[1.18] text-copper sm:text-[21px]">
                  {t(`cards.${card.key}.title`)}
                </h3>
                <div className="mt-3 h-px w-10 bg-copper/80" />
                <p className="mt-4 text-[14px] leading-[1.75] text-[#c5cdd4] sm:text-[15px]">
                  {t(`cards.${card.key}.text`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-12 bg-[linear-gradient(90deg,#6f3a1e_0%,#c77a45_45%,#d9965c_100%)] opacity-90"
      />
    </section>
  );
}
