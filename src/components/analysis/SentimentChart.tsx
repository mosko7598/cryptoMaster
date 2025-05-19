
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Brain, RefreshCw } from "lucide-react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { MarketSentiment } from "@/utils/aiAnalysis";
import { useLanguage } from "@/contexts/LanguageContext";

const sentimentConfig = {
  market: {
    label: "Market",
    theme: {
      light: "#f97316",
      dark: "#fb923c",
    },
  },
  social: {
    label: "Social Media",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
  news: {
    label: "News",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
};

interface SentimentChartProps {
  marketSentiment: MarketSentiment | undefined;
  isLoading: boolean;
  isRunningAnalysis: boolean;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({
  marketSentiment,
  isLoading,
  isRunningAnalysis
}) => {
  const { t } = useLanguage();

  // Prepare data for sentiment chart
  const sentimentData = marketSentiment ? [
    { 
      date: "Current", 
      market: marketSentiment.sources.technicalAnalysis, 
      social: marketSentiment.sources.socialMedia, 
      news: marketSentiment.sources.newsArticles 
    }
  ] : [];

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("sentimentAnalysis")}</CardTitle>
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>{t("sentimentDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        {marketSentiment ? (
          <ChartContainer config={sentimentConfig} className="h-[300px]">
            <BarChart data={sentimentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[-1, 1]} />
              <Tooltip content={<ChartTooltip />} />
              <Legend />
              <Bar dataKey="market" fill="#f97316" />
              <Bar dataKey="social" fill="#6366f1" />
              <Bar dataKey="news" fill="#10b981" />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex justify-center items-center h-[300px] text-muted-foreground">
            {isLoading || isRunningAnalysis ? (
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin" />
                <span>{t("updating")}</span>
              </div>
            ) : (
              <span>{t("noDataAvailable")}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
