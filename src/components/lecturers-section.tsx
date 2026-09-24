import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { IconArrowRight, IconCalendar } from "@/components/icons";
import { lecturers } from "@/lib/lecturers";

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function splitName(name: string) {
  const [lastName, ...rest] = name.split(" ");
  return { lastName, firstMiddle: rest.join(" ") };
}

function pluralizeSeminars(count: number) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "семинар";
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return "семинара";
  return "семинаров";
}

/** Четверо самых востребованных лекторов (по числу открытых семинаров) с фото. */
const featured = lecturers
  .filter((l) => l.photo)
  .sort((a, b) => b.programs.length - a.programs.length)
  .slice(0, 4);

export function LecturersSection() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink">Лекторы и эксперты</h2>
        <Link href="/about/teachers" className="text-sm font-medium text-blue hover:text-blue-dark">
          Все преподаватели →
        </Link>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((l, i) => {
          const { lastName, firstMiddle } = splitName(l.name);
          return (
            <Reveal key={l.id} delayMs={(i % 4) * 80} className="h-full">
              <Link
                href={`/about/teachers/${l.id}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue"
              >
                <div className="flex items-start gap-3">
                  {l.photo ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-1 ring-inset ring-border">
                      <Image
                        src={assetPath(l.photo)}
                        alt={l.name}
                        fill
                        sizes="64px"
                        className="object-cover object-top"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-tint text-lg font-semibold text-blue ring-1 ring-inset ring-border">
                      {initialsOf(l.name)}
                    </div>
                  )}
                  <p className="pt-1 font-bold leading-snug text-ink">
                    {lastName}
                    <br />
                    {firstMiddle}
                  </p>
                </div>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{l.bio}</p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  {l.programs.length > 0 ? (
                    <span className="flex items-center gap-1.5 rounded-full bg-page px-3 py-1.5 text-xs font-medium text-ink/80 ring-1 ring-inset ring-border">
                      <IconCalendar className="h-3.5 w-3.5 text-blue" />
                      {l.programs.length} {pluralizeSeminars(l.programs.length)}
                    </span>
                  ) : (
                    <span className="text-xs text-muted">Расписание уточняется</span>
                  )}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-tint text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                    <IconArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
