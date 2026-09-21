import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Семинары — Дом науки и техники" };

export default function SeminarsPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Обучение" },
        { label: "Семинары" },
      ]}
      title="Семинары"
      description="Очные и онлайн-семинары с практикующими экспертами по бухгалтерии, кадрам, праву и финансам."
      comingItems={[
        "Каталог семинаров с фильтрами по теме и городу",
        "Карточки лекторов и программы занятий",
        "Онлайн-запись и оплата",
      ]}
    />
  );
}
