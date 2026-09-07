"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, Send } from "lucide-react";
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

const EMAILS = [
  { email: "olga.cvetmet@ukr.net", role: "generalMail" as const },
  { email: "expomet@ukr.net", role: "generalMail" as const },
  { email: "davidova.l.i@ukr.net", role: "management" as const },
  { email: "73ivan@ukr.net", role: "management" as const },
  { email: "denis7523114@ukr.net", role: "cutting" as const },
  { email: "7519850@ukr.net", role: "accounting" as const },
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

      <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:items-stretch lg:gap-6">
        <div className="flex flex-col gap-4 max-lg:contents lg:h-full lg:gap-6">
        <article className="order-1 shrink-0 rounded-[10px] border border-white/[0.08] bg-[#0c1218] p-6">
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

        <div className="relative order-4 min-h-0 overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#0c1218] lg:flex-1">
          <div className="pointer-events-none absolute inset-0">
            <Image
              src="/hero-copper-plates.png"
              alt=""
              fill
              sizes="50vw"
              className="object-cover object-[88%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0c1218_0%,rgb(12_18_24_/_0.82)_42%,rgb(12_18_24_/_0.35)_100%)] lg:bg-[linear-gradient(to_right,#0c1218_0%,#0c1218_42%,rgb(12_18_24_/_0.55)_70%,transparent_92%)]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1218]/50 via-transparent to-[#0c1218]/20 lg:from-transparent" />
          </div>
          <div className="relative z-10 px-6 py-5 sm:px-7 sm:py-5">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
              {t("bannerTitle")}
            </p>
            <p className="mt-2 max-w-md text-[14px] leading-6 text-white/90">{t("bannerText")}</p>
          </div>
        </div>
        </div>

        <div className="flex flex-col gap-4 max-lg:contents lg:h-full lg:gap-4">
        <article className="order-2 shrink-0 rounded-[10px] border border-white/[0.08] bg-[#0c1218] px-6 py-5">
            <h2 className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
              {t("officeTitle")}
            </h2>
            <ul className="mt-4">
              {EMAILS.map((item) => (
                <li
                  key={item.email}
                  className="flex items-center gap-2.5 border-b border-white/[0.07] py-2.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-copper/50 text-copper">
                    <Mail className="size-3.5" />
                  </span>
                  <a
                    href={`mailto:${item.email}`}
                    className="shrink-0 text-[14px] text-white transition-colors duration-200 hover:text-copper"
                  >
                    {item.email}
                  </a>
                  <p className="min-w-0 truncate text-[13px] text-[#8f99a3]">{t(`roles.${item.role}`)}</p>
                </li>
              ))}
            </ul>
          </article>

        <article className="order-3 flex min-h-0 flex-col rounded-[10px] border border-white/[0.08] bg-[#0c1218] p-5 lg:flex-1">
            <h2 className="text-[12px] font-semibold tracking-[0.18em] text-copper uppercase">
              {t("formTitle")}
            </h2>
            <p className="mt-1 text-[13px] text-[#8f99a3]">{t("formSub")}</p>
            <form className="mt-4 grid flex-1 grid-rows-[auto_1fr_auto] gap-2.5" onSubmit={onSubmit}>
              <div className="grid gap-2.5 sm:grid-cols-2">
                <input name="name" required placeholder={t("name")} className="h-10 rounded-[4px] border border-white/10 bg-[#070d13] px-3 text-[14px] text-white outline-none focus:border-copper" />
                <input name="phone" required placeholder={t("phone")} className="h-10 rounded-[4px] border border-white/10 bg-[#070d13] px-3 text-[14px] text-white outline-none focus:border-copper" />
              </div>
              <textarea name="message" required rows={3} placeholder={t("message")} className="h-full min-h-[84px] w-full resize-none rounded-[4px] border border-white/10 bg-[#070d13] px-3 py-2.5 text-[14px] text-white outline-none focus:border-copper" />
              <button
                disabled={sending}
                className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_50%,#d9965c_100%)] text-[14px] font-semibold text-white disabled:opacity-60"
              >
                {t("send")}
                <Send className="size-4" />
              </button>
            </form>
          </article>
        </div>
      </div>
      </div>
    </section>
  );
}
