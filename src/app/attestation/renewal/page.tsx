import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Заявление на продление аттестата — Дом науки и техники" };

export default function RenewalPage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Аттестация", href: "/attestation" },
        { label: "Заявление на продление аттестата" },
      ]}
      title="Заявление на продление аттестата"
      description="Продлите профессиональный аттестат онлайн — без визита в офис."
      comingItems={[
        "Форма подачи заявления",
        "Список необходимых документов",
        "Отслеживание статуса заявки",
      ]}
    />
  );
}
