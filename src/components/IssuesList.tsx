import { useState } from "react";
import { AlertCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Issue {
  id: string;
  type: string;
  severity: "critical" | "warning" | "info";
  description: string;
  location: string;
  recommendation?: string;
}

interface IssuesListProps {
  issues: Issue[];
}

export const IssuesList = ({ issues }: IssuesListProps) => {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredIssues = issues.filter((issue) => {
    if (filter === "all") return true;
    return issue.severity === filter;
  });

  const getSeverityIcon = (severity: Issue["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "info":
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  const getSeverityColor = (severity: Issue["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-l-destructive bg-destructive/5";
      case "warning":
        return "border-l-warning bg-warning/5";
      case "info":
        return "border-l-primary bg-primary/5";
    }
  };

  return (
    <div className="space-y-4 p-6 pt-0 animate-fade-in">
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className="rounded-full"
        >
          All Issues
        </Button>
        <Button
          variant={filter === "critical" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("critical")}
          className="rounded-full"
        >
          Critical
        </Button>
        <Button
          variant={filter === "warning" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("warning")}
          className="rounded-full"
        >
          Warnings
        </Button>
        <Button
          variant={filter === "info" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("info")}
          className="rounded-full"
        >
          Info
        </Button>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto">
        {filteredIssues.map((issue, index) => (
          <div
            key={issue.id}
            className={`rounded-lg border-l-4 p-4 transition-all duration-300 cursor-pointer ${getSeverityColor(
              issue.severity
            )} hover:shadow-md`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setExpandedId(expandedId === issue.id ? null : issue.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                {getSeverityIcon(issue.severity)}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm text-foreground">{issue.type}</h4>
                    {expandedId === issue.id ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{issue.description}</p>
                  <p className="text-xs text-muted-foreground/60">📍 {issue.location}</p>
                  
                  {expandedId === issue.id && issue.recommendation && (
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-xs font-medium text-foreground mb-1">Recommendation:</p>
                      <p className="text-xs text-muted-foreground">{issue.recommendation}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
