
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, ChartTooltip, ChartLegend, ChartLegendContent 
} from "@/components/ui/chart";
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";
import { 
  TrendingUp, TrendingDown, PieChart as PieChartIcon, 
  BarChart2, Activity, Clock, AlertCircle
} from "lucide-react";

// Sample portfolio data
const portfolioData = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 12000 },
  { date: "Mar", value: 11500 },
  { date: "Apr", value: 13500 },
  { date: "May", value: 15000 },
  { date: "Jun", value: 16500 },
  { date: "Jul", value: 18000 },
];

// Sample allocation data
const allocationData = [
  { name: "BTC", value: 45 },
  { name: "ETH", value: 30 },
  { name: "SOL", value: 15 },
  { name: "Other", value: 10 },
];

// Sample performance data
const performanceData = [
  { name: "BTC", value: 18.5 },
  { name: "ETH", value: 12.3 },
  { name: "SOL", value: 25.7 },
  { name: "ADA", value: -5.2 },
  { name: "BNB", value: 8.9 },
];

// Sample recent transactions
const recentTransactions = [
  { id: 1, type: "buy", coin: "Bitcoin", amount: 0.25, value: 11307.61, time: "2023-05-07 14:32" },
  { id: 2, type: "sell", coin: "Ethereum", amount: 1.5, value: 4264.73, time: "2023-05-06 09:15" },
  { id: 3, type: "buy", coin: "Solana", amount: 10, value: 1234.50, time: "2023-05-05 16:48" },
];

// Sample alerts
const alerts = [
  { id: 1, type: "price", coin: "Bitcoin", message: "BTC reached your target price of $45,000", time: "10 minutes ago" },
  { id: 2, type: "news", message: "New regulations proposed for cryptocurrency exchanges", impact: "high", time: "2 hours ago" },
  { id: 3, type: "ai", message: "AI model predicts 15% increase in ETH price within 48 hours", reliability: "medium", time: "5 hours ago" },
];

// Colors for charts
const COLORS = ["#f97316", "#6366f1", "#10b981", "#8b5cf6", "#ef4444"];

const portfolioConfig = {
  value: {
    label: "Portfolio Value",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
};

const Dashboard = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");

  const translations = {
    en: {
      title: "Dashboard",
      subtitle: "Overview of your portfolio and market activity",
      portfolioValue: "Portfolio Value",
      currentValue: "Current Value",
      portfolioGrowth: "Portfolio Growth",
      allocation: "Asset Allocation",
      performance: "Asset Performance",
      recentTransactions: "Recent Transactions",
      type: "Type",
      coin: "Coin",
      amount: "Amount",
      value: "Value",
      time: "Time",
      buy: "Buy",
      sell: "Sell",
      alerts: "Recent Alerts",
      viewAll: "View All",
      high: "High",
      medium: "Medium",
      low: "Low",
    },
    he: {
      title: "לוח בקרה",
      subtitle: "סקירה של תיק ההשקעות שלך ופעילות השוק",
      portfolioValue: "שווי תיק השקעות",
      currentValue: "שווי נוכחי",
      portfolioGrowth: "צמיחת תיק השקעות",
      allocation: "הקצאת נכסים",
      performance: "ביצועי נכסים",
      recentTransactions: "עסקאות אחרונות",
      type: "סוג",
      coin: "מטבע",
      amount: "כמות",
      value: "שווי",
      time: "זמן",
      buy: "קנייה",
      sell: "מכירה",
      alerts: "התראות אחרונות",
      viewAll: "צפייה בהכל",
      high: "גבוה",
      medium: "בינוני",
      low: "נמוך",
    }
  };

  const t = translations[language];

  // Calculate total portfolio value
  const currentPortfolioValue = portfolioData[portfolioData.length - 1].value;
  const previousPortfolioValue = portfolioData[portfolioData.length - 2].value;
  const growthPercentage = ((currentPortfolioValue - previousPortfolioValue) / previousPortfolioValue) * 100;

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "he-IL", {
      style: "currency",
      currency: "USD",
    }).format(value);
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
            onClick={() => setLanguage(language === "en" ? "he" : "en")} 
            className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
          >
            {language === "en" ? "עברית" : "English"}
          </button>
        </div>
      </header>

      <main className="space-y-8">
        {/* Portfolio summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{t.portfolioValue}</CardTitle>
                <Activity className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{formatCurrency(currentPortfolioValue)}</div>
              <div className={`flex items-center gap-1 text-sm ${growthPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {growthPercentage >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{growthPercentage.toFixed(2)}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{t.allocation}</CardTitle>
                <PieChartIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-[150px] h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{t.performance}</CardTitle>
                <BarChart2 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Bar dataKey="value">
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.value >= 0 ? "#10b981" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio growth chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t.portfolioGrowth}</CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={portfolioConfig} className="h-[300px]">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#valueGradient)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent transactions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.recentTransactions}</CardTitle>
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-muted-foreground text-sm">
                      <th className="text-left py-3 px-2">{t.type}</th>
                      <th className="text-left py-3 px-2">{t.coin}</th>
                      <th className="text-right py-3 px-2">{t.amount}</th>
                      <th className="text-right py-3 px-2">{t.value}</th>
                      <th className="text-right py-3 px-2">{t.time}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx) => (
                      <tr key={tx.id} className="border-b">
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            tx.type === "buy" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {tx.type === "buy" ? t.buy : t.sell}
                          </span>
                        </td>
                        <td className="py-3 px-2">{tx.coin}</td>
                        <td className="py-3 px-2 text-right">{tx.amount}</td>
                        <td className="py-3 px-2 text-right">{formatCurrency(tx.value)}</td>
                        <td className="py-3 px-2 text-right text-sm text-muted-foreground">{tx.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <button className="text-primary text-sm">{t.viewAll}</button>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t.alerts}</CardTitle>
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 border rounded-md">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <div className="font-medium">{alert.message}</div>
                        {alert.impact && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            alert.impact === "high" 
                              ? "bg-red-100 text-red-800" 
                              : alert.impact === "medium" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-blue-100 text-blue-800"
                          }`}>
                            {alert.impact === "high" 
                              ? t.high 
                              : alert.impact === "medium" 
                                ? t.medium 
                                : t.low}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right">
                <button className="text-primary text-sm">{t.viewAll}</button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
