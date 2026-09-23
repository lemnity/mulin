"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowRight, IconSearch, IconX } from "@/components/icons";
import { beginPageTransition } from "@/components/page-loader";

const PLACEHOLDER = "Поиск по названию, теме или лектору";

function searchHref(query: string) {
  const q = query.trim();
  return q ? `/schedule?q=${encodeURIComponent(q)}#programs` : "/schedule#programs";
}

/**
 * Поиск в шапке. `bar` — кнопка в верхней полосе, по нажатию под ней раскрывается поле;
 * `inline` — просто поле, для мобильного меню. Запрос уходит на страницу расписания
 * тем же параметром `q`, что и у карточек направлений.
 */
export function HeaderSearch({
  variant = "bar",
  labelClassName = "",
}: {
  variant?: "bar" | "inline";
  labelClassName?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    const href = searchHref(value);
    beginPageTransition(href);
    router.push(href);
  };

  const form = (
    <form onSubmit={submit} role="search" className="flex items-center gap-2">
      <label className="relative flex-1">
        <span className="sr-only">Что ищете?</span>
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={PLACEHOLDER}
          autoComplete="off"
          enterKeyHint="search"
          className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-blue focus:outline-none"
        />
      </label>
      <button
        type="submit"
        aria-label="Найти"
        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-blue text-white transition-colors hover:bg-blue-dark"
      >
        <IconArrowRight className="h-4 w-4" />
      </button>
    </form>
  );

  if (variant === "inline") return form;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Закрыть поиск" : "Поиск по программам"}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-2 text-[0.84rem] transition-colors hover:text-blue ${
          open ? "text-blue" : "text-ink"
        }`}
      >
        {open ? <IconX className="h-4 w-4" /> : <IconSearch className="h-4 w-4" />}
        <span className={labelClassName}>Поиск</span>
      </button>

      {open && (
        <div
          id={panelId}
          className="menu-panel absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[22rem] rounded-xl border border-border bg-surface p-2 shadow-lg"
        >
          {form}
          <p className="px-1 pb-0.5 pt-2 text-xs text-muted">
            Например: НДС, кадровое дело, охрана труда
          </p>
        </div>
      )}
    </div>
  );
}
