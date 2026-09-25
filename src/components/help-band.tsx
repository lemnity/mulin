import { ContactButton } from "@/components/contact-dialog";
import { IconChat, IconPhone } from "@/components/icons";

export function HelpBand() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <div className="flex flex-col items-start justify-between gap-6 rounded-[1.75rem] border border-[#E4ECF8] bg-gradient-to-br from-[#FAFCFF] to-[#F2F7FE] px-6 py-7 shadow-[0_18px_50px_-24px_rgba(30,99,221,0.18)] sm:px-8 lg:flex-row lg:items-center xl:px-10">
        <div className="flex items-start gap-5 sm:items-center sm:gap-7">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.25rem] bg-[#E8F0FD] text-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:h-20 sm:w-20 sm:rounded-[1.5rem]">
            <IconPhone className="h-7 w-7 sm:h-9 sm:w-9" />
          </span>
          <div>
            <h2 className="text-[1.25rem] font-extrabold leading-snug tracking-tight text-ink sm:text-[1.4rem]">
              Нужна помощь с выбором программы?
            </h2>
            <p className="mt-1.5 max-w-[52ch] text-[0.95rem] leading-relaxed text-body">
              Наши специалисты ответят на вопросы и подберут обучение под ваши задачи.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-5">
          <a
            href="tel:88002504191"
            className="tabular text-[1.15rem] font-bold text-ink transition-colors hover:text-blue"
          >
            8 800 250-41-91
          </a>
          <ContactButton className="inline-flex h-[3.25rem] items-center gap-2.5 rounded-xl border border-[#D5DFEE] bg-surface px-6 text-[0.95rem] font-semibold text-ink transition-colors hover:border-blue hover:text-blue">
            <IconChat className="h-5 w-5" />
            Написать нам
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
