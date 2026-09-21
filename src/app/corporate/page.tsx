import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Корпоративное обучение — Дом науки и техники" };

export default function CorporatePage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Обучение" },
        { label: "Корпоративное обучение" },
      ]}
      title="Корпоративное обучение"
      description="Программы повышения квалификации для сотрудников компаний — с учётом вашей отрасли и задач."
      comingItems={[
        "Конструктор корпоративной программы",
        "Расчёт стоимости для группы",
        "Заявка на корпоративное обучение",
      ]}
    />
  );
}
