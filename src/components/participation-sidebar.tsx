"use client";

import { useRouter } from "next/navigation";
import type { Program } from "@/lib/programs";
import { weekdayFull } from "@/lib/programs";
import type { ProgramDetail } from "@/lib/program-details";
import { useCart } from "@/lib/cart-context";
import {
  IconArrowRight,
  IconCalendar,
  IconCertificate,
  IconCheck,
  IconChat,
  IconClock,
  IconDownload,
  IconMonitor,
  IconPercent,
  IconPhone,
  IconPin,
  IconTag,
} from "@/components/icons";

function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function ParticipationSidebar({
  program,
  detail,
}: {
  program: Program;
  detail: ProgramDetail;
}) {
  const router = useRouter();
  const { addItem, hasItem } = useCart();
  const inCart = hasItem(program.id);

  function handleSignUp() {
    addItem(program.id);
    router.push("/cart");
  }

  return (
    <aside className="flex flex-col gap-5 lg:sticky lg:top-[140px]">
      <div className="rounded-xl border border-border bg-surface p-5 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          <IconTag className="h-4 w-4 text-blue" />
          Условия участия
        </p>
        <p className="tabular mt-3 text-3xl font-extrabold text-ink">{formatPrice(program.price)}</p>

        <button
          type="button"
          onClick={handleSignUp}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors ${
            inCart ? "bg-green-tint text-green-text" : "bg-blue text-white hover:bg-blue-dark"
          }`}
        >
          {inCart ? (
            <>
              Вы записаны
              <IconCheck className="h-4 w-4" />
            </>
          ) : (
            <>
              Записаться на {program.type === "Курс" ? "курс" : program.type === "Семинар" ? "семинар" : "вебинар"}
              <IconArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
        <a
          href="#"
          className="mt-2.5 flex w-full items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
        >
          Задать вопрос
        </a>

        <div className="mt-5 flex flex-col gap-3.5 border-t border-border pt-5 text-sm">
          <span className="flex items-start gap-2.5">
            <IconCalendar className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
            <span className="text-ink">
              {program.dateLabel} ({weekdayFull(program.weekday)})
            </span>
          </span>
          <span className="flex items-start gap-2.5">
            <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
            <span className="text-ink">{program.timeRange}</span>
          </span>
          <span className="flex items-start gap-2.5">
            {program.format === "Онлайн" ? (
              <IconMonitor className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
            ) : (
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
            )}
            <span>
              <span className="block text-ink">{program.format}</span>
              <span className="block text-xs text-muted">{detail.platformLabel}</span>
            </span>
          </span>
          {program.hasCertificate && (
            <span className="flex items-start gap-2.5">
              <IconCertificate className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
              <span>
                <span className="block text-ink">Именной сертификат</span>
                <span className="block text-xs text-muted">Выдаётся всем участникам</span>
              </span>
            </span>
          )}
          {program.hasLetter && (
            <span className="flex items-start justify-between gap-2.5">
              <span className="flex items-start gap-2.5">
                <IconTag className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                <span>
                  <span className="block text-ink">Информационное письмо</span>
                  <span className="block text-xs text-muted">{detail.documentSize}</span>
                </span>
              </span>
              <a href="#" className="flex shrink-0 items-center gap-1 text-blue hover:underline">
                <IconDownload className="h-3.5 w-3.5" />
                Скачать
              </a>
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl bg-blue-tint/60 p-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-blue">
          <IconPercent className="h-4 w-4" />
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">Корпоративное участие</p>
        <p className="mt-1.5 text-sm leading-relaxed text-body">
          Специальные условия для организаций и групп от 3 человек
        </p>
        <a href="#" className="mt-2.5 inline-flex items-center gap-1 text-sm font-medium text-blue hover:text-blue-dark">
          Узнать подробнее
          <IconArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="rounded-xl border border-border p-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-tint text-blue">
          <IconPhone className="h-4 w-4" />
        </div>
        <p className="mt-3 text-sm font-semibold text-ink">Остались вопросы?</p>
        <p className="mt-1.5 text-sm leading-relaxed text-body">
          Мы поможем подобрать программу и ответим на все вопросы
        </p>
        <a href="tel:88002504191" className="mt-3 block text-lg font-bold text-ink hover:text-blue">
          8 800 250-41-91
        </a>
        <p className="text-xs text-muted">Звонок по России бесплатный</p>
        <a
          href="#"
          className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
        >
          <IconChat className="h-4 w-4" />
          Написать нам
        </a>
      </div>
    </aside>
  );
}
