import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { programs, type ProgramType } from "@/lib/programs";
import { getProgramView } from "@/lib/program-content";
import { Reveal } from "@/components/reveal";
import {
  IconArrowRight,
  IconGraduationCap,
  IconLaptop,
  IconMonitor,
  IconPin,
  IconUsers,
} from "@/components/icons";
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
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long" }).format(
    new Date(y, m - 1, d),
  );
}

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function UpcomingEvents() {
  /* Берём ближайшие по дате, а не первые три из выгрузки: порядок в файле произвольный,
     и в «ближайших» могло оказаться мероприятие следующего года. */
  const items = [...programs].sort((a, b) => a.dateISO.localeCompare(b.dateISO)).slice(0, 3);

  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-[1.75rem] font-extrabold tracking-tight text-[#14224A] sm:text-[2rem]">
          Ближайшие мероприятия
        </h2>
        <Link
          href="/schedule#programs"
          className="group inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] font-semibold text-blue hover:text-blue-dark"
        >
          Все мероприятия
          <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => {
          const view = getProgramView(p);
          const TypeIcon = typeIcon[p.type];
          const online = view.place.label === "Онлайн";

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
                  {/* Бейдж выровнен по той же колонке, что и текст ниже (24 px), — иначе
                      он висел на 16 px и заметно не совпадал с заголовком. */}
                  <span className="absolute left-6 top-6 rounded-xl bg-white px-4 py-2 text-[1.05rem] font-bold text-[#14224A] shadow-[0_4px_14px_-4px_rgba(20,34,74,0.25)]">
                    {dayMonth(p.dateISO)}
                  </span>
                </div>

                {/* Поле одинаковое со всех сторон: было pt-5 при pb-6/px-6, то есть сверху
                    на 4 px меньше, чем везде. */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="line-clamp-2 text-[1.1rem] font-semibold leading-snug text-[#14224A]">
                    {view.title}
                  </h3>

                  {/* mb-5 задаёт нижнему блоку гарантированный отступ. Раньше его не было,
                      и разрыв до линии равнялся свободному месту карточки: у длинного
                      заголовка линия прижималась к тексту вплотную, у короткого отходила
                      далеко — в ряду из трёх карточек это видно сразу. */}
                  <div className="mb-5 mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.9rem] text-[#4A5670]">
                    <span className="flex items-center gap-2">
                      <TypeIcon className="h-4.5 w-4.5 shrink-0 text-blue" />
                      {p.type}
                    </span>
                    <span className="flex items-center gap-2">
                      {online ? (
                        <IconLaptop className="h-4.5 w-4.5 shrink-0 text-blue" />
                      ) : (
                        <IconPin className="h-4.5 w-4.5 shrink-0 text-blue" />
                      )}
                      {view.place.label}
                    </span>
                  </div>

                  {/* Цена вернулась в карточку: без неё посетитель обязан открыть страницу
                      программы, чтобы узнать самое частое, что он хочет узнать.
                      Выравнивание по базовой линии: при items-end «Подробнее» вставало на
                      уровень мелкой подписи «1 день», а не самой цены. */}
                  <div className="mt-auto flex items-baseline justify-between gap-4 border-t border-[#E6ECF5] pt-4">
                    <span className="min-w-0">
                      <span className="tabular block text-lg font-extrabold leading-none text-[#14224A]">
                        {formatPrice(p.price)}
                      </span>
                      {view.duration && (
                        <span className="mt-1.5 block text-xs leading-none text-[#4A5670]">
                          {view.duration}
                        </span>
                      )}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[0.9rem] font-semibold text-blue">
                      Подробнее
                      <IconArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
                    </span>
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
