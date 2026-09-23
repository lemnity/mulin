"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import {
  IconBuilding,
  IconCheck,
  IconChevronDown,
  IconLogout,
  IconPlus,
  IconUserCircle,
} from "@/components/icons";

/* Компании, привязанные к профилю. Пока демо-данные: настоящий список придёт из кабинета. */
export type Company = { id: string; name: string; inn: string };

export const companies: Company[] = [
  { id: "c1", name: "ООО «Сибирь-Аудит»", inn: "7202154871" },
  { id: "c2", name: "АО «Тюменьэнергосбыт»", inn: "7203092341" },
  { id: "c3", name: "ИП Кузнецова Е. В.", inn: "720312345678" },
];

/* Выбранная компания хранится в localStorage как внешний стор: сервер всегда отдаёт первую. */
const STORAGE_KEY = "dnt.active-company";
const listeners = new Set<() => void>();

function readActive(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && companies.some((c) => c.id === saved) ? saved : companies[0].id;
  } catch {
    return companies[0].id;
  }
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function setActive(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* приватный режим: выбор живёт до перезагрузки */
  }
  listeners.forEach((l) => l());
}

function formatInn(inn: string) {
  return `ИНН ${inn}`;
}

/**
 * Кнопка «Личный кабинет» с выпадающим меню. Построена на <details>, поэтому закрытие по
 * клику снаружи, Esc и анимация панели общие с остальными меню шапки.
 */
export function AccountMenu({ className = "" }: { className?: string }) {
  const activeId = useSyncExternalStore(subscribe, readActive, () => companies[0].id);
  const active = companies.find((c) => c.id === activeId) ?? companies[0];

  return (
    <details className={`group relative ${className}`}>
      <summary
        aria-label={`Личный кабинет, ${active.name}`}
        className="flex h-10 cursor-pointer list-none items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-blue px-4 text-[0.875rem] font-medium text-white transition-colors hover:bg-blue-dark [&::-webkit-details-marker]:hidden 3xl:h-11 3xl:px-5 3xl:text-[0.95rem]"
      >
        <IconUserCircle className="h-4.5 w-4.5 shrink-0" />
        Личный кабинет
        <IconChevronDown className="h-3.5 w-3.5 text-white/80 transition-transform group-open:rotate-180" />
      </summary>

      <div className="menu-panel absolute right-0 top-[calc(100%+0.5rem)] z-40 w-80 rounded-xl border border-border bg-surface p-2 shadow-lg">
        <p className="px-3 pb-1.5 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Ваши компании
        </p>
        <ul role="listbox" aria-label="Компания" className="flex flex-col gap-0.5">
          {companies.map((c) => {
            const isActive = c.id === active.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                    isActive ? "bg-blue-tint" : "hover:bg-page"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-blue text-white" : "bg-page text-blue ring-1 ring-inset ring-border"
                    }`}
                  >
                    <IconBuilding className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0 flex-1 leading-snug">
                    <span className="block truncate text-sm font-semibold text-ink">{c.name}</span>
                    <span className="tabular block text-xs text-body">{formatInn(c.inn)}</span>
                  </span>
                  {isActive && <IconCheck className="h-4 w-4 shrink-0 text-blue" />}
                </button>
              </li>
            );
          })}
        </ul>

        <Link
          href="/account"
          className="mt-1.5 flex items-center justify-center gap-2 rounded-lg border border-dashed border-blue/50 px-3 py-2.5 text-sm font-medium text-blue transition-colors hover:border-blue hover:bg-blue-tint"
        >
          <IconPlus className="h-4 w-4" />
          Добавить компанию
        </Link>

        <div className="mt-2 border-t border-border pt-2">
          <Link
            href="/account"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink transition-colors hover:bg-page hover:text-blue"
          >
            <IconUserCircle className="h-4.5 w-4.5 text-muted" />
            Профиль
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink transition-colors hover:bg-page hover:text-blue"
          >
            <IconLogout className="h-4.5 w-4.5 text-muted" />
            Выйти из профиля
          </Link>
        </div>
      </div>
    </details>
  );
}
