"use client";

import { useState } from "react";
import type { AppData } from "@/lib/zagovory";
import { OrnamentDivider } from "../ornaments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

/* ---------- Данные разделов ---------- */

const COMPOSITION = [
  {
    label: "Зачин",
    color: "#7a5c2e",
    text: "«Встану я, раб Божий (имярек), благословясь, пойду перекрестясь, из избы дверьми, из двора воротами, в чистое поле…»",
    note: "Канонический «прогулочный» зачин описывает переход из мира людей в пространство силы: три порога (изба — двор — поле) преодолеваются с молитвенным знаком. Существовал и «морской» зачин, начинавшийся сразу с сакральной локации: «На море на Окияне, на острове на Буяне…». Зачин не декорация: без правильного входа формула считалась «не запертой».",
  },
  {
    label: "Эпический центр",
    color: "#8a6a2f",
    text: "«…стоит дуб Керет; на дубе Керете восседает Иоанн Богослов: зрел он на Иордан-реку…»",
    note: "Середина заговора — развёрнутая картина: локация (Буян, дуб, гора, заря) и персонаж (святой, заря-девица, кузнец, зверь-помощник). В поэтике заговора это тот же эпический стиль, что в былине, только сжатый до трёх-пяти строк. Центр задаёт «сцену», на которой разыгрывается заклинание.",
  },
  {
    label: "Заклинание",
    color: "#9c3f2a",
    text: "«Как у дуба сучья не кровоточат — так бы и у раба Божия кровь не лилась…»",
    note: "Действующая часть: три главных приёма — приказ («иди, лихорадка, в чистое поле»), уподобление («как …, так бы …») и перенос («с головы — в туловище, из ног — в землю»). Ряд синонимов-названий хвори («сглаз, призор, очижу, урок») обеспечивает «полноту охвата»: болезнь заклинается во всех своих именах.",
  },
  {
    label: "Закрепка",
    color: "#4a6b3f",
    text: "«Будьте, мои слова, крепки и лепки: ключ — небо, замок — земля. Аминь»",
    note: "Финальная печать: слова «прикрепляются» к вечным опорам (небо, земля, океан-камень, дерево). Пара «ключ — замок» запирает формулу от выдыхания и перебивания. Вариант закрепки — троекратное «аминь» или звуковые формулы вроде «туру-туру».",
  },
];

const LINGUISTIC = [
  {
    title: "Перформативность",
    text: "Главная грамматическая особенность жанра: высказывание равно действию. Форма повеления или «описа­ние уже свершившегося» («стал я, благословясь») не передаёт сообщение, а творит положение дел. Отсюда настойчивое настоящее-будущее время заклинаний.",
  },
  {
    title: "Параллелизм и отрицательный параллелизм",
    text: "Строки заговора идут парами с одинаковым синтаксисом («как свекровь невестку — так и болезнь хворь»). Отрицательная разновидность («не сестра, не сватья — не давай хвори») отказывает демону в социальном родстве — древнейший юридический приём.",
  },
  {
    title: "Магия подобия («как… — так бы…»)",
    text: "Состояние образца переносится на человека: непротекаемость дуба — на кровь, чистота зари — на лицо, свет солнышка — на очи. Это языковое ядро симпатической магии, общий пласт всех индоевропейских заговоров.",
  },
  {
    title: "Постоянные эпитеты и цветовой код",
    text: "Море-Окиян, дуб булатный, заря красная, месяц серебряный, поле чистое — формульные эпитеты, как в былине. Металлы и цвета работают как код: золото и серебро — чистота и здоровье, красное — одновременно сила жизни и огонь болезни, синее и зелёное — холодные дали, куда уводят хворь.",
  },
  {
    title: "Сакральная арифметика",
    text: "Три зари, двенадцать сестёр-трясовиц, семьдесят семь ветров, сорок мольбов. Числа организуют повтор обряда (трижды шепнуть) и описывают «хоры» демонов, которых заклинают поимённо.",
  },
  {
    title: "Архаическая лексика",
    text: "«Лепки» (липкие), «скредета» (зубная боль), «потягота» (тянущая боль), «руда» (кровь), «очижа» (сглаз), «гой еси» (величание) — словарь заговора консервативнее любого другого фольклорного жанра и хранит слова, умершие в живой речи столетия назад.",
  },
  {
    title: "Ритм, аллитерация, звукопись",
    text: "Заговор — стих в зачатке: синтаксический параллелизм создаёт ритм, аллитерации («жгучая ломость — жало не жгло») имитируют звуки мира болезни (шипение змеи, стук молота). Ритм помогал шёпотному исполнению и запоминанию.",
  },
  {
    title: "Формулы вставки имени",
    text: "«Имярек» и «(имя)» — слоты для имени больного: текст формульный по устройству, как юридический бланк. Само имя в магии было частью личности, потому его произнесение — необходимое условие переноса силы.",
  },
];

