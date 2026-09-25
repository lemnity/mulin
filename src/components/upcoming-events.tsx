import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { programs, type ProgramType } from "@/lib/programs";
import { Reveal } from "@/components/reveal";
import { IconArrowRight, IconGraduationCap, IconLaptop, IconMonitor, IconPin, IconUsers } from "@/components/icons";
import cover1 from "../../public/hero-cover-2.webp";
import cover2 from "../../public/hero-cover-3.webp";
import cover3 from "../../public/hero-cover.webp";

/* Фото карточек — снимки обложки сайта; заменить на фото мероприятий, когда появятся. */
const photos: StaticImageData[] = [cover1, cover2, cover3];

const typeIcon: Record<ProgramType, typeof IconUsers> = {
  Семинар: IconUsers,
  Вебинар: IconMonitor,
  Курс: IconGraduationCap,
};

function dayMonth(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(new Date(y, m - 1, d));
}

export function UpcomingEvents() {
  const items = programs.slice(0, 3);

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-[1.75rem] font-extrabold tracking-tight text-[#14224A] sm:text-[2rem]">
          Ближайшие мероприятия
        </h2>
        <Link
          href="/schedule"
          className="group inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] font-semibold text-blue hover:text-blue-dark"
        >
          Все мероприятия
          <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => {
          const TypeIcon = typeIcon[p.type];
          const online = p.format === "Онлайн";
          return (
            <Reveal key={p.id} delayMs={i * 100} className="h-full">
              <Link
                href={`/programs/${p.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-[0_2px_4px_rgba(20,34,74,0.04),0_12px_32px_-12px_rgba(20,34,74,0.16)] ring-1 ring-[#E6ECF5] transition-shadow hover:shadow-[0_2px_4px_rgba(20,34,74,0.05),0_18px_40px_-14px_rgba(20,34,74,0.24)]"
              >
                <div className="relative aspect-[16/6.3] overflow-hidden">
                  <Image
                    src={photos[i % photos.length]}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-xl bg-white px-4 py-2 text-[1.05rem] font-bold text-[#14224A] shadow-[0_4px_14px_-4px_rgba(20,34,74,0.25)]">
                    {dayMonth(p.dateISO)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
                  <h3 className="line-clamp-2 text-[1.1rem] font-semibold leading-snug text-[#14224A]">{p.title}</h3>

                  <div className="mt-auto flex items-center gap-6 pt-6 text-[0.95rem] text-[#4A5670]">
                    <span className="flex items-center gap-2">
                      <TypeIcon className="h-5 w-5 text-blue" />
                      {p.type}
                    </span>
                    <span className="flex items-center gap-2">
                      {online ? <IconLaptop className="h-5 w-5 text-blue" /> : <IconPin className="h-5 w-5 text-blue" />}
                      {online ? "Онлайн" : "Тюмень"}
                    </span>
                    <IconArrowRight className="ml-auto h-6 w-6 text-blue transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
