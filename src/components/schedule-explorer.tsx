"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { programs, type ProgramFormat, type ProgramType } from "@/lib/programs";
import { getProgramView, searchHaystack } from "@/lib/program-content";
import { matchesSearch } from "@/lib/search";
import { ProgramRow } from "@/components/program-row";
import { ProgramCard } from "@/components/program-card";
import { FiltersPanel, type FiltersState } from "@/components/filters-panel";
import { ActiveFilterChips, type ActiveFilter } from "@/components/active-filter-chips";
import { SortSelect } from "@/components/sort-select";
import { IconChevronLeft, IconChevronRight, IconGrid, IconList } from "@/components/icons";

type SortKey = "date-asc" | "date-desc" | "price-asc" | "price-desc";

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "date-asc", label: "Сначала ближайшие" },
  { value: "date-desc", label: "Сначала поздние" },
  { value: "price-asc", label: "Сначала недорогие" },
  { value: "price-desc", label: "Сначала дорогие" },
];

const sortKeys = new Set<string>(sortOptions.map((o) => o.value));

function pluralizePrograms(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "программа";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "программы";
  return "программ";
}

/* Было 6 на страницу: 159 программ превращались в 27 страниц перелистывания.
   12 — примерно экран с небольшим запасом на прокрутку. */
const PAGE_SIZE = 12;

function paginationItems(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: Array<number | "…"> = [1];
  if (current > 3) items.push("…");
  for (let n = Math.max(2, current - 1); n <= Math.min(total - 1, current + 1); n++) items.push(n);
  if (current < total - 2) items.push("…");
  items.push(total);
  return items;
}

/* Состояние отбора живёт в адресной строке, а не только в памяти компонента: иначе
   ссылку на «вебинары в октябре» нельзя переслать, «назад» в браузере уводит со страницы
   целиком, а после возврата из карточки программы отбор молча сбрасывается. */

function readSet(params: URLSearchParams, key: string): ReadonlySet<string> {
  const raw = params.get(key);
  return new Set(raw ? raw.split(",").filter(Boolean) : []);
}

