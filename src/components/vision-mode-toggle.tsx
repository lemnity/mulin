"use client";

import { useEffect, useSyncExternalStore } from "react";
import { IconEye } from "@/components/icons";

const STORAGE_KEY = "dnt.vision-mode";
const listeners = new Set<() => void>();

function readVisionMode(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function writeVisionMode(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "1" : "0");
  } catch {
    /* приватный режим или заблокированное хранилище: режим действует до перезагрузки */
  }
  listeners.forEach((listener) => listener());
}

/**
 * «Версия для слабовидящих»: крупнее шрифт, подчёркнутые ссылки, чёрно-белые картинки.
 * Стили режима живут в globals.css под `html[data-vision="on"]`. Состояние читается из
 * localStorage как внешний стор: на сервере всегда «выключено», поэтому гидрация не рвётся.
 */
export function VisionModeToggle({ className = "" }: { className?: string }) {
  const on = useSyncExternalStore(subscribe, readVisionMode, () => false);

  useEffect(() => {
    document.documentElement.dataset.vision = on ? "on" : "";
  }, [on]);

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => writeVisionMode(!on)}
      className={`inline-flex h-9 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-4 text-[0.84rem] font-semibold text-white transition-colors ${
        on ? "bg-blue hover:bg-blue-dark" : "bg-ink hover:bg-blue"
      } ${className}`}
    >
      <IconEye className="h-4.5 w-4.5 shrink-0 text-gold" />
      {on ? "Обычная версия" : "Версия для слабовидящих"}
    </button>
  );
}
