"use client";

import { useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { monthFacets, popularQueries, speakerFacets } from "@/lib/program-facets";
import { IconChevronDown, IconSearch, IconSliders } from "@/components/icons";
import { beginPageTransition } from "@/components/page-loader";

/** Сегмент поисковой строки: подпись сверху, значение снизу, как в референсе. */
function Segment({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={`flex min-w-0 flex-col justify-center gap-0.5 border-t border-border px-6 py-3.5 transition-colors hover:bg-surface focus-within:bg-blue-tint/40 lg:border-l lg:border-t-0 lg:py-3 ${className}`}
    >
      <span className="text-[0.8rem] text-muted">{label}</span>
      {children}
    </label>
  );
}

function SegmentSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  return (
    <span className="relative block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-quiet w-full cursor-pointer appearance-none truncate bg-transparent pr-7 text-[1.05rem] font-semibold text-ink"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </span>
  );
}

/** Поисковая панель под обложкой: одна строка-«пилюля» с четырьмя полями и круглой кнопкой. */
export function HomeSearchBand() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("");
  const [month, setMonth] = useState("");
  const [speaker, setSpeaker] = useState("");

  function go(params: URLSearchParams) {
    const qs = params.toString();
    const href = `/schedule${qs ? `?${qs}` : ""}#programs`;
    beginPageTransition(href);
    router.push(href);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (format) params.set("format", format);
    const m = monthFacets.find((o) => o.value === month);
    if (m) {
      params.set("dateFrom", m.from);
      params.set("dateTo", m.to);
    }
    if (speaker) params.set("speaker", speaker);
    go(params);
  }

  function goToQuery(q: string) {
    go(new URLSearchParams({ q }));
  }

  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-7xl px-6 lg:-mt-16 lg:px-10">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_16px_48px_rgba(16,24,40,0.10)] sm:p-6 lg:p-7">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <h2 className="flex items-center gap-3 text-xl font-bold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-tint text-blue">
              <IconSearch className="h-4.5 w-4.5" />
            </span>
            Найдите нужную программу
          </h2>
          <Link
            href="/schedule#programs"
            className="flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-sm font-medium text-blue transition-colors hover:bg-blue-tint"
          >
            <IconSliders className="h-4 w-4" />
            Расширенный поиск
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="mt-5 overflow-hidden rounded-[15px] border border-border bg-page shadow-[0_4px_16px_rgba(16,24,40,0.06)] transition-colors focus-within:border-blue lg:flex lg:items-stretch"
        >
          {/* Главное поле: белое на сером фоне фильтров, с лупой и самой широкой зоной */}
          <label className="flex min-w-0 items-center gap-3.5 bg-surface px-5 py-3.5 lg:flex-[2.2] lg:py-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-blue-tint text-blue">
              <IconSearch className="h-5 w-5" />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-[0.8rem] text-muted">Что ищем?</span>
              <input
                type="search"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Название или тема"
                autoComplete="off"
                enterKeyHint="search"
                className="focus-quiet w-full bg-transparent text-[1.05rem] font-semibold text-ink placeholder:font-medium placeholder:text-ink/60"
              />
            </span>
          </label>

          <Segment label="Формат" className="lg:flex-1">
            <SegmentSelect
              value={format}
              onChange={setFormat}
              placeholder="Любой"
              options={[
                { value: "Онлайн", label: "Онлайн" },
                { value: "Очно", label: "Очно" },
              ]}
            />
          </Segment>

          <Segment label="Дата" className="lg:flex-1">
            <SegmentSelect
              value={month}
              onChange={setMonth}
              placeholder="Любая"
              options={monthFacets.map((m) => ({ value: m.value, label: `${m.label} — ${m.count}` }))}
            />
          </Segment>

          <Segment label="Лектор" className="lg:flex-[1.3]">
            <SegmentSelect
              value={speaker}
              onChange={setSpeaker}
              placeholder="Любой"
              options={speakerFacets.map((f) => ({ value: f.value, label: f.value }))}
            />
          </Segment>

          <div className="border-t border-border bg-surface p-3 lg:flex lg:items-center lg:border-l lg:border-t-0 lg:py-2 lg:pl-2 lg:pr-2">
            <button
              type="submit"
              aria-label="Найти программы"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[11px] bg-blue text-sm font-medium text-white transition-colors hover:bg-blue-dark lg:h-14 lg:w-14"
            >
              <IconSearch className="h-5 w-5" />
              <span className="lg:hidden">Найти</span>
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted">Популярные запросы:</span>
          {popularQueries.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => goToQuery(q)}
              className="cursor-pointer rounded-full bg-page px-3.5 py-1.5 text-sm text-ink ring-1 ring-inset ring-border transition-colors hover:bg-blue-tint hover:text-blue hover:ring-blue/40"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
