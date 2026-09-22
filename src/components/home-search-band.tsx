"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { speakerRoster } from "@/lib/programs";
import { IconChevronDown, IconSearch, IconSliders } from "@/components/icons";

const popularQueries = [
  "НДС",
  "Бухгалтерский учёт",
  "Заработная плата",
  "Кадровое делопроизводство",
  "Госзакупки",
  "Охрана труда",
];

const monthOptions = [
  { label: "Сентябрь 2026", query: "сентября 2026" },
  { label: "Октябрь 2026", query: "октября 2026" },
  { label: "Ноябрь 2026", query: "ноября 2026" },
];

function FilterSelect({
  label,
  options,
  onPick,
}: {
  label: string;
  options: { label: string; value: string }[];
  onPick: (value: string) => void;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        defaultValue=""
        onChange={(e) => e.target.value && onPick(e.target.value)}
        className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-border bg-surface pl-4 pr-10 text-sm text-ink transition-colors hover:border-blue focus:border-blue focus:outline-none"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <IconChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink" />
    </label>
  );
}

/** Поисковая панель под обложкой: карточка наезжает на низ обложки, как в референсе. */
export function HomeSearchBand() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function goToSchedule(q: string) {
    const trimmed = q.trim();
    router.push(trimmed ? `/schedule?q=${encodeURIComponent(trimmed)}#programs` : "/schedule#programs");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    goToSchedule(query);
  }

  return (
    <section className="relative z-10 mx-auto -mt-14 max-w-7xl px-6 lg:-mt-16 lg:px-10">
      <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_16px_48px_rgba(16,24,40,0.10)] sm:p-6 lg:p-7">
        <h2 className="flex items-center gap-2.5 text-xl font-bold text-ink">
          <IconSearch className="h-5 w-5 text-blue" />
          Найдите нужную программу
        </h2>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[minmax(0,1fr)_auto_11rem_11rem_11rem]"
        >
          <label className="relative block">
            <span className="sr-only">Поиск по названию, теме или лектору</span>
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по названию, теме или лектору"
              autoComplete="off"
              enterKeyHint="search"
              className="h-12 w-full rounded-lg border border-border bg-surface pl-11 pr-4 text-sm text-ink placeholder:text-muted focus:border-blue focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="h-12 cursor-pointer whitespace-nowrap rounded-lg bg-blue px-8 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
          >
            Найти
          </button>

          <div className="grid gap-3 sm:grid-cols-3 lg:col-span-2 xl:col-span-3 xl:contents">
            <FilterSelect
              label="Формат"
              onPick={goToSchedule}
              options={[
                { label: "Онлайн", value: "Онлайн" },
                { label: "Очно", value: "Очно" },
              ]}
            />
            <FilterSelect
              label="Дата"
              onPick={goToSchedule}
              options={monthOptions.map((m) => ({ label: m.label, value: m.query }))}
            />
            <FilterSelect
              label="Лектор"
              onPick={goToSchedule}
              options={speakerRoster.map((s) => ({ label: s, value: s }))}
            />
          </div>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm text-muted">Популярные запросы:</span>
            {popularQueries.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => goToSchedule(q)}
                className="cursor-pointer rounded-full bg-page px-3.5 py-1.5 text-sm text-ink/85 ring-1 ring-inset ring-border transition-colors hover:text-blue hover:ring-blue"
              >
                {q}
              </button>
            ))}
          </div>
          <Link
            href="/schedule#programs"
            className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-blue underline-offset-4 hover:text-blue-dark hover:underline"
          >
            Расширенный поиск
            <IconSliders className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
