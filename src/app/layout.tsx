import type { Metadata } from "next";
import { Cormorant, PT_Serif, Old_Standard_TT, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const ptSerif = PT_Serif({
  variable: "--font-ptserif",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const oldStandard = Old_Standard_TT({
  variable: "--font-oldstandard",
  subsets: ["cyrillic", "latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Слово оберегающее — Заговорная традиция Древней Руси",
  description:
    "Образовательная веб-база народных целительных заговоров, присушек и отсушек Древней Руси: оригинальные тексты, переводы, лингвистический, исторический и символический разбор.",
  keywords: [
    "заговоры",
    "Древняя Русь",
    "славянское язычество",
    "народная медицина",
    "этнолингвистика",
    "фольклор",
    "присуха",
    "отсуда",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${ptSerif.variable} ${cormorant.variable} ${oldStandard.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
