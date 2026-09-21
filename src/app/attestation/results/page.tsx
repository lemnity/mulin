import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Результаты аттестации — Дом науки и техники" };

export default function ResultsPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Аттестация", href: "/attestation" },
        { label: "Результаты аттестации" },
      ]}
      title="Результаты аттестации"
      description="Проверьте результаты сданного экзамена по номеру аттестата или фамилии."
      comingItems={[
        "Поиск результатов по номеру аттестата",
        "Даты ближайших пересдач",
        "Выгрузка официальной справки",
      ]}
    />
  );
}
