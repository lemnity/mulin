import Link from "next/link";
import { IconCheck } from "@/components/icons";

const checklist = [
  "Индивидуальные программы",
  "Обучение на территории компании",
  "Гибкие форматы и сроки",
  "Персональный менеджер",
];

export function CorporateBand() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="grid gap-8 rounded-2xl border border-border bg-surface p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04)] lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-12">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-ink">Корпоративное обучение</h2>
          <p className="mt-2 text-lg font-medium text-blue">
            Обучение команды под задачи вашей организации
          </p>
          <p className="mt-4 max-w-[46ch] leading-relaxed text-body">
            Разрабатываем программы с учётом отраслевой специфики, проводим обучение на территории
            вашей компании или онлайн. Гибкие форматы, практические кейсы, документы
            установленного образца.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/corporate"
              className="rounded-lg bg-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
            >
              Получить предложение
            </Link>
            <Link
              href="/corporate"
              className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
            >
              Узнать подробнее
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-ink p-8 lg:p-10">
          <p className="text-sm text-white/60">Уже обучили команды</p>
          <p className="tabular mt-1 text-5xl font-extrabold text-white">120+</p>
          <p className="text-sm text-white/60">организаций по всей России</p>

          <ul className="mt-7 space-y-3 border-t border-white/10 pt-6">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-white">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <IconCheck className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
