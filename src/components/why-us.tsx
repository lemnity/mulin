import { IconCertificate, IconFile, IconMonitor, IconUsers } from "@/components/icons";

const features = [
  {
    icon: IconCertificate,
    title: "Более 25 лет опыта",
    desc: "С 1998 года на рынке профессионального образования",
  },
  {
    icon: IconUsers,
    title: "Практикующие эксперты",
    desc: "Лекторы — действующие специалисты и консультанты",
  },
  {
    icon: IconFile,
    title: "Документы установленного образца",
    desc: "Удостоверения о повышении квалификации, дипломы о профпереподготовке",
  },
  {
    icon: IconMonitor,
    title: "Очное и дистанционное обучение",
    desc: "Удобные форматы для любого региона",
  },
];

export function WhyUs() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-6 lg:px-10">
      <h2 className="text-2xl font-bold text-ink">Почему выбирают нас</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border bg-surface p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-tint text-blue">
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 font-semibold text-ink">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
