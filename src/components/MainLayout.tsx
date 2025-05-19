
import React, { useState, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChartBar, TrendingUp, Settings as SettingsIcon, LayoutDashboard, Menu, X, Brain } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "he" : "en";
    setLanguage(newLang);
  };

  const navLinks = [
    { path: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { path: "/markets", label: t("markets"), icon: ChartBar },
    { path: "/analysis", label: t("analysis"), icon: Brain },
    { path: "/settings", label: t("settings"), icon: SettingsIcon },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    return location.pathname === path;
  };

  return (
    <div className={`min-h-screen flex flex-col ${language === "he" ? "text-right" : "text-left"}`}>
      {/* Mobile navigation header */}
      <header className="lg:hidden bg-card border-b p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{t("cryptoMaster")}</h1>
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>
          <button 
            className="p-2 rounded-md hover:bg-accent"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile menu dropdown */}
      {showMobileMenu && (
        <div className="lg:hidden fixed z-20 top-[73px] left-0 right-0 bg-background border-b">
          <div className="py-2 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-2 py-3 px-2 rounded-md ${
                  isActive(link.path) 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent/50"
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center gap-2 py-3 px-2 rounded-md hover:bg-accent/50"
            >
              {language === "en" ? "עברית" : "English"}
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-card border-r p-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold">{t("cryptoMaster")}</h1>
            <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 py-3 px-2 rounded-md ${
                  isActive(link.path) 
                    ? "bg-accent text-accent-foreground" 
                    : "hover:bg-accent/50"
                }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mt-auto pt-4 border-t">
            <button
              onClick={toggleLanguage}
              className="w-full flex items-center justify-center py-2 px-4 border rounded-md hover:bg-accent transition-colors"
            >
              {language === "en" ? "עברית" : "English"}
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
