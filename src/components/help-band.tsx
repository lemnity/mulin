import { IconChat, IconPhone } from "@/components/icons";

export function HelpBand() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border border-border bg-hero-band p-8 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-blue shadow-sm">
            <IconPhone className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-ink">Нужна помощь с выбором программы?</h2>
            <p className="mt-1 max-w-[52ch] text-sm text-body">
              Наши специалисты ответят на вопросы и подберут обучение под ваши задачи.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <a href="tel:88002504191" className="text-sm font-semibold text-ink hover:text-blue">
            8 800 250-41-91
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-blue hover:text-blue"
          >
            <IconChat className="h-4 w-4" />
            Написать нам
          </a>
        </div>
      </div>
    </section>
  );
}
