"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { speakerRoster } from "@/lib/programs";
import { IconArrowRight, IconSearch } from "@/components/icons";

const popularQueries = [
  "НДС",
  "Бухгалтерский учёт",
  "Заработная плата",
  "Кадровое делопроизводство",
  "Госзакупки",
];

const monthOptions = [
  { label: "Сентябрь 2026", query: "сентября 2026" },
  { label: "Октябрь 2026", query: "октября 2026" },
  { label: "Ноябрь 2026", query: "ноября 2026" },
];

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
    <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <h2 className="text-xl font-bold text-ink">Найдите нужную программу</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center"
      >
        <label className="relative flex-1">
          <span className="sr-only">Поиск по названию, теме или лектору</span>
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск по названию, теме или лектору"
            className="w-full rounded-lg border border-border bg-surface py-3 pl-11 pr-4 text-sm text-ink shadow-sm placeholder:text-muted focus:border-blue"
          />
        </label>
        <button
          type="submit"
          className="whitespace-nowrap rounded-lg bg-blue px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
        >
          Найти
        </button>

        <select
          defaultValue=""
          onChange={(e) => e.target.value && goToSchedule(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-3 text-sm text-ink"
        >
          <option value="">Формат</option>
          <option value="Онлайн">Онлайн</option>
          <option value="Очно">Очно</option>
        </select>

        <select
          defaultValue=""
          onChange={(e) => e.target.value && goToSchedule(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-3 text-sm text-ink"
        >
          <option value="">Дата</option>
          {monthOptions.map((m) => (
            <option key={m.query} value={m.query}>
              {m.label}
            </option>
          ))}
        </select>

        <select
          defaultValue=""
          onChange={(e) => e.target.value && goToSchedule(e.target.value)}
          className="rounded-lg border border-border bg-surface px-3 py-3 text-sm text-ink"
        >
          <option value="">Лектор</option>
          {speakerRoster.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted">Популярные запросы:</span>
          {popularQueries.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => goToSchedule(q)}
              className="rounded-full bg-page px-3.5 py-1.5 text-sm text-ink/80 ring-1 ring-inset ring-border transition-colors hover:text-blue hover:ring-blue"
            >
              {q}
            </button>
          ))}
        </div>
        <Link
          href="/schedule"
          className="flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-blue hover:text-blue-dark"
        >
          Расширенный поиск
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
