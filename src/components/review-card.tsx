import Link from "next/link";
import { lecturers } from "@/lib/lecturers";
import { formatReviewDate, type Review } from "@/lib/reviews";

function initials(name: string) {
  return name
    .replace(/[«»"]/g, "")
    .split(/\s+/)
    .filter((w) => /^[А-ЯЁA-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

/** Карточка отзыва: автор, дата, текст, упомянутые преподаватели и ответ центра. */
export function ReviewCard({ review }: { review: Review }) {
  const mentioned = (review.lecturerIds ?? [])
    .map((id) => lecturers.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <header className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-tint text-sm font-bold text-blue">
          {initials(review.name) || "С"}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold leading-snug text-ink">{review.name}</span>
          <time dateTime={review.date} className="block text-xs text-muted">
            {formatReviewDate(review.date)}
          </time>
        </span>
      </header>

      <p className="mt-4 whitespace-pre-line text-[0.95rem] leading-relaxed text-ink">{review.text}</p>

      {mentioned.length > 0 && (
        <p className="mt-3 flex flex-wrap gap-2">
          {mentioned.map((l) => (
            <Link
              key={l.id}
              href={`/about/teachers/${l.id}`}
              className="rounded-full bg-blue-tint px-2.5 py-1 text-xs font-medium text-blue transition-colors hover:bg-blue hover:text-white"
            >
              {l.name}
            </Link>
          ))}
        </p>
      )}

      {review.answer && (
        <div className="-mx-5 -mb-5 mt-auto pt-5 sm:-mx-6 sm:-mb-6">
          <div className="rounded-b-2xl border-t border-border bg-[#F5F8FE] px-5 py-4 sm:px-6">
            <p className="flex items-center gap-2 text-xs font-semibold text-blue">
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M4 4v5a4 4 0 0 0 4 4h8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="m12.5 9.5 3.5 3.5-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Ответ центра
            </p>
            <p className="mt-2 whitespace-pre-line pl-6 text-sm leading-relaxed text-body">{review.answer}</p>
          </div>
        </div>
      )}
    </article>
  );
}