const MAGIC = [
  {
    title: "Магия подобия",
    text: "Закон «подобное творит подобное»: здоровый образец (вечный дуб, чистая заря, кованый конь) через слово «заражает» человека здоровьем. Конструкция «как …, так бы …» — грамматическая машина этого закона.",
  },
  {
    title: "Магия переноса",
    text: "Болезнь — вещь: её можно снять, скатить, унести, закопать. Формулы описывают маршрут переноса: с головы — в ноги, из ног — в землю, из земли — в болото, за ворота. Конечные станции — всегда вне мира людей.",
  },
  {
    title: "Договорная магия",
    text: "С силами вступают в словесный договор, как с соседями: у них просят, их величают, им определяют «место жительства» («там тебе жить-быть, там курить-печь топить»). Контактные формулы «не сестра, не сватья» отказывают в родстве, чтобы демон не имел прав на человека.",
  },
  {
    title: "Печать и замок",
    text: "Произнесённое «закрепляется»: ключ — небо, замок — земля. Без печати слово считалось «дырявым»: его могли выдыханием, зевком или чужим вмешательством размыкать. Закрепка — грамматика собственности: заговор «принадлежит» исполнителю.",
  },
  {
    title: "Окликание по имени",
    text: "Знание точного имени хвори (огненица, коркуша, желтуха) даёт власть над ней: демона болезни заклинают, как свидетеля в суде, поимённо. Отсюда энциклопедические списки лихорадок в северных заговорах.",
  },
  {
    title: "Время и место исполнения",
    text: "Сила слова зависела от часа: заря, молодой месяц, Чистый четверг, полночь. Место — порог, печная труба, перекрёсток, берег: границы миров, где слово слышно обеим сторонам.",
  },
];

