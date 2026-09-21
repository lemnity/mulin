import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Конкурс — Дом науки и техники" };

export default function ContestPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Аттестация", href: "/attestation" },
        { label: "Конкурс" },
      ]}
      title="Конкурс профессионального мастерства"
      description="Ежегодный конкурс для аттестованных специалистов — с денежными призами и стажировками у партнёров."
      comingItems={[
        "Положение о конкурсе и критерии оценки",
        "Сроки подачи заявок",
        "Архив победителей прошлых лет",
      ]}
    />
  );
}
