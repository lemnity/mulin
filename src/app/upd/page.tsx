import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IconCalendar, IconClock, IconList } from "@/components/icons";
import {
  formatDate,
  formatHours,
  groupByDate,
  platformUpdates,
  totalHours,
  type UpdateArea,
} from "@/lib/updates";

export const metadata: Metadata = {
  title: "Обновления платформы — Дом науки и техники",
  description: "Журнал доработок сайта: что добавлено и сколько живых часов на это ушло.",
  robots: { index: false, follow: false },
};

const areaTone: Record<UpdateArea, string> = {
  Шапка: "bg-blue-tint text-blue",
  Главная: "bg-green-tint text-green-text",
  Навигация: "bg-blue-tint text-blue-dark",
  Поиск: "bg-amber-tint text-amber-text",
  Доступность: "bg-green-tint text-green-text",
  Страницы: "bg-page text-body ring-1 ring-inset ring-border",
  Корзина: "bg-amber-tint text-amber-text",
  Общее: "bg-page text-body ring-1 ring-inset ring-border",
};

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-tint text-blue">
        {icon}
      </span>
      <span>
        <span className="tabular block text-2xl font-extrabold leading-tight text-ink">{value}</span>
        <span className="block text-sm text-body">{label}</span>
      </span>
    </div>
  );
}

export default function UpdatesPage() {
  const groups = groupByDate(platformUpdates);
  const total = totalHours(platformUpdates);
  const latest = groups[0]?.[0];

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Обновления платформы" }]} />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">Служебная страница</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Обновления платформы
            </h1>
            <p className="mt-4 max-w-[60ch] text-[1.05rem] leading-relaxed text-body">
              Каждое добавление и изменение на сайте с затраченными живыми часами. Страница доступна
              только по прямой ссылке.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <StatCard icon={<IconClock className="h-5 w-5" />} label="живых часов всего" value={formatHours(total)} />
              <StatCard icon={<IconList className="h-5 w-5" />} label="записей в журнале" value={String(platformUpdates.length)} />
              <StatCard
                icon={<IconCalendar className="h-5 w-5" />}
                label="последнее обновление"
                value={latest ? formatDate(latest, { short: true }) : "—"}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
          {groups.map(([date, items]) => {
            const dayHours = totalHours(items);
            return (
              <section key={date} className="mb-12 last:mb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-3">
                  <h2 className="text-lg font-bold text-ink">{formatDate(date)}</h2>
                  <p className="text-sm text-body">
                    {items.length} {items.length === 1 ? "запись" : items.length < 5 ? "записи" : "записей"} ·{" "}
                    <span className="tabular font-semibold text-ink">{formatHours(dayHours)}</span>
                  </p>
                </div>

                <ol className="mt-4 divide-y divide-border">
                  {items.map((u) => (
                    <li key={u.title} className="grid gap-3 py-5 sm:grid-cols-[1fr_auto] sm:gap-8">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[0.72rem] font-semibold uppercase tracking-wide ${areaTone[u.area]}`}
                          >
                            {u.area}
                          </span>
                          <h3 className="text-base font-semibold text-ink">{u.title}</h3>
                        </div>
                        <p className="mt-1.5 max-w-[70ch] text-sm leading-relaxed text-body">{u.details}</p>
                      </div>
                      {u.hours > 0 ? (
                        <div className="flex w-fit items-center gap-2 self-start whitespace-nowrap rounded-lg bg-blue-tint px-3 py-2 text-sm font-semibold text-blue sm:justify-self-end">
                          <IconClock className="h-4 w-4" />
                          <span className="tabular">{formatHours(u.hours)}</span>
                        </div>
                      ) : (
                        <div className="w-fit self-start whitespace-nowrap rounded-lg bg-page px-3 py-2 text-sm text-muted ring-1 ring-inset ring-border sm:justify-self-end">
                          без учёта часов
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
