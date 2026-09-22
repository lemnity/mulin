import Link from "next/link";
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

const directions = [
  { label: "Бухгалтерский учёт и налоги", icon: IconCalculator, query: "бухгалтер" },
  { label: "Кадровое дело и управление персоналом", icon: IconUsers, query: "кадров" },
  { label: "Юристам", icon: IconScale, query: "юрис" },
  { label: "Руководителям", icon: IconTarget, query: "руководител" },
  { label: "Охрана труда", icon: IconShield, query: "охрана труда" },
  { label: "Государственные закупки", icon: IconBuilding, query: "" },
  { label: "Финансы и экономика", icon: IconCoins, query: "финанс" },
  { label: "Профессиональная переподготовка", icon: IconGraduationCap, query: "" },
];

export function DirectionsGrid() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">Выберите направление обучения</h2>
        <Link href="/schedule" className="text-sm font-medium text-blue hover:text-blue-dark">
          Все направления →
        </Link>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {directions.map(({ label, icon: Icon, query }) => (
          <Link
            key={label}
            href={query ? `/schedule?q=${encodeURIComponent(query)}#programs` : "/schedule"}
            className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-blue"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-tint text-blue">
              <Icon className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-medium text-ink">{label}</span>
            <IconArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-blue" />
          </Link>
        ))}
      </div>
    </section>
  );
}
