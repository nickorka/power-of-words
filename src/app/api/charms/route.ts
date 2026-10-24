import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
    const category = searchParams.get("category") ?? "";
    const kind = searchParams.get("kind") ?? "";

    const charms = await db.charm.findMany({
      where: {
        AND: [
          category ? { category: { slug: category } } : {},
          kind ? { kind } : {},
        ],
      },
      include: { category: true, rituals: { orderBy: { orderIndex: "asc" } } },
      orderBy: { orderIndex: "asc" },
    });

    const filtered = q
      ? charms.filter((c) => {
          const haystack = [
            c.title,
            c.purpose,
            c.summary,
            c.originalText,
            c.translation,
            c.keywords,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        })
      : charms;

    return NextResponse.json({
      total: filtered.length,
      charms: filtered.map((c) => ({
        id: c.id,
        slug: c.slug,
        title: c.title,
        kind: c.kind,
        purpose: c.purpose,
        summary: c.summary,
        region: c.region,
        period: c.period,
        dating: c.dating,
        sourceRef: c.sourceRef,
        category: { slug: c.category.slug, name: c.category.name },
        keywords: JSON.parse(c.keywords) as string[],
        ritual: c.rituals[0]
          ? {
              slug: c.rituals[0].slug,
              name: c.rituals[0].name,
              kind: c.rituals[0].kind,
              goal: c.rituals[0].goal,
              timeShort: c.rituals[0].timeShort,
              placeShort: c.rituals[0].placeShort,
            }
          : null,
      })),
    });
  } catch (e) {
    console.error("GET /api/charms error", e);
    return NextResponse.json({ error: "Ошибка выборки данных" }, { status: 500 });
  }
}
