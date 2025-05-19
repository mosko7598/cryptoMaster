
// שירות לבדיקת עדכוני גרסאות של האפליקציה

// גרסה נוכחית של האפליקציה (יש לעדכן בכל שחרור)
export const APP_VERSION = '1.0.0';

// ממשק לפרטי עדכון
export interface UpdateInfo {
  version: string;
  required: boolean;
  url: string;
  notes: string;
}

/**
 * פונקציה לבדיקת עדכונים זמינים
 * במימוש אמיתי, זו תהיה קריאת API לשרת שמחזיר את פרטי העדכון האחרון
 */
export const checkForUpdates = async (): Promise<UpdateInfo | null> => {
  try {
    // בדוגמה זו אנחנו מדמים קריאת API
    // במימוש אמיתי, זה יהיה משהו כמו:
    // const response = await fetch('https://api.yourserver.com/updates/check');
    // const data = await response.json();
    
    // מידע לדוגמה (במימוש אמיתי זה יגיע מהשרת)
    const latestVersion = '1.0.0'; // שנה כדי לבדוק את לוגיקת העדכון
    
    // בדיקה אם הגרסה הנוכחית שונה מהגרסה האחרונה
    if (compareVersions(latestVersion, APP_VERSION) > 0) {
      return {
        version: latestVersion,
        required: false, // האם העדכון נדרש (חובה)
        url: 'https://yourwebsite.com/download',
        notes: 'שיפורי ביצועים ותיקוני באגים',
      };
    }
    
    return null; // אין עדכון זמין
  } catch (error) {
    console.error('שגיאה בבדיקת עדכונים:', error);
    return null;
  }
};

/**
 * פונקציית השוואה בין גרסאות
 * מחזירה:
 * 1 אם v1 חדשה יותר מ-v2
 * -1 אם v1 ישנה יותר מ-v2
 * 0 אם הגרסאות זהות
 */
export const compareVersions = (v1: string, v2: string): number => {
  const v1Parts = v1.split('.').map(Number);
  const v2Parts = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
    const v1Part = v1Parts[i] || 0;
    const v2Part = v2Parts[i] || 0;
    
    if (v1Part > v2Part) return 1;
    if (v1Part < v2Part) return -1;
  }
  
  return 0;
};
