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
    
    // Simulate AI generation delay
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