export function ScheduleExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);
  // Дату считаем один раз за монтирование: если брать new Date() при каждом рендере,
  // подпись «цена действует до…» могла бы разойтись между строками одного списка.
  const [now] = useState(() => new Date());
  const [view, setView] = useState<"list" | "grid">("list");

  const query = searchParams.get("q") ?? "";
  const types = readSet(searchParams, "type") as ReadonlySet<ProgramType>;
  const formats = readSet(searchParams, "format") as ReadonlySet<ProgramFormat>;
  const audiences = readSet(searchParams, "audience");
  const speakers = readSet(searchParams, "speaker");
  const dateFrom = searchParams.get("dateFrom") ?? "";
  const dateTo = searchParams.get("dateTo") ?? "";
  const sortParam = searchParams.get("sort") ?? "";
  const sort: SortKey = sortKeys.has(sortParam) ? (sortParam as SortKey) : "date-asc";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  /** Пишем отбор в адрес. `scroll: false` — страницу к началу уводить не нужно. */
  const updateParams = useCallback(
    (mutate: (params: URLSearchParams) => void, options?: { keepPage?: boolean }) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      // Любое изменение отбора обнуляет страницу: на 7-й странице нового отбора
      // может не быть результатов вовсе.
      if (!options?.keepPage) params.delete("page");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const toggleParam = useCallback(
    (key: string, value: string) => {
      updateParams((params) => {
        const current = new Set((params.get(key) ?? "").split(",").filter(Boolean));
        if (current.has(value)) current.delete(value);
        else current.add(value);
        if (current.size > 0) params.set(key, [...current].join(","));
        else params.delete(key);
      });
    },
    [updateParams],
  );

  const setParam = useCallback(
    (key: string, value: string) => {
      updateParams((params) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
    },
    [updateParams],
  );

  const resetAll = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const result = programs.filter((p) => {
      if (types.size > 0 && !types.has(p.type)) return false;
      if (formats.size > 0 && !formats.has(p.format)) return false;
      if (audiences.size > 0 && !p.audiences.some((a) => audiences.has(a))) return false;
      // Имя сверяем нормализованное: в фильтре стоят разобранные имена, а не сырые.
      if (speakers.size > 0) {
        const name = getProgramView(p).speaker;
        if (name === null || !speakers.has(name)) return false;
      }
      if (dateFrom && p.dateISO < dateFrom) return false;
      if (dateTo && p.dateISO > dateTo) return false;
      // Ищем по очищенному тексту: в сыром описании лежит мусор конвертера Word,
      // по которому находились бы программы, где слова запроса на экране нет.
      if (q && !matchesSearch(searchHaystack(p), q)) return false;
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

  // Адрес мог прийти со страницей, которой в текущем отборе нет.
  useEffect(() => {
    if (page > totalPages) setParam("page", "");
  }, [page, totalPages, setParam]);

  function goToPage(next: number) {
    updateParams(
      (params) => {
        if (next > 1) params.set("page", String(next));
        else params.delete("page");
      },
      { keepPage: true },
    );
    // Без этого после перелистывания пользователь остаётся у пагинации — то есть
    // в конце уже новой страницы, и первые карточки приходится искать прокруткой вверх.
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const dateLabel = (iso: string) =>
    new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });

  const activeFilters: ActiveFilter[] = [
    ...(query ? [{ key: `q:${query}`, label: `Поиск: «${query}»`, onRemove: () => setParam("q", "") }] : []),
    ...[...types].map((v) => ({ key: `type:${v}`, label: v, onRemove: () => toggleParam("type", v) })),
    ...[...formats].map((v) => ({ key: `format:${v}`, label: v, onRemove: () => toggleParam("format", v) })),
    ...[...audiences].map((v) => ({
      key: `audience:${v}`,
      label: v,
      onRemove: () => toggleParam("audience", v),
    })),
    ...[...speakers].map((v) => ({
      key: `speaker:${v}`,
      label: `Лектор: ${v}`,
      onRemove: () => toggleParam("speaker", v),
    })),
    ...(dateFrom
      ? [{ key: "from", label: `с ${dateLabel(dateFrom)}`, onRemove: () => setParam("dateFrom", "") }]
      : []),
    ...(dateTo
      ? [{ key: "to", label: `по ${dateLabel(dateTo)}`, onRemove: () => setParam("dateTo", "") }]
      : []),
  ];

  const filtersState: FiltersState = { types, formats, audiences, speakers, dateFrom, dateTo };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FiltersPanel
          state={filtersState}
          onToggleType={(v) => toggleParam("type", v)}
          onToggleFormat={(v) => toggleParam("format", v)}
          onToggleAudience={(v) => toggleParam("audience", v)}
          onToggleSpeaker={(v) => toggleParam("speaker", v)}
          onDateFromChange={(v) => setParam("dateFrom", v)}
          onDateToChange={(v) => setParam("dateTo", v)}
          onReset={resetAll}
          hasActiveFilters={activeFilters.length > 0}
        />

        <SortSelect value={sort} options={sortOptions} onChange={(v) => setParam("sort", v)} />
      </div>

      <ActiveFilterChips filters={activeFilters} onResetAll={resetAll} />

      <div ref={resultsRef} className="min-w-0 scroll-mt-24">
        <div className="mt-5 flex items-center justify-between gap-4 border-b border-border pb-5">
          <p aria-live="polite" className="text-sm text-body">
            Найдено <span className="font-semibold text-ink">{filtered.length}</span>{" "}
            {pluralizePrograms(filtered.length)}
            {totalPages > 1 && (
              <span className="text-muted">
                {" "}
                · страница {currentPage} из {totalPages}
              </span>
            )}
          </p>

          <div
            role="group"
            aria-label="Вид списка"
            className="flex shrink-0 overflow-hidden rounded-lg border border-border"
          >
            <button
              type="button"
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              aria-label="Списком"
              className={`flex h-9 w-10 cursor-pointer items-center justify-center transition-colors ${
                view === "list" ? "bg-blue-tint text-blue" : "bg-surface text-muted hover:text-ink"
              }`}
            >
              <IconList className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              aria-label="Плиткой"
              className={`flex h-9 w-10 cursor-pointer items-center justify-center border-l border-border transition-colors ${
                view === "grid" ? "bg-blue-tint text-blue" : "bg-surface text-muted hover:text-ink"
              }`}
            >
              <IconGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {pageItems.length > 0 ? (
          view === "list" ? (
            <div className="mt-5 flex flex-col gap-4">
              {pageItems.map((program) => (
                <ProgramRow key={program.id} program={program} now={now} />
              ))}
            </div>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {pageItems.map((program) => (
                <ProgramCard key={program.id} program={program} now={now} />
              ))}
            </div>
          )
        ) : (
          <div className="mt-5 rounded-xl border border-border bg-surface py-16 text-center">
            <p className="font-medium text-ink">По вашему запросу ничего не найдено</p>
            <p className="mx-auto mt-1.5 max-w-[42ch] text-sm text-muted">
              Попробуйте снять часть условий отбора или поискать по другому слову.
            </p>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={resetAll}
                className="mt-5 cursor-pointer rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
              >
                Сбросить отбор
              </button>
            )}
          </div>
        )}

        {totalPages > 1 && (
          <nav aria-label="Страницы результатов" className="mt-8 flex items-center justify-center gap-1.5">
            <button
              type="button"
              onClick={() => goToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="Предыдущая страница"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border text-ink transition-colors hover:border-blue hover:text-blue disabled:cursor-default disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink"
            >
              <IconChevronLeft className="h-4 w-4" />
            </button>
            {paginationItems(currentPage, totalPages).map((n, i) =>
              n === "…" ? (
                <span key={`e${i}`} className="flex h-10 w-10 items-center justify-center text-sm text-muted">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-current={currentPage === n ? "page" : undefined}
                  aria-label={`Страница ${n}`}
                  className={`tabular flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-sm font-medium transition-colors ${
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
              onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="Следующая страница"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-border text-ink transition-colors hover:border-blue hover:text-blue disabled:cursor-default disabled:opacity-30 disabled:hover:border-border disabled:hover:text-ink"
            >
              <IconChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}
