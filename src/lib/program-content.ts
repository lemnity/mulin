import type { Program, ProgramType } from "@/lib/programs";

/* Данные программ выгружены со старого сайта: описания приезжают вместе с мусором
   редактора Word («Normal 0», «MicrosoftInternetExplorer4», куски mso-стилей), заголовки —
   с непарными кавычками и служебными хвостами, время — в виде «с 08-00 до 11-00
   часов.(Время московское)». Этот модуль приводит всё к виду, пригодному для экрана.
   Чистка идёт на чтении, исходный массив не трогаем: выгрузку повторят, и правки руками
   в programs.ts пропали бы при следующем обновлении. */

/** Мусор конвертера Word: встречается и отдельным словом, и целым блоком стилей. */
const WORD_NOISE = [
  // Преамбула конвертера идёт цельным блоком — снимаем её целиком, иначе от неё
  // остаются одинокие «RU» и «X-NONE» (порядок частных правил тут не спасает).
  /Normal\s+0(?:\s+(?:false|true|RU|EN-US|X-NONE|MicrosoftInternetExplorer\d?))*/gi,
  /MicrosoftInternetExplorer\d?/gi,
  /\bX-NONE\b/gi,
  /\/\*\s*Style Definitions\s*\*\//gi,
  /mso-[a-z-]+\s*:[^;{}]*;?/gi,
  /table\.MsoNormalTable\s*\{[^}]*\}?/gi,
];

/* Точка НЕ всегда конец предложения: инициалы «Г.С.», даты «24.09.2010», домены
   «www.webinar.ru», сокращения «ул.». Пробел ставим только там, где точка стоит между
   строчной буквой и прописной — это и есть граница предложения. */
const SENTENCE_BREAK = /([а-яёa-z])\.(?=[А-ЯЁA-Z])/g;

/* Аббревиатуры, которые обязаны остаться заглавными при разборе «крика» вёрстки. */
const KEEP_UPPERCASE = new Set([
  "НДС", "НДФЛ", "ФНС", "РФ", "ИП", "УСН", "ЕНС", "ТК", "ГК", "НК", "КоАП", "ПБУ", "МСФО",
  "ФСБУ", "ККТ", "ОКВЭД", "СЗВ", "ЕФС", "СФР", "ФСС", "ПФР", "ГОСТ", "СНТ", "ООО", "АО",
  "МРОТ", "ЕГРЮЛ", "ЕГРИП", "ЭДО", "УПД", "КУДиР", "ГИТ", "СОУТ", "ОТ", "ПК", "ДПО", "IT",
]);

/* Выгрузка приносит целые фразы КАПСОМ — на экране это выглядит криком. Переводим такие
   отрезки в обычный регистр, сохраняя аббревиатуры. Разбор идёт по словам, а не одним
   выражением: внутри «крика» попадаются односложные «В», «И», «ПО», и они рвали бы цепочку
   заглавных, если бы серию искали регулярным выражением целиком. */
function softenShouting(text: string): string {
  const tokens = text.split(/(\s+)/);
  const isUpperWord = (t: string) => /^[«"(]*[А-ЯЁ]{1,}[»")\-–,.:;]*$/.test(t) && /[А-ЯЁ]/.test(t);
  const core = (t: string) => t.replace(/[^А-ЯЁA-Z]/g, "");

  let i = 0;
  while (i < tokens.length) {
    if (tokens[i].trim() === "" || !isUpperWord(tokens[i])) {
      i += 1;
      continue;
    }
    let end = i;
    while (end < tokens.length && (tokens[end].trim() === "" || isUpperWord(tokens[end]))) end += 1;
    // Хвостовые пробелы серии не считаем её частью.
    while (end > i && tokens[end - 1].trim() === "") end -= 1;

    const words = tokens.slice(i, end).filter((t) => t.trim() !== "");
    const meaningful = words.filter((t) => core(t).length >= 3);

    // Одно длинное слово капсом («…квалификации ЮРИСТОВ») — тоже крик, а не аббревиатура.
    const shouting =
      meaningful.length >= 2 ||
      (meaningful.length === 1 && core(meaningful[0]).length >= 5 && !KEEP_UPPERCASE.has(core(meaningful[0])));

    if (shouting) {
      for (let k = i; k < end; k += 1) {
        const token = tokens[k];
        if (token.trim() === "" || KEEP_UPPERCASE.has(core(token))) continue;
        tokens[k] = token.replace(/[А-ЯЁ]+/g, (w) => w.toLowerCase());
      }
      // Прописная возвращается только если серия открывает предложение: иначе получалось бы
      // «… 2026 года Требований новых …» с заглавной посреди фразы.
      const before = tokens.slice(0, i).join("").trimEnd();
      if (before === "" || /[.!?:;]$/.test(before)) {
        tokens[i] = tokens[i].replace(/[а-яё]/, (c) => c.toUpperCase());
      }
    }
    i = end;
  }

  return tokens.join("");
}

