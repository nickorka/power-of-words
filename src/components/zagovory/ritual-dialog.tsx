"use client";

import { useEffect } from "react";
import type { RitualDTO } from "@/lib/zagovory";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { OrnamentDivider } from "./ornaments";
import {
  Clock,
  MapPin,
  Compass,
  Users,
  Library,
  Flame,
  Hammer,
  X,
  ListOrdered,
  FlagTriangleRight,
  Ban,
  ScrollText,
} from "lucide-react";

export function RitualDialog({
  ritual,
  onClose,
  onOpenCharm,
}: {
  ritual: RitualDTO | null;
  onClose: () => void;
  onOpenCharm: (slug: string) => void;
}) {
  useEffect(() => {
    if (ritual) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [ritual]);

  return (
    <Dialog open={Boolean(ritual)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-3xl max-h-[88vh] overflow-y-auto scroll-warm bg-[oklch(0.965_0.018_84)] p-0"
      >
        {ritual && (
          <div className="px-6 sm:px-8 py-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{ritual.kind}</Badge>
              <span className="font-old italic text-xs text-terra/80">{ritual.goal}</span>
            </div>
            <DialogTitle asChild>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-3 leading-tight">
                {ritual.name}
              </h2>
            </DialogTitle>
            <p className="text-muted-foreground mt-2">{ritual.summary}</p>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-3">
              <Library className="h-3.5 w-3.5 shrink-0 text-ochre" />
              {ritual.sourceRef}
            </p>

            <OrnamentDivider className="my-5" />

            {/* ---------- Суть обряда ---------- */}
            <section aria-label="Суть обряда">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                <Flame className="h-4 w-4" />
                Суть обряда
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/90">{ritual.essence}</p>
            </section>

            {/* ---------- Слово обряда (привязанный заговор) ---------- */}
            {ritual.charm && (
              <section className="mt-7" aria-label="Слово обряда">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                  <ScrollText className="h-4 w-4" />
                  Слово обряда — {ritual.charm.kind}
                </p>
                <div className="rounded-lg border-2 border-double border-[oklch(0.75_0.06_68)] bg-[oklch(0.955_0.028_80)] px-5 py-5 relative">
                  <p className="font-display text-lg sm:text-xl font-semibold text-ink">«{ritual.charm.title}»</p>
                  <p className="font-old italic text-xs text-terra/80 mt-1">{ritual.charm.purpose}</p>
                  <p className="font-old whitespace-pre-line text-[14px] sm:text-[15px] leading-relaxed text-[oklch(0.3_0.045_55)] mt-3.5">
                    {ritual.charm.originalText}
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenCharm(ritual.charm!.slug)}
                    className="gap-1.5 text-[13px]"
                  >
                    <ScrollText className="h-3.5 w-3.5" />
                    Открыть заговор целиком
                  </Button>
                  <p className="text-xs text-muted-foreground leading-snug">
                    Шепчется в ходе этого обряда — на тех шагах, где слово названо в описании.
                  </p>
                </div>
              </section>
            )}

            {/* ---------- Время и место ---------- */}
            <section className="mt-7 grid gap-3 sm:grid-cols-2" aria-label="Время и место проведения">
              <div className="rounded-md border border-border/60 bg-card/60 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2">
                  <Clock className="h-4 w-4" />
                  Время проведения
                </p>
                <p className="text-[13.5px] leading-relaxed text-foreground/85">{ritual.timeInfo}</p>
              </div>
              <div className="rounded-md border border-border/60 bg-card/60 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2">
                  <MapPin className="h-4 w-4" />
                  Место проведения
                </p>
                <p className="text-[13.5px] leading-relaxed text-foreground/85">{ritual.placeInfo}</p>
              </div>
              <div className="rounded-md border border-border/60 bg-card/60 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2">
                  <Compass className="h-4 w-4" />
                  Ориентация и движение
                </p>
                <p className="text-[13.5px] leading-relaxed text-foreground/85">{ritual.orientation}</p>
              </div>
              <div className="rounded-md border border-border/60 bg-card/60 p-4">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2">
                  <Users className="h-4 w-4" />
                  Участники и позы
                </p>
                <p className="text-[13.5px] leading-relaxed text-foreground/85">{ritual.actors}</p>
              </div>
            </section>

            <Separator className="my-6" />

            {/* ---------- Предметы и их расположение ---------- */}
            <section aria-label="Предметы и их расположение">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                <Hammer className="h-4 w-4" />
                Предметы и их расположение
              </p>
              <div className="space-y-2.5">
                {ritual.objects.map((o, i) => (
                  <div key={i} className="rounded-md border bg-card/60 p-3.5" style={{ borderLeft: "3px solid #7a5c2e" }}>
                    <p className="text-sm font-semibold text-ink">
                      {i + 1}. {o.name}
                    </p>
                    <p className="text-[13px] text-muted-foreground mt-1 leading-snug">
                      <span className="font-semibold text-foreground/70">Роль: </span>
                      {o.role}
                    </p>
                    <p className="text-[13px] text-muted-foreground mt-0.5 leading-snug">
                      <span className="font-semibold text-foreground/70">Расположение: </span>
                      {o.placement}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ---------- Порядок проведения ---------- */}
            <section className="mt-7" aria-label="Порядок проведения">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                <ListOrdered className="h-4 w-4" />
                Порядок проведения
              </p>
              <div className="space-y-2.5">
                {ritual.steps.map((s, i) => (
                  <div key={i} className="flex gap-3 rounded-md border bg-card/60 p-3.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[oklch(0.72_0.075_62)] font-display text-sm font-semibold text-ochre">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{s.title}</p>
                      <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ---------- Завершение ---------- */}
            <section className="mt-7" aria-label="Завершение обряда">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-moss mb-3">
                <FlagTriangleRight className="h-4 w-4" />
                Завершение обряда
              </p>
              <p className="text-[14.5px] leading-relaxed text-foreground/90 rounded-md bg-secondary/50 border border-border/60 p-4">
                {ritual.completion}
              </p>
            </section>

            <Separator className="my-6" />

            {/* ---------- Запреты ---------- */}
            <section aria-label="Запреты и предостережения">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-3">
                <Ban className="h-4 w-4" />
                Запреты и предостережения
              </p>
              <ul className="space-y-2">
                {ritual.prohibitions.map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-foreground/85">
                    <X className="h-4 w-4 shrink-0 mt-0.5 text-terra/80" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
