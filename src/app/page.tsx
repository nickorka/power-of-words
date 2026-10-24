import { db } from "@/lib/db";
import type {
  AppData,
  CharmDTO,
  RitualEmbeddedDTO,
  RitualObjectDTO,
  RitualStepDTO,
  StructurePartDTO,
} from "@/lib/zagovory";
import { ZagovoryApp } from "@/components/zagovory/app";

export const dynamic = "force-dynamic";

function toRitual(r: {
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
  objects: string;
  steps: string;
  completion: string;
  prohibitions: string;
  sourceRef: string;
}): RitualEmbeddedDTO {
  return {
    slug: r.slug,
    name: r.name,
    kind: r.kind,
    goal: r.goal,
    summary: r.summary,
    essence: r.essence,
    timeShort: r.timeShort,
    timeInfo: r.timeInfo,
    placeShort: r.placeShort,
    placeInfo: r.placeInfo,
    orientation: r.orientation,
    actors: r.actors,
    objects: JSON.parse(r.objects) as RitualObjectDTO[],
    steps: JSON.parse(r.steps) as RitualStepDTO[],
    completion: r.completion,
    prohibitions: JSON.parse(r.prohibitions) as string[],
    sourceRef: r.sourceRef,
  };
}

async function loadData(): Promise<AppData> {
  const [categories, charmsRaw, symbols, glossary, eras, sources, ritualRulesRaw] =
    await Promise.all([
      db.category.findMany({ orderBy: { orderIndex: "asc" } }),
      db.charm.findMany({ include: { category: true, rituals: { orderBy: { orderIndex: "asc" } } }, orderBy: { orderIndex: "asc" } }),
      db.symbol.findMany({ orderBy: { orderIndex: "asc" } }),
      db.glossTerm.findMany({ orderBy: { orderIndex: "asc" } }),
      db.era.findMany({ orderBy: { orderIndex: "asc" } }),
      db.source.findMany({ orderBy: { orderIndex: "asc" } }),
      db.ritualRule.findMany({ orderBy: { orderIndex: "asc" } }),
    ]);

  // Каждый заговор несёт собственный ритуал проведения — вложенный прямо в запись
  const charms: CharmDTO[] = charmsRaw.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    kind: c.kind,
    purpose: c.purpose,
    summary: c.summary,
    originalText: c.originalText,
    originalNote: c.originalNote,
    translation: c.translation,
    linguisticNote: c.linguisticNote,
    historicalNote: c.historicalNote,
    symbolicNote: c.symbolicNote,
    structureParts: JSON.parse(c.structureParts) as StructurePartDTO[],
    keywords: JSON.parse(c.keywords) as string[],
    region: c.region,
    period: c.period,
    era: c.era,
    dating: c.dating,
    sourceRef: c.sourceRef,
    categoryId: c.categoryId,
    category: {
      id: c.category.id,
      slug: c.category.slug,
      name: c.category.name,
      oldName: c.category.oldName,
      icon: c.category.icon,
      description: c.category.description,
    },
    ritual: c.rituals[0] ? toRitual(c.rituals[0]) : null,
  }));

  return {
    charms,
    categories: categories.map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      oldName: c.oldName,
      icon: c.icon,
      description: c.description,
    })),
    symbols: symbols.map((s) => ({
      id: s.id,
      slug: s.slug,
      name: s.name,
      shortMeaning: s.shortMeaning,
      description: s.description,
    })),
    glossary: glossary.map((g) => ({
      id: g.id,
      term: g.term,
      definition: g.definition,
      example: g.example,
    })),
    eras: eras.map((e) => ({
      id: e.id,
      years: e.years,
      title: e.title,
      description: e.description,
    })),
    sources: sources.map((s) => ({
      id: s.id,
      author: s.author,
      title: s.title,
      year: s.year,
      description: s.description,
    })),
    ritualRules: ritualRulesRaw.map((rr) => ({
      id: rr.id,
      slug: rr.slug,
      title: rr.title,
      glyph: rr.glyph,
      shortText: rr.shortText,
      details: JSON.parse(rr.details) as string[],
    })),
  };
}

export default async function Page() {
  const data = await loadData();
  return <ZagovoryApp data={data} />;
}
