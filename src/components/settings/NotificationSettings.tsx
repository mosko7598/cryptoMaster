
import React from "react";
import { Bell } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";

interface NotificationsState {
  priceAlerts: boolean;
  newsAlerts: boolean;
  tradingAlerts: boolean;
}

interface NotificationSettingsProps {
  notifications: NotificationsState;
  onNotificationChange: (notifications: NotificationsState) => void;
  translations: {
    notificationSettings: string;
    notificationDescription: string;
    priceAlerts: string;
    newsAlerts: string;
    tradingAlerts: string;
  };
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  notifications,
  onNotificationChange,
  translations,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{translations.notificationSettings}</CardTitle>
          <Bell className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>{translations.notificationDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="price-alerts" className="text-sm font-medium">
            {translations.priceAlerts}
          </label>
          <input
            id="price-alerts"
            type="checkbox"
            className="w-5 h-5 rounded"
            checked={notifications.priceAlerts}
            onChange={(e) => onNotificationChange({
              ...notifications, 
              priceAlerts: e.target.checked
            })}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="news-alerts" className="text-sm font-medium">
            {translations.newsAlerts}
          </label>
          <input
            id="news-alerts"
            type="checkbox"
            className="w-5 h-5 rounded"
            checked={notifications.newsAlerts}
            onChange={(e) => onNotificationChange({
              ...notifications, 
              newsAlerts: e.target.checked
            })}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="trading-alerts" className="text-sm font-medium">
            {translations.tradingAlerts}
          </label>
          <input
            id="trading-alerts"
            type="checkbox"
            className="w-5 h-5 rounded"
            checked={notifications.tradingAlerts}
            onChange={(e) => onNotificationChange({
              ...notifications, 
              tradingAlerts: e.target.checked
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
