
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";
import { NewsImpact as NewsImpactType } from "@/utils/aiAnalysis";
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsImpactProps {
  newsImpact: NewsImpactType[] | undefined;
  isLoading: boolean;
  isRunningAnalysis: boolean;
}

export const NewsImpact: React.FC<NewsImpactProps> = ({
  newsImpact,
  isLoading,
  isRunningAnalysis
}) => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("impactfulNews")}</CardTitle>
          <AlertCircle className="h-5 w-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsImpact && newsImpact.length > 0 ? (
            newsImpact.map((news, index) => (
              <div key={index} className="p-4 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{news.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    news.sentiment === "positive" 
                      ? "bg-green-100 text-green-800" 
                      : news.sentiment === "negative" 
                        ? "bg-red-100 text-red-800" 
                        : "bg-gray-100 text-gray-800"
                  }`}>
                    {news.sentiment === "positive" 
                      ? t("positive") 
                      : news.sentiment === "negative" 
                        ? t("negative") 
                        : t("neutral")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{news.source}</span>
                  <div className="flex gap-2">
                    {news.coins.map((coinImpact, i) => (
                      <span key={i} className={`px-1 border rounded ${
                        coinImpact.impact > 0.2 
                          ? "border-green-300 text-green-800" 
                          : coinImpact.impact < -0.2 
                            ? "border-red-300 text-red-800" 
                            : "border-gray-300 text-gray-800"
                      }`}>
                        {coinImpact.symbol} {coinImpact.impact > 0 ? "+" : ""}{(coinImpact.impact * 100).toFixed(0)}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-[100px] text-muted-foreground">
              {isLoading || isRunningAnalysis ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="h-8 w-8 animate-spin" />
                  <span>{t("updating")}</span>
                </div>
              ) : (
                <span>No news impact data available</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
