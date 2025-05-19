
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { AIPrediction } from "@/utils/aiAnalysis";
import { useLanguage } from "@/contexts/LanguageContext";

const predictionConfig = {
  actual: {
    label: "Current",
    theme: {
      light: "#f97316",
      dark: "#fb923c",
    },
  },
  predicted: {
    label: "Predicted",
    theme: {
      light: "#6366f1",
      dark: "#818cf8",
    },
  },
};

interface PricePredictionsProps {
  predictions: AIPrediction[];
  isLoading: boolean;
  isRunningAnalysis: boolean;
}

export const PricePredictions: React.FC<PricePredictionsProps> = ({
  predictions,
  isLoading,
  isRunningAnalysis
}) => {
  const { t } = useLanguage();

  // Format price differences
  const formatPriceChange = (current: number, predicted: number) => {
    const diff = predicted - current;
    const percentage = (diff / current) * 100;
    const sign = diff >= 0 ? "+" : "";
    return `${sign}${percentage.toFixed(2)}%`;
  };

  // Prepare data for predictions chart
  const predictionData = predictions.map(p => ({
    coin: p.coin,
    actual: p.currentPrice,
    predicted: p.predictedPrice,
  }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t("aiPredictions")}</CardTitle>
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>{t("predictionsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        {predictions.length > 0 ? (
          <>
            <div className="overflow-x-auto mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-muted-foreground text-sm">
                    <th className="text-left py-3 px-2">{t("coin")}</th>
                    <th className="text-right py-3 px-2">{t("current")}</th>
                    <th className="text-right py-3 px-2">{t("predicted")}</th>
                    <th className="text-right py-3 px-2">{t("change")}</th>
                    <th className="text-right py-3 px-2">{t("confidence")}</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((prediction) => {
                    const priceChange = formatPriceChange(prediction.currentPrice, prediction.predictedPrice);
                    const isPriceUp = prediction.predictedPrice > prediction.currentPrice;
                    
                    return (
                      <tr key={prediction.coin} className="border-b">
                        <td className="py-3 px-2 font-medium">{prediction.coin}</td>
                        <td className="py-3 px-2 text-right">${prediction.currentPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                        <td className="py-3 px-2 text-right">${prediction.predictedPrice.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                        <td className={`py-3 px-2 text-right ${isPriceUp ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="flex items-center justify-end gap-1">
                            {isPriceUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {priceChange}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-right">{(prediction.confidence * 100).toFixed(0)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ChartContainer config={predictionConfig} className="h-[300px]">
              <BarChart data={predictionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="coin" />
                <YAxis />
                <Tooltip content={<ChartTooltip />} />
                <Legend />
                <Bar dataKey="actual" fill="#f97316" />
                <Bar dataKey="predicted" fill="#6366f1" />
              </BarChart>
            </ChartContainer>
          </>
        ) : (
          <div className="flex justify-center items-center h-[300px] text-muted-foreground">
            {isLoading || isRunningAnalysis ? (
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin" />
                <span>{t("updating")}</span>
              </div>
            ) : (
              <span>No prediction data available</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
