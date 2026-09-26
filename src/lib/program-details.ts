import type { Program } from "@/lib/programs";
import { getProgramView, typeAccusative } from "@/lib/program-content";

export type AgendaItem = {
  title: string;
  time: string;
};

export type ProgramDetail = {
  aboutParagraphs: string[];
  /** Перечень вопросов программы, если его удалось выделить из описания. */
  outline: string[];
  audience: string[];
  /** «Для кого этот вебинар / семинар / курс» — заголовок зависит от типа программы. */
  audienceTitle: string;
  agenda: AgendaItem[];
  speakerBio: string;
  speakerPhoto?: string;
  documentName: string;
  documentSize: string;
  platformLabel: string;
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
  },
};

/* Расписание занятий строилось от времени, разобранного шаблоном `\d{2}:\d{2}`, но в
   выгрузке время записано через дефис — «с 08-00 до 11-00». Шаблон не совпадал никогда,
   и расписание всегда начиналось с подставного 09:00: на странице вебинара 08:00–11:00
   план занятий показывал 09:00–12:45. Теперь берём часы из общего разбора. */
function genericAgenda(program: Program): AgendaItem[] {
  const { startMinutes, endMinutes } = getProgramView(program).time;
  if (startMinutes === null || endMinutes === null || endMinutes <= startMinutes) return [];

  const blocks = [
    "Вводная часть и постановка задач",
    "Основной блок и разбор практики",
    "Ответы на вопросы участников",
  ];

  const total = endMinutes - startMinutes;
  // Длинные программы идут с перерывом; на коротких он съел бы половину времени.
  const breakMinutes = total >= 300 ? 60 : total >= 180 ? 30 : 0;
  const blockLength = Math.floor((total - breakMinutes) / blocks.length);
  const fmt = (minutes: number) =>
    `${String(Math.floor(minutes / 60) % 24).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

  let cursor = startMinutes;
  const items: AgendaItem[] = [];

  blocks.forEach((title, i) => {
    const from = cursor;
    const to = i === blocks.length - 1 ? endMinutes : from + blockLength;
    items.push({ title, time: `${fmt(from)}–${fmt(to)}` });
    cursor = to;
    if (breakMinutes > 0 && i === 0) {
      items.push({ title: "Перерыв", time: `${fmt(cursor)}–${fmt(cursor + breakMinutes)}` });
      cursor += breakMinutes;
    }
  });

  return items;
}

export function getProgramDetail(program: Program): ProgramDetail {
  const override = overrides[program.id];

  const view = getProgramView(program);
  const kind = typeAccusative[program.type];

  // Раньше в «О программе» попадало то же усечённое описание, что и в карточке каталога,
  // — на детальной странице это выглядело как оборванный текст. Берём полное вступление,
  // а разобранный перечень вопросов показываем отдельным списком.
  const aboutParagraphs = [
    view.intro,
    view.outline.length === 0
      ? `На программе вы получите практические рекомендации, разбор актуальных изменений и ответы лектора на вопросы по теме.`
      : "",
  ].filter(Boolean);

  const fallback: ProgramDetail = {
    aboutParagraphs,
    outline: view.outline,
    audience: [
      view.category ? `Специалисты по направлению «${view.category}»` : "Специалисты профильных служб",
      "Руководители и специалисты, которым нужно актуализировать знания",
      "Все, кто хочет уверенно применять изменения на практике",
    ],
    audienceTitle: `Для кого этот ${kind}`,
    agenda: genericAgenda(program),
    speakerBio: view.speaker
      ? `${view.speaker} — практикующий эксперт по теме программы, регулярно проводит занятия и консультирует по сложным вопросам практики.`
      : "Лектор будет объявлен ближе к дате проведения. Программу ведут практикующие эксперты — аудиторы, юристы и консультанты.",
    documentName: "Информационное письмо.pdf",
    documentSize: "PDF, 0.6 МБ",
    platformLabel: view.place.detail ?? view.place.label,
  };

  return { ...fallback, ...override };
}
