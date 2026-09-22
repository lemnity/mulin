import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/icons";
import resourceDocuments from "../../public/resource-documents.jpg";
import resourceDistance from "../../public/resource-distance.jpg";
import resourceHr from "../../public/resource-hr.jpg";

const resources = [
  {
    title: "Профессиональный стандарт «Бухгалтер»",
    desc: "Разъяснения, рекомендации и практические материалы",
    href: "/about/documents",
    photo: resourceDocuments,
  },
  {
    title: "Дистанционное обучение",
    desc: "Учитесь из любой точки России в удобное время",
    href: "/training/distance",
    photo: resourceDistance,
  },
  {
    title: "Кадровое агентство",
    desc: "Подбор квалифицированных специалистов для вашей компании",
    href: "/corporate",
    photo: resourceHr,
  },
];

export function ResourcesSection() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <h2 className="text-2xl font-bold text-ink">Полезное для специалистов</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {resources.map(({ title, desc, href, photo }) => (
          <Link
            key={title}
            href={href}
            className="group flex flex-col gap-4 overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-blue"
          >
            <span className="relative block h-32 w-full overflow-hidden">
              <Image
                src={photo}
                alt=""
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </span>
            <div className="flex flex-1 flex-col px-5 pb-5">
              <h3 className="font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-blue">
                Подробнее
                <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
