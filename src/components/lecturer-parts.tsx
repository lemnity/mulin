import Image from "next/image";
import { assetPath } from "@/lib/asset-path";
import Link from "next/link";
import { IconArrowRight, IconMonitor, IconPin } from "@/components/icons";
import type { Lecturer, LecturerProgram } from "@/lib/lecturers";

export function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function formatPrice(price: number) {
  return price > 0 ? `${new Intl.NumberFormat("ru-RU").format(price)} ₽` : "Уточняется";
}

/** Круглое портретное фото или инициалы. */
export function LecturerAvatar({
  lecturer,
  className = "w-24",
}: {
  lecturer: Lecturer;
  className?: string;
}) {
  if (lecturer.photo) {
    return (
      <div
        className={`relative aspect-square shrink-0 overflow-hidden rounded-full ring-1 ring-inset ring-border ${className}`}
      >
        <Image src={assetPath(lecturer.photo)} alt={lecturer.name} fill sizes="128px" className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div
      className={`flex aspect-square shrink-0 items-center justify-center rounded-full bg-blue-tint text-2xl font-bold text-blue ring-1 ring-inset ring-border ${className}`}
    >
      {initialsOf(lecturer.name)}
    </div>
  );
}

/** Строка семинара со ссылкой «Записаться» на страницу программы. */
export function ProgramRow({ p }: { p: LecturerProgram }) {
  const online = p.format === "Онлайн";
  return (
    <li>
      <Link
        href={`/programs/${p.id}`}
        className="group flex items-stretch gap-3 rounded-xl border border-border bg-page p-2.5 transition-colors hover:border-blue hover:bg-blue-tint/50"
      >
        <span className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-surface text-center ring-1 ring-inset ring-border">
          <span className="tabular text-[0.95rem] font-bold leading-none text-ink">
            {p.dateShort.split(" ")[0]}
          </span>
          <span className="mt-0.5 text-[0.7rem] text-muted">{p.dateShort.split(" ")[1]}</span>
        </span>

        <span className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="line-clamp-2 text-[0.9rem] font-medium leading-snug text-ink group-hover:text-blue">
            {p.title}
          </span>
          <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              {online ? <IconMonitor className="h-3.5 w-3.5" /> : <IconPin className="h-3.5 w-3.5" />}
              {p.format}
            </span>
            <span aria-hidden="true">·</span>
            <span>{p.type}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular font-medium text-ink/80">{formatPrice(p.price)}</span>
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-1 self-center whitespace-nowrap rounded-lg bg-blue px-3 py-2 text-xs font-medium text-white transition-colors group-hover:bg-blue-dark">
          Записаться
          <IconArrowRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </li>
  );
}
