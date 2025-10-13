import { useEffect, useState } from "react";

interface ScoreDisplayProps {
  score: number;
  criticalIssues: number;
  warnings: number;
}

export const ScoreDisplay = ({ score, criticalIssues, warnings }: ScoreDisplayProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getScoreColor = (s: number) => {
    if (s >= 80) return "gradient-success";
    if (s >= 60) return "gradient-warning";
    return "gradient-error";
  };

  const getScoreText = (s: number) => {
    if (s >= 80) return "Excellent";
    if (s >= 60) return "Good";
    return "Needs Work";
  };

  return (
    <div className="p-6 space-y-6 animate-slide-in">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <svg className="h-40 w-40 -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              className="text-muted/20"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - animatedScore / 100)}`}
              strokeLinecap="round"
              className={`${getScoreColor(score)} transition-all duration-1000 ease-out`}
              style={{ stroke: "url(#gradient)" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                {score >= 80 ? (
                  <>
                    <stop offset="0%" stopColor="hsl(142 71% 45%)" />
                    <stop offset="100%" stopColor="hsl(158 64% 52%)" />
                  </>
                ) : score >= 60 ? (
                  <>
                    <stop offset="0%" stopColor="hsl(38 92% 50%)" />
                    <stop offset="100%" stopColor="hsl(25 95% 53%)" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="hsl(0 84% 60%)" />
                    <stop offset="100%" stopColor="hsl(0 72% 51%)" />
                  </>
                )}
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-foreground">{animatedScore}</span>
            <span className="text-sm text-muted-foreground">{getScoreText(score)}</span>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col items-center rounded-lg bg-destructive/10 px-4 py-2">
            <span className="text-2xl font-bold text-destructive">{criticalIssues}</span>
            <span className="text-xs text-muted-foreground">Critical</span>
          </div>
          <div className="flex flex-col items-center rounded-lg bg-warning/10 px-4 py-2">
            <span className="text-2xl font-bold text-warning">{warnings}</span>
            <span className="text-xs text-muted-foreground">Warnings</span>
          </div>
        </div>
      </div>
    </div>
  );
};
