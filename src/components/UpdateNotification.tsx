
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { checkForUpdates, UpdateInfo } from '@/services/updateService';
import { AlertTriangle, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export const UpdateNotification: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // בדיקת עדכונים בטעינת הרכיב
  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const update = await checkForUpdates();
        if (update) {
          setUpdateInfo(update);
          
          // הצג התראה על עדכון זמין
          toast({
            title: t("updateAvailable"),
            description: `${t("version")} ${update.version} ${t("isAvailable")}`,
            duration: 5000,
          });
        }
      } catch (error) {
        console.error("Failed to check for updates:", error);
      }
    };
    
    // בדוק עדכונים בטעינה ראשונית
    checkUpdates();
    
    // בדוק עדכונים כל 24 שעות (86400000ms)
    const interval = setInterval(checkUpdates, 86400000);
    
    return () => clearInterval(interval);
  }, [toast, t]);
  
  if (!updateInfo) {
    return null;
  }
  
  const handleUpdate = () => {
    window.open(updateInfo.url, '_blank');
  };
  
  // אם זה עדכון נדרש, הצג מסך חוסם
  if (updateInfo.required) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <AlertTriangle className="h-12 w-12 text-yellow-500" />
              <h2 className="text-xl font-bold">{t("requiredUpdate")}</h2>
              <p>{t("newVersionRequired").replace('{version}', updateInfo.version)}</p>
              <p className="text-sm text-muted-foreground">{updateInfo.notes}</p>
              <Button onClick={handleUpdate} className="w-full mt-4">
                <Download className="mr-2 h-4 w-4" /> {t("updateNow")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // עבור עדכונים לא נדרשים, הצג רק התראה קטנה
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Card className="w-72 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{t("updateAvailable")}</h3>
            </div>
            <p className="text-sm">{t("version")} {updateInfo.version} {t("isAvailable")}</p>
            <Button size="sm" onClick={handleUpdate} className="w-full">
              {t("updateNow")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
