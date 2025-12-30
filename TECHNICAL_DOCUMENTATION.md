# DictaMed: Техническая Документация и Руководство по Запуску

## Содержание

1. [Обзор проекта](#обзор-проекта)
2. [Архитектура приложения](#архитектура-приложения)
3. [Требования и зависимости](#требования-и-зависимости)
4. [Локальный запуск](#локальный-запуск)
5. [Структура проекта](#структура-проекта)
6. [Ключевые компоненты](#ключевые-компоненты)
7. [Языковая поддержка](#языковая-поддержка)
8. [Функциональность копирования](#функциональность-копирования)
9. [Развертывание](#развертывание)
10. [Решение проблем](#решение-проблем)

---

## Обзор проекта

**DictaMed** — это веб-приложение для автоматизации медицинской документации, разработанное на React 19 с использованием Tailwind CSS 4 и shadcn/ui компонентов. Приложение поддерживает русский и казахский языки и генерирует медицинские протоколы в формате SOAP в соответствии со стандартами Министерства здравоохранения Республики Казахстан.

**Ключевые особенности:**
- Двуязычный интерфейс (Русский/Казахский)
- Генерация SOAP протоколов с использованием ИИ
- Голосовая диктовка (симуляция)
- Копирование протокола в буфер обмена
- Дизайн Neumorphism 2.0
- Соответствие Закону РК № 94-V о защите персональных данных

---

## Архитектура приложения

### Технологический стек

| Компонент | Технология | Версия |
|-----------|-----------|--------|
| **Фронтенд фреймворк** | React | 19.2.1 |
| **Стилизация** | Tailwind CSS | 4.1.14 |
| **UI компоненты** | shadcn/ui + Radix UI | Latest |
| **Маршрутизация** | Wouter | 3.3.5 |
| **Уведомления** | Sonner | 2.0.7 |
| **Иконки** | Lucide React | 0.453.0 |
| **Язык программирования** | TypeScript | 5.6.3 |
| **Сборщик** | Vite | 7.1.7 |
| **Тестирование** | Vitest | 2.1.4 |
| **Пакетный менеджер** | pnpm | 10.4.1 |

### Архитектурная диаграмма

```
┌─────────────────────────────────────────────────────────────┐
│                     DictaMed Frontend                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   App.tsx (Router)                   │   │
│  │  ├─ LanguageProvider (RU/KK Toggle)                 │   │
│  │  ├─ ThemeProvider (Light/Dark)                      │   │
│  │  └─ TooltipProvider + Toaster                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                   │
│        ┌──────────────────┼──────────────────┐               │
│        ▼                  ▼                  ▼               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Home.tsx    │  │  Report.tsx  │  │ NotFound.tsx │      │
│  │              │  │              │  │              │      │
│  │ • Input      │  │ • Market     │  │ • 404 Page   │      │
│  │ • Generate   │  │ • Competitors│  │              │      │
│  │ • Output     │  │ • Compliance │  │              │      │
│  │ • Copy Btn   │  │ • Strategy   │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Contexts & Hooks                        │   │
│  │  ├─ LanguageContext (useLanguage)                   │   │
│  │  ├─ ThemeContext (useTheme)                         │   │
│  │  └─ Custom Hooks                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Shared UI Components                       │   │
│  │  ├─ Button, Textarea, ScrollArea                    │   │
│  │  ├─ Card, Dialog, Dropdown                          │   │
│  │  └─ Icons (Lucide React)                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Требования и зависимости

### Системные требования

- **Node.js:** версия 18.0 или выше
- **npm/pnpm:** версия 8.0 или выше (рекомендуется pnpm 10.4.1)
- **ОС:** macOS, Linux, Windows (с WSL2)
- **Браузер:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Основные зависимости (Dependencies)

```json
{
  "react": "^19.2.1",
  "react-dom": "^19.2.1",
  "wouter": "^3.3.5",
  "sonner": "^2.0.7",
  "lucide-react": "^0.453.0",
  "tailwind-merge": "^3.3.1",
  "tailwindcss-animate": "^1.0.7",
  "recharts": "^2.15.2",
  "framer-motion": "^12.23.22",
  "react-hook-form": "^7.64.0",
  "zod": "^4.1.12",
  "@radix-ui/*": "Latest versions"
}
```

### Зависимости разработки (DevDependencies)

```json
{
  "typescript": "5.6.3",
  "vite": "^7.1.7",
  "@vitejs/plugin-react": "^5.0.4",
  "tailwindcss": "^4.1.14",
  "@tailwindcss/vite": "^4.1.3",
  "vitest": "^2.1.4",
  "prettier": "^3.6.2"
}
```

---

## Локальный запуск

### Шаг 1: Клонирование репозитория

```bash
git clone https://github.com/yourusername/dictamed.git
cd dictamed
```

### Шаг 2: Установка зависимостей

```bash
# Используя pnpm (рекомендуется)
pnpm install

# Или используя npm
npm install

# Или используя yarn
yarn install
```

### Шаг 3: Запуск dev-сервера

```bash
pnpm dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

### Шаг 4: Открытие в браузере

Откройте браузер и перейдите на `http://localhost:3000`. Вы должны увидеть главную страницу DictaMed с интерфейсом Neumorphism дизайна.

### Дополнительные команды

```bash
# Сборка для production
pnpm build

# Проверка типов TypeScript
pnpm check

# Форматирование кода
pnpm format

# Запуск preview production-сборки
pnpm preview

# Запуск тестов
pnpm test
```

---

## Структура проекта

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
│   │   │   ├── ui/
│   │   │   │   ├── button.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── scroll-area.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── ... (другие shadcn компоненты)
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Map.tsx
│   │   ├── contexts/
│   │   │   ├── LanguageContext.tsx (RU/KK переключатель)
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/
│   │   │   └── (пользовательские хуки)
│   │   ├── lib/
│   │   │   └── (утилиты и помощники)
│   │   ├── pages/
│   │   │   ├── Home.tsx (главная страница с SOAP генератором)
│   │   │   ├── Report.tsx (рыночный отчет)
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css (Neumorphism стили)
│   └── tsconfig.json
├── server/
│   └── index.ts (Express сервер для production)
├── shared/
│   └── const.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```

---

## Ключевые компоненты

### 1. LanguageContext.tsx

Контекст для управления языком приложения (Русский/Казахский). Предоставляет функцию `useLanguage()` для доступа к текущему языку и функции переключения.

**Использование:**

```typescript
import { useLanguage } from "@/contexts/LanguageContext";

export function MyComponent() {
  const { language, toggleLanguage, t } = useLanguage();
  
  return (
    <div>
      <button onClick={toggleLanguage}>
        {language === "ru" ? "KK" : "RU"}
      </button>
      <p>{t("app.title")}</p> {/* DictaMed */}
    </div>
  );
}
```

### 2. Home.tsx

Главная страница приложения с функциональностью:
- Ввод данных о пациенте (текст или голос)
- Генерация SOAP протокола
- Копирование протокола в буфер обмена
- Экспорт в PDF (заглушка)
- Сохранение (заглушка)

**Ключевые функции:**

```typescript
// Генерация протокола
const handleGenerate = () => {
  // Валидация входных данных
  // Имитация генерации ИИ (2 сек задержка)
  // Установка сгенерированного протокола
};

// Копирование в буфер обмена (ИСПРАВЛЕНО)
const handleCopyProtocol = async () => {
  try {
    await navigator.clipboard.writeText(output);
    toast.success(t("toast.copied"));
  } catch (err) {
    toast.error(t("toast.error"));
  }
};

// Голосовая диктовка (симуляция)
const toggleRecording = () => {
  // Имитация записи голоса
  // Добавление текста в поле ввода
};
```

### 3. Report.tsx

Страница с интерактивным рыночным отчетом, включающая:
- Анализ конкурентов
- Информацию о соответствии законодательству
- Бизнес-стратегию
- Интерактивные графики

---

## Языковая поддержка

### Добавление новых переводов

Все переводы хранятся в `LanguageContext.tsx`. Для добавления новых текстов:

1. Откройте `client/src/contexts/LanguageContext.tsx`
2. Добавьте новый ключ в объект `translations`:

```typescript
const translations: Record<Language, Record<string, string>> = {
  ru: {
    "new.key": "Новый текст на русском",
    // ...
  },
  kk: {
    "new.key": "Жаңа мәтін қазақша",
    // ...
  },
};
```

3. Используйте в компоненте:

```typescript
const { t } = useLanguage();
<p>{t("new.key")}</p>
```

### Поддерживаемые языки

- **Русский (ru):** Полная поддержка
- **Казахский (kk):** Полная поддержка

---

## Функциональность копирования

### Реализация

Функция копирования использует современный Clipboard API:

```typescript
const handleCopyProtocol = async () => {
  if (!output) {
    toast.error(language === "ru" ? "Нет протокола для копирования." : "Көшіру үшін протокол жоқ.");
    return;
  }

  try {
    // Копирование текста в буфер обмена
    await navigator.clipboard.writeText(output);
    
    // Показ уведомления об успехе
    toast.success(t("toast.copied"));
  } catch (err) {
    // Обработка ошибки
    toast.error(language === "ru" ? "Ошибка при копировании." : "Көшіру кезінде қате.");
    console.error("Failed to copy:", err);
  }
};
```

### Поддержка браузеров

Clipboard API поддерживается в:
- Chrome 63+
- Firefox 53+
- Safari 13.1+
- Edge 79+

### Тестирование

1. Введите текст в поле ввода
2. Нажмите кнопку "Сгенерировать протокол"
3. Дождитесь генерации (2 секунды)
4. Нажмите кнопку копирования (иконка скрепки)
5. Вставьте текст (Ctrl+V / Cmd+V) в любой текстовый редактор для проверки

---

## Развертывание

### Развертывание на Manus

1. Создайте checkpoint:
```bash
# Checkpoint автоматически создается при сохранении
```

2. Нажмите кнопку "Publish" в Management UI

3. Приложение будет доступно по адресу: `https://dictamed.manus.space`

### Развертывание на других платформах

#### Vercel

```bash
# Установка Vercel CLI
npm i -g vercel

# Развертывание
vercel
```

#### Netlify

```bash
# Установка Netlify CLI
npm i -g netlify-cli

# Развертывание
netlify deploy --prod --dir=dist
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Решение проблем

### Проблема: "Module not found" ошибка

**Решение:**
```bash
# Очистите node_modules и переустановите
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Проблема: Копирование не работает

**Решение:**
1. Убедитесь, что используете HTTPS (Clipboard API требует безопасного контекста)
2. Проверьте, что браузер поддерживает Clipboard API
3. Откройте консоль браузера (F12) и проверьте ошибки

### Проблема: Языковой переключатель не работает

**Решение:**
1. Убедитесь, что `LanguageProvider` обернут вокруг приложения в `App.tsx`
2. Проверьте, что используете `useLanguage()` внутри компонента

### Проблема: Стили Neumorphism не отображаются

**Решение:**
1. Убедитесь, что Tailwind CSS правильно скомпилирован
2. Проверьте, что `index.css` импортирован в `main.tsx`
3. Очистите кэш браузера (Ctrl+Shift+Delete)

### Проблема: Медленная генерация протокола

**Решение:**
1. Это нормально для MVP (2-секундная имитация)
2. При интеграции с реальным ИИ, оптимизируйте запросы к API
3. Добавьте прогресс-бар для лучшего UX

---

## Контакты и поддержка

**Email:** support@dictamed.kz  
**Сайт:** https://dictamed.kz  
**GitHub:** https://github.com/yourusername/dictamed

---

**Документация подготовлена:** Manus AI  
**Дата:** 31 декабря 2025  
**Версия:** 1.0
