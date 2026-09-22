import Link from "next/link";
import { IconArrowRight, IconFile, IconMonitor, IconUsers } from "@/components/icons";

const resources = [
  {
    title: "Профессиональный стандарт «Бухгалтер»",
    desc: "Разъяснения, рекомендации и практические материалы",
    href: "/about/documents",
    icon: IconFile,
  },
  {
    title: "Дистанционное обучение",
    desc: "Учитесь из любой точки России в удобное время",
    href: "/training/distance",
    icon: IconMonitor,
  },
  {
    title: "Кадровое агентство",
    desc: "Подбор квалифицированных специалистов для вашей компании",
    href: "/corporate",
    icon: IconUsers,
  },
];

export function ResourcesSection() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">Полезное для специалистов</h2>
        <Link href="/about/documents" className="text-sm font-medium text-blue hover:text-blue-dark">
          Все материалы →
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {resources.map(({ title, desc, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue"
          >
            <span className="flex h-24 w-full items-center justify-center rounded-lg bg-blue-tint text-blue">
              <Icon className="h-8 w-8" />
            </span>
            <div>
              <h3 className="font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
            <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-blue">
              Подробнее
              <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
