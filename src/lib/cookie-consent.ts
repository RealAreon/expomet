export const CALC_HISTORY_KEY = "expomet-calc-history-v2";
export const CONSENT_STORAGE_KEY = "expomet-consent-v1";
export const CONSENT_COOKIE_NAME = "expomet_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 60 * 60 * 24 * 365;
export const CONSENT_OPEN_EVENT = "expomet:open-consent";
export const CONSENT_CHANGE_EVENT = "expomet:consent-change";

export const COOKIE_CATEGORIES = [
  "necessary",
  "technical",
  "analytics",
  "functional",
  "marketing",
] as const;

export type CookieCategory = (typeof COOKIE_CATEGORIES)[number];

export type CookieConsentState = {
  version: typeof CONSENT_VERSION;
  necessary: true;
  technical: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  updatedAt: string;
};

export const REJECTED_CONSENT: Omit<CookieConsentState, "updatedAt"> = {
  version: CONSENT_VERSION,
  necessary: true,
  technical: false,
  analytics: false,
  functional: false,
  marketing: false,
};

export const ACCEPTED_CONSENT: Omit<CookieConsentState, "updatedAt"> = {
  version: CONSENT_VERSION,
  necessary: true,
  technical: true,
  analytics: true,
  functional: true,
  marketing: true,
};

export function withTimestamp(
  value: Omit<CookieConsentState, "updatedAt">,
): CookieConsentState {
  return { ...value, updatedAt: new Date().toISOString() };
}

export function isConsentRecord(value: unknown): value is CookieConsentState {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<CookieConsentState>;
  return (
    record.version === CONSENT_VERSION &&
    record.necessary === true &&
    typeof record.technical === "boolean" &&
    typeof record.analytics === "boolean" &&
    typeof record.functional === "boolean" &&
    typeof record.marketing === "boolean"
  );
}

export function readStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const fromStorage = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (fromStorage) {
      const parsed: unknown = JSON.parse(fromStorage);
      if (isConsentRecord(parsed)) return parsed;
    }
  } catch {
    /* ignore */
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!cookie) return null;

  try {
    const parsed: unknown = JSON.parse(
      decodeURIComponent(cookie.slice(CONSENT_COOKIE_NAME.length + 1)),
    );
    if (isConsentRecord(parsed)) return parsed;
  } catch {
    /* ignore */
  }

  return null;
}

export function persistConsent(consent: CookieConsentState) {
  if (typeof window === "undefined") return;

  const payload = JSON.stringify(consent);
  window.localStorage.setItem(CONSENT_STORAGE_KEY, payload);
  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(payload)}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax`;
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }),
  );
  applyConsentScripts(consent);
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

function gaDisableKey(id: string) {
  return `ga-disable-${id}`;
}

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
} & Record<string, unknown>;

function loadGoogleAnalytics(id: string) {
  const win = window as AnalyticsWindow;
  win[gaDisableKey(id)] = false;

  if (document.getElementById("expomet-ga-src")) {
    win.gtag?.("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
    });
    return;
  }

  win.dataLayer = win.dataLayer ?? [];
  win.gtag = function gtag(...args: unknown[]) {
    win.dataLayer?.push(args);
  };
  win.gtag("js", new Date());
  win.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
  });
  win.gtag("config", id, { anonymize_ip: true });

  const script = document.createElement("script");
  script.id = "expomet-ga-src";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
}

function unloadGoogleAnalytics(id: string) {
  const win = window as AnalyticsWindow;
  win[gaDisableKey(id)] = true;
  win.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
  });

  document.getElementById("expomet-ga-src")?.remove();
  document
    .querySelectorAll(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)
    .forEach((node) => node.remove());

  const expire = "Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie.split("; ").forEach((row) => {
    const name = row.split("=")[0];
    if (!name) return;
    if (/^(_ga|_gid|_gat|__utm)/.test(name) || name.startsWith("_ga_")) {
      document.cookie = `${name}=; Expires=${expire}; Path=/; SameSite=Lax`;
    }
  });
}

export function canStoreFunctionalData() {
  return readStoredConsent()?.functional === true;
}

export function applyConsentScripts(consent: CookieConsentState) {
  if (!consent.functional) {
    try {
      window.localStorage.removeItem(CALC_HISTORY_KEY);
    } catch {
      /* ignore */
    }
  }

  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return;
  if (consent.analytics) loadGoogleAnalytics(id);
  else unloadGoogleAnalytics(id);
}
