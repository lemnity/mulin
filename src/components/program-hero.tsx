import Image, { type StaticImageData } from "next/image";
import { weekdayFull, type Program } from "@/lib/programs";
import type { ProgramDetail } from "@/lib/program-details";
import { getProgramView } from "@/lib/program-content";
import {
  IconCalendar,
  IconCertificate,
  IconClock,
  IconGraduationCap,
  IconMonitor,
  IconPin,
  type IconProps,
} from "@/components/icons";
import cover1 from "../../public/hero-cover.webp";
import cover2 from "../../public/hero-cover-2.webp";
import cover3 from "../../public/hero-cover-3.webp";

/* Раньше здесь стоял program-hero-photo.jpg — снимок 440×248 с ВПЕЧАТАННЫМ в пиксели
   слоганом и карточкой «Более 25 лет». Три проблемы разом: текст в растре размывался при
   растягивании до ширины колонки, читалкам и поиску он недоступен, а сам слоган —
   реклама центра на странице конкретной программы. Берём чистые снимки обложки. */
const covers: StaticImageData[] = [cover1, cover2, cover3];

/** Снимок выбирается по id — у соседних программ кадры разные, у одной он не скачет. */
function coverFor(id: string): StaticImageData {
  const sum = [...id].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return covers[sum % covers.length];
}

const typeBadge: Record<Program["type"], string> = {
  Вебинар: "bg-blue-tint text-blue",
  Семинар: "bg-green-tint text-green-text",
  Курс: "bg-amber-tint text-amber-text",
};

type Fact = {
  icon: (props: IconProps) => React.ReactElement;
  label: string;
  value: string;
  note: string | null;
};

export function ProgramHero({ program, detail }: { program: Program; detail: ProgramDetail }) {
  const view = getProgramView(program);

  const facts: Fact[] = [
    { icon: IconCalendar, label: "Дата", value: program.dateLabel, note: weekdayFull(program.weekday) },
    {
      icon: IconClock,
      label: "Время",
      value: view.time.label,
      note: view.duration ? `Длительность — ${view.duration}` : null,
    },
    {
      icon: view.place.label === "Онлайн" ? IconMonitor : IconPin,
      label: "Формат",
      value: view.place.label,
      note: detail.platformLabel === view.place.label ? null : detail.platformLabel,
    },
    ...(view.hours
      ? [{ icon: IconGraduationCap, label: "Объём", value: `${view.hours} часов`, note: "Академических" }]
      : []),
    ...(program.hasCertificate
      ? [
          {
            icon: IconCertificate,
            label: "Документ",
            // «Именной сертификат» в колонку 150 px не помещается и переносится на вторую
            // строку — из пяти значений четыре однострочные, и ряд выглядит рваным.
            value: "Сертификат",
            note: "Именной",
          },
        ]
      : []),
  ];

  return (
    <section className="bg-hero-band">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        {/* Верхний ряд — только заголовок и снимок. Карточка фактов вынесена под него на всю
            ширину: пока она стояла в левой колонке, справа под фотографией оставалось
            185 px пустоты, а сами факты занимали половину доступной строки.
            items-stretch + h-full на снимке: колонки всегда равной высоты, «дыры» нет. */}
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-12">
          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${typeBadge[program.type]}`}
              >
                {program.type}
              </span>
              {view.category && (
                <span className="text-xs font-semibold tracking-wide text-blue uppercase">
                  {view.category}
                </span>
              )}
            </div>

            {/* Ширину строки держит text-balance. Прежний потолок 24ch обрезал заголовок до
                432 px в колонке шириной 605 и разбивал его на шесть рваных строк, где
                последняя была одним словом. Размер плавный: на 1024 колонка сужается до
                515 px, и фиксированные 2.5rem снова давали бы шесть строк. */}
            <h1 className="mt-4 text-balance text-[1.9rem] font-extrabold leading-[1.15] tracking-tight text-ink sm:text-4xl lg:text-[clamp(2.25rem,1.5625vw+1.25rem,2.5rem)]">
              {view.title}
            </h1>

            <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-body">
              {view.intro || view.summary}
            </p>
          </div>

          <div className="relative min-h-[15rem] w-full overflow-hidden rounded-2xl max-lg:aspect-[16/10] lg:h-full">
            <Image
              src={coverFor(program.id)}
              alt=""
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Факты — одна полоса во всю ширину: дата, время, формат, объём и документ читаются
            подряд, а не выискиваются в двух колонках слева.

            Без подложки: полоса отделена от заголовка линией и разбита вертикальными
            волосяными линиями — это читается как строка характеристик, а не как ещё одна
            карточка поверх карточки. Разделители включены только с xl: там пять значений
            всегда укладываются в один ряд, а на трёх колонках четвёртый элемент начинал бы
            новую строку и получил бы линию слева — посреди пустоты.

            На телефоне та же раскладка в столбик занимала 468 px — больше половины экрана,
            и до вкладок приходилось прокручивать вслепую. Ниже sm это строки «подпись
            слева, значение справа», как в таблице характеристик. */}
        <dl className="mt-8 border-t border-border-strong max-sm:divide-y max-sm:divide-border-strong sm:grid sm:gap-x-0 sm:gap-y-7 sm:pt-7 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:grid-cols-5 xl:divide-x xl:divide-border-strong">
          {facts.map(({ icon: Icon, label, value, note }) => (
            <div
              key={label}
              className="flex min-w-0 items-baseline justify-between gap-5 py-3.5 max-sm:first:pt-4 sm:block sm:py-0 sm:pr-8 xl:px-7 xl:first:pl-0 xl:last:pr-0"
            >
              <dt className="flex shrink-0 items-center gap-2 text-xs font-medium tracking-wide text-muted uppercase">
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </dt>
              {/* Значение и уточнение — одна колонка, чтобы на телефоне они шли под общим
                  правым краем, а не разъезжались по разным сторонам строки. */}
              <div className="min-w-0 text-right max-sm:max-w-[60%] sm:mt-2 sm:text-left">
                <dd className="text-[0.95rem] font-semibold leading-snug text-ink">{value}</dd>
                {note && <dd className="mt-1 text-xs leading-snug text-muted">{note}</dd>}
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
