"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { programs, type ProgramFormat, type ProgramType } from "@/lib/programs";
import { ProgramRow } from "@/components/program-row";
import { ProgramCard } from "@/components/program-card";
import { FiltersPanel, type FiltersState } from "@/components/filters-panel";
import { IconChevronLeft, IconChevronRight, IconGrid, IconList } from "@/components/icons";

const featuredProgramId = programs[0]?.id;

type SortKey = "date-asc" | "date-desc" | "price-asc" | "price-desc";

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "date-asc", label: "По дате (сначала ближайшие)" },
  { value: "date-desc", label: "По дате (сначала поздние)" },
  { value: "price-asc", label: "По цене (сначала недорогие)" },
  { value: "price-desc", label: "По цене (сначала дорогие)" },
];

function pluralizePrograms(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "программа";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "программы";
  return "программ";
}

const PAGE_SIZE = 6;

function paginationItems(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: Array<number | "…"> = [1];
  if (current > 3) items.push("…");
  for (let n = Math.max(2, current - 1); n <= Math.min(total - 1, current + 1); n++) items.push(n);
  if (current < total - 2) items.push("…");
  items.push(total);
  return items;
}

function toggleInSet<T>(set: ReadonlySet<T>, value: T) {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function ScheduleExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const [types, setTypes] = useState<ReadonlySet<ProgramType>>(new Set());
  const [formats, setFormats] = useState<ReadonlySet<ProgramFormat>>(new Set());
  const [audiences, setAudiences] = useState<ReadonlySet<string>>(new Set());
  const [speakers, setSpeakers] = useState<ReadonlySet<string>>(new Set());
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState<SortKey>("date-asc");
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = programs.filter((p) => {
      if (types.size > 0 && !types.has(p.type)) return false;
      if (formats.size > 0 && !formats.has(p.format)) return false;
      if (audiences.size > 0 && !p.audiences.some((a) => audiences.has(a))) return false;
      if (speakers.size > 0 && !speakers.has(p.speaker)) return false;
      if (dateFrom && p.dateISO < dateFrom) return false;
      if (dateTo && p.dateISO > dateTo) return false;
      if (q) {
        const haystack = `${p.title} ${p.description} ${p.speaker} ${p.code}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      switch (sort) {
        case "date-desc":
          return b.dateISO.localeCompare(a.dateISO);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return a.dateISO.localeCompare(b.dateISO);
      }
    });

    return result;
  }, [query, types, formats, audiences, speakers, dateFrom, dateTo, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const activeFilterCount =
    types.size + formats.size + audiences.size + speakers.size + (dateFrom ? 1 : 0) + (dateTo ? 1 : 0);
  const hasActiveFilters = query !== "" || activeFilterCount > 0;

  function afterChange() {
    setPage(1);
  }

  function resetAll() {
    if (query) router.push("/#programs");
    setTypes(new Set());
    setFormats(new Set());
    setAudiences(new Set());
    setSpeakers(new Set());
    setDateFrom("");
    setDateTo("");
    setSort("date-asc");
    setPage(1);
  }

  const filtersState: FiltersState = { types, formats, audiences, speakers, dateFrom, dateTo };

  return (
    <div>
      <FiltersPanel
        state={filtersState}
        onToggleType={(v) => {
          setTypes((s) => toggleInSet(s, v));
          afterChange();
        }}
        onToggleFormat={(v) => {
          setFormats((s) => toggleInSet(s, v));
          afterChange();
        }}
        onToggleAudience={(v) => {
          setAudiences((s) => toggleInSet(s, v));
          afterChange();
        }}
        onToggleSpeaker={(v) => {
          setSpeakers((s) => toggleInSet(s, v));
          afterChange();
        }}
        onDateFromChange={(v) => {
          setDateFrom(v);
          afterChange();
        }}
        onDateToChange={(v) => {
          setDateTo(v);
          afterChange();
        }}
        onReset={resetAll}
        hasActiveFilters={activeFilterCount > 0}
      />

      <div className="min-w-0">
        {/* results header */}
        <div className="mt-5 flex items-center justify-between border-b border-border pb-5">
          <p className="text-sm text-body">
            Найдено <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {pluralizePrograms(filtered.length)}
          </p>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">Сортировать:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm text-ink"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>

            <div className="flex overflow-hidden rounded-lg border border-border">
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                aria-label="Список"
                className={`flex h-9 w-9 items-center justify-center ${
                  view === "list" ? "bg-blue-tint text-blue" : "bg-surface text-muted"
                }`}
              >
                <IconList className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                aria-label="Плитка"
                className={`flex h-9 w-9 items-center justify-center border-l border-border ${
                  view === "grid" ? "bg-blue-tint text-blue" : "bg-surface text-muted"
                }`}
              >
                <IconGrid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* list / grid */}
        {pageItems.length > 0 ? (
          view === "list" ? (
            <div className="mt-5 flex flex-col gap-4">
              {pageItems.map((program) => (
                <ProgramRow
                  key={program.id}
                  program={program}
                  showCountdown={program.id === featuredProgramId}
                />
              ))}
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {pageItems.map((program) => (
                <ProgramCard
                  key={program.id}
                  program={program}
                  showCountdown={program.id === featuredProgramId}
                />
              ))}
            </div>
          )
        ) : (
          <div className="mt-5 rounded-xl border border-border bg-surface py-16 text-center">
            <p className="text-ink">По вашему запросу ничего не найдено.</p>
            <p className="mt-1.5 text-sm text-muted">
              Измените параметры поиска или сбросьте фильтры.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAll}
                className="mt-5 rounded-lg border border-border px-4 py-2 text-sm text-ink hover:border-blue hover:text-blue"
              >
                Сбросить фильтры
              </button>
            )}
          </div>
        )}

        {/* pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Предыдущая страница"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink disabled:opacity-30"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
            {paginationItems(currentPage, totalPages).map((n, i) =>
              n === "…" ? (
                <span
                  key={`e${i}`}
                  className="flex h-9 w-9 items-center justify-center text-sm text-muted"
                >
                  …
                </span>
              ) : (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={currentPage === n ? "page" : undefined}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium ${
                    currentPage === n
                      ? "bg-blue text-white"
                      : "border border-border text-ink hover:border-blue hover:text-blue"
                  }`}
                >
                  {n}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              aria-label="Следующая страница"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink disabled:opacity-30"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
