
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { UpdateNotification } from "./components/UpdateNotification";
import { LanguageProvider } from "./contexts/LanguageContext";

// Lazy-load pages to improve initial loading time
const MainLayout = lazy(() => import("./components/MainLayout"));
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Markets = lazy(() => import("./pages/Markets"));
const Analysis = lazy(() => import("./pages/Analysis"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

// מגדיר QueryClient עם אופטימיזציות לביצועים
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // מונע בקשות מיותרות כשחוזרים לחלון
      staleTime: 1000 * 60 * 5, // 5 דקות של תקפות נתונים לפני טעינה חוזרת
      gcTime: 1000 * 60 * 30, // 30 דקות של שמירת נתונים במטמון (שונה מ-cacheTime)
    },
  },
});

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

// Loading fallback component for Suspense
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <LanguageInitializer>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <UpdateNotification />
            <Suspense fallback={<PageLoading />}>
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
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageInitializer>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
