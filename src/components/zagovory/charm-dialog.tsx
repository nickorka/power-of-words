"use client";

import { useEffect, useState } from "react";
import type { CharmDTO } from "@/lib/zagovory";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrnamentDivider } from "./ornaments";
import {
  MapPin,
  CalendarDays,
  Library,
  Quote,
  Languages,
  ScrollText,
  Landmark,
  Eye,
  Flame,
  Clock,
  Compass,
  Users,
  Hammer,
  ListOrdered,
  FlagTriangleRight,
  Ban,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const STRUCT_COLORS = ["#7a5c2e", "#8a6a2f", "#9c3f2a", "#a4552e", "#4a6b3f", "#5a6b3f"];

export function CharmDialog({ charm, onClose }: { charm: CharmDTO | null; onClose: () => void }) {
  // Ритуал проведения развёрнут по умолчанию: это часть самой записи заговора
  const [ritualOpen, setRitualOpen] = useState(true);
  const [lastSlug, setLastSlug] = useState<string | null>(null);
  if ((charm?.slug ?? null) !== lastSlug) {
    setLastSlug(charm?.slug ?? null);
    setRitualOpen(true); // при открытии нового заговора ритуал снова развёрнут
  }

  useEffect(() => {
    if (charm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [charm]);

  return (
    <Dialog open={Boolean(charm)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-3xl max-h-[88vh] overflow-y-auto scroll-warm bg-[oklch(0.965_0.018_84)] p-0"
      >
        {charm && (
          <div className="px-6 sm:px-8 py-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{charm.kind}</Badge>
              <Badge variant="outline">{charm.category.name}</Badge>
              {charm.category.oldName && (
                <span className="font-old italic text-xs text-terra/80">{charm.category.oldName}</span>
              )}
            </div>
            <DialogTitle asChild>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-3 leading-tight">
                {charm.title}
              </h2>
            </DialogTitle>
            <p className="text-muted-foreground mt-2">{charm.purpose}. {charm.summary}</p>

            <div className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              <p className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-ochre" />
                {charm.region}
              </p>
              <p className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5 shrink-0 text-ochre" />
                {charm.dating}
              </p>
              <p className="flex items-center gap-1.5">
                <Library className="h-3.5 w-3.5 shrink-0 text-ochre" />
                {charm.sourceRef}
              </p>
            </div>

            <OrnamentDivider className="my-5" />

            {/* ---------- Оригинал ---------- */}
            <section aria-label="Оригинальный текст">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                <ScrollText className="h-4 w-4" />
                Оригинальный текст
              </p>
              <div className="rounded-lg border-2 border-double border-[oklch(0.75_0.06_68)] bg-[oklch(0.955_0.028_80)] px-5 sm:px-7 py-6 relative">
                <Quote className="absolute top-3 right-4 h-5 w-5 text-[oklch(0.75_0.06_68)] opacity-60" />
                <p className="font-old whitespace-pre-line text-[15px] sm:text-base leading-relaxed text-[oklch(0.3_0.045_55)]">
                  {charm.originalText}
                </p>
              </div>
              {charm.originalNote && (
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  <span className="font-semibold text-foreground/70">О орфографии: </span>
                  {charm.originalNote}
                </p>
              )}
            </section>

            {/* ---------- Разбор структуры ---------- */}
            <section className="mt-7" aria-label="Разбор структуры">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                <Eye className="h-4 w-4" />
                Разбор структуры
              </p>
              <div className="space-y-2.5">
                {charm.structureParts.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-md border bg-card/60 p-3.5"
                    style={{ borderLeft: `3px solid ${STRUCT_COLORS[i % STRUCT_COLORS.length]}` }}
                  >
                    <p className="text-sm font-semibold" style={{ color: STRUCT_COLORS[i % STRUCT_COLORS.length] }}>
                      {p.label}
                    </p>
                    <p className="font-old italic text-[13px] text-foreground/80 mt-1 leading-snug">«{p.text}»</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{p.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ---------- Перевод ---------- */}
            <section className="mt-7" aria-label="Перевод на современный русский">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                <Languages className="h-4 w-4" />
                Современный перевод
              </p>
              <p className="text-[15px] leading-relaxed text-foreground/90 rounded-md bg-secondary/50 border border-border/60 p-4">
                {charm.translation}
              </p>
            </section>

            {/* ---------- Ритуал проведения заговора ---------- */}
            {charm.ritual && (
              <section className="mt-7" aria-label="Ритуал проведения заговора">
                <div className="rounded-lg border-2 border-[oklch(0.72_0.075_62)] bg-[oklch(0.955_0.028_80)] p-4 sm:p-5">
                  <button
                    onClick={() => setRitualOpen((v) => !v)}
                    className="w-full flex items-start justify-between gap-3 text-left focus-visible:outline-2 focus-visible:outline-ochre rounded"
                    aria-expanded={ritualOpen}
                  >
                    <span>
                      <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre">
                        <Flame className="h-4 w-4" />
                        Ритуал проведения заговора
                      </span>
                      <span className="block font-display text-xl font-semibold text-ink mt-1.5">
                        {charm.ritual.name}
                      </span>
                      <span className="block text-sm text-muted-foreground mt-1 leading-relaxed">
                        {charm.ritual.goal}. {charm.ritual.summary}
                      </span>
                      <span className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 shrink-0 text-ochre" />
                          {charm.ritual.timeShort}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-ochre" />
                          {charm.ritual.placeShort}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 mt-0.5 text-ochre">
                      {ritualOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </span>
                  </button>

                  {ritualOpen && (
                    <div className="mt-4 space-y-5">
                      {/* Суть обряда */}
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-2">
                          <Flame className="h-3.5 w-3.5" />
                          Суть обряда
                        </p>
                        <p className="text-[14.5px] leading-relaxed text-foreground/90">{charm.ritual.essence}</p>
                      </div>

                      {/* Время, место, ориентация, участники */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-md border border-border/60 bg-card/70 p-3.5">
                          <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            Время проведения
                          </p>
                          <p className="text-[13px] leading-relaxed text-foreground/85">{charm.ritual.timeInfo}</p>
                        </div>
                        <div className="rounded-md border border-border/60 bg-card/70 p-3.5">
                          <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-1.5">
                            <MapPin className="h-3.5 w-3.5" />
                            Место проведения
                          </p>
                          <p className="text-[13px] leading-relaxed text-foreground/85">{charm.ritual.placeInfo}</p>
                        </div>
                        <div className="rounded-md border border-border/60 bg-card/70 p-3.5">
                          <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-1.5">
                            <Compass className="h-3.5 w-3.5" />
                            Ориентация и движение
                          </p>
                          <p className="text-[13px] leading-relaxed text-foreground/85">{charm.ritual.orientation}</p>
                        </div>
                        <div className="rounded-md border border-border/60 bg-card/70 p-3.5">
                          <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-1.5">
                            <Users className="h-3.5 w-3.5" />
                            Участники и позы
                          </p>
                          <p className="text-[13px] leading-relaxed text-foreground/85">{charm.ritual.actors}</p>
                        </div>
                      </div>

                      <Separator className="opacity-70" />

                      {/* Предметы и их расположение */}
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                          <Hammer className="h-3.5 w-3.5" />
                          Предметы и их расположение
                        </p>
                        <div className="space-y-2.5">
                          {charm.ritual.objects.map((o, i) => (
                            <div key={i} className="rounded-md border bg-card/70 p-3.5" style={{ borderLeft: "3px solid #7a5c2e" }}>
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
                      </div>

                      {/* Порядок проведения */}
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ochre mb-3">
                          <ListOrdered className="h-3.5 w-3.5" />
                          Порядок проведения
                        </p>
                        <div className="space-y-2.5">
                          {charm.ritual.steps.map((s, i) => (
                            <div key={i} className="flex gap-3 rounded-md border bg-card/70 p-3.5">
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
                      </div>

                      {/* Завершение обряда */}
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-moss mb-2">
                          <FlagTriangleRight className="h-3.5 w-3.5" />
                          Завершение обряда
                        </p>
                        <p className="text-[14px] leading-relaxed text-foreground/90 rounded-md bg-secondary/50 border border-border/60 p-3.5">
                          {charm.ritual.completion}
                        </p>
                      </div>

                      {/* Запреты */}
                      <div>
                        <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2.5">
                          <Ban className="h-3.5 w-3.5" />
                          Запреты и предостережения
                        </p>
                        <ul className="space-y-1.5">
                          {charm.ritual.prohibitions.map((p, i) => (
                            <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-foreground/85">
                              <X className="h-3.5 w-3.5 shrink-0 mt-0.5 text-terra/80" aria-hidden="true" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Library className="h-3.5 w-3.5 shrink-0 text-ochre" />
                        {charm.ritual.sourceRef}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            <Separator className="my-6" />

            {/* ---------- Три разбора ---------- */}
            <section className="space-y-6" aria-label="Комментарий">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2">
                  <ScrollText className="h-4 w-4" />
                  Лингвистический комментарий
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground/90">{charm.linguisticNote}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2">
                  <Landmark className="h-4 w-4" />
                  Историческая справка
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground/90">{charm.historicalNote}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-terra mb-2">
                  <Eye className="h-4 w-4" />
                  Символический ключ
                </p>
                <p className="text-[14.5px] leading-relaxed text-foreground/90">{charm.symbolicNote}</p>
              </div>
            </section>

            {/* ---------- Ключевые слова ---------- */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {charm.keywords.map((k) => (
                <Badge key={k} variant="secondary" className="text-[11px] font-normal text-muted-foreground">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
