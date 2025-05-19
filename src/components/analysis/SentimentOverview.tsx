
import React, { memo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Brain } from "lucide-react";
import { MarketSentiment } from "@/utils/aiAnalysis";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface SentimentOverviewProps {
  marketSentiment: MarketSentiment | undefined;
  getSentimentClass: (sentiment: number) => 'positive' | 'negative' | 'neutral';
}

export const SentimentOverview: React.FC<SentimentOverviewProps> = memo(({ 
  marketSentiment, 
  getSentimentClass 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  if (!marketSentiment) {
    return (
      <Card className="hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle>{t("marketSentiment")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">
              {t("noDataAvailable")}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const overallSentimentClass = getSentimentClass(marketSentiment.overallScore);

  const handleSentimentClick = () => {
    toast({
      title: t("sentiment"),
      description: `${t("currentSentiment")}: ${(marketSentiment.overallScore * 100).toFixed(1)}%`,
    });
  };

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("marketSentiment")}</CardTitle>
          {overallSentimentClass === 'positive' ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : overallSentimentClass === 'negative' ? (
            <TrendingDown className="h-5 w-5 text-red-500" />
          ) : (
            <Brain className="h-5 w-5 text-primary" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-6">
          <div 
            onClick={handleSentimentClick}
            className={`text-center p-6 rounded-full border-4 cursor-pointer transition-all hover:scale-105 ${
              overallSentimentClass === 'positive' 
                ? 'border-green-500 bg-green-50 text-green-800' 
                : overallSentimentClass === 'negative' 
                  ? 'border-red-500 bg-red-50 text-red-800' 
                  : 'border-gray-400 bg-gray-50 text-gray-800'
            }`}>
            <div className="text-4xl font-bold">
              {overallSentimentClass === 'positive' 
                ? t("bullish") 
                : overallSentimentClass === 'negative' 
                  ? t("bearish") 
                  : t("neutral")}
            </div>
            <div className="text-sm mt-1">
              {(marketSentiment.overallScore * 100).toFixed(1)}% {overallSentimentClass !== 'neutral' && (overallSentimentClass === 'positive' ? t("positive") : t("negative"))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

SentimentOverview.displayName = 'SentimentOverview';
