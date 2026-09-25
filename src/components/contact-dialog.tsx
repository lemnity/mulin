"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { IconCheck, IconChat, IconX } from "@/components/icons";

const EMAIL = "mail@tumtipb.ru";

const field =
  "h-12 w-full rounded-xl border border-[#D5DFEE] bg-surface px-4 text-[0.95rem] text-ink placeholder:text-muted focus:border-blue focus:outline-none";

/**
 * Кнопка «Написать нам» с модальной формой сообщения.
 * Сайт статический (без сервера), поэтому «Отправить» собирает письмо на mail@tumtipb.ru
 * со всеми полями и открывает почтовую программу пользователя.
 */
export function ContactButton({
  className = "",
  topic,
  children,
}: {
  className?: string;
  /** Тема обращения — попадёт в тему письма (например, название программы). */
  topic?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sent, setSent] = useState(false);
  const titleId = useId();

  const open = () => {
    setSent(false);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => dialogRef.current?.close();

  // Возвращаем прокрутку страницы при любом закрытии (крестик, Esc, клик по фону).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = topic ? `Вопрос с сайта: ${topic}` : "Сообщение с сайта";
    const body = [`Имя: ${name}`, `Как связаться: ${contact}`, "", message].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    e.currentTarget.reset();
    setSent(true);
  };

  return (
    <>
      <button type="button" onClick={open} className={`cursor-pointer ${className}`}>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="contact-dialog m-auto w-[calc(100%-2rem)] max-w-lg rounded-[1.75rem] border border-[#E4ECF8] bg-surface p-0 text-left text-ink shadow-[0_30px_80px_-20px_rgba(16,24,40,0.35)] backdrop:bg-[#0B1B3A]/45 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            className="absolute right-4 top-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-page hover:text-ink"
          >
            <IconX className="h-5 w-5" />
          </button>

          {sent ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-[#E8F0FD] text-blue">
                <IconCheck className="h-8 w-8" />
              </span>
              <h2 id={titleId} className="mt-5 text-[1.35rem] font-extrabold tracking-tight">
                Письмо готово к отправке
              </h2>
              <p className="mx-auto mt-2 max-w-[40ch] text-[0.95rem] leading-relaxed text-body">
                Мы открыли вашу почтовую программу — осталось нажать «Отправить». Если она не открылась,
                напишите на{" "}
                <a href={`mailto:${EMAIL}`} className="text-blue underline underline-offset-2">
                  {EMAIL}
                </a>{" "}
                или позвоните{" "}
                <a href="tel:88002504191" className="tabular font-semibold whitespace-nowrap text-ink hover:text-blue">
                  8 800 250-41-91
                </a>
                .
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-6 inline-flex h-12 cursor-pointer items-center rounded-xl bg-blue px-6 text-[0.95rem] font-semibold text-white transition-colors hover:bg-blue-dark"
              >
                Готово
              </button>
            </div>
          ) : (
            <>
              <span className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-[#E8F0FD] text-blue">
                <IconChat className="h-7 w-7" />
              </span>
              <h2 id={titleId} className="mt-4 pr-10 text-[1.35rem] font-extrabold tracking-tight">
                Написать нам
              </h2>
              <p className="mt-1.5 text-[0.95rem] leading-relaxed text-body">
                {topic ? (
                  <>
                    Вопрос по программе «{topic}». Ответим в рабочее время: Пн–Пт, 9:00–18:00.
                  </>
                ) : (
                  <>Ответим в рабочее время: Пн–Пт, 9:00–18:00.</>
                )}
              </p>

              <form onSubmit={submit} className="mt-6 flex flex-col gap-3.5">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Ваше имя</span>
                  <input name="name" required autoComplete="name" className={field} placeholder="Как к вам обращаться" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Телефон или e-mail</span>
                  <input
                    name="contact"
                    required
                    autoComplete="email"
                    className={field}
                    placeholder="Куда вам ответить"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Сообщение</span>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    className={`${field} h-auto resize-none py-3 leading-relaxed`}
                    placeholder="Опишите ваш вопрос"
                  />
                </label>
                <label className="mt-1 flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-body">
                  <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--blue)]" />
                  <span>
                    Соглашаюсь с{" "}
                    <a href="#" className="text-blue underline underline-offset-2 hover:text-blue-dark">
                      политикой конфиденциальности
                    </a>
                  </span>
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex h-[3.25rem] cursor-pointer items-center justify-center rounded-xl bg-blue px-6 text-[0.95rem] font-semibold text-white shadow-[0_8px_18px_-8px_rgba(30,99,221,0.6)] transition-colors hover:bg-blue-dark"
                >
                  Отправить сообщение
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
