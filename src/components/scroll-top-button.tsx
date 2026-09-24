"use client";

import { useEffect, useState } from "react";
import { IconChevronUp } from "@/components/icons";

const SHOW_AFTER_PX = 480;

/** Круглая кнопка «наверх» справа снизу — появляется после прокрутки страницы вниз. */
export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      }}
      aria-label="Наверх страницы"
      className={`fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-ink shadow-lg transition-all duration-200 hover:border-blue hover:text-blue sm:right-7 sm:bottom-7 ${
        visible ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <IconChevronUp className="h-5 w-5" />
    </button>
  );
}
