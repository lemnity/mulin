"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { speakerRoster } from "@/lib/programs";
import {
  IconArrowRight,
  IconCalendar,
  IconChevronDown,
  IconMonitor,
  IconSearch,
  IconSliders,
  IconUser,
  type IconProps,
} from "@/components/icons";
import { beginPageTransition } from "@/components/page-loader";

const popularQueries = [
  "НДС",
  "Бухгалтерский учёт",
  "Заработная плата",
  "Кадровое делопроизводство",
  "Госзакупки",
  "Охрана труда",
];

const monthOptions = [
  { label: "Сентябрь 2026", from: "2026-09-01", to: "2026-09-30" },
  { label: "Октябрь 2026", from: "2026-10-01", to: "2026-10-31" },
  { label: "Ноябрь 2026", from: "2026-11-01", to: "2026-11-30" },
];

function FilterSelect({
  label,
  icon: Icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: (props: IconProps) => React.ReactElement;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <label className="group/select relative block">
      <span className="sr-only">{label}</span>
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-blue" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-13 w-full cursor-pointer appearance-none rounded-xl border border-border bg-page pl-11 pr-10 text-sm font-medium text-ink transition-colors hover:border-blue hover:bg-surface focus:border-blue focus:bg-surface focus:outline-none"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted transition-colors group-hover/select:text-blue" />
    </label>
  );
}

/** Поисковая панель под обложкой: карточка наезжает на низ обложки, как в референсе. */
export function HomeSearchBand() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState("");
  const [month, setMonth] = useState("");
  const [speaker, setSpeaker] = useState("");

  function goToSchedule(params: URLSearchParams) {
    const href = params.toString() ? `/schedule?${params.toString()}#programs` : "/schedule#programs";
    beginPageTransition(href);
    router.push(href);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (format) params.set("format", format);
    if (speaker) params.set("speaker", speaker);
    const picked = monthOptions.find((m) => m.label === month);
    if (picked) {
      params.set("dateFrom", picked.from);
      params.set("dateTo", picked.to);
    }
    goToSchedule(params);
  }

  function handlePopularQuery(q: string) {
    const params = new URLSearchParams();
    params.set("q", q);
    goToSchedule(params);
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
          className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-[minmax(0,1fr)_11rem_11rem_12rem]"
        >
          {/* Поле и кнопка — один контрол: общая рамка, подсветка при фокусе */}
          <div className="flex h-13 items-center rounded-xl border border-border bg-surface pl-1 pr-1 transition-[border-color,box-shadow] focus-within:border-blue focus-within:shadow-[0_0_0_4px_rgba(29,111,224,0.12)] sm:col-span-3 xl:col-span-1">
            <label className="relative flex h-full min-w-0 flex-1 items-center">
              <span className="sr-only">Поиск по названию, теме или лектору</span>
              <IconSearch className="pointer-events-none absolute left-3.5 h-4.5 w-4.5 text-muted" />
              <input
                type="search"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по названию, теме или лектору"
                autoComplete="off"
                enterKeyHint="search"
                className="focus-quiet h-full w-full appearance-none bg-transparent pl-11 pr-3 text-sm text-ink placeholder:text-muted [&::-webkit-search-cancel-button]:appearance-none"
              />
            </label>
            <button
              type="submit"
              aria-label="Найти"
              className="flex h-11 shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-lg bg-blue px-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-dark sm:px-5"
            >
              <span className="hidden sm:inline">Найти</span>
              <IconArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="contents">
            <FilterSelect
              label="Формат"
              icon={IconMonitor}
              value={format}
              onChange={setFormat}
              options={[
                { label: "Онлайн", value: "Онлайн" },
                { label: "Очно", value: "Очно" },
              ]}
            />
            <FilterSelect
              label="Дата"
              icon={IconCalendar}
              value={month}
              onChange={setMonth}
              options={monthOptions.map((m) => ({ label: m.label, value: m.label }))}
            />
            <FilterSelect
              label="Лектор"
              icon={IconUser}
              value={speaker}
              onChange={setSpeaker}
              options={speakerRoster.map((s) => ({ label: s, value: s }))}
            />
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted">Популярные запросы:</span>
          {popularQueries.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => handlePopularQuery(q)}
              className="cursor-pointer rounded-full bg-page px-3.5 py-1.5 text-sm text-ink/85 ring-1 ring-inset ring-border transition-colors hover:bg-blue-tint hover:text-blue hover:ring-blue/40"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
