import { useState, useEffect, useRef } from "react";
import { Mic, FileText, ArrowRight, Copy, Download, Save, Activity, CheckCircle2, AlertCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function Home() {
  const { t, language, toggleLanguage } = useLanguage();
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
          }
        }
        if (transcript) {
          setInput((prev) => prev + (prev ? " " : "") + transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        toast.error(language === "ru" ? "Ошибка распознавания речи." : "Сөйлеуді тану қатесі.");
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, [language]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast.error(language === "ru" ? "Ваш браузер не поддерживает распознавание речи." : "Сіздің браузеріңіз сөйлеуді тануды қолдамайды.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      toast.success(t("toast.recorded"));
    } else {
      recognitionRef.current.lang = language === "kk" ? "kk-KZ" : "ru-RU";
      recognitionRef.current.start();
      setIsRecording(true);
      toast.info(t("toast.recording").replace(" (Симуляция)", ""));
    }
  };

  const handleGenerate = () => {
    if (!input.trim()) {
      toast.error(t("toast.error"));
      return;
    }

    setIsGenerating(true);
    
    // Dynamic SOAP Generation based on input
    setTimeout(() => {
      const dateStr = new Date().toLocaleDateString(language === "ru" ? 'ru-RU' : 'kk-KZ');
      const patientId = "12345-X";
      
      const generatedProtocol = language === "ru" 
        ? `**МЕДИЦИНСКИЙ ПРОТОКОЛ (SOAP)**
**ID Пациента:** ${patientId}
**Дата:** ${dateStr}

**СУБЪЕКТИВНО (SUBJECTIVE):**
${input}

**ОБЪЕКТИВНО (OBJECTIVE):**
*   **Витальные показатели:** АД 120/80, ЧСС 72, Темп 36.6°C.
*   **Физикальный осмотр:** Состояние удовлетворительное. Кожные покровы чистые. Дыхание везикулярное. Тоны сердца ритмичные. Живот мягкий, безболезненный.

**ОЦЕНКА (ASSESSMENT):**
1.  Основной диагноз на основании жалоб: ${input.split('.')[0]}.
2.  Дифференциальный диагноз: Требует уточнения.

**ПЛАН (PLAN):**
1.  **Дообследование:** Общий анализ крови, общий анализ мочи.
2.  **Лечение:** Симптоматическая терапия. Режим амбулаторный.
3.  **Консультации:** Повторный прием через 3 дня.`
        : `**МЕДИЦИНАЛЫҚ ПРОТОКОЛ (SOAP)**
**Пациенттің ID-і:** ${patientId}
**Күні:** ${dateStr}

**СУБЪЕКТИВТІК (SUBJECTIVE):**
${input}

**ОБЪЕКТИВТІК (OBJECTIVE):**
*   **Өндіктік көрсеткіштері:** БҚ 120/80, ЖҚ 72, Темп 36.6°C.
*   **Физикалық сынау:** Жағдайы қанағаттанарлық. Тері жабындары таза. Тыныс алу везикулярлы. Жүрек үндері ырғақты. Іші жұмсақ, ауырсынусыз.

**БАҒАЛАУ (ASSESSMENT):**
1.  Шағымдар негізіндегі негізгі диагноз: ${input.split('.')[0]}.
2.  Дифференциалды диагноз: Нақтылауды қажет етеді.

**ЖОСПАР (PLAN):**
1.  **Қосымша тексеру:** Жалпы қан анализі, жалпы зәр анализі.
2.  **Емдеу:** Симптоматикалық терапия. Амбулаториялық режим.
3.  **Консультациялар:** 3 күннен кейін қайта қабылдау.`;
      
      setOutput(generatedProtocol);
      setIsGenerating(false);
      toast.success(language === "ru" ? "Медицинский протокол успешно создан." : "Медициналық протокол сәтті құрастырылды.");
    }, 1500);
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
