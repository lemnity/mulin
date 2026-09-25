/**
 * Документы центра для страницы /about/documents.
 * Перенесено со старого сайта (tumtipb.ru/content/19/202, /61/163, /3/…) 2026-09-26; файлы остаются
 * на tumtipb.ru. Локальные нормативные акты — актуальные, из раздела «Сведения» (src/lib/disclosure.ts).
 * Не переносились: банковская карточка с образцами подписей, доверенность, документы ИП,
 * архивные документы НОУ ДПО.
 */
import { charterDocs, localActs, doc } from "@/lib/disclosure";

const OLD = "https://tumtipb.ru/upload/";

export type SiteDoc = { title: string; url: string };
export type DocGroup = { id: string; title: string; note?: string; docs: SiteDoc[] };

export const documentGroups: DocGroup[] = [
  {
    id: "registration",
    title: "Учредительные и регистрационные документы",
    docs: [
      ...charterDocs.map((d) => ({ title: d.title, url: d.url })),
      { title: "Свидетельство о государственной регистрации некоммерческой организации", url: OLD + "image/newdocs/minust.jpg" },
      { title: "Свидетельство о государственной регистрации юридического лица (ОГРН)", url: OLD + "image/newdocs/ogrn.jpg" },
      { title: "Свидетельство о постановке на учёт в налоговом органе (ИНН)", url: OLD + "image/newdocs/inn.jpg" },
      { title: "Протокол назначения директора", url: OLD + "file/10520240528112939025012.pdf" },
      { title: "Карточка с реквизитами организации", url: OLD + "file/Kartochka_2026.pdf" },
      { title: "Информационное письмо об учёте в Статрегистре Росстата", url: OLD + "file/ReportNotificationOkpo43118373.pdf" },
      { title: "Договор аренды помещения (место нахождения организации)", url: OLD + "file/Dogovor%20arendy_2026.pdf" },
      { title: "Декларация принадлежности к СОНКО", url: OLD + "file/deklaraciya%20SONKO_2023.pdf" },
      { title: "Уведомление о применении УСН", url: OLD + "file/vypiska%20usn_2025%20(020225).pdf" },
      {
        title: "Выписка из реестра операторов обработки персональных данных",
        url: "https://pd.rkn.gov.ru/operators-registry/operators-list/?id=72-22-011693",
      },
    ],
  },
  {
    id: "accreditation",
    title: "Аккредитации и членство",
    docs: [
      { title: "Свидетельство аккредитации учебно-методического центра ИПБ России № 053", url: OLD + "file/svid053-2026.pdf" },
      { title: "Сертификат корпоративного члена ИПБ России", url: OLD + "file/Sert_IPB_2021.pdf" },
      { title: "Свидетельство о внесении в реестр УМЦ НП ААС", url: OLD + "image/SVID%20SRO%20AAS_2023.jpg" },
      { title: "Уведомление о внесении в реестр аккредитованных организаций в области охраны труда", url: OLD + "file/uvedomlenie%20OT_2023.pdf" },
      { title: "Выписка из реестра Минтруда № 346 от 19.04.2023", url: OLD + "file/vypiska%20346%20ot%20190423.pdf" },
      { title: "Удостоверение эксклюзивного регионального представителя ИПК в УрФО", url: OLD + "file/udost_ipk1.pdf" },
    ],
  },
  {
    id: "contracts",
    title: "Для заключения договора",
    note: "Документы для бухгалтерии и отдела закупок заказчика.",
    docs: [
      { title: "Договор на оказание платных образовательных услуг — юридические лица (44-ФЗ)", url: OLD + "file/Dogovor_platnye%20uslugi_44-fz_2024.doc" },
      { title: "Образец договора — физическое лицо", url: doc("2024/05/Образец_договора_физическое_лицо.pdf") },
      { title: "Образец договора — юридическое лицо", url: doc("2024/05/Образец_договора_юридическое_лицо.pdf") },
      { title: "Соглашение об использовании электронного документооборота (ЭДО)", url: OLD + "file/Dogovor%20EDO.doc" },
      { title: "Бухгалтерская отчётность на последнюю отчётную дату", url: OLD + "file/Buchotchet-2025.pdf" },
      { title: "Справка налогового органа об отсутствии задолженности", url: OLD + "file/Spravka%20120125.pdf" },
      { title: "Налоговая декларация по УСН", url: OLD + "file/Declaraciya%20USN-2025.pdf" },
      { title: "Карточка регистрации контрольно-кассовой техники", url: OLD + "file/regkarta_KKT.pdf" },
      { title: "Письмо Минфина о направлении кассового чека в электронной форме", url: OLD + "file/chek%20elektronnyy.doc" },
    ],
  },
  {
    id: "students",
    title: "Для слушателей",
    docs: [
      { title: "Заявка физического лица на курсы и семинары", url: OLD + "file/fizlico.xls" },
      {
        title: "Заявление физического лица на профессиональную переподготовку",
        url: OLD + "file/Prilozenie_1_Zajavlenie_na_profperepodgotovku_ANO_DPO_TMUC_DNiT_new_250419.doc",
      },
      { title: "Инструкция по проверке подлинности документа на сайте Рособрнадзора (ФРДО)", url: OLD + "file/Instrukciya%20FRDO.doc" },
      { title: "Квитанция на оплату членских взносов ИПБ России и Тюменского ТИПБ", url: OLD + "file/izv_2026.xls" },
    ],
  },
  {
    id: "samples",
    title: "Образцы выдаваемых документов",
    docs: [
      { title: "Удостоверение о повышении квалификации, 1 вид", url: OLD + "file/Udostoverenie_16_1%20vid.pdf" },
      { title: "Удостоверение о повышении квалификации, 2 вид", url: OLD + "file/Udostoverenie_16%202%20vid.pdf" },
      { title: "Диплом о профессиональной переподготовке, 1 вид", url: OLD + "file/Diplom_16%201%20vid.pdf" },
      { title: "Диплом о профессиональной переподготовке, 2 вид", url: OLD + "file/Diplom_16%202%20vid.pdf" },
      { title: "Приложение к диплому о профессиональной переподготовке", url: OLD + "file/Pril%20Doplom_16%20.pdf" },
      { title: "Удостоверение о проверке знаний требований охраны труда, 1 вид", url: OLD + "file/Udostoverenie%20OT_16_1%20vid.pdf" },
      { title: "Удостоверение о проверке знаний требований охраны труда, 2 вид", url: OLD + "file/Udostoverenie%20OT_16%202%20vid.pdf" },
      { title: "Удостоверение о проверке знаний пожарно-технического минимума", url: OLD + "file/Udostoverenie_PTM.pdf" },
      { title: "Сертификат о прослушивании краткосрочного семинара, 1 вид", url: OLD + "file/Sertifikat_16%201%20vid.pdf" },
      { title: "Сертификат о прослушивании краткосрочного семинара, 2 вид", url: OLD + "file/Sertifikat_16%202%20vid.pdf" },
      { title: "Сертификат Тюменского ТИПБ об окончании повышения квалификации", url: OLD + "file/Sertifikat_TIPB%201%20vid.pdf" },
      { title: "Сертификат о прохождении электронного обучения", url: OLD + "file/Sertifikat_EO.pdf" },
      { title: "Сертификат ППУ ИПБ России", url: OLD + "file/ipar-certificate-improvement-seminar-members-2016.jpg" },
    ],
  },
  {
    id: "local-acts",
    title: "Локальные нормативные акты",
    note: "Приняты решением Педагогического совета, протокол № 38 от 26.08.2024.",
    docs: localActs.map((d) => ({ title: d.title, url: d.url })),
  },
];

/** Формат файла по расширению — для цветной метки. */
export function fileKind(url: string): "PDF" | "DOC" | "XLS" | "JPG" | "WEB" {
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".pdf")) return "PDF";
  if (clean.endsWith(".doc") || clean.endsWith(".docx")) return "DOC";
  if (clean.endsWith(".xls") || clean.endsWith(".xlsx")) return "XLS";
  if (clean.endsWith(".jpg") || clean.endsWith(".png")) return "JPG";
  return "WEB";
}
