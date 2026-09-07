"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { usePathname } from "@/i18n/navigation";

const HEADER_OFFSET = 96;

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduced
      ? null
      : new Lenis({
          duration: 0.72,
          smoothWheel: true,
          autoRaf: true,
        });

    lenisRef.current = lenis;
    history.scrollRestoration = "manual";
    if (!window.location.hash) {
      lenis?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }

    const scrollToId = (id: string, immediate: boolean) => {
      const target = document.getElementById(id);
      if (!target) return false;
      if (lenis && !immediate && !reduced) {
        lenis.scrollTo(target, { offset: -HEADER_OFFSET });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: immediate || reduced ? "auto" : "smooth" });
      }
      return true;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href?.includes("#")) return;
      const id = href.split("#")[1];
      if (!id) return;
      if (scrollToId(id, false)) {
        event.preventDefault();
        history.replaceState(null, "", `#${id}`);
      }
    };

    document.addEventListener("click", onClick);

    const onScrollTo = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (id) scrollToId(id, false);
    };
    window.addEventListener("expomet:scroll-to", onScrollTo);

    const onNestedWheel = (event: WheelEvent) => {
      const origin = event.target;
      if (
        !(origin instanceof Element) ||
        !origin.closest("[data-lenis-prevent], [data-slot='dropdown-menu-content']")
      ) {
        return;
      }
      const scroller = event.composedPath().find(
        (node): node is HTMLElement =>
          node instanceof HTMLElement &&
          (node.hasAttribute("data-lenis-prevent") ||
            node.getAttribute("data-slot") === "dropdown-menu-content") &&
          node.scrollHeight - node.clientHeight > 1,
      );
      if (!scroller) return;
      const max = scroller.scrollHeight - scroller.clientHeight;
      const goingUp = event.deltaY < 0;
      const canScroll = goingUp ? scroller.scrollTop > 0 : scroller.scrollTop < max;
      if (!canScroll) return;
      scroller.scrollTop = Math.min(max, Math.max(0, scroller.scrollTop + event.deltaY));
      event.preventDefault();
      event.stopPropagation();
    };

    document.addEventListener("wheel", onNestedWheel, { passive: false, capture: true });

    const initial = window.location.hash.slice(1);
    if (initial) {
      requestAnimationFrame(() => scrollToId(initial, true));
    }

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("expomet:scroll-to", onScrollTo);
      document.removeEventListener("wheel", onNestedWheel, true);
      lenisRef.current = null;
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return <>{children}</>;
}
