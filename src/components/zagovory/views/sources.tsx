"use client";

import type { AppData } from "@/lib/zagovory";
import { OrnamentDivider } from "../ornaments";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export function SourcesView({ data }: { data: AppData }) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <OrnamentDivider />
      <h1 className="font-display text-4xl font-semibold text-ink mt-4">Источники и литература</h1>
      <p className="text-muted-foreground mt-2 max-w-3xl">
        Тексты антологии приводятся по классическим этнографическим сводам XIX века с лёгкой
        нормализацией орфографии и пунктуации; часть записей дана как сводные варианты типовых
        формул. Научные толкования опираются на исследования фольклористики и этнолингвистики.
      </p>

      <div className="mt-8 space-y-3 max-w-4xl">
        {data.sources.map((s) => (
          <Card key={s.id} className="border-border/70 bg-card/70">
            <CardContent className="p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-ink">{s.author}</p>
                <p className="font-display text-sm text-terra">{s.year}</p>
              </div>
              <p className="font-display text-lg text-foreground/90 mt-0.5 italic">{s.title}</p>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Оговорка */}
      <div className="mt-8 max-w-4xl rounded-lg border-2 border-dashed border-terra/40 bg-terra/5 p-5">
        <p className="flex items-center gap-2 font-display text-lg font-semibold text-terra">
          <AlertTriangle className="h-5 w-5" />
          О назначении материала
        </p>
        <div className="mt-2 space-y-2 text-sm text-foreground/85 leading-relaxed">
          <p>
            Этот корпус — образовательный ресурс по истории русского языка, фольклористике
            и культурной антропологии. Заговоры публикуются как памятники словесности и народных
            представлений о болезни, а не как руководство к действию.
          </p>
          <p>
            Народные объяснения болезней (порча, сглаз, демоны-лихорадки) принадлежат своей эпохе
            и не соответствуют современным медицинским знаниям. При проблемах со здоровьем
            обращайтесь к врачу. Личностные формулы (присушки, отсушки) приведены исключительно
            как материал по истории эмоциональной лексики и обрядовой поэтики.
          </p>
        </div>
      </div>
    </div>
  );
}
