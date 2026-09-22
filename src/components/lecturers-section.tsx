import Link from "next/link";
import { SpeakerCard } from "@/components/speaker-card";
import { IconArrowRight } from "@/components/icons";

const lecturers = [
  {
    name: "Вихляева Елена Николаевна",
    role: "Налоговый консультант",
    bio: "Эксперт-практик с более чем 15-летним опытом. Специализируется на вопросах НДС и бухгалтерского учёта.",
  },
  {
    name: "Гейц Игорь Викторович",
    role: "Эксперт по кадровому делопроизводству",
    bio: "Практикующий консультант по трудовому праву и охране труда. Помогает выстраивать процессы без штрафов и споров.",
  },
  {
    name: "Затагина Виктория Вячеславовна",
    role: "Специалист по финансам и валютному контролю",
    bio: "Специализируется на банковском регулировании и налогообложении малого бизнеса. Автор методических материалов.",
  },
  {
    name: "Горовенко Сергей Викторович",
    role: "Юрист-практик",
    bio: "Ведёт договорную и претензионную работу, представляет интересы бизнеса в судах.",
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
        {lecturers.map((l) => (
          <Link
            key={l.name}
            href="/about/teachers"
            className="group flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-blue"
          >
            <SpeakerCard name={l.name} bio={`${l.role}. ${l.bio}`} />
            <span className="mt-4 flex justify-end">
              <IconArrowRight className="h-4 w-4 text-blue transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
