import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { IconArrowRight, IconCertificate, IconMonitor, IconUsers } from "@/components/icons";

const resources = [
  {
    title: "Профессиональный стандарт «Бухгалтер»",
    desc: "Разъяснения, рекомендации и практические материалы",
    href: "/about/documents",
    icon: IconCertificate,
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
      <h2 className="text-2xl font-bold text-ink">Полезное для специалистов</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {resources.map(({ title, desc, href, icon: Icon }, i) => (
          <Reveal key={title} delayMs={i * 100}>
            <Link
              href={href}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue">
                <Icon className="h-5 w-5" />
              </span>
              <div className="flex flex-1 flex-col">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-blue">
                  Подробнее
                  <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
