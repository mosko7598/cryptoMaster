
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { useToast } from "@/hooks/use-toast";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, ChartBar } from "lucide-react";

// Sample data for chart
const data = [
  { name: "Jan", BTC: 29000, ETH: 1800 },
  { name: "Feb", BTC: 32000, ETH: 1900 },
  { name: "Mar", BTC: 34000, ETH: 2100 },
  { name: "Apr", BTC: 31000, ETH: 1950 },
  { name: "May", BTC: 38000, ETH: 2300 },
  { name: "Jun", BTC: 42000, ETH: 2600 },
  { name: "Jul", BTC: 45000, ETH: 2800 },
];

const chartConfig = {
  BTC: {
    label: "Bitcoin",
    theme: {
      light: "#f97316",
      dark: "#fb923c",
    },
  },
  ETH: {
    label: "Ethereum",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
};

const Index = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");
  const { toast } = useToast();

  const translations = {
    en: {
      title: "CryptoMaster",
      subtitle: "AI-Powered Trading Assistant",
      welcome: "Welcome to CryptoMaster",
      description: "Your personal AI trading assistant that analyzes market data, provides insights, and helps you make better trading decisions.",
      performance: "Portfolio Performance",
      markets: "Markets",
      analysis: "Analysis",
      dashboard: "Dashboard",
      settings: "Settings",
      connect: "Connect to Binance",
      upTrend: "Upward Trend",
      downTrend: "Downward Trend",
      marketAnalysis: "Market Analysis"
    },
    he: {
      title: "קריפטומאסטר",
      subtitle: "עוזר מסחר מבוסס בינה מלאכותית",
      welcome: "ברוכים הבאים לקריפטומאסטר",
      description: "עוזר המסחר האישי שלך המנתח נתוני שוק, מספק תובנות, ועוזר לך לקבל החלטות מסחר טובות יותר.",
      performance: "ביצועי תיק",
      markets: "שווקים",
      analysis: "ניתוח",
      dashboard: "לוח בקרה",
      settings: "הגדרות",
      connect: "התחבר לביננס",
      upTrend: "מגמת עלייה",
      downTrend: "מגמת ירידה",
      marketAnalysis: "ניתוח שוק"
    }
  };
  
  const t = translations[language];

  const handleConnect = () => {
    toast({
      title: language === "en" ? "Connection Pending" : "חיבור בהמתנה",
      description: language === "en" 
        ? "Binance API connection feature is coming soon." 
        : "תכונת התחברות ל-API של ביננס תהיה זמינה בקרוב.",
    });
  };

  const changeLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  return (
    <div className={`min-h-screen p-4 ${language === "he" ? "text-right" : "text-left"}`}>
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">{t.title}</h1>
            <p className="text-muted-foreground">{t.subtitle}</p>
          </div>
          <button 
            onClick={changeLanguage} 
            className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
          >
            {language === "en" ? "עברית" : "English"}
          </button>
        </div>
        
        <NavigationMenu className={`${language === "he" ? "justify-end" : "justify-start"}`}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t.dashboard}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t.markets}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t.analysis}
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {t.settings}
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </header>

      <main>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t.welcome}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <button 
              onClick={handleConnect}
              className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {t.connect}
            </button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.performance}</CardTitle>
                <ChartBar className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[200px]">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="BTC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="ETH" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip content={<ChartTooltip />} />
                  <Area type="monotone" dataKey="BTC" stroke="#f97316" fillOpacity={1} fill="url(#BTC)" />
                  <Area type="monotone" dataKey="ETH" stroke="#6366f1" fillOpacity={1} fill="url(#ETH)" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.marketAnalysis}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>Bitcoin (BTC)</span>
                  </div>
                  <div className="text-green-500">+5.23%</div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>Ethereum (ETH)</span>
                  </div>
                  <div className="text-green-500">+3.78%</div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-500" />
                    <span>Cardano (ADA)</span>
                  </div>
                  <div className="text-red-500">-1.42%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
