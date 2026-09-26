import { programs, type ProgramFormat, type ProgramType } from "@/lib/programs";
import { programSpeaker, searchHaystack } from "@/lib/program-content";
import { matchesSearch } from "@/lib/search";

/* Списки в фильтрах были заданы руками и разошлись с выгрузкой: в «Типе» предлагался
   «Курс», которого нет ни у одной программы, а в «Специализации» — четыре аудитории без
   единого занятия. Пользователь выбирал такой пункт и получал пустой экран без объяснения.
   Поэтому варианты собираем из самих данных и показываем, сколько программ за каждым. */

export type Facet<T extends string = string> = {
  value: T;
  count: number;
};

function byCountThenName<T extends string>(a: Facet<T>, b: Facet<T>) {
  return b.count - a.count || a.value.localeCompare(b.value, "ru");
}

function tally<T extends string>(pick: (program: (typeof programs)[number]) => T[] | T | null): Facet<T>[] {
  const counts = new Map<T, number>();
  for (const program of programs) {
    const picked = pick(program);
    if (picked === null) continue;
    for (const value of Array.isArray(picked) ? picked : [picked]) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return [...counts].map(([value, count]) => ({ value, count })).sort(byCountThenName);
}

export const typeFacets: Facet<ProgramType>[] = tally((p) => p.type);
export const formatFacets: Facet<ProgramFormat>[] = tally((p) => p.format);
export const audienceFacets: Facet[] = tally((p) => p.audiences);

/* «Уточняется» — это не лектор, а его отсутствие: в списке преподавателей такой пункт
   собрал бы 127 программ из 159 и вытеснил бы собой настоящие имена. */
export const speakerFacets: Facet[] = tally((p) => programSpeaker(p));

/* ---------- Месяцы для быстрого выбора даты ---------- */

export type MonthFacet = {
  /** «2026-10» */
  value: string;
  label: string;
  from: string;
  to: string;
  count: number;
};

const monthName = new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" });

/* Список месяцев был вписан руками — сентябрь, октябрь и ноябрь 2026, — а программы в
   выгрузке идут до декабря 2027. Всё, что дальше ноября, выбрать было нечем, и список
   устарел бы сам собой через три месяца. Собираем месяцы из дат программ. */
export const monthFacets: MonthFacet[] = (() => {
  const counts = new Map<string, number>();
  for (const program of programs) {
    const key = program.dateISO.slice(0, 7);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return [...counts]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([value, count]) => {
      const [year, month] = value.split("-").map(Number);
      const last = new Date(year, month, 0).getDate();
      return {
        value,
        // «октябрь 2026 г.» → «Октябрь 2026»
        label: monthName
          .format(new Date(year, month - 1, 1))
          .replace(" г.", "")
          .replace(/^./, (c) => c.toUpperCase()),
        from: `${value}-01`,
        to: `${value}-${String(last).padStart(2, "0")}`,
        count,
      };
    });
})();

/* ---------- Популярные запросы ---------- */

/* Подборка под строкой поиска — редакционная, но три запроса из шести («НДС»,
   «Кадровое делопроизводство», «Госзакупки») не находили ни одной программы: посетитель
   нажимал первую же плашку и попадал на пустой экран. Оставляем только те, что реально
   что-то находят. */
const POPULAR_QUERY_CANDIDATES = [
  "Бухгалтерский учёт",
  "Заработная плата",
  "Охрана труда",
  "Госзакупки",
  "Кадровое делопроизводство",
  "Отчётность",
  "Бюджетная сфера",
  "Управление персоналом",
  "Налоги",
  "Переподготовка",
];

function matchesQuery(program: (typeof programs)[number], query: string): boolean {
  return matchesSearch(searchHaystack(program), query);
}

/* Запрос, под который подходит больше половины расписания, отбором не является:
   «Налоги» находили 140 программ из 159 — нажатие ничего не сужает. */
const TOO_BROAD = programs.length * 0.5;

export const popularQueries: string[] = POPULAR_QUERY_CANDIDATES.map((query) => ({
  query,
  count: programs.filter((p) => matchesQuery(p, query)).length,
}))
  .filter((item) => item.count > 0 && item.count <= TOO_BROAD)
  .sort((a, b) => b.count - a.count)
  .slice(0, 6)
  .map((item) => item.query);
