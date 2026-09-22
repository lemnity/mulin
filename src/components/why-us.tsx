import { Reveal } from "@/components/reveal";
import { IconDiamond, IconDocumentLines, IconLaptop, IconTeam } from "@/components/icons";

const features = [
  {
    icon: IconDiamond,
    title: "Более 25 лет опыта",
    desc: "С 1998 года на рынке профессионального образования",
  },
  {
    icon: IconTeam,
    title: "Практикующие эксперты",
    desc: "Лекторы — действующие специалисты и консультанты",
  },
  {
    icon: IconDocumentLines,
    title: "Документы установленного образца",
    desc: "Удостоверения о повышении квалификации, дипломы о профпереподготовке",
  },
  {
    icon: IconLaptop,
    title: "Очное и дистанционное обучение",
    desc: "Удобные форматы для любого региона",
  },
];

export function WhyUs() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <h2 className="text-2xl font-bold text-ink">Почему выбирают нас</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }, i) => (
          <Reveal key={title} delayMs={(i % 4) * 80}>
            <div className="flex h-full items-start gap-3 rounded-xl border border-border bg-surface p-5">
              <Icon className="h-9 w-9 shrink-0 text-blue" />
              <div>
                <h3 className="font-semibold leading-snug text-ink">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
