import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { IconArrowRight } from "@/components/icons";

export function PlaceholderPage({
  crumbs,
  title,
  description,
  comingItems,
}: {
  crumbs: Crumb[];
  title: string;
  description: string;
  comingItems: string[];
}) {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={crumbs} />

      <main className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-3xl px-6 py-14 text-center lg:px-10 lg:py-20">
            <h1 className="text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{title}</h1>
            <p className="mx-auto mt-4 max-w-[56ch] text-[1.05rem] leading-relaxed text-body">
              {description}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-14 lg:px-10">
          <div className="rounded-xl border border-dashed border-border p-8 text-center">
            <p className="font-semibold text-ink">Раздел наполняется контентом</p>
            <p className="mx-auto mt-2 max-w-[48ch] text-sm leading-relaxed text-muted">
              Мы собираем этот сайт по частям. Скоро здесь появится:
            </p>
            <ul className="mx-auto mt-4 flex max-w-[40ch] flex-col gap-2 text-left text-sm text-ink/80">
              {comingItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/schedule"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-dark"
            >
              Перейти к расписанию
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
