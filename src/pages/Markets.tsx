
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartBar, Search, TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sample market data
const marketData = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 45230.42,
    change24h: 5.23,
    marketCap: 876543210000,
    volume24h: 32165498765,
    chartData: [
      { time: "1d", price: 44000 },
      { time: "2d", price: 43000 },
      { time: "3d", price: 45000 },
      { time: "4d", price: 44500 },
      { time: "5d", price: 43800 },
      { time: "6d", price: 44300 },
      { time: "7d", price: 45230 },
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2843.15,
    change24h: 3.78,
    marketCap: 345678900000,
    volume24h: 19876543210,
    chartData: [
      { time: "1d", price: 2700 },
      { time: "2d", price: 2750 },
      { time: "3d", price: 2800 },
      { time: "4d", price: 2650 },
      { time: "5d", price: 2700 },
      { time: "6d", price: 2780 },
      { time: "7d", price: 2843 },
    ],
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.93,
    change24h: -1.42,
    marketCap: 32165498700,
    volume24h: 1876543210,
    chartData: [
      { time: "1d", price: 0.95 },
      { time: "2d", price: 0.97 },
      { time: "3d", price: 0.96 },
      { time: "4d", price: 0.94 },
      { time: "5d", price: 0.92 },
      { time: "6d", price: 0.91 },
      { time: "7d", price: 0.93 },
    ],
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 123.45,
    change24h: 8.71,
    marketCap: 45678912300,
    volume24h: 3456789012,
    chartData: [
      { time: "1d", price: 115 },
      { time: "2d", price: 118 },
      { time: "3d", price: 117 },
      { time: "4d", price: 120 },
      { time: "5d", price: 119 },
      { time: "6d", price: 122 },
      { time: "7d", price: 123 },
    ],
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    price: 378.67,
    change24h: 2.34,
    marketCap: 65489731200,
    volume24h: 2345678901,
    chartData: [
      { time: "1d", price: 370 },
      { time: "2d", price: 372 },
      { time: "3d", price: 375 },
      { time: "4d", price: 371 },
      { time: "5d", price: 373 },
      { time: "6d", price: 376 },
      { time: "7d", price: 379 },
    ],
  },
];

const Markets = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");
  const [searchTerm, setSearchTerm] = useState("");

  const translations = {
    en: {
      title: "Crypto Markets",
      subtitle: "Real-time cryptocurrency market data",
      search: "Search for a cryptocurrency...",
      rank: "Rank",
      name: "Name",
      price: "Price",
      change24h: "24h Change",
      marketCap: "Market Cap",
      volume24h: "Volume (24h)",
      priceChart: "Price Chart (7d)",
      showMore: "Show More Markets",
    },
    he: {
      title: "שווקי קריפטו",
      subtitle: "נתוני שוק מטבעות קריפטו בזמן אמת",
      search: "חפש מטבע קריפטו...",
      rank: "דירוג",
      name: "שם",
      price: "מחיר",
      change24h: "שינוי 24ש'",
      marketCap: "שווי שוק",
      volume24h: "נפח מסחר (24ש')",
      priceChart: "גרף מחיר (7י')",
      showMore: "הצג עוד שווקים",
    }
  };

  const t = translations[language];

  // Filter cryptos based on search term
  const filteredMarkets = marketData.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "he-IL").format(num);
  };

  // Format currency
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(language === "en" ? "en-US" : "he-IL", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: num < 1 ? 4 : 2,
      maximumFractionDigits: num < 1 ? 4 : 2,
    }).format(num);
  };

  // Format market cap and volume
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    } else {
      return `$${formatNumber(num)}`;
    }
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

      <main>
        <div className="relative mb-6">
          <Search className="absolute top-3 left-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder={t.search}
            className="w-full py-2 pl-10 pr-4 border rounded-md"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-6">
          {filteredMarkets.map((crypto, index) => (
            <Card key={crypto.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="bg-muted text-muted-foreground w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <CardTitle>{crypto.name} ({crypto.symbol})</CardTitle>
                    </div>
                  </div>
                  <div className="text-xl font-semibold">
                    {formatCurrency(crypto.price)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.change24h}</span>
                      <div className={`flex items-center gap-1 ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {Math.abs(crypto.change24h)}%
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.marketCap}</span>
                      <span>{formatLargeNumber(crypto.marketCap)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t.volume24h}</span>
                      <span>{formatLargeNumber(crypto.volume24h)}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{t.priceChart}</p>
                    <ResponsiveContainer width="100%" height={100}>
                      <LineChart data={crypto.chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke={crypto.change24h >= 0 ? "#10b981" : "#ef4444"} 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {t.showMore}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Markets;
