import type { Program } from "@/lib/programs";

export type AgendaItem = {
  title: string;
  time: string;
};

export type ProgramDetail = {
  aboutParagraphs: string[];
  audience: string[];
  agenda: AgendaItem[];
  speakerBio: string;
  speakerPhoto?: string;
  documentName: string;
  documentSize: string;
  platformLabel: string;
  heroPhoto: string;
  heroQuote: string;
};

const overrides: Record<string, Partial<ProgramDetail>> = {
  p01: {
    aboutParagraphs: [
      "С 2026 года вступает в силу важные изменения в налоге на добавленную стоимость, затрагивающие практически все организации и индивидуальных предпринимателей. На семинаре разберём ключевые нововведения, официальные разъяснения ФНС, судебную практику и сложные ситуации, с которыми сталкиваются бухгалтеры и налоговые специалисты.",
      "Вы получите практические рекомендации и готовые алгоритмы действий, сможете задать вопросы лектору и разобрать реальные кейсы из практики.",
    ],
    audience: [
      "Бухгалтеры и главные бухгалтеры",
      "Налоговые специалисты и консультанты",
      "Руководители организаций и предприниматели",
      "Все, кто хочет уверенно работать в новых условиях",
    ],
    agenda: [
      { title: "Изменения в НДС с 2026 года: обзор и основные акценты", time: "08:00–09:30" },
      {
        title: "Исчисление и уплата НДС: сложные вопросы и практические примеры",
        time: "09:45–11:15",
      },
      { title: "Новый порядок вычетов и корректировок", time: "11:30–13:00" },
      { title: "Судебная практика и разъяснения ФНС", time: "14:00–15:00" },
    ],
    speakerBio:
      "Налоговый консультант, эксперт-практик с более чем 15-летним опытом. Специализируется на вопросах НДС, налогообложения и бухгалтерского учёта. Регулярный автор публикаций и спикер профессиональных конференций.",
    speakerPhoto: "/avatar-placeholder.png",
    documentName: "Информационное письмо.pdf",
    documentSize: "PDF, 1.2 МБ",
    platformLabel: "На платформе Дома НТ",
    heroPhoto: "/program-hero-photo.jpg",
    heroQuote: "Актуальные знания сегодня — стабильный бизнес завтра",
  },
};

function splitTimeRange(timeRange: string): [string, string] {
  const match = timeRange.match(/(\d{2}:\d{2})\D+(\d{2}:\d{2})/);
  return match ? [match[1], match[2]] : ["09:00", "13:00"];
}

function genericAgenda(program: Program): AgendaItem[] {
  const [start] = splitTimeRange(program.timeRange);
  const [h, m] = start.split(":").map(Number);
  const blocks = ["Вводная часть и постановка задач", "Основной блок и разбор кейсов", "Ответы на вопросы участников"];
  return blocks.map((title, i) => {
    const from = new Date(2000, 0, 1, h, m + i * 75);
    const to = new Date(2000, 0, 1, h, m + (i + 1) * 75);
    const fmt = (d: Date) => `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    return { title, time: `${fmt(from)}–${fmt(to)}` };
  });
}

export function getProgramDetail(program: Program): ProgramDetail {
  const override = overrides[program.id];

  const fallback: ProgramDetail = {
    aboutParagraphs: [
      program.description,
      "На программе вы получите практические рекомендации, разбор актуальных изменений и ответы лектора на вопросы по теме.",
    ],
    audience: [
      `Специалисты по направлению «${program.categories[0]}»`,
      "Руководители и специалисты, которым нужно актуализировать знания",
      "Все, кто хочет уверенно применять изменения на практике",
    ],
    agenda: genericAgenda(program),
    speakerBio: `${program.speaker} — практикующий эксперт по теме программы, регулярно проводит семинары и консультирует по сложным вопросам практики.`,
    documentName: "Информационное письмо.pdf",
    documentSize: "PDF, 0.6 МБ",
    platformLabel: program.format === "Онлайн" ? "На платформе Дома НТ" : program.location,
    heroPhoto: "/program-hero-photo.jpg",
    heroQuote: "Актуальные знания сегодня — стабильный бизнес завтра",
  };

  return { ...fallback, ...override };
}
