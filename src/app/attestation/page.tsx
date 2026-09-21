import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Аттестация — Дом науки и техники" };

export default function AttestationPage() {
  return (
    <PlaceholderPage
      crumbs={[{ label: "Главная", href: "/" }, { label: "Аттестация" }]}
      title="Аттестация"
      description="Профессиональная аттестация бухгалтеров и специалистов: подготовка, экзамен, продление аттестата."
      comingItems={[
        "Порядок и этапы аттестации",
        "График ближайших экзаменов",
        "Ответы на частые вопросы",
      ]}
    />
  );
}