export function AnalysisView({ data }: { data: AppData }) {
  const [tab, setTab] = useState("composition");

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <OrnamentDivider />
      <h1 className="font-display text-4xl font-semibold text-ink mt-4">Разбор традиции</h1>
      <p className="text-muted-foreground mt-2 max-w-3xl">
        Пять взглядов на заговор как на памятник языка, истории и народной картины мира —
        плюс канон, по которому слово обращали в действие.
        Раздел опирается на материалы антологии и классические исследования XIX–XXI веков.
      </p>

      <Tabs value={tab} onValueChange={setTab} className="mt-8">
        <TabsList className="flex-wrap h-auto gap-1 bg-secondary/60 p-1">
          <TabsTrigger value="composition">Композиция</TabsTrigger>
          <TabsTrigger value="language">Язык заговора</TabsTrigger>
          <TabsTrigger value="chronology">Хронология</TabsTrigger>
          <TabsTrigger value="magic">Логика магии</TabsTrigger>
          <TabsTrigger value="canon">Канон обряда</TabsTrigger>
        </TabsList>

        {/* ---------- Композиция ---------- */}
        <TabsContent value="composition" className="mt-6">
          <p className="text-[15px] leading-relaxed text-foreground/90 max-w-4xl mb-6">
            Композиция русского заговора четырёхчастна и узнаваема от древнейших рукописей до записей
            XX века. Каждая часть решает свою задачу: вход, сцена, действие, печать. Разберём канон
            на примере типовых формул из корпуса.
          </p>
          <div className="space-y-4 max-w-4xl">
            {COMPOSITION.map((c, i) => (
              <Card key={c.label} className="border-border/70 bg-card/70">
                <CardContent className="p-5" style={{ borderLeft: `3px solid ${c.color}` }}>
                  <p className="font-display text-xl font-semibold" style={{ color: c.color }}>
                    {i + 1}. {c.label}
                  </p>
                  <p className="font-old italic text-[14px] text-foreground/80 mt-2">{c.text}</p>
                  <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed">{c.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ---------- Язык ---------- */}
        <TabsContent value="language" className="mt-6">
          <p className="text-[15px] leading-relaxed text-foreground/90 max-w-4xl mb-6">
            Заговорный язык — древнейший пласт русской словесности, родственный и былинному стиху,
            и юридической формуле. Восемь его ключевых свойств:
          </p>
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
            {LINGUISTIC.map((l, i) => (
              <Card key={l.title} className="border-border/70 bg-card/70">
                <CardContent className="p-5">
                  <p className="font-display text-lg font-semibold text-ink">
                    {i + 1}. {l.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{l.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ---------- Хронология ---------- */}
        <TabsContent value="chronology" className="mt-6">
          <p className="text-[15px] leading-relaxed text-foreground/90 max-w-4xl mb-6">
            Пять эпох одной традиции: от формул старше письменности до академических корпусов
            XXI века. Судьба заговора — это история русской культуры в миниатюре.
          </p>
          <div className="max-w-4xl">
            {data.eras.map((e, i) => (
              <div key={e.id} className="relative pl-10 pb-8 last:pb-0">
                {i < data.eras.length - 1 && (
                  <span className="absolute left-[13px] top-7 bottom-0 w-px bg-border" aria-hidden="true" />
                )}
                <span className="absolute left-0 top-1.5 h-7 w-7 rounded-full border-2 border-ochre bg-card flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-ochre" aria-hidden="true" />
                </span>
                <p className="font-display text-xl font-semibold text-terra">{e.years}</p>
                <p className="font-semibold text-ink">{e.title}</p>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-3xl">{e.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ---------- Логика магии ---------- */}
        <TabsContent value="magic" className="mt-6">
          <p className="text-[15px] leading-relaxed text-foreground/90 max-w-4xl mb-6">
            За образами заговора стоит строгая «внутренняя механика» — набор правил, по которым
            народное сознание связывало слово, вещь и болезнь. Шесть её законов:
          </p>
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
            {MAGIC.map((m, i) => (
              <Card key={m.title} className="border-border/70 bg-card/70">
                <CardContent className="p-5">
                  <p className="font-display text-lg font-semibold text-ink">
                    {i + 1}. {m.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ---------- Канон обряда ---------- */}
        <TabsContent value="canon" className="mt-6">
          <p className="text-[15px] leading-relaxed text-foreground/90 max-w-4xl mb-6">
            Слово без обряда считалось «пустым»: заговор произносили в надлежащий час, в надлежащем
            месте, с надлежащими предметами — и запирали надлежащим порядком. Полное проведение
            каждого обряда раскрыто в записи его заговора; ниже — шесть общих устоёв канона,
            общих всей традиции.
          </p>
          <div className="grid gap-4 md:grid-cols-2 max-w-4xl">
            {data.ritualRules.map((r) => (
              <Card key={r.slug} className="border-border/70 bg-card/70">
                <CardContent className="p-5">
                  <p className="font-display text-lg font-semibold text-ink">
                    <span className="text-ochre mr-2" aria-hidden="true">{r.glyph}</span>
                    {r.title}
                  </p>
                  <p className="font-old italic text-[13px] text-terra/80 mt-1">{r.shortText}</p>
                  <ul className="mt-3 space-y-1.5">
                    {r.details.map((d, i) => (
                      <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-muted-foreground">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rotate-45 bg-ochre/70" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
