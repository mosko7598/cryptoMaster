
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SettingsHeader from "../components/settings/SettingsHeader";
import ApiSettings from "../components/settings/ApiSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";

const Settings = () => {
  const [language, setLanguage] = useState<"en" | "he">("en");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [apiSecret, setApiSecret] = useState<string>("");
  const [notifications, setNotifications] = useState<{
    priceAlerts: boolean;
    newsAlerts: boolean;
    tradingAlerts: boolean;
  }>({
    priceAlerts: true,
    newsAlerts: true,
    tradingAlerts: false,
  });
  const { toast } = useToast();

  const translations = {
    en: {
      title: "Settings",
      subtitle: "Configure your trading preferences and account settings",
      apiSettings: "API Settings",
      apiDescription: "Connect to Binance API for real-time trading",
      apiKey: "API Key",
      apiSecret: "API Secret",
      apiPlaceholder: "Enter your Binance API key",
      secretPlaceholder: "Enter your Binance API secret",
      connect: "Connect API",
      notificationSettings: "Notification Settings",
      notificationDescription: "Configure how and when you want to be notified",
      priceAlerts: "Price Alerts",
      newsAlerts: "News Alerts",
      tradingAlerts: "Trading Alerts",
      appearance: "Appearance",
      appearanceDescription: "Customize the app's appearance",
      darkMode: "Dark Mode",
      language: "Language",
      english: "English",
      hebrew: "Hebrew",
      saveSettings: "Save Settings",
    },
    he: {
      title: "הגדרות",
      subtitle: "הגדר את העדפות המסחר והגדרות החשבון שלך",
      apiSettings: "הגדרות API",
      apiDescription: "התחבר ל-API של ביננס לצורך מסחר בזמן אמת",
      apiKey: "מפתח API",
      apiSecret: "סוד API",
      apiPlaceholder: "הכנס את מפתח ה-API של ביננס שלך",
      secretPlaceholder: "הכנס את סוד ה-API של ביננס שלך",
      connect: "חבר API",
      notificationSettings: "הגדרות התראות",
      notificationDescription: "קבע כיצד ומתי ברצונך לקבל התראות",
      priceAlerts: "התראות מחיר",
      newsAlerts: "התראות חדשות",
      tradingAlerts: "התראות מסחר",
      appearance: "מראה",
      appearanceDescription: "התאם אישית את מראה האפליקציה",
      darkMode: "מצב חשוך",
      language: "שפה",
      english: "אנגלית",
      hebrew: "עברית",
      saveSettings: "שמור הגדרות",
    }
  };
  
  const t = translations[language];

  const handleConnectAPI = () => {
    if (!apiKey || !apiSecret) {
      toast({
        title: language === "en" ? "Missing Information" : "מידע חסר",
        description: language === "en" 
          ? "Please enter both API key and secret." 
          : "אנא הזן את מפתח וסוד ה-API.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: language === "en" ? "API Connected" : "ה-API חובר",
      description: language === "en" 
        ? "Your Binance API has been successfully connected." 
        : "ה-API של ביננס חובר בהצלחה.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: language === "en" ? "Settings Saved" : "ההגדרות נשמרו",
      description: language === "en" 
        ? "Your settings have been saved successfully." 
        : "ההגדרות שלך נשמרו בהצלחה.",
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "he" : "en");
  };

  return (
    <div className={`min-h-screen p-4 ${language === "he" ? "text-right" : "text-left"}`}>
      <SettingsHeader 
        title={t.title}
        subtitle={t.subtitle}
        language={language}
        onLanguageToggle={toggleLanguage}
      />

      <main className="space-y-8">
        <ApiSettings 
          apiKey={apiKey}
          apiSecret={apiSecret}
          onApiKeyChange={setApiKey}
          onApiSecretChange={setApiSecret}
          onConnect={handleConnectAPI}
          translations={{
            apiSettings: t.apiSettings,
            apiDescription: t.apiDescription,
            apiKey: t.apiKey,
            apiSecret: t.apiSecret,
            apiPlaceholder: t.apiPlaceholder,
            secretPlaceholder: t.secretPlaceholder,
            connect: t.connect,
          }}
        />

        <NotificationSettings 
          notifications={notifications}
          onNotificationChange={setNotifications}
          translations={{
            notificationSettings: t.notificationSettings,
            notificationDescription: t.notificationDescription,
            priceAlerts: t.priceAlerts,
            newsAlerts: t.newsAlerts,
            tradingAlerts: t.tradingAlerts,
          }}
        />

        <AppearanceSettings 
          language={language}
          darkMode={darkMode}
          onLanguageToggle={toggleLanguage}
          onDarkModeChange={setDarkMode}
          onSaveSettings={handleSaveSettings}
          translations={{
            appearance: t.appearance,
            appearanceDescription: t.appearanceDescription,
            darkMode: t.darkMode,
            language: t.language,
            english: t.english,
            hebrew: t.hebrew,
            saveSettings: t.saveSettings,
          }}
        />
      </main>
    </div>
  );
};

export default Settings;
