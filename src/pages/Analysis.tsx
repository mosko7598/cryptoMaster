
import React, { useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAIAnalysis } from "@/hooks/use-ai-analysis";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import { SentimentOverview } from "@/components/analysis/SentimentOverview";
import { SentimentChart } from "@/components/analysis/SentimentChart";
import { PricePredictions } from "@/components/analysis/PricePredictions";
import { NewsImpact } from "@/components/analysis/NewsImpact";

const coins = ["BTC", "ETH", "SOL", "ADA", "BNB"];

const AnalysisContent = () => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const { 
    marketSentiment,
    predictions,
    newsImpact,
    isLoading,
    isRunningAnalysis,
    lastUpdated,
    runNewAnalysis,
    getSentimentClass
  } = useAIAnalysis(coins);

  useEffect(() => {
    // Run the analysis when component loads
    runNewAnalysis();
  }, []);

  const handleRunAnalysis = () => {
    toast({
      title: language === "en" ? "Analysis Started" : "הניתוח התחיל",
      description: language === "en" 
        ? "AI engine is analyzing market data. This may take a few moments." 
        : "מנוע הבינה המלאכותית מנתח את נתוני השוק. זה עשוי לקחת מספר רגעים.",
    });
    runNewAnalysis();
  };

  return (
    <div className={`min-h-screen p-4 ${language === "he" ? "text-right" : "text-left"}`}>
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">{t("title")}</h1>
            <p className="text-muted-foreground">
              {t("subtitle")}
              {" • "}
              <span className="text-sm">{t("lastUpdated")}: {lastUpdated}</span>
            </p>
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
        {/* Overall market sentiment card */}
        {marketSentiment && (
          <SentimentOverview 
            marketSentiment={marketSentiment} 
            getSentimentClass={getSentimentClass} 
          />
        )}

        {/* Sentiment analysis chart */}
        <SentimentChart 
          marketSentiment={marketSentiment}
          isLoading={isLoading}
          isRunningAnalysis={isRunningAnalysis}
        />

        {/* AI Price Predictions */}
        <PricePredictions 
          predictions={predictions}
          isLoading={isLoading}
          isRunningAnalysis={isRunningAnalysis}
        />

        {/* News Impact */}
        <NewsImpact 
          newsImpact={newsImpact}
          isLoading={isLoading}
          isRunningAnalysis={isRunningAnalysis}
        />

        <div className="flex justify-center mt-8">
          <button 
            onClick={handleRunAnalysis}
            disabled={isRunningAnalysis}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {isRunningAnalysis && <RefreshCw className="h-4 w-4 animate-spin" />}
            {isRunningAnalysis ? t("updating") : t("runAnalysis")}
          </button>
        </div>
      </main>
    </div>
  );
};

const Analysis = () => {
  return (
    <LanguageProvider>
      <AnalysisContent />
    </LanguageProvider>
  );
};

export default Analysis;
