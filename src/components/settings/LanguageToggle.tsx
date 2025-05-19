
import React from "react";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  language: "en" | "he";
  onToggle: () => void;
  translations: {
    language: string;
    english: string;
    hebrew: string;
  };
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  language, 
  onToggle, 
  translations 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <label htmlFor="language-select" className="text-sm font-medium">
          {translations.language}
        </label>
        <Globe className="h-4 w-4 text-muted-foreground" />
      </div>
      <select
        id="language-select"
        className="border rounded p-1"
        value={language}
        onChange={() => onToggle()}
      >
        <option value="en">{translations.english}</option>
        <option value="he">{translations.hebrew}</option>
      </select>
    </div>
  );
};

export default LanguageToggle;
