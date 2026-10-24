// Общие типы и хелперы проекта «Заговорная традиция Древней Руси»

export interface CategoryDTO {
  id: string;
  slug: string;
  name: string;
  oldName: string | null;
  icon: string | null;
  description: string;
}

export interface StructurePartDTO {
  label: string;
  text: string;
  note: string;
}

export interface CharmDTO {
  id: string;
  slug: string;
  title: string;
  kind: string;
  purpose: string;
  summary: string;
  originalText: string;
  originalNote: string | null;
  translation: string;
  linguisticNote: string;
  historicalNote: string;
  symbolicNote: string;
  structureParts: StructurePartDTO[];
  keywords: string[];
  region: string;
  period: string;
  era: string;
  dating: string;
  sourceRef: string;
  categoryId: string;
  category: CategoryDTO;
  ritual: RitualEmbeddedDTO | null;
}

export interface SymbolDTO {
  id: string;
  slug: string;
  name: string;
  shortMeaning: string;
  description: string;
}

export interface GlossTermDTO {
  id: string;
  term: string;
  definition: string;
  example: string | null;
}

export interface EraDTO {
  id: string;
  years: string;
  title: string;
  description: string;
}

export interface SourceDTO {
  id: string;
  author: string;
  title: string;
  year: string;
  description: string;
}

export interface RitualObjectDTO {
  name: string;
  role: string;
  placement: string;
}

export interface RitualStepDTO {
  title: string;
  text: string;
}

// Полный ритуал проведения заговора — всегда привязан к своему заговору
// и вложен прямо в запись заговора (отдельного раздела ритуалов нет)
export interface RitualEmbeddedDTO {
  slug: string;
  name: string;
  kind: string;
  goal: string;
  summary: string;
  essence: string;
  timeShort: string;
  timeInfo: string;
  placeShort: string;
  placeInfo: string;
  orientation: string;
  actors: string;
  objects: RitualObjectDTO[];
  steps: RitualStepDTO[];
  completion: string;
  prohibitions: string[];
  sourceRef: string;
}

export interface RitualRuleDTO {
  id: string;
  slug: string;
  title: string;
  glyph: string | null;
  shortText: string;
  details: string[];
}

export interface AppData {
  charms: CharmDTO[];
  categories: CategoryDTO[];
  symbols: SymbolDTO[];
  glossary: GlossTermDTO[];
  eras: EraDTO[];
  sources: SourceDTO[];
  ritualRules: RitualRuleDTO[];
}

export const KINDS = ["заговор", "присуха", "отсуда", "оберег"] as const;

export const KIND_LABELS: Record<string, string> = {
  "заговор": "Заговор",
  "присуха": "Присуха",
  "отсуда": "Отсуда",
  "оберег": "Оберег",
};

// Цвета частей структуры заговора
export const STRUCT_COLORS: Record<string, string> = {
  "Зачин (выход)": "#7a5c2e",
  "Зачин (локация)": "#7a5c2e",
  "Зачин (путь к кузнице)": "#7a5c2e",
  "Зачин (обходной путь)": "#7a5c2e",
  "Зачин (обход)": "#7a5c2e",
  "Зачин (созерцание)": "#7a5c2e",
  "Зачин (поклон)": "#7a5c2e",
  "Зачин (появление силы)": "#7a5c2e",
  "Зачин (образец падения)": "#7a5c2e",
  "Зачин (смотрение)": "#7a5c2e",
  "Зачин (взгляд на море)": "#7a5c2e",
};
