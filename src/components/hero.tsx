"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calculator, BarChart3, ShieldCheck, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative z-10 flex lg:min-h-0 lg:flex-1">
      <div className="relative mx-auto flex w-full max-w-[1520px] flex-col px-5 pt-8 pb-8 sm:px-8 sm:pt-12 sm:pb-10 lg:justify-center lg:px-12 lg:py-8 xl:px-16 xl:py-10">
        <motion.div
          className="w-full max-w-[560px] lg:max-w-[600px] xl:max-w-[640px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="text-[11px] font-semibold tracking-[0.28em] text-copper uppercase sm:text-[12px]">
            {t("eyebrow")}
          </p>

          <h1 className="mt-5 text-[2.05rem] font-bold leading-[1.06] tracking-[-0.035em] text-white min-[400px]:text-[2.35rem] sm:mt-6 sm:text-[3.15rem] lg:text-[3.55rem] xl:text-[4rem] xl:leading-[1.04]">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>

          <p className="mt-5 max-w-[32.5rem] text-[15px] leading-7 text-[#8f99a3] sm:mt-6 sm:text-[16px] sm:leading-[1.75]">
            {t("description")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-3.5">
            <Link
              href="/catalog"
              className="inline-flex h-[48px] w-full items-center justify-center gap-2.5 rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_46%,#d9965c_100%)] px-6 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255_/_0.22),0_10px_26px_rgb(160_86_46_/_0.28)] transition-all duration-200 hover:brightness-[1.08] hover:shadow-[inset_0_1px_0_rgb(255_255_255_/_0.28),0_12px_30px_rgb(199_122_69_/_0.38)] sm:w-auto"
            >
              {t("primaryCta")}
              <ArrowRight className="size-4" strokeWidth={2.2} />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex h-[48px] w-full items-center justify-center gap-2.5 rounded-[4px] border border-copper/85 bg-transparent px-6 text-[14px] font-medium text-white transition-all duration-200 hover:border-copper hover:bg-copper/[0.08] hover:shadow-[0_0_18px_rgb(199_122_69_/_0.18)] sm:w-auto"
            >
              {t("secondaryCta")}
              <Calculator className="size-4 text-copper" strokeWidth={1.8} />
            </Link>
          </div>

          <div className="mt-8 inline-grid w-full max-w-[32rem] grid-cols-3 overflow-hidden rounded-[4px] border border-[rgb(184_106_59_/_0.38)] bg-[rgb(8_14_20_/_0.78)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.04)] sm:mt-9">
            <TrustItem
              icon={BarChart3}
              line1={t("trust.qualityLine1")}
              line2={t("trust.qualityLine2")}
            />
            <TrustItem
              icon={ShieldCheck}
              line1={t("trust.standardsLine1")}
              line2={t("trust.standardsLine2")}
              showDivider
            />
            <TrustItem
              icon={Globe}
              line1={t("trust.deliveryLine1")}
              line2={t("trust.deliveryLine2")}
              showDivider
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustItem({
  icon: Icon,
  line1,
  line2,
  showDivider = false,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  line1: string;
  line2: string;
}) {
  return (
    <div
      className={`relative flex min-w-0 items-center gap-1.5 px-1.5 py-2.5 sm:gap-3 sm:px-4 sm:py-3.5 ${
        showDivider
          ? "before:absolute before:top-2.5 before:bottom-2.5 before:left-0 before:w-px before:bg-[rgb(184_106_59_/_0.28)]"
          : ""
      }`}
    >
      <Icon className="hidden size-4 shrink-0 text-copper min-[420px]:block sm:size-[18px]" strokeWidth={1.6} />
      <span className="min-w-0 text-[11px] font-medium leading-[1.25] text-white/92 min-[400px]:text-[12px] sm:text-[13px]">
        {line1}
        <br />
        {line2}
      </span>
    </div>
  );
}
