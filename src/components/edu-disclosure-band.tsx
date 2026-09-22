import Link from "next/link";
import { IconArrowRight, IconFile } from "@/components/icons";

export function EduDisclosureBand() {
  return (
    <section className="mx-auto mt-10 max-w-7xl px-6 lg:mt-14 lg:px-10">
      <Link
        href="/disclosure"
        className="group flex flex-col items-start justify-between gap-4 rounded-xl border-2 border-blue bg-blue-tint px-5 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow hover:shadow-md sm:flex-row sm:items-center"
      >
        <span className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue text-white">
            <IconFile className="h-5 w-5" />
          </span>
          <span className="leading-snug">
            <span className="block text-xs font-semibold tracking-wide text-blue uppercase">
              Обязательная информация
            </span>
            <span className="mt-0.5 block text-base font-bold text-ink sm:text-lg">
              Сведения об образовательной организации
            </span>
            <span className="block text-sm text-body">АНО ДПО ТМУЦ «Дом науки и техники»</span>
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-blue px-4 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-blue-dark">
          Подробнее
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </section>
  );
}
