import Link from "next/link";
import { programs } from "@/lib/programs";
import { searchHaystack } from "@/lib/program-content";
import { matchesSearch } from "@/lib/search";
import { Reveal } from "@/components/reveal";
import {
  IconArrowRight,
  IconBuilding,
  IconCalculator,
  IconCoins,
  IconGraduationCap,
  IconScale,
  IconShield,
  IconTarget,
  IconUsers,
} from "@/components/icons";

/* У двух направлений («Государственные закупки», «Профессиональная переподготовка»)
   запрос был пустой строкой — плашка вела в расписание без всякого отбора, то есть
   выглядела как фильтр, но ничего не фильтровала. Теперь запрос есть у каждого, а рядом
   видно, сколько программ за ним стоит. */
const directions = [
  { label: "Бухгалтерский учёт и налоги", icon: IconCalculator, query: "бухгалтерский учёт" },
  { label: "Кадровое дело и управление персоналом", icon: IconUsers, query: "кадровое" },
  { label: "Юристам", icon: IconScale, query: "юриспруденция" },
  { label: "Руководителям", icon: IconTarget, query: "управление" },
  { label: "Охрана труда", icon: IconShield, query: "охрана труда" },
  { label: "Государственные закупки", icon: IconBuilding, query: "закупки" },
  { label: "Финансы и экономика", icon: IconCoins, query: "финансы" },
  { label: "Профессиональная переподготовка", icon: IconGraduationCap, query: "переподготовка" },
];

function programsWord(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "программа";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "программы";
  return "программ";
}

/* Тот же текст, по которому ищет каталог, — иначе плашка обещала бы одно число,
   а страница расписания показывала другое. */
function countFor(query: string) {
  return programs.filter((p) => matchesSearch(searchHaystack(p), query)).length;
}

export function DirectionsGrid() {
  const items = directions
    .map((d) => ({ ...d, count: countFor(d.query) }))
    // Направление без программ — тупик: плашка обещает подборку и открывает пустоту.
    .filter((d) => d.count > 0);

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-ink">Выберите направление обучения</h2>
        <Link
          href="/schedule#programs"
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-blue hover:text-blue-dark"
        >
          Все направления
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, icon: Icon, query, count }, i) => (
          <Reveal key={label} delayMs={(i % 4) * 80} className="h-full">
            <Link
              href={`/schedule?q=${encodeURIComponent(query)}#programs`}
              className="group flex h-full items-center gap-3.5 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-blue hover:bg-blue-tint/30"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-tint text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium leading-snug text-ink">{label}</span>
                <span className="tabular mt-0.5 block text-xs text-muted">
                  {count} {programsWord(count)}
                </span>
              </span>
              <IconArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-blue" />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
