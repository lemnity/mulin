import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Отзывы — Дом науки и техники" };

export default function ReviewsPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "О центре", href: "/about" },
        { label: "Отзывы" },
      ]}
      title="Отзывы"
      description="Что говорят о нас бухгалтеры, кадровики, юристы и руководители, которые уже прошли обучение."
      comingItems={[
        "Отзывы с оценками по каждой программе",
        "Форма для нового отзыва",
        "Видеоотзывы участников",
      ]}
    />
  );
}
