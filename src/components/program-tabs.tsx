"use client";

import { useEffect, useState } from "react";
import { IconHeartOutline, IconShare } from "@/components/icons";

const tabs = [
  { id: "about", label: "О программе" },
  { id: "agenda", label: "Программа" },
  { id: "speaker", label: "Лектор" },
  { id: "documents", label: "Документы" },
  { id: "reviews", label: "Отзывы" },
];

export function ProgramTabs() {
  const [active, setActive] = useState("about");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActive(topMost.target.id);
        }
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function handleShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ title: document.title, url: window.location.href }).catch(() => {});
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  }

  return (
    <div className="sticky top-[73px] z-20 border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-10">
        <nav className="flex flex-wrap gap-1.5">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === tab.id ? "bg-blue text-white" : "bg-[#f4f5f8] text-ink/75 hover:text-ink"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <button
            type="button"
            onClick={() => setSaved((s) => !s)}
            className="flex items-center gap-1.5 font-medium text-blue hover:text-blue-dark"
          >
            <IconHeartOutline className={`h-4 w-4 ${saved ? "fill-blue" : ""}`} />
            {saved ? "В избранном" : "Добавить в избранное"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 font-medium text-blue hover:text-blue-dark"
          >
            <IconShare className="h-4 w-4" />
            Поделиться
          </button>
        </div>
      </div>
    </div>
  );
}
