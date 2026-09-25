"use client";

import { useEffect, useId, useRef } from "react";
import { IconExternal, IconX } from "@/components/icons";

/** Документ-картинка: миниатюра с подписью, по клику — просмотр крупно в модальном окне. */
export function ImageDoc({ title, url }: { title: string; url: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const open = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-xl border border-border bg-surface text-left transition-colors hover:border-blue"
      >
        <span className="relative block aspect-[4/3] w-full overflow-hidden bg-page">
          {/* eslint-disable-next-line @next/next/no-img-element -- внешний файл со старого сайта */}
          <img
            src={url}
            alt=""
            loading="lazy"
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </span>
        <span className="block border-t border-border px-3.5 py-3 text-sm font-medium leading-snug text-ink group-hover:text-blue">
          {title}
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="contact-dialog m-auto max-h-[92vh] w-[calc(100%-2rem)] max-w-4xl overflow-hidden rounded-[1.5rem] border border-[#E4ECF8] bg-surface p-0 text-ink shadow-[0_30px_80px_-20px_rgba(16,24,40,0.35)] backdrop:bg-[#0B1B3A]/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-3.5">
          <h2 id={titleId} className="text-sm font-semibold leading-snug sm:text-base">
            {title}
          </h2>
          <div className="flex shrink-0 items-center gap-1">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-blue hover:bg-blue-tint sm:inline-flex"
            >
              Открыть оригинал
              <IconExternal className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-page hover:text-ink"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex max-h-[calc(92vh-4rem)] items-center justify-center overflow-auto bg-page p-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- внешний файл со старого сайта */}
          <img src={url} alt={title} className="max-h-[calc(92vh-6rem)] w-auto max-w-full rounded-lg object-contain" />
        </div>
      </dialog>
    </>
  );
}
