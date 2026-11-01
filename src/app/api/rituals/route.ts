import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim().toLowerCase() ?? "";
    const kind = searchParams.get("kind") ?? "";
    const slug = searchParams.get("slug") ?? "";

    const rituals = await db.ritual.findMany({
      where: {
        AND: [kind ? { kind } : {}, slug ? { slug } : {}],
      },
      include: { charm: { select: { slug: true, title: true, kind: true, purpose: true } } },
      orderBy: { orderIndex: "asc" },
    });

    const filtered = q
      ? rituals.filter((r) => {
          const haystack = [
            r.name,
            r.kind,
            r.goal,
            r.summary,
            r.essence,
            r.timeShort,
            r.timeInfo,
            r.placeShort,
            r.placeInfo,
            r.orientation,
            r.actors,
            r.objects,
            r.steps,
            r.completion,
            r.prohibitions,
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        })
      : rituals;

    return NextResponse.json({
      total: filtered.length,
      rituals: filtered.map((r) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        kind: r.kind,
        goal: r.goal,
        summary: r.summary,
        timeShort: r.timeShort,
        placeShort: r.placeShort,
        sourceRef: r.sourceRef,
        objects: JSON.parse(r.objects),
        steps: JSON.parse(r.steps),
        prohibitions: JSON.parse(r.prohibitions),
        charm: r.charm
          ? { slug: r.charm.slug, title: r.charm.title, kind: r.charm.kind, purpose: r.charm.purpose }
          : null,
      })),
    });
  } catch (e) {
    console.error("GET /api/rituals error", e);
    return NextResponse.json({ error: "Ошибка выборки данных" }, { status: 500 });
  }
}
