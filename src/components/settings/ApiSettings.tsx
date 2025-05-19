
import React from "react";
import { Key } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";

interface ApiSettingsProps {
  apiKey: string;
  apiSecret: string;
  onApiKeyChange: (value: string) => void;
  onApiSecretChange: (value: string) => void;
  onConnect: () => void;
  translations: {
    apiSettings: string;
    apiDescription: string;
    apiKey: string;
    apiSecret: string;
    apiPlaceholder: string;
    secretPlaceholder: string;
    connect: string;
  };
}

const ApiSettings: React.FC<ApiSettingsProps> = ({
  apiKey,
  apiSecret,
  onApiKeyChange,
  onApiSecretChange,
  onConnect,
  translations,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{translations.apiSettings}</CardTitle>
          <Key className="h-5 w-5 text-primary" />
        </div>
        <CardDescription>{translations.apiDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label htmlFor="api-key" className="block mb-2 text-sm font-medium">
            {translations.apiKey}
          </label>
          <input
            id="api-key"
            type="text"
            placeholder={translations.apiPlaceholder}
            className="w-full p-2 border rounded-md"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="api-secret" className="block mb-2 text-sm font-medium">
            {translations.apiSecret}
          </label>
          <input
            id="api-secret"
            type="password"
            placeholder={translations.secretPlaceholder}
            className="w-full p-2 border rounded-md"
            value={apiSecret}
            onChange={(e) => onApiSecretChange(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <button 
          onClick={onConnect}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          {translations.connect}
        </button>
      </CardFooter>
    </Card>
  );
};

export default ApiSettings;
