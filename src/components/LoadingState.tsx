import { useEffect, useState } from "react";
import { Bot } from "lucide-react";

const loadingMessages = [
  "Extracting content...",
  "Analyzing accessibility...",
  "Running AI analysis...",
  "Checking WCAG compliance...",
  "Almost done...",
];

export const LoadingState = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 animate-pulse-ring">
          <div className="h-24 w-24 rounded-full border-4 border-primary/30" />
        </div>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full gradient-primary">
          <Bot className="h-12 w-12 text-white animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-foreground animate-pulse">
          {loadingMessages[messageIndex]}
        </p>
        <p className="text-sm text-muted-foreground">
          This may take a few moments
        </p>
      </div>
      
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-2 w-2 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};
