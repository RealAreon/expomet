import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { SiteFooter } from "@/components/site-footer";
import { CookieConsent } from "@/components/cookie-consent";

export async function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh overflow-x-clip">
      <Header />
      <main>{children}</main>
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}
