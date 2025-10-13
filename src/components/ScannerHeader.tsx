import { Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScannerHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const ScannerHeader = ({ darkMode, onToggleDarkMode }: ScannerHeaderProps) => {
  return (
    <header className="relative overflow-hidden rounded-t-2xl p-6 pb-8">
      <div className="absolute inset-0 gradient-primary opacity-90" />
      <div className="absolute inset-0 glass" />
      
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <svg
              className="h-7 w-7 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z" />
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="1" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">EduScan AI</h1>
            <p className="text-sm text-white/80">Free Accessibility Scanner</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="h-9 w-9 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 animate-scale-in" />
            ) : (
              <Moon className="h-4 w-4 animate-scale-in" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-all duration-300"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
