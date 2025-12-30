import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, TrendingUp, Users, ShieldCheck, DollarSign, CheckCircle2, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const COMPETITOR_DATA = [
  { name: "Freed", price: 84, accuracy: 96, setup: "Минуты", type: "Стартап" },
  { name: "Nuance DAX", price: 830, accuracy: 99, setup: "Месяцы", type: "Энтерпрайз" },
  { name: "Abridge", price: 208, accuracy: 95, setup: "Недели", type: "Энтерпрайз" },
  { name: "Suki", price: 299, accuracy: 94, setup: "Недели", type: "Средний бизнес" },
  { name: "DeepScribe", price: 750, accuracy: 97, setup: "Недели", type: "Специализированный" },
  { name: "Heidi", price: 99, accuracy: 90, setup: "Минуты", type: "Стартап" },
];

const MARKET_SHARE_DATA = [
  { name: "Энтерпрайз (Больницы)", value: 45, color: "#0088FE" },
  { name: "Средний бизнес (Группы)", value: 30, color: "#00C49F" },
  { name: "Малые клиники (Цель)", value: 25, color: "#FFBB28" },
];

export default function Report() {
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Ссылка на отчет скопирована!");
  };

  const handleDownload = () => {
    toast.success("Скачивание отчета в PDF...");
    // Simulation of download
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-[1600px] mx-auto font-sans">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Отчет о рынке AI Medical Scribe</h1>
          <p className="text-muted-foreground">Комплексный анализ конкурентной среды и бизнес-возможностей.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare} className="gap-2">
            <Share2 className="w-4 h-4" />
            Поделиться
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            Скачать отчет
          </Button>
        </div>
      </header>

      <Tabs defaultValue="market" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 h-auto p-1 bg-muted/50 rounded-xl">
          <TabsTrigger value="market" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Анализ рынка</TabsTrigger>
          <TabsTrigger value="competitors" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Конкуренты</TabsTrigger>
          <TabsTrigger value="compliance" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Комплаенс и Право</TabsTrigger>
          <TabsTrigger value="strategy" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Бизнес-стратегия</TabsTrigger>
        </TabsList>

        {/* Market Analysis Tab */}
        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="neu-card border-none shadow-none bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Общий объем рынка (TAM)</CardTitle>
                <div className="text-3xl font-bold text-primary">$80B+</div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +37% CAGR (ИИ в медицине)
                </div>
              </CardContent>
            </Card>
            <Card className="neu-card border-none shadow-none bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Целевая аудитория</CardTitle>
                <div className="text-3xl font-bold text-primary">Малые клиники</div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  2-50 врачей в практике
                </div>
              </CardContent>
            </Card>
            <Card className="neu-card border-none shadow-none bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Решение проблемы</CardTitle>
                <div className="text-3xl font-bold text-primary">50% Времени</div>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  Экономия на документации ежедневно
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="neu-card border-none shadow-none bg-white">
              <CardHeader>
                <CardTitle>Сегментация рынка</CardTitle>
                <CardDescription>Распределение потенциальных клиентов по размеру учреждения</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MARKET_SHARE_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {MARKET_SHARE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="neu-card border-none shadow-none bg-white">
              <CardHeader>
                <CardTitle>Почему сейчас?</CardTitle>
                <CardDescription>Ключевые драйверы для немедленного внедрения</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">1</div>
                  <div>
                    <h4 className="font-bold text-sm">Выгорание врачей</h4>
                    <p className="text-sm text-muted-foreground">Уровень выгорания достиг критических значений, создавая срочный спрос на инструменты экономии времени.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">2</div>
                  <div>
                    <h4 className="font-bold text-sm">Зрелость LLM</h4>
                    <p className="text-sm text-muted-foreground">Генеративный ИИ наконец достиг порога точности (96%+), необходимого для медицинского использования.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">3</div>
                  <div>
                    <h4 className="font-bold text-sm">Регуляторное признание</h4>
                    <p className="text-sm text-muted-foreground">Фреймворки, такие как HIPAA и GDPR, теперь имеют четкие руководства по внедрению ИИ.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <Card className="neu-card border-none shadow-none bg-white">
            <CardHeader>
              <CardTitle>Цена vs. Точность</CardTitle>
              <CardDescription>Сравнение ключевых игроков рынка</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={COMPETITOR_DATA}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Цена ($/мес)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[80, 100]} label={{ value: 'Точность (%)', angle: 90, position: 'insideRight' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="price" name="Месячная цена ($)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="accuracy" name="Точность (%)" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="neu-card border-none shadow-none bg-white">
            <CardHeader>
              <CardTitle>Детальный анализ конкурентов</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Конкурент</TableHead>
                    <TableHead>Тип</TableHead>
                    <TableHead>Время настройки</TableHead>
                    <TableHead>Ключевое отличие</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {COMPETITOR_DATA.map((competitor) => (
                    <TableRow key={competitor.name}>
                      <TableCell className="font-medium">{competitor.name}</TableCell>
                      <TableCell>
                        <Badge variant={competitor.type === "Энтерпрайз" ? "secondary" : "outline"}>
                          {competitor.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{competitor.setup}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {competitor.name === "Freed" ? "Лидер UX, Мгновенная настройка" : 
                         competitor.name === "Nuance DAX" ? "Глубокая интеграция с EHR" :
                         competitor.name === "DeepScribe" ? "Фокус на специализациях" : "Общего назначения"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="neu-card border-none shadow-none bg-white border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                  <CardTitle>HIPAA (США)</CardTitle>
                </div>
                <CardDescription>Стандарт защиты медицинских данных в США</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-bold text-blue-700 mb-1">Business Associate Agreement (BAA)</h4>
                  <p className="text-sm text-blue-600">Обязательный контракт, обязывающий вендора защищать PHI.</p>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Шифрование при передаче (TLS 1.2+) и хранении (AES-256)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Строгий контроль доступа (MFA, RBAC)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Детальные журналы аудита
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="neu-card border-none shadow-none bg-white border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-6 h-6 text-red-500" />
                  <CardTitle>ФЗ-152 (Россия)</CardTitle>
                </div>
                <CardDescription>Федеральный закон о персональных данных</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-bold text-red-700 mb-1">Локализация данных</h4>
                  <p className="text-sm text-red-600">Первичные базы данных должны физически находиться в России.</p>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Поручение на обработку ПДн
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Сертифицированные средства защиты (ФСТЭК/ФСБ)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Модель угроз безопасности
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="neu-card border-none shadow-none bg-white">
            <CardHeader>
              <CardTitle>Рекомендуемый отказ от ответственности</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-xl italic text-muted-foreground border-l-4 border-primary">
                "Данный сервис AI Medical Scribe является вспомогательным инструментом для автоматизации медицинской документации. Он не является медицинским изделием и не ставит диагнозы, не назначает лечение и не дает медицинских рекомендаций. Сгенерированный текст основан исключительно на введенных данных и может содержать ошибки. Лицензированный медицинский работник несет полную ответственность за проверку, редактирование и подтверждение точности всей документации перед ее внесением в медицинскую карту пациента."
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategy Tab */}
        <TabsContent value="strategy" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="neu-card border-none shadow-none bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Модель ценообразования
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">$89<span className="text-sm font-normal text-muted-foreground">/мес</span></div>
                <p className="text-sm text-muted-foreground mb-4">За врача, при оплате за год.</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500"/> Безлимитное использование</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500"/> 7 дней бесплатно</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500"/> Без платы за внедрение</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="neu-card border-none shadow-none bg-white col-span-2">
              <CardHeader>
                <CardTitle>Стратегия выхода на рынок</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-bold mb-2">1. Прямые продажи врачам</h4>
                  <p className="text-xs text-muted-foreground">SEO, контент-маркетинг и бесплатные пробные версии, ориентированные на частных практиков, страдающих от выгорания.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-bold mb-2">2. Партнерство с EHR</h4>
                  <p className="text-xs text-muted-foreground">Интеграция с небольшими, гибкими провайдерами МИС, которые хотят предложить функции ИИ без собственной разработки.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-bold mb-2">3. Инфлюенсеры</h4>
                  <p className="text-xs text-muted-foreground">Использование медицинских сообществ и лидеров мнений для создания доверия и социального доказательства.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
