
import React from "react";
import { UserCog } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import DarkModeToggle from "./DarkModeToggle";
import LanguageToggle from "./LanguageToggle";

interface AppearanceSettingsProps {
  language: "en" | "he";
  darkMode: boolean;
  onLanguageToggle: () => void;
  onDarkModeChange: (value: boolean) => void;
  onSaveSettings: () => void;
  translations: {
    appearance: string;
    appearanceDescription: string;
    darkMode: string;
    language: string;
    english: string;
    hebrew: string;
    saveSettings: string;
  };
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  language,
  darkMode,
  onLanguageToggle,
  onDarkModeChange,
  onSaveSettings,
  translations,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{translations.appearance}</CardTitle>
          <UserCog className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>{translations.appearanceDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DarkModeToggle 
          darkMode={darkMode} 
          onChange={onDarkModeChange} 
          translation={translations.darkMode} 
        />

        <LanguageToggle 
          language={language} 
          onToggle={onLanguageToggle} 
          translations={{
            language: translations.language,
            english: translations.english,
            hebrew: translations.hebrew,
          }} 
        />
      </CardContent>
      <CardFooter>
        <button 
          onClick={onSaveSettings}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {translations.saveSettings}
        </button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceSettings;
