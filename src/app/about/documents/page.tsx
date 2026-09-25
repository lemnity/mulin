import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Reveal } from "@/components/reveal";
import { IconArrowRight, IconExternal, IconFile } from "@/components/icons";
import { documentGroups, fileKind } from "@/lib/documents";
import { ImageDoc } from "@/components/image-doc";

export const metadata: Metadata = {
  title: "Документы — Дом науки и техники",
  description:
    "Устав, лицензия, аккредитации, документы для заключения договора, бланки для слушателей и образцы выдаваемых документов АНО ДПО ТМУЦ «Дом науки и техники».",
};

const kindTone: Record<ReturnType<typeof fileKind>, string> = {
  PDF: "bg-[#FDECEC] text-[#C62828]",
  DOC: "bg-blue-tint text-blue",
  XLS: "bg-green-tint text-green-text",
  JPG: "bg-amber-tint text-amber-text",
  WEB: "bg-page text-body ring-1 ring-inset ring-border",
};

export default function DocumentsPage() {
  const total = documentGroups.reduce((n, g) => n + g.docs.length, 0);

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "О центре", href: "/about" },
          { label: "Документы" },
        ]}
      />

      <main id="main" className="flex-1">
        <section className="bg-hero-band">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
            <p className="text-xs font-semibold tracking-[0.12em] text-blue uppercase">
              О центре
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
              Документы
            </h1>
            <p className="mt-4 max-w-[64ch] text-[1.05rem] leading-relaxed text-body">
              Учредительные документы, лицензия и аккредитации центра, документы
              для заключения договора, бланки для слушателей и образцы
              выдаваемых документов — {total} файлов в открытом доступе.
            </p>
            <nav
              aria-label="Разделы документов"
              className="mt-7 flex flex-wrap gap-2"
            >
              {documentGroups.map((g) => (
                <a
                  key={g.id}
                  href={`#${g.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink ring-1 ring-inset ring-border transition-colors hover:text-blue hover:ring-blue"
                >
                  {g.title}
                  <span className="tabular rounded-full bg-blue-tint px-1.5 py-0.5 text-[0.7rem] font-semibold text-blue">
                    {g.docs.length}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-14 lg:px-10">
          {documentGroups.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
                <h2 className="text-2xl font-extrabold text-ink">{g.title}</h2>
                {g.note && <p className="text-sm text-body">{g.note}</p>}
              </div>
              {g.docs.some((d) => fileKind(d.url) === "JPG") && (
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {g.docs
                    .filter((d) => fileKind(d.url) === "JPG")
                    .map((d, i) => (
                      <li key={d.url}>
                        <Reveal
                          subtle
                          delayMs={(i % 4) * 70}
                          className="h-full"
                        >
                          <ImageDoc title={d.title} url={d.url} />
                        </Reveal>
                      </li>
                    ))}
                </ul>
              )}
              <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
                {g.docs
                  .filter((d) => fileKind(d.url) !== "JPG")
                  .map((d, i) => {
                    const kind = fileKind(d.url);
                    return (
                      <li key={d.url}>
                        <Reveal
                          subtle
                          delayMs={(i % 2) * 70 + Math.min(Math.floor(i / 2), 4) * 40}
                          className="h-full"
                        >
                          <a
                            href={d.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex h-full items-center gap-3.5 rounded-xl border border-border bg-surface p-3.5 transition-colors hover:border-blue hover:bg-blue-tint/40"
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[0.62rem] font-bold tracking-wide ${kindTone[kind]}`}
                            >
                              {kind === "WEB" ? (
                                <IconFile className="h-4 w-4" />
                              ) : (
                                kind
                              )}
                            </span>
                            <span className="flex-1 text-sm font-medium leading-snug text-ink group-hover:text-blue">
                              {d.title}
                            </span>
                            <IconExternal className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-blue" />
                          </a>
                        </Reveal>
                      </li>
                    );
                  })}
              </ul>
            </section>
          ))}

          <Link
            href="/disclosure"
            className="group flex flex-col items-start justify-between gap-3 rounded-2xl border-2 border-blue bg-blue-tint px-6 py-5 sm:flex-row sm:items-center"
          >
            <span>
              <span className="block text-base font-bold text-ink">
                Сведения об образовательной организации
              </span>
              <span className="block text-sm text-body">
                Образовательные программы, руководство, педагогический состав,
                финансово-хозяйственная деятельность
              </span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-blue-dark">
              Перейти
              <IconArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
