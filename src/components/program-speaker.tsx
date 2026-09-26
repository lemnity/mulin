"use client";

import { useState } from "react";
import Link from "next/link";
import { SpeakerCard } from "@/components/speaker-card";
import { IconArrowRight } from "@/components/icons";
import type { Lecturer } from "@/lib/lecturers";

/**
 * Секция «Лектор» программы. Если удалось найти реальных преподавателей этой программы
 * (по id в базе лекторов) — показываем их профиль и ссылку на страницу; если их несколько,
 * добавляем переключатель. Иначе — то, что известно из данных самой программы (имя может
 * не назначен — так и пишем, вместо карточки с инициалами несуществующего человека).
 */
export function ProgramSpeaker({
  lecturers,
  fallbackName,
  fallbackBio,
  fallbackPhoto,
}: {
  lecturers: Lecturer[];
  /** null — лектор ещё не назначен; выдуманное имя вроде «Уточняется» сюда не приходит. */
  fallbackName: string | null;
  fallbackBio: string;
  fallbackPhoto?: string;
}) {
  const [activeId, setActiveId] = useState(lecturers[0]?.id);

  if (lecturers.length === 0) {
    if (!fallbackName) {
      return (
        <div className="rounded-xl border border-dashed border-border p-6 text-center">
          <p className="text-sm text-body">
            Лектор уточняется. Опубликуем имя, как только преподавателя назначат.
          </p>
        </div>
      );
    }
    return <SpeakerCard name={fallbackName} bio={fallbackBio} photo={fallbackPhoto} />;
  }

  const active = lecturers.find((l) => l.id === activeId) ?? lecturers[0];

  return (
    <div className="flex flex-col gap-4">
      {lecturers.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {lecturers.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setActiveId(l.id)}
              aria-pressed={l.id === active.id}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                l.id === active.id
                  ? "bg-blue text-white"
                  : "bg-page text-ink ring-1 ring-inset ring-border hover:text-ink"
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      )}

      <SpeakerCard name={active.name} bio={active.bio} photo={active.photo} />

      <Link
        href={`/about/teachers/${active.id}`}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-blue hover:text-blue-dark"
      >
        Профиль преподавателя
        <IconArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
