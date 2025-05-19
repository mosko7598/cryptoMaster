
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react"; // Fixed import from 'react' instead of 'react-router-dom'
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import Analysis from "./pages/Analysis";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { UpdateNotification } from "./components/UpdateNotification";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

// רכיב עוטף שמגדיר את השפה לעברית
const LanguageInitializer = ({ children }) => {
  useEffect(() => {
    // הגדר עברית כשפת ברירת מחדל אם לא נבחרה שפה אחרת
    if (!localStorage.getItem('cryptomaster-language')) {
      localStorage.setItem('cryptomaster-language', 'he');
    }
  }, []);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <LanguageInitializer>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <UpdateNotification />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/welcome" element={<Index />} />
              <Route path="/dashboard" element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } />
              <Route path="/markets" element={
                <MainLayout>
                  <Markets />
                </MainLayout>
              } />
              <Route path="/analysis" element={
                <MainLayout>
                  <Analysis />
                </MainLayout>
              } />
              <Route path="/settings" element={
                <MainLayout>
                  <Settings />
                </MainLayout>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageInitializer>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
