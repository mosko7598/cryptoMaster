
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageProviderProps {
  children: ReactNode;
}

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  en: {
    dashboard: "Dashboard",
    markets: "Markets",
    analysis: "Analysis",
    settings: "Settings",
    cryptoMaster: "CryptoMaster",
    subtitle: "AI-Powered Trading Assistant",
    marketSentiment: "Market Sentiment",
    noDataAvailable: "No data available",
    sentiment: "Sentiment",
    currentSentiment: "Current Sentiment",
    bullish: "Bullish",
    bearish: "Bearish",
    neutral: "Neutral",
    positive: "Positive",
    negative: "Negative",
    // עדכונים
    updateAvailable: "Update Available",
    version: "Version",
    isAvailable: "is available",
    updateNow: "Update Now",
    requiredUpdate: "Required Update",
    newVersionRequired: "A new version {version} is required to continue",
  },
  he: {
    dashboard: "לוח בקרה",
    markets: "שווקים",
    analysis: "ניתוח",
    settings: "הגדרות",
    cryptoMaster: "קריפטומאסטר",
    subtitle: "עוזר מסחר מבוסס בינה מלאכותית",
    marketSentiment: "סנטימנט שוק",
    noDataAvailable: "אין מידע זמין",
    sentiment: "סנטימנט",
    currentSentiment: "סנטימנט נוכחי",
    bullish: "שוורי",
    bearish: "דובי",
    neutral: "ניטרלי",
    positive: "חיובי",
    negative: "שלילי",
    // עדכונים
    updateAvailable: "עדכון זמין",
    version: "גרסה",
    isAvailable: "זמינה",
    updateNow: "עדכן עכשיו",
    requiredUpdate: "עדכון נדרש",
    newVersionRequired: "גרסה חדשה {version} נדרשת להמשיך",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    const storedLanguage = localStorage.getItem('cryptomaster-language');
    return storedLanguage || 'he'; // שינוי ברירת המחדל לעברית
  });

  useEffect(() => {
    localStorage.setItem('cryptomaster-language', language);
    // הגדר את כיוון המסמך בהתאם לשפה
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
