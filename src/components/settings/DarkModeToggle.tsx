
import React from "react";
import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  darkMode: boolean;
  onChange: (value: boolean) => void;
  translation: string;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ 
  darkMode, 
  onChange, 
  translation 
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <label htmlFor="dark-mode" className="text-sm font-medium">
          {translation}
        </label>
        {darkMode ? (
          <Moon className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Sun className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <input
        id="dark-mode"
        type="checkbox"
        className="w-5 h-5 rounded"
        checked={darkMode}
        onChange={(e) => onChange(e.target.checked)}
      />
    </div>
  );
};

export default DarkModeToggle;
