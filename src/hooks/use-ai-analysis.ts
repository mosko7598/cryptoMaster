
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  runAIAnalysis, 
  MarketSentiment, 
  AIPrediction, 
  NewsImpact 
} from "@/utils/aiAnalysis";

export function useAIAnalysis(coins?: string[]) {
  const queryClient = useQueryClient();
  const [isRunningAnalysis, setIsRunningAnalysis] = useState(false);

  // Query for fetching AI analysis data
  const { 
    data, 
    error, 
    isLoading,
    refetch,
    dataUpdatedAt
  } = useQuery({
    queryKey: ['aiAnalysis', coins], 
    queryFn: () => runAIAnalysis(coins),
    // Don't run automatically on component mount, wait for explicit trigger
    enabled: false,
    staleTime: 1000 * 60 * 15, // 15 minutes - this is how long we consider the data "fresh"
  });

  // Mutation to run a new analysis
  const { mutate: runNewAnalysis } = useMutation({
    mutationFn: () => {
      setIsRunningAnalysis(true);
      return runAIAnalysis(coins);
    },
    onSuccess: (newData) => {
      // Update the query cache with the new results
      queryClient.setQueryData(['aiAnalysis', coins], newData);
      setIsRunningAnalysis(false);
    },
    onError: (error) => {
      console.error("Error running AI analysis:", error);
      setIsRunningAnalysis(false);
    },
  });

  // Get sentiment classification
  const getSentimentClass = (sentiment: number): 'positive' | 'negative' | 'neutral' => {
    if (sentiment >= 0.2) return 'positive';
    if (sentiment <= -0.2) return 'negative';
    return 'neutral';
  };

  // Format last analysis time
  const getLastAnalysisTime = (): string => {
    if (!dataUpdatedAt) return 'Never';
    
    const now = new Date();
    const updateTime = new Date(dataUpdatedAt);
    const diffMinutes = Math.floor((now.getTime() - updateTime.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return updateTime.toLocaleString();
  };

  return {
    // Data
    marketSentiment: data?.marketSentiment,
    predictions: data?.predictions || [],
    newsImpact: data?.newsImpact || [],
    socialSentiment: data?.socialSentiment || {},
    
    // Status
    isLoading,
    isRunningAnalysis,
    error,
    lastUpdated: getLastAnalysisTime(),
    
    // Actions
    runNewAnalysis,
    refetch,
    
    // Helpers
    getSentimentClass,
  };
}
