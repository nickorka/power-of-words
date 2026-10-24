// Засев базы данных «Заговорная традиция Древней Руси»
import { PrismaClient } from "@prisma/client";
import { categories, symbols, glossary, eras, sources } from "./data-static";
import { charms1 } from "./charms-1";
import { charms2 } from "./charms-2";
import { charms3 } from "./charms-3";
import { charms4 } from "./charms-4";
import { charms5 } from "./charms-5";
import { charms6 } from "./charms-6";
import { charms7 } from "./charms-7";
import { charms8 } from "./charms-8";
import { rituals1 } from "./rituals-1";
import { rituals2 } from "./rituals-2";
import { rituals3 } from "./rituals-3";
import { rituals4 } from "./rituals-4";
import { rituals5 } from "./rituals-5";
import { rituals6 } from "./rituals-6";
import { rituals7 } from "./rituals-7";
import { rituals8 } from "./rituals-8";
import { rituals9 } from "./rituals-9";
import { rituals10 } from "./rituals-10";
import { ritualRules } from "./ritual-rules";

const db = new PrismaClient();

async function main() {
  console.log("Очистка таблиц...");
  await db.ritual.deleteMany();
  await db.ritualRule.deleteMany();
  await db.charm.deleteMany();
  await db.category.deleteMany();
  await db.symbol.deleteMany();
  await db.glossTerm.deleteMany();
  await db.era.deleteMany();
  await db.source.deleteMany();

  console.log("Категории болезней...");
  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    await db.category.create({
      data: {
        slug: c.slug,
        name: c.name,
        oldName: c.oldName ?? null,
        icon: c.icon,
        description: c.description,
        orderIndex: i,
      },
    });
  }

  console.log("Заговоры...");
  const allCharms = [...charms1, ...charms2, ...charms3, ...charms4, ...charms5, ...charms6, ...charms7, ...charms8];
  for (const ch of allCharms) {
    const cat = await db.category.findUnique({ where: { slug: ch.categorySlug } });
    if (!cat) throw new Error(`Категория не найдена: ${ch.categorySlug}`);
    await db.charm.create({
      data: {
        slug: ch.slug,
        title: ch.title,
        kind: ch.kind,
        purpose: ch.purpose,
        summary: ch.summary,
        originalText: ch.originalText,
        originalNote: ch.originalNote ?? null,
        translation: ch.translation,
        linguisticNote: ch.linguisticNote,
        historicalNote: ch.historicalNote,
        symbolicNote: ch.symbolicNote,
        structureParts: JSON.stringify(ch.structureParts),
        keywords: JSON.stringify(ch.keywords),
        region: ch.region,
        period: ch.period,
        era: ch.era,
        dating: ch.dating,
        sourceRef: ch.sourceRef,
        categoryId: cat.id,
        orderIndex: ch.orderIndex,
      },
    });
  }

  console.log("Символы...");
  for (let i = 0; i < symbols.length; i++) {
    const s = symbols[i];
    await db.symbol.create({
      data: { slug: s.slug, name: s.name, shortMeaning: s.shortMeaning, description: s.description, orderIndex: i },
    });
  }

  console.log("Глоссарий...");
  for (let i = 0; i < glossary.length; i++) {
    const g = glossary[i];
    await db.glossTerm.create({
      data: { term: g.term, definition: g.definition, example: g.example ?? null, orderIndex: i },
    });
  }

  console.log("Эпохи...");
  for (let i = 0; i < eras.length; i++) {
    const e = eras[i];
    await db.era.create({ data: { years: e.years, title: e.title, description: e.description, orderIndex: i } });
  }

  console.log("Обряды (ритуальная практика)...");
  const allRituals = [...rituals1, ...rituals2, ...rituals3, ...rituals4, ...rituals5, ...rituals6, ...rituals7, ...rituals8, ...rituals9, ...rituals10];
  for (const r of allRituals) {
    const charm = await db.charm.findUnique({ where: { slug: r.charmSlug } });
    if (!charm) throw new Error(`Для обряда «${r.slug}» не найден заговор: ${r.charmSlug}`);
    await db.ritual.create({
      data: {
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
        objects: JSON.stringify(r.objects),
        steps: JSON.stringify(r.steps),
        completion: r.completion,
        prohibitions: JSON.stringify(r.prohibitions),
        charmId: charm.id,
        sourceRef: r.sourceRef,
        orderIndex: r.orderIndex,
      },
    });
  }

  console.log("Правила канона...");
  for (let i = 0; i < ritualRules.length; i++) {
    const rr = ritualRules[i];
    await db.ritualRule.create({
      data: {
        slug: rr.slug,
        title: rr.title,
        glyph: rr.glyph,
        shortText: rr.shortText,
        details: JSON.stringify(rr.details),
        orderIndex: i,
      },
    });
  }

  console.log("Источники...");
  for (let i = 0; i < sources.length; i++) {
    const s = sources[i];
    await db.source.create({ data: { author: s.author, title: s.title, year: s.year, description: s.description, orderIndex: i } });
  }

  const counts = {
    categories: await db.category.count(),
    charms: await db.charm.count(),
    symbols: await db.symbol.count(),
    glossary: await db.glossTerm.count(),
    eras: await db.era.count(),
    sources: await db.source.count(),
    rituals: await db.ritual.count(),
    ritualRules: await db.ritualRule.count(),
  };
  console.log("Готово:", JSON.stringify(counts));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
