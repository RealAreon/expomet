"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ACCEPTED_CONSENT,
  CONSENT_OPEN_EVENT,
  REJECTED_CONSENT,
  applyConsentScripts,
  openConsentSettings,
  persistConsent,
  readStoredConsent,
  withTimestamp,
  type CookieCategory,
  type CookieConsentState,
} from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

const OPTIONAL: CookieCategory[] = [
  "technical",
  "analytics",
  "functional",
  "marketing",
];

export function CookieSettingsButton({ className }: { className?: string }) {
  const t = useTranslations("cookieBanner");
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] border border-copper px-5 text-[14px] font-medium text-copper transition-colors hover:bg-copper/10",
        className,
      )}
    >
      <Settings2 className="size-4" strokeWidth={1.8} />
      {t("manage")}
    </button>
  );
}

export function CookieConsent() {
  const t = useTranslations("cookieBanner");
  const [ready, setReady] = useState(false);
  const [banner, setBanner] = useState(false);
  const [settings, setSettings] = useState(false);
  const [draft, setDraft] = useState<CookieConsentState>(() =>
    withTimestamp(REJECTED_CONSENT),
  );

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setDraft(stored);
      applyConsentScripts(stored);
      setBanner(false);
    } else {
      setBanner(true);
    }
    setReady(true);

    const onOpen = () => {
      const current = readStoredConsent();
      setDraft(current ?? withTimestamp(REJECTED_CONSENT));
      setSettings(true);
      setBanner(false);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  function save(next: CookieConsentState) {
    persistConsent(next);
    setDraft(next);
    setBanner(false);
    setSettings(false);
  }

  function toggle(category: CookieCategory) {
    if (category === "necessary") return;
    setDraft((current) => ({ ...current, [category]: !current[category] }));
  }

  if (!ready) return null;

  return createPortal(
    <>
      <AnimatePresence>
        {banner ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[90] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
          >
            <div
              data-lenis-prevent=""
              className="mx-auto flex max-w-[920px] flex-col gap-4 rounded-[12px] border border-copper/40 bg-[#0c1218] p-5 shadow-[0_24px_64px_rgb(0_0_0_/_0.55)] sm:p-6"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[6px] border border-copper/50 text-copper">
                  <Cookie className="size-5" strokeWidth={1.7} />
                </span>
                <div className="min-w-0">
                  <p className="text-[16px] font-semibold text-white">{t("title")}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[#8f99a3]">
                    {t("text")}{" "}
                    <Link href="/privacy" className="text-copper hover:underline">
                      {t("privacyLink")}
                    </Link>
                    {" · "}
                    <Link href="/cookies" className="text-copper hover:underline">
                      {t("cookiesLink")}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setSettings(true);
                    setBanner(false);
                  }}
                  className="inline-flex h-11 items-center justify-center rounded-[4px] border border-white/15 px-4 text-[13px] text-white/90 hover:border-copper/50 hover:text-copper"
                >
                  {t("customize")}
                </button>
                <button
                  type="button"
                  onClick={() => save(withTimestamp(REJECTED_CONSENT))}
                  className="inline-flex h-11 items-center justify-center rounded-[4px] border border-white/15 px-4 text-[13px] text-white/90 hover:border-copper/50 hover:text-copper"
                >
                  {t("reject")}
                </button>
                <button
                  type="button"
                  onClick={() => save(withTimestamp(ACCEPTED_CONSENT))}
                  className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_50%,#d9965c_100%)] px-5 text-[13px] font-semibold text-white"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {settings ? (
          <CookieSettingsPanel
            draft={draft}
            onToggle={toggle}
            onClose={() => {
              setSettings(false);
              if (!readStoredConsent()) setBanner(true);
            }}
            onSave={() => save(withTimestamp(draft))}
            onAcceptAll={() => save(withTimestamp(ACCEPTED_CONSENT))}
            onReject={() => save(withTimestamp(REJECTED_CONSENT))}
          />
        ) : null}
      </AnimatePresence>
    </>,
    document.body,
  );
}

function CookieSettingsPanel({
  draft,
  onToggle,
  onClose,
  onSave,
  onAcceptAll,
  onReject,
}: {
  draft: CookieConsentState;
  onToggle: (category: CookieCategory) => void;
  onClose: () => void;
  onSave: () => void;
  onAcceptAll: () => void;
  onReject: () => void;
}) {
  const t = useTranslations("cookieBanner");
  const rows = useMemo(
    () =>
      (["necessary", ...OPTIONAL] as CookieCategory[]).map((id) => ({
        id,
        locked: id === "necessary",
        on: draft[id],
      })),
    [draft],
  );

  return (
    <motion.div
      className="fixed inset-0 z-[95] flex items-end justify-center bg-black/70 p-3 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        data-lenis-prevent=""
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mb-[env(safe-area-inset-bottom)] flex max-h-[min(92dvh,720px)] w-full max-w-[640px] flex-col overflow-hidden rounded-[14px] border border-white/10 bg-[#0c1218] shadow-[0_24px_80px_rgb(0_0_0_/_0.55)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 sm:px-6">
          <div>
            <p className="flex items-center gap-2 text-[16px] font-semibold text-white">
              <ShieldCheck className="size-4 text-copper" />
              {t("settingsTitle")}
            </p>
            <p className="mt-2 text-[13px] leading-6 text-[#8f99a3]">{t("settingsText")}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-[4px] border border-white/15 text-white/70 hover:text-white"
            aria-label={t("close")}
          >
            <X className="size-4" />
          </button>
        </div>

        <ul className="mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-5 pb-2 sm:px-6">
          {rows.map((row) => (
            <li
              key={row.id}
              className="rounded-[10px] border border-white/[0.08] bg-[#070d13] p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold text-white">
                    {t(`categories.${row.id}.title`)}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-5 text-[#8f99a3]">
                    {t(`categories.${row.id}.text`)}
                  </p>
                </div>
                <ConsentSwitch
                  checked={row.on}
                  disabled={row.locked}
                  label={t(`categories.${row.id}.title`)}
                  onToggle={() => onToggle(row.id)}
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-2 border-t border-white/10 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onReject}
            className="inline-flex h-11 items-center justify-center rounded-[4px] border border-white/15 px-4 text-[13px] text-white/85 hover:border-copper/50 hover:text-copper"
          >
            {t("reject")}
          </button>
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-11 items-center justify-center rounded-[4px] border border-copper/70 px-4 text-[13px] text-copper hover:bg-copper/10"
          >
            {t("save")}
          </button>
          <button
            type="button"
            onClick={onAcceptAll}
            className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[linear-gradient(90deg,#a0562e_0%,#c77a45_50%,#d9965c_100%)] px-5 text-[13px] font-semibold text-white"
          >
            {t("acceptAll")}
          </button>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function ConsentSwitch({
  checked,
  disabled,
  label,
  onToggle,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        "relative h-8 w-[52px] shrink-0 rounded-full transition-colors",
        checked ? "bg-copper" : "bg-white/14",
        disabled && "cursor-not-allowed opacity-80",
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 size-6 rounded-full bg-white shadow-sm transition-transform",
          checked && "translate-x-[20px]",
        )}
      />
    </button>
  );
}
