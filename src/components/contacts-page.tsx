"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { toast } from "sonner";

const CONTACTS = [
  { phone: "050-409-6161", tel: "+380504096161", role: "management" as const },
  { phone: "050-409-6060", tel: "+380504096060", role: "management" as const },
  { phone: "050-422-0503", tel: "+380504220503", role: "cutting" as const },
  { phone: "050-344-1141", tel: "+380503441141", role: "general" as const },
  { phone: "050-409-8500", tel: "+380504098500", role: "general" as const },
  { phone: "050-409-8433", tel: "+380504098433", role: "accounting" as const },
];

export function ContactsPage() {
  const t = useTranslations("contacts");
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      toast.success(t("sent"));
      form.reset();
    } catch {
      toast.error("Error");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="surface-mottled-soft surface-grain-soft surface-glow relative min-h-0 overflow-hidden lg:min-h-[calc(100svh-80px)]">
      <div className="relative z-10 mx-auto max-w-[1520px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 xl:px-16">
      <p className="text-[12px] text-[#8f99a3]">
        <Link href="/" className="hover:text-copper">
          {t("crumbHome")}
        </Link>
        {" > "}
        {t("crumb")}
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <h1 className="text-[2rem] font-bold text-white sm:text-[2.6rem]">{t("title")}</h1>
        <span className="hidden h-16 w-px bg-copper lg:block" />
        <p className="max-w-md text-[15px] leading-7 text-[#8f99a3]">{t("intro")}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[10px] border border-white/[0.08] bg-[#0c1218] p-6">
          <h2 className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
            {t("salesTitle")}
          </h2>
          <p className="mt-1 text-[13px] text-[#8f99a3]">{t("salesSub")}</p>
          <ul className="mt-6">
            {CONTACTS.map((item) => (
              <li
                key={`${item.tel}-${item.role}`}
                className="flex flex-col gap-3 border-b border-white/[0.07] py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full border border-copper/50 text-copper">
                    <Phone className="size-4" />
                  </span>
                  <p className="text-[15px] text-white">{t(`roles.${item.role}`)}</p>
                </div>
                <a
                  href={`tel:${item.tel}`}
                  className="flex items-center gap-2 text-[15px] text-white transition-colors duration-200 hover:text-copper sm:justify-end"
                >
                  {item.phone}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <div className="flex flex-col gap-6">
          <article className="rounded-[10px] border border-white/[0.08] bg-[#0c1218] p-6">
            <h2 className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
              {t("officeTitle")}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-[12px] text-[#8f99a3]">{t("mainEmail")}</p>
                <a
                  href="mailto:expomet@ukr.net"
                  className="mt-1 block text-white transition-colors duration-200 hover:text-copper"
                >
                  expomet@ukr.net
                </a>
              </div>
              <div>
                <p className="text-[12px] text-[#8f99a3]">{t("backupEmail")}</p>
                <a
                  href="mailto:7519850@ukr.net"
                  className="mt-1 block text-white transition-colors duration-200 hover:text-copper"
                >
                  7519850@ukr.net
                </a>
              </div>
            </div>
          </article>

          <article className="rounded-[10px] border border-white/[0.08] bg-[#0c1218] p-6">
            <h2 className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
              {t("formTitle")}
            </h2>
            <p className="mt-1 text-[13px] text-[#8f99a3]">{t("formSub")}</p>
            <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <input name="name" required placeholder={t("name")} className="h-11 rounded-[4px] border border-white/10 bg-[#070d13] px-3 text-[14px] text-white outline-none focus:border-copper" />
                <input name="phone" required placeholder={t("phone")} className="h-11 rounded-[4px] border border-white/10 bg-[#070d13] px-3 text-[14px] text-white outline-none focus:border-copper" />
              </div>
              <textarea name="message" required rows={5} placeholder={t("message")} className="resize-none rounded-[4px] border border-white/10 bg-[#070d13] px-3 py-3 text-[14px] text-white outline-none focus:border-copper" />
              <button
                disabled={sending}
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_50%,#d9965c_100%)] text-[14px] font-semibold text-white disabled:opacity-60"
              >
                {t("send")}
                <Send className="size-4" />
              </button>
            </form>
          </article>
        </div>
      </div>

      <div className="relative mt-8 min-h-[168px] overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#0c1218] sm:min-h-[188px]">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/hero-copper-plates.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[88%_center]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0c1218_0%,rgb(12_18_24_/_0.82)_42%,rgb(12_18_24_/_0.35)_100%)] lg:bg-[linear-gradient(to_right,#0c1218_0%,#0c1218_38%,rgb(12_18_24_/_0.72)_52%,rgb(12_18_24_/_0.28)_68%,transparent_82%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1218]/50 via-transparent to-[#0c1218]/20 lg:from-transparent" />
        </div>
        <div className="relative z-10 max-w-xl px-6 py-7 sm:px-8 sm:py-8">
          <p className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
            {t("bannerTitle")}
          </p>
          <p className="mt-3 text-[15px] leading-7 text-white/90">{t("bannerText")}</p>
        </div>
      </div>
      </div>
    </section>
  );
}
