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
    "report.title": "Отчет о рынке AI Medical Scribe",
    "report.description": "Комплексный анализ конкурентной среды и бизнес-возможностей.",
    "report.share": "Поделиться",
    "report.download": "Скачать отчет",
    "report.market": "Анализ рынка",
    "report.competitors": "Конкуренты",
    "report.compliance": "Комплаенс и Право",
    "report.strategy": "Бизнес-стратегия",
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
    "report.title": "AI Medical Scribe нарық туралы есеп",
    "report.description": "Бәсекелес ортасы және бизнес мүмкіндіктерінің кешенді талдауы.",
    "report.share": "Бөлісу",
    "report.download": "Есепті жүктеу",
    "report.market": "Нарық талдауы",
    "report.competitors": "Бәсекелестер",
    "report.compliance": "Комплаенс және құқық",
    "report.strategy": "Бизнес-стратегия",
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
