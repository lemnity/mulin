import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Личный кабинет — Дом науки и техники" };

export default function AccountPage() {
  return (
    <PlaceholderPage
      crumbs={[{ label: "Главная", href: "/" }, { label: "Личный кабинет" }]}
      title="Личный кабинет"
      description="Ваши программы, документы об обучении и история заказов в одном месте."
      comingItems={[
        "Вход по телефону или электронной почте",
        "Список оплаченных программ и записей",
        "Скачивание сертификатов и удостоверений",
      ]}
    />
  );
}
