import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/placeholder-page";

export const metadata: Metadata = { title: "Дистанционное обучение — Дом науки и техники" };

export default function DistancePage() {
  return (
    <PlaceholderPage
      crumbs={[
        { label: "Главная", href: "/" },
        { label: "Обучение" },
        { label: "Дистанционное обучение" },
      ]}
      title="Дистанционное обучение"
      description="Обучение в своём темпе: видеолекции, тесты и итоговая аттестация онлайн — без привязки к расписанию."
      comingItems={[
        "Каталог дистанционных программ",
        "Личный кабинет с прогрессом обучения",
        "Электронные удостоверения и сертификаты",
      ]}
    />
  );
}
