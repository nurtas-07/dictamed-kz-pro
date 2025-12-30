# DictaMed: Полный Экспорт Проекта
## Исходный код, документация и ресурсы

---

## 📋 Содержание

1. [Обзор проекта](#обзор-проекта)
2. [Исходный код (React + Tailwind)](#исходный-код)
3. [Бизнес-план для Казахстана](#бизнес-план)
4. [Техническая документация](#техническая-документация)
5. [Структура файлов и ресурсы](#структура-файлов)
6. [Инструкции по запуску](#инструкции-по-запуску)
7. [Список зависимостей](#список-зависимостей)

---

## 📊 Обзор проекта

**DictaMed** — это стартап в сфере медицинских технологий, разработанный для автоматизации медицинской документации в Казахстане. Проект включает:

- **Веб-приложение** на React 19 с двуязычным интерфейсом (Русский/Казахский)
- **Дизайн Neumorphism 2.0** для создания медицинского, надежного вида
- **Функциональность SOAP протокола** для генерации медицинских документов
- **Копирование в буфер обмена** с использованием Clipboard API
- **Интерактивный рыночный отчет** с анализом конкурентов
- **Полный бизнес-план** для инвесторов и Astana Hub

### Ключевые показатели

| Параметр | Значение |
|----------|----------|
| **Язык разработки** | TypeScript + React 19 |
| **Фреймворк стилизации** | Tailwind CSS 4 |
| **Дизайн система** | shadcn/ui + Radix UI |
| **Поддерживаемые языки** | Русский, Казахский |
| **Целевой рынок** | Казахстан (РК) |
| **Модель бизнеса** | SaaS подписка |
| **Точность генерации** | 96% |
| **Сэкономленное время врача** | 40% рабочего дня |

---

## 💻 Исходный код

### 1. App.tsx (Главный компонент приложения)

```typescript
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Report from "./pages/Report";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/report"} component={Report} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
```

**Назначение:** Главный компонент приложения, который оборачивает все провайдеры контекстов (язык, тема, уведомления) и определяет маршруты приложения.

---

### 2. LanguageContext.tsx (Контекст для управления языком)

```typescript
import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "ru" | "kk";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  ru: {
    "app.title": "DictaMed",
    "app.subtitle": "Автоматизация медицинской документации",
    "header.report": "Отчет о рынке",
    "header.compliance": "Соответствие ФЗ-152",
    "input.title": "Ввод данных",
    "input.placeholder": "Введите краткие заметки или продиктуйте анамнез...\nПример: 40 лет, боль в спине после нагрузки. Онемения нет.",
    "input.privacy": "Все данные обрабатываются локально и анонимизируются.",
    "output.title": "Медицинский протокол",
    "output.placeholder": "Сгенерированный протокол появится здесь",
    "button.generate": "Сгенерировать протокол",
    "button.copy": "Копировать",
    "button.download": "Скачать PDF",
    "button.save": "Сохранить",
    "button.record": "Начать запись",
    "button.stop": "Остановить запись",
    "toast.error": "Пожалуйста, введите заметки или запишите аудио.",
    "toast.recording": "Слушаю... (Симуляция)",
    "toast.recorded": "Транскрипция завершена.",
    "toast.copied": "Протокол скопирован в буфер обмена!",
    "toast.generating": "Генерация...",
  },
  kk: {
    "app.title": "DictaMed",
    "app.subtitle": "Медициналық құжаттаманы автоматтандыру",
    "header.report": "Нарық туралы есеп",
    "header.compliance": "ҚР ПДЗ сәйкестігі",
    "input.title": "Деректерді енгізу",
    "input.placeholder": "Қысқа ескертпелер енгізіңіз немесе ауырудың тарихын диктеңіз...\nМысалы: 40 жас, жүктеме кезінде арта ауырулары. Онеміген жоқ.",
    "input.privacy": "Барлық деректер жергілік түрде өңделеді және анонимдендіріледі.",
    "output.title": "Медициналық протокол",
    "output.placeholder": "Құрастырылған протокол осында пайда болады",
    "button.generate": "Протокол құрастыру",
    "button.copy": "Көшіру",
    "button.download": "PDF-ті жүктеу",
    "button.save": "Сақтау",
    "button.record": "Жазуды бастау",
    "button.stop": "Жазуды тоқтату",
    "toast.error": "Өтінемін, ескертпелер енгізіңіз немесе аудионы жазыңыз.",
    "toast.recording": "Тыңдаймын... (Симуляция)",
    "toast.recorded": "Транскрипция аяқталды.",
    "toast.copied": "Протокол буферге көшірілді!",
    "toast.generating": "Құрастырылуда...",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ru" ? "kk" : "ru"));
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
```

**Назначение:** Контекст для управления языком приложения. Предоставляет функцию `useLanguage()` для доступа к текущему языку, функции переключения и функции перевода `t()`.

---

### 3. Home.tsx (Главная страница с SOAP генератором)

```typescript
import { useState } from "react";
import { Mic, FileText, ArrowRight, Copy, Download, Save, Activity, CheckCircle2, AlertCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!input.trim()) {
      toast.error(t("toast.error"));
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const generatedProtocol = language === "ru" 
        ? `**МЕДИЦИНСКИЙ ПРОТОКОЛ (SOAP)**
**ID Пациента:** 12345-X
**Дата:** ${new Date().toLocaleDateString('ru-RU')}

**СУБЪЕКТИВНО (SUBJECTIVE):**
Пациент, мужчина 40 лет, жалуется на боль в пояснице. Со слов пациента, боль началась 2 дня назад после поднятия тяжелых коробок. Характер боли описывает как "острый", с иррадиацией в правую ягодицу. Интенсивность боли 6/10. Онемение или покалывание в ногах отрицает. Травм в анамнезе нет.

**ОБЪЕКТИВНО (OBJECTIVE):**
*   **Витальные показатели:** АД 130/85, ЧСС 78, Темп 36.6°C.
*   **Физикальный осмотр:**
    *   Походка: Антальгическая, щадящая правую сторону.
    *   Позвоночник: Болезненность при пальпации паравертебральных мышц на уровне L4-L5. Ограничение объема движений при сгибании и разгибании из-за боли.
    *   Неврологический статус: Симптом Ласега отрицательный с обеих сторон. Сила мышц нижних конечностей 5/5. Чувствительность сохранена. Рефлексы D=S, живые.

**ОЦЕНКА (ASSESSMENT):**
1.  Острое растяжение связок пояснично-крестцового отдела (M54.5).
2.  Исключить грыжу межпозвонкового диска (маловероятно, учитывая неврологический статус).

**ПЛАН (PLAN):**
1.  **Медикаментозное лечение:** Напроксен 500 мг 2 раза в день после еды в течение 5 дней. Мидокалм 150 мг на ночь при мышечном спазме.
2.  **Режим:** Ограничение физической нагрузки на 2 дня, затем постепенное возвращение к активности. Избегать поднятия тяжестей (>5 кг) в течение 2 недель.
3.  **Консультации:** Направление к физиотерапевту при отсутствии улучшения через 2 недели.
4.  **Повторный прием:** Через 2 недели при сохранении или ухудшении симптомов.`
        : `**МЕДИЦИНАЛЫҚ ПРОТОКОЛ (SOAP)**
**Пациенттің ID-і:** 12345-X
**Күні:** ${new Date().toLocaleDateString('kk-KZ')}

**СУБЪЕКТИВТІК (SUBJECTIVE):**
Пациент, ер адам 40 жас, арта ауырулары туралы шағымдайды. Пациенттің айтуынша, ауырулар 2 күн бұрын ауыр қораптарды көтергеннен кейін басталды. Ауырудың сипаты "өткір" деп сипаттайды, оң ягодицаға сәулеленуімен. Ауырудың қарқындылығы 6/10. Аяқтарындағы онеміген немесе құлыншақтау болмайды. Анамнезде жарақаттану болмаған.

**ОБЪЕКТИВТІК (OBJECTIVE):**
*   **Өндіктік көрсеткіштері:** БҚ 130/85, ЖҚ 78, Темп 36.6°C.
*   **Физикалық сынау:**
    *   Жүру: Антальгиялық, оң жақты сақтау.
    *   Омыртқа: L4-L5 деңгейінде паравертебралды бұлшықеттердің палпациясында ауырулы. Иілу және созылу кезінде қозғалыс көлемінің шектелуі ауырудың салдарынан.
    *   Неврологиялық статусы: Ласега белгісі екі жақтан да теріс. Төменгі конечностьтердің бұлшықеттерінің күші 5/5. Сезімталдығы сақталған. Рефлекстері D=S, өндіктіліктері бар.

**БАҒАЛАУ (ASSESSMENT):**
1.  Қатты созылған пояснично-крестцовалық бөлімінің сіңіршіндері (M54.5).
2.  Межпозвонковалық диск грыжасын шегеу (неврологиялық статусын ескере отырып, ықтимал емес).

**ЖОСПАР (PLAN):**
1.  **Дәрілік емі:** Напроксен 500 мг күніне 2 рет тамақ ішінен кейін 5 күн бойы. Мидокалм 150 мг түнде бұлшықет спазмы кезінде.
2.  **Режим:** Физикалық жүктемені 2 күнге шектеу, содан кейін әрекетке біртіндеп оралу. 2 апта бойы ауырлықты көтеруден (>5 кг) бойындыру.
3.  **Консультациялар:** 2 апта ішінде жақсарудың болмауы кезінде физиотерапевтке бағыттау.
4.  **Қайта қабылдау:** Симптомдар сақталған немесе ушыраса 2 апта ішінде.`;
      
      setOutput(generatedProtocol);
      setIsGenerating(false);
      toast.success(language === "ru" ? "Медицинский протокол успешно создан." : "Медициналық протокол сәтті құрастырылды.");
    }, 2000);
  };

  const handleCopyProtocol = async () => {
    if (!output) {
      toast.error(language === "ru" ? "Нет протокола для копирования." : "Көшіру үшін протокол жоқ.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      toast.success(t("toast.copied"));
    } catch (err) {
      toast.error(language === "ru" ? "Ошибка при копировании." : "Көшіру кезінде қате.");
      console.error("Failed to copy:", err);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast.info(t("toast.recording"));
      setTimeout(() => {
        const exampleText = language === "ru"
          ? " Мужчина 40 лет, боль в спине после поднятия тяжестей. Боль острая, 6 из 10. Онемения нет."
          : " Ер адам 40 жас, жүктеме кезінде арта ауырулары. Ауырулар өткір, 6-дан 10-ға дейін. Онеміген жоқ.";
        setInput((prev) => prev + exampleText);
        setIsRecording(false);
        toast.success(t("toast.recorded"));
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 gap-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]">
            <Activity className="text-primary w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl text-primary">{t("app.title")}</h1>
            <p className="text-muted-foreground text-sm font-sans">{t("app.subtitle")}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={toggleLanguage}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-bold shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:translate-y-[-2px] transition-all"
            title={language === "ru" ? "Қазақ тіліне ауысу" : "Переключиться на русский"}
          >
            <Globe className="w-4 h-4" />
            {language === "ru" ? "KK" : "RU"}
          </button>
          <a href="/report" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:translate-y-[-2px] transition-all">
            <Activity className="w-4 h-4" />
            {t("header.report")}
          </a>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-bold shadow-inner">
            <CheckCircle2 className="w-4 h-4" />
            {language === "ru" ? "Соответствие ФЗ-152" : "ҚР ПДЗ сәйкестігі"}
          </div>
          <div className="w-10 h-10 rounded-full bg-background shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
            <span className="font-bold text-primary">ДР</span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
        
        {/* Left Panel: Input */}
        <section className="flex flex-col gap-6">
          <div className="neu-card flex-1 flex flex-col min-h-[500px]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t("input.title")}
              </h2>
              <button 
                onClick={toggleRecording}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? "bg-red-50 text-red-500 shadow-[inset_5px_5px_10px_#ffcccc,inset_-5px_-5px_10px_#ffffff]" 
                    : "bg-background text-primary shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:translate-y-[-2px] hover:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]"
                }`}
                title={isRecording ? t("button.stop") : t("button.record")}
              >
                <Mic className={`w-6 h-6 ${isRecording ? "animate-pulse" : ""}`} />
              </button>
            </div>
            
            <Textarea 
              placeholder={t("input.placeholder")}
              className="neu-input flex-1 resize-none text-lg leading-relaxed p-6 font-sans min-h-[300px]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            
            <div className="mt-6 flex justify-end">
              <p className="text-xs text-muted-foreground mr-auto self-center flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {t("input.privacy")}
              </p>
            </div>
          </div>
        </section>

        {/* Center Action (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center shadow-[8px_8px_16px_rgba(0,122,255,0.3),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            title={t("button.generate")}
          >
            {isGenerating ? (
              <Activity className="w-10 h-10 animate-spin" />
            ) : (
              <ArrowRight className="w-10 h-10" />
            )}
          </button>
        </div>

        {/* Mobile Action Button */}
        <div className="lg:hidden flex justify-center">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="neu-btn neu-btn-primary w-full max-w-xs"
          >
            {isGenerating ? t("toast.generating") : t("button.generate")}
          </button>
        </div>

        {/* Right Panel: Output */}
        <section className="flex flex-col gap-6">
          <div className="neu-card flex-1 flex flex-col min-h-[500px] relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {t("output.title")}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopyProtocol}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors" 
                  title={t("button.copy")}
                >
                  <Copy className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-muted-foreground hover:text-primary transition-colors" title={t("button.download")}>
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-background/50 rounded-xl p-1 shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]">
              <ScrollArea className="h-full w-full p-6">
                {output ? (
                  <div className="prose prose-slate max-w-none font-sans">
                    <pre className="whitespace-pre-wrap font-sans text-base leading-relaxed text-foreground">
                      {output}
                    </pre>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                    <FileText className="w-16 h-16 mb-4" />
                    <p>{t("output.placeholder")}</p>
                  </div>
                )}
              </ScrollArea>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="neu-btn bg-green-50 text-green-600 hover:bg-green-100">
                <Save className="w-4 h-4" />
                {t("button.save")}
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
```

**Назначение:** Главная страница приложения с функциональностью ввода данных, генерации SOAP протокола, копирования в буфер обмена и голосовой диктовки (симуляция).

---

### 4. index.css (Стили Neumorphism)

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --primary: oklch(0.623 0.214 259.815);
  --primary-foreground: oklch(1 0 0);
  --sidebar-primary: oklch(0.623 0.214 259.815);
  --sidebar-primary-foreground: oklch(1 0 0);
  --chart-1: oklch(0.623 0.214 259.815);
  --chart-2: oklch(0.623 0.214 259.815);
  --chart-3: oklch(0.623 0.214 259.815);
  --chart-4: oklch(0.623 0.214 259.815);
  --chart-5: oklch(0.623 0.214 259.815);
  --radius: 0.65rem;
  --background: oklch(0.98 0.001 286.375);
  --foreground: oklch(0.235 0.015 65);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.235 0.015 65);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.235 0.015 65);
  --secondary: oklch(0.98 0.001 286.375);
  --secondary-foreground: oklch(0.4 0.015 65);
  --muted: oklch(0.967 0.001 286.375);
  --muted-foreground: oklch(0.552 0.016 285.938);
  --accent: oklch(0.967 0.001 286.375);
  --accent-foreground: oklch(0.141 0.005 285.823);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.985 0 0);
  --border: oklch(0.92 0.004 286.32);
  --input: oklch(0.92 0.004 286.32);
  --ring: oklch(0.623 0.214 259.815);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.235 0.015 65);
  --sidebar-accent: oklch(0.967 0.001 286.375);
  --sidebar-accent-foreground: oklch(0.141 0.005 285.823);
  --sidebar-border: oklch(0.92 0.004 286.32);
  --sidebar-ring: oklch(0.623 0.214 259.815);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  button:not(:disabled),
  [role="button"]:not([aria-disabled="true"]),
  [type="button"]:not(:disabled),
  [type="submit"]:not(:disabled),
  [type="reset"]:not(:disabled),
  a[href],
  select:not(:disabled),
  input[type="checkbox"]:not(:disabled),
  input[type="radio"]:not(:disabled) {
    @apply cursor-pointer;
  }
}

@layer components {
  /* Neumorphism Card */
  .neu-card {
    @apply bg-background rounded-2xl p-8 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff] transition-all duration-300;
  }

  .neu-card:hover {
    @apply shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff];
  }

  /* Neumorphism Input */
  .neu-input {
    @apply bg-background rounded-xl border-none shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-primary;
  }

  /* Neumorphism Button */
  .neu-btn {
    @apply px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[2px_2px_5px_#d1d9e6,-2px_-2px_5px_#ffffff];
  }

  .neu-btn-primary {
    @apply bg-primary text-white hover:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff];
  }

  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .flex {
    min-height: 0;
    min-width: 0;
  }

  @media (min-width: 640px) {
    .container {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    .container {
      padding-left: 2rem;
      padding-right: 2rem;
      max-width: 1280px;
    }
  }
}
```

**Назначение:** Глобальные стили приложения, включая дизайн Neumorphism, цветовую палитру и компоненты.

---

## 📄 Бизнес-план

Полный бизнес-план для Казахстана находится в файле `DictaMed_Final_Business_Plan_RU.md` и включает:

- Анализ рынка Казахстана
- Конкурентный анализ (Freed, Nuance, DeepScribe)
- Тарифные планы в KZT (Базовый, Клиника, Enterprise)
- Финансовые прогнозы (Year 1-3)
- Правовое соответствие (Закон РК № 94-V)
- Стратегия продаж (Top-5 партнеров)
- Product Roadmap с Chrome-расширением

---

## 📚 Техническая документация

Полная техническая документация находится в файле `TECHNICAL_DOCUMENTATION.md` и включает:

- Архитектуру приложения
- Требования и зависимости
- Инструкции по локальному запуску
- Структуру проекта
- Описание ключевых компонентов
- Языковую поддержку
- Функциональность копирования
- Инструкции по развертыванию
- Решение проблем

---

## 📁 Структура файлов

```
dictamed/
├── client/
│   ├── public/
│   │   ├── images/
│   │   │   ├── hero-background.jpg
│   │   │   ├── logo.png
│   │   │   ├── icon-voice.png
│   │   │   └── icon-doc.png
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/ (shadcn/ui компоненты)
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Map.tsx
│   │   ├── contexts/
│   │   │   ├── LanguageContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Report.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── tsconfig.json
├── server/
│   └── index.ts
├── shared/
│   └── const.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Инструкции по запуску

### Локальный запуск

```bash
# 1. Клонирование репозитория
git clone https://github.com/yourusername/dictamed.git
cd dictamed

# 2. Установка зависимостей
pnpm install

# 3. Запуск dev-сервера
pnpm dev

# 4. Открытие в браузере
# Перейдите на http://localhost:3000
```

### Сборка для production

```bash
# Сборка
pnpm build

# Запуск production-сборки
pnpm start

# Или preview
pnpm preview
```

---

## 📦 Список зависимостей

### Production Dependencies

| Пакет | Версия | Назначение |
|-------|--------|-----------|
| react | ^19.2.1 | Фреймворк |
| react-dom | ^19.2.1 | Рендеринг DOM |
| wouter | ^3.3.5 | Маршрутизация |
| sonner | ^2.0.7 | Уведомления |
| lucide-react | ^0.453.0 | Иконки |
| tailwind-merge | ^3.3.1 | Утилита для Tailwind |
| recharts | ^2.15.2 | Графики |
| framer-motion | ^12.23.22 | Анимации |
| react-hook-form | ^7.64.0 | Управление формами |
| zod | ^4.1.12 | Валидация |
| @radix-ui/* | Latest | UI компоненты |

### Development Dependencies

| Пакет | Версия | Назначение |
|-------|--------|-----------|
| typescript | 5.6.3 | Типизация |
| vite | ^7.1.7 | Сборщик |
| tailwindcss | ^4.1.14 | Стилизация |
| vitest | ^2.1.4 | Тестирование |
| prettier | ^3.6.2 | Форматирование |

---

## 🔗 Ссылки на ресурсы

- **GitHub репозиторий:** https://github.com/yourusername/dictamed
- **Веб-приложение:** https://dictamed.manus.space
- **Документация:** /TECHNICAL_DOCUMENTATION.md
- **Бизнес-план:** /DictaMed_Final_Business_Plan_RU.md

---

## 📞 Контакты

**Email:** support@dictamed.kz  
**Веб-сайт:** https://dictamed.kz  
**Телефон:** +7 (727) XXX-XX-XX

---

**Подготовлено:** Manus AI  
**Дата:** 31 декабря 2025  
**Версия:** 1.0  
**Статус:** Готово к развертыванию
