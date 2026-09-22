import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { IconArrowRight } from "@/components/icons";

function initialsOf(lastName: string, firstMiddle: string) {
  return `${lastName[0] ?? ""}${firstMiddle[0] ?? ""}`.toUpperCase();
}

type Lecturer = { lastName: string; firstMiddle: string; bio: string; photo?: string };

const lecturers: Lecturer[] = [
  {
    lastName: "Вихляева",
    firstMiddle: "Елена Николаевна",
    bio: "Налоговый консультант, эксперт-практик. Более 15 лет опыта.",
  },
  {
    lastName: "Гейц",
    firstMiddle: "Игорь Викторович",
    bio: "Эксперт по кадровому делопроизводству. Консультант по трудовому праву и охране труда.",
  },
  {
    lastName: "Затагина",
    firstMiddle: "Виктория Вячеславовна",
    bio: "Специалист по финансовому учёту и отчётности. Автор методических материалов.",
  },
  {
    lastName: "Смирнов",
    firstMiddle: "Алексей Павлович",
    bio: "Эксперт в сфере государственных закупок. Практикующий консультант.",
  },
];

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
        {lecturers.map(({ lastName, firstMiddle, bio, photo }, i) => (
          <Reveal key={lastName} delayMs={(i % 4) * 80}>
            <Link
              href="/about/teachers"
              className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue"
            >
              <div className="flex items-start gap-3">
                {photo ? (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={photo}
                      alt={`${lastName} ${firstMiddle}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-tint text-lg font-semibold text-blue">
                    {initialsOf(lastName, firstMiddle)}
                  </div>
                )}
                <p className="pt-1 font-bold leading-snug text-ink">
                  {lastName}
                  <br />
                  {firstMiddle}
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{bio}</p>
              <span className="mt-auto flex justify-end pt-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-tint text-blue transition-colors group-hover:bg-blue group-hover:text-white">
                  <IconArrowRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
