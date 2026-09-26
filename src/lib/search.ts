/* Поиск сравнивал строки как есть, и это давало два тихих промаха.

   Первый — падежи: запрос «закупки» не находил «Управление государственными и
   муниципальными закупками», потому что «закупки» не является подстрокой «закупками».
   Ровно по этой причине три из шести «популярных запросов» на главной вели на пустой
   экран.

   Второй — буква «ё»: в названиях программ стоит «учет», в рубриках — «учёт». Один и тот
   же запрос находил либо одно, либо другое.

   Полноценная морфология здесь избыточна: хватает отсечения окончаний и приведения «ё».
   Совпадением считаем общий корень, а не точную форму слова. */

/** Окончания отсекаются от длинных к коротким: иначе «ами» ушло бы как «и». */
const ENDINGS = [
  "иями", "ями", "ами", "ого", "ему", "ому", "ыми", "ими", "ая", "яя", "ое", "ее", "ой", "ей",
  "ый", "ий", "ых", "их", "ов", "ев", "ам", "ям", "ах", "ях", "ом", "ем", "ую", "юю", "ы", "и",
  "а", "я", "е", "у", "ю", "о", "ь",
];

const MIN_STEM = 4;

function normalize(word: string): string {
  return word.toLowerCase().replace(/ё/g, "е");
}

/** Корень слова: слово без окончания, но не короче MIN_STEM. */
export function stem(word: string): string {
  const normalized = normalize(word);
  if (normalized.length <= MIN_STEM) return normalized;

  for (const ending of ENDINGS) {
    if (normalized.endsWith(ending) && normalized.length - ending.length >= MIN_STEM) {
      return normalized.slice(0, -ending.length);
    }
  }
  return normalized;
}

function tokenize(text: string): string[] {
  return text.match(/[\p{L}\p{N}]+/gu)?.map(stem) ?? [];
}

/**
 * Совпадение, если каждое слово запроса нашлось среди слов текста — по корню, с учётом
 * приставок («налог» находит «налогообложение»). Числа и короткие слова сравниваются
 * целиком, иначе «1» совпадало бы с «159».
 */
export function matchesSearch(haystack: string, query: string): boolean {
  const needles = tokenize(query);
  if (needles.length === 0) return true;

  const words = tokenize(haystack);

  return needles.every((needle) =>
    words.some((word) =>
      needle.length <= MIN_STEM ? word === needle : word.startsWith(needle) || needle.startsWith(word),
    ),
  );
}