/** Снимает мусор, схлопывает пробелы и чинит пунктуацию. */
export function cleanText(raw: string): string {
  let text = raw;
  for (const pattern of WORD_NOISE) text = text.replace(pattern, " ");
  text = softenShouting(text);

  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(SENTENCE_BREAK, "$1. ")
    .replace(/([,;:])(?=[^\s»)\]])/g, "$1 ")
    // «специалисты- практики» → «специалисты-практики»: перенос из вёрстки старого сайта.
    .replace(/([А-Яа-яЁёA-Za-z])-\s+([а-яёa-z])/g, "$1-$2")
    // «2010г.» → «2010 г.», «№ 346от» → «№ 346 от».
    .replace(/(\d)\s*(г|гг)\.(?!\w)/g, "$1 $2.")
    // «нормативно – правовых» → «нормативно-правовых»: тире вместо дефиса в составном слове.
    .replace(/([а-яё])\s+[–—]\s+([а-яё])/g, "$1-$2")
    // «1 этап - очная форма» → «1 этап — очная форма»: дефис в роли тире между словами.
    .replace(/(\S)\s+-\s+(\S)/g, "$1 — $2")
    .replace(/\s*[«"]\s*$/g, "")
    .trim();
}

/** Непарные кавычки — след обрезанного заголовка: `… рублем". В количестве 5 часов.` */
function balanceQuotes(text: string): string {
  const opens = (text.match(/[«"]/g) ?? []).length;
  const closes = (text.match(/[»"]/g) ?? []).length;
  // Кавычка `"` считается и открывающей, и закрывающей, поэтому сверяем только парность.
  const straight = (text.match(/"/g) ?? []).length;
  if (straight % 2 === 1) text = text.replace(/"/g, "");
  if (opens === closes) return text;
  return text.replace(/[«»]/g, "");
}

/** «В количестве 5 часов», «(16 часов)» — это объём, а не часть названия. */
const HOURS_TAIL = /[.,;\s]*[(«"]?\s*(?:в\s+количестве\s+)?(\d{1,4})\s*(?:ак\.?\s*)?час(?:а|ов)?\.?\s*[)»"]?\s*$/i;

export type ProgramTitle = {
  /** Название для заголовка и карточки. */
  text: string;
  /** Объём в часах, если он был вшит в название. */
  hours: number | null;
};

export function programTitle(program: Program): ProgramTitle {
  let text = cleanText(program.title);
  let hours: number | null = null;

  const tail = text.match(HOURS_TAIL);
  if (tail) {
    hours = Number(tail[1]);
    text = text.slice(0, tail.index).trim();
  }

  text = balanceQuotes(text).replace(/\s*…\s*$/, "…").replace(/[.,;\s]+$/, "");
  // Выгрузка режет длинные названия посреди слова («…к годовой инвент…») — обрываем
  // на последнем целом слове, чтобы многоточие читалось как сокращение, а не как сбой.
  if (text.endsWith("…")) {
    const body = text.slice(0, -1).trimEnd();
    const lastSpace = body.lastIndexOf(" ");
    text = `${(lastSpace > 20 ? body.slice(0, lastSpace) : body).replace(/[.,;:\s-]+$/, "")}…`;
  }

  // Канцелярская преамбула съедает весь заголовок в карточке — тема идёт после неё.
  text = text.replace(
    /^Образовательные услуги на\s+(?:на\s+)?курс(?:е|ах)\s+дополнительной профессиональной переподготовк[еи]\s*(?:по образовательной программе)?\s*:?\s*/i,
    "Профессиональная переподготовка: ",
  );
  text = text.replace(/^Повышение квалификации\s*:?\s*/i, "");

  return { text: text || cleanText(program.title), hours };
}

/* ---------- Описание ---------- */

const OUTLINE_MARKER =
  /(?:вопросы\s+программы|рассмотреть\s+вопросы|в\s+программе(?:\s+курса)?(?:\s+включены\s+следующие\s+вопросы)?|программа\s+семинара)\s*:/i;

/* Выгрузка обрывает последний пункт на полуслове («… в работе с»). Висящий предлог или
   союз в конце читается как ошибка вёрстки — убираем его вместе с обрывком слова. */
const DANGLING_TAIL =
  /[\s,–-]+(?:в|во|с|со|и|а|но|о|об|по|при|для|из|от|до|на|над|под|про|за|без|к|ко|у|или|что|как)\s*$/i;

function trimDanglingTail(text: string): string {
  return text.replace(/\s+\S{1,2}$/, (tail) => (DANGLING_TAIL.test(tail) ? "" : tail)).replace(DANGLING_TAIL, "");
}

/** Первая буква — прописная: после разбора «крика» пункт может начинаться со строчной. */
function sentenceCase(text: string): string {
  return text.replace(/^([«"(]*)([а-яё])/, (_, lead: string, letter: string) => lead + letter.toUpperCase());
}

export type ProgramBody = {
  /** Вводный абзац — до перечня вопросов. */
  intro: string;
  /** Пункты программы, если их удалось выделить. */
  outline: string[];
};

/** Делит описание на вступление и перечень вопросов. */
export function programBody(program: Program): ProgramBody {
  // Выгрузка обрезает длинные описания и ставит многоточие — последнее слово при этом
  // может быть половиной слова («… в бюджетной сфере. Особенн»). Снимаем его вместе с
  // многоточием, иначе обрывок выглядит опечаткой.
  const truncated = /(…|\.{3})\s*$/.test(program.description);
  let text = cleanText(program.description)
    .replace(/\s*…\s*$/, "")
    .replace(/\.{2,}\s*$/, "")
    .trimEnd();

  if (truncated) {
    const lastSpace = text.lastIndexOf(" ");
    if (lastSpace > 0) text = text.slice(0, lastSpace).replace(/[,;:\s-]+$/, "");
  }
  const marker = text.match(OUTLINE_MARKER);

  if (!marker || marker.index === undefined) {
    return { intro: sentenceCase(text), outline: [] };
  }

  const intro = text.slice(0, marker.index).trim();
  const rest = text.slice(marker.index + marker[0].length).trim();

  const outline = rest
    // Пункты приходят и через «•», и нумерованными «1.» — режем по обоим.
    .split(/\s*•\s*|\s(?=\d{1,2}[.)]\s+[А-ЯЁA-Z])/)
    .map((item) => item.replace(/^\d{1,2}[.)]\s*/, "").trim())
    .filter((item) => item.length > 2)
    // Обрывок последнего пункта из усечённой выгрузки показывать незачем.
    .filter((item, i, all) => !(i === all.length - 1 && all.length > 1 && item.length < 12))
    .map(trimDanglingTail)
    .map(sentenceCase);

  // Один длинный «пункт» — это неразбитый абзац, а не перечень: показываем его текстом.
  if (outline.length === 1 && outline[0].length > 140) {
    return { intro: sentenceCase([intro, outline[0]].filter(Boolean).join(" ")), outline: [] };
  }

  return { intro: sentenceCase(intro || rest), outline };
}

/** Короткий текст для карточки: режем по границе предложения, а не посреди слова. */
export function programSummary(program: Program, maxChars = 190): string {
  const { intro, outline } = programBody(program);
  // Вступление вроде «Специалисты помогут рассмотреть вопросы» ничего не сообщает о теме —
  // дополняем его первыми пунктами программы, пока не наберётся полезная длина.
  const parts = [intro];
  for (const item of outline) {
    if (parts.join(" ").length >= maxChars * 0.7) break;
    parts.push(item);
  }
  const source = parts.filter(Boolean).join(" · ");
  if (source.length <= maxChars) return source;

  const window = source.slice(0, maxChars);
  const sentenceEnd = Math.max(window.lastIndexOf(". "), window.lastIndexOf("! "), window.lastIndexOf("? "));
  if (sentenceEnd > maxChars * 0.5) return window.slice(0, sentenceEnd + 1);

  const wordEnd = window.lastIndexOf(" ");
  const cut = trimDanglingTail(window.slice(0, wordEnd > 0 ? wordEnd : maxChars)).replace(/[,;:\s]+$/, "");
  return `${cut}…`;
}

/* ---------- Время ---------- */

export type TimeSlot = {
  /** Готовая подпись: «08:00–11:00 · МСК» или «Уточняется». */
  label: string;
  /** Начало в минутах от полуночи — для расписания занятий. */
  startMinutes: number | null;
  endMinutes: number | null;
};

const TIME_PAIR = /(\d{1,2})\s*[-:.]\s*(\d{2})\D+?(\d{1,2})\s*[-:.]\s*(\d{2})/;

export function programTime(program: Program): TimeSlot {
  const raw = program.timeRange.trim();
  const match = raw.match(TIME_PAIR);

  if (!match) {
    const note = /расписани/i.test(raw) ? "Согласно расписанию" : "Время уточняется";
    return { label: note, startMinutes: null, endMinutes: null };
  }

  const [, h1, m1, h2, m2] = match.map(Number) as unknown as number[];
  const zone = /московск/i.test(raw) ? " · МСК" : /местн/i.test(raw) ? " · местное время" : "";
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    label: `${pad(h1)}:${m1 ? pad(m1) : "00"}–${pad(h2)}:${m2 ? pad(m2) : "00"}${zone}`,
    startMinutes: h1 * 60 + m1,
    endMinutes: h2 * 60 + m2,
  };
}

/* ---------- Место ---------- */

export type PlaceInfo = {
  /** Одна строка для карточки. */
  label: string;
  /** Уточнение для детальной страницы (адрес зала, платформа). */
  detail: string | null;
};

export function programPlace(program: Program): PlaceInfo {
  const raw = cleanText(program.location);
  // Поле format в выгрузке не всегда согласовано с местом: встречается «Очно» рядом
  // с «Дистанционно. www.webinar.ru». Место описывает себя само — верим ему.
  const remote = program.format === "Онлайн" || /дистанционн|онлайн|вебинар|webinar|zoom/i.test(raw);

  if (remote) {
    const platform = raw.match(/(?:www\.)?([a-z0-9-]+\.(?:ru|com|org))/i);
    return {
      label: "Онлайн",
      detail: platform ? `Платформа ${platform[1].toLowerCase()}` : "На платформе Дома НТ",
    };
  }

  // «по адресу: ул. …» — это адрес зала, а не город. Саму формулировку оставляем как есть:
  // строки вроде «В Конференц-зале …» стоят в предложном падеже, и обрезка предлога
  // превратила бы их в «Конференц-зале …» — грамматический мусор на видном месте.
  const address = raw.replace(/^по адресу:\s*/i, "").replace(/\.$/, "");
  if (address.length > 24) return { label: "Тюмень", detail: sentenceCase(address) };

  return { label: raw || "Тюмень", detail: null };
}

/* ---------- Лектор ---------- */

/** «Уточняется» — это отсутствие лектора, а не его фамилия. */
export function programSpeaker(program: Program): string | null {
  const raw = cleanText(program.speaker);
  if (!raw || /^уточня/i.test(raw)) return null;
  return raw;
}

/* ---------- Длительность ---------- */

export function programDuration(program: Program): string | null {
  const days = Number(program.durationLabel.match(/\d+/)?.[0] ?? 0);
  if (!days) return null;
  if (days === 1) return "1 день";
  if (days <= 5) return `${days} ${days < 5 ? "дня" : "дней"}`;
  if (days < 30) return `${days} дней`;
  const months = Math.round(days / 30);
  return `${months} мес.`;
}

/* ---------- Единая модель для экранов ---------- */

export type ProgramView = {
  id: string;
  type: ProgramType;
  title: string;
  hours: number | null;
  summary: string;
  intro: string;
  outline: string[];
  time: TimeSlot;
  place: PlaceInfo;
  speaker: string | null;
  duration: string | null;
  category: string;
};

/* У части выгрузки описание пустое или состоит из одного мусора. Пустая карточка выглядит
   как сбой загрузки, поэтому собираем строку из того, что известно точно. */
function fallbackSummary(program: Program): string {
  const kind = typeAccusative[program.type];
  const category = cleanText(program.categories[0] ?? "").toLowerCase();
  const audience = program.audiences[0] ? ` Рассчитан на аудиторию: ${program.audiences[0].toLowerCase()}.` : "";
  return `Программа ${program.durationLabel} по направлению «${category}». Формат — ${kind}.${audience}`;
}

const cache = new Map<string, ProgramView>();

/** Нормализованное представление программы. Результат кэшируется: выгрузка неизменна. */
export function getProgramView(program: Program): ProgramView {
  const cached = cache.get(program.id);
  if (cached) return cached;

  const { text, hours } = programTitle(program);
  const { intro, outline } = programBody(program);

  const view: ProgramView = {
    id: program.id,
    type: program.type,
    title: text,
    hours,
    summary: programSummary(program) || fallbackSummary(program),
    intro,
    outline,
    time: programTime(program),
    place: programPlace(program),
    speaker: programSpeaker(program),
    duration: programDuration(program),
    category: cleanText(program.categories[0] ?? ""),
  };

  cache.set(program.id, view);
  return view;
}

/* Текст, по которому ищем. Раньше каталог и счётчики на главной собирали его каждый
   по-своему: плашка направления обещала 26 программ, а каталог по тому же запросу
   показывал другое число. Источник должен быть один. */
export function searchHaystack(program: Program): string {
  const view = getProgramView(program);
  return [
    view.title,
    view.intro,
    view.outline.join(" "),
    view.category,
    program.categories.join(" "),
    program.audiences.join(" "),
    program.speaker,
    program.code,
    view.place.label,
    program.dateLabel,
  ].join(" ");
}

/** Винительный падеж типа: «Выбрать вебинар», «Для кого этот курс». */
export const typeAccusative: Record<ProgramType, string> = {
  Вебинар: "вебинар",
  Семинар: "семинар",
  Курс: "курс",
};
