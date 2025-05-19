
import React from "react";

interface SettingsHeaderProps {
  title: string;
  subtitle: string;
  language: "en" | "he";
  onLanguageToggle: () => void;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  subtitle,
  language,
  onLanguageToggle,
}) => {
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <button 
          onClick={onLanguageToggle} 
          className="px-4 py-2 border rounded-md hover:bg-accent transition-colors"
        >
          {language === "en" ? "עברית" : "English"}
        </button>
      </div>
    </header>
  );
};

export default SettingsHeader;
