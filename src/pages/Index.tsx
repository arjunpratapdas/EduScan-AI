import { useState, useEffect } from "react";
import { ScannerHeader } from "@/components/ScannerHeader";
import { ScanOptions } from "@/components/ScanOptions";
import { LoadingState } from "@/components/LoadingState";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { IssuesList, Issue } from "@/components/IssuesList";
import { ActionButtons } from "@/components/ActionButtons";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scanType, setScanType] = useState<"basic" | "ai">("basic");
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scanResults, setScanResults] = useState<{
    score: number;
    criticalIssues: number;
    warnings: number;
    issues: Issue[];
  } | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleStartScan = async () => {
    setIsScanning(true);
    setShowResults(false);

    // Simulate scanning process
    await new Promise((resolve) => setTimeout(resolve, 4000));

    // Mock results
    const mockResults = {
      score: 72,
      criticalIssues: 3,
      warnings: 7,
      issues: [
        {
          id: "1",
          type: "Missing Alt Text",
          severity: "critical" as const,
          description: "5 images found without alternative text descriptions",
          location: "Header section, main content area",
          recommendation: "Add descriptive alt attributes to all images to ensure screen reader accessibility.",
        },
        {
          id: "2",
          type: "Heading Hierarchy",
          severity: "warning" as const,
          description: "Skipped heading level from H1 to H3",
          location: "Main content section",
          recommendation: "Maintain sequential heading hierarchy (H1 → H2 → H3) for better document structure.",
        },
        {
          id: "3",
          type: "Color Contrast",
          severity: "critical" as const,
          description: "Text has insufficient contrast ratio (3.2:1, requires 4.5:1)",
          location: "Navigation menu, footer",
          recommendation: "Increase color contrast to meet WCAG AA standards for text readability.",
        },
        {
          id: "4",
          type: "Form Labels",
          severity: "critical" as const,
          description: "3 form inputs missing associated labels",
          location: "Contact form",
          recommendation: "Add <label> elements or aria-label attributes to all form inputs.",
        },
        {
          id: "5",
          type: "Link Text",
          severity: "warning" as const,
          description: "Generic link text like 'click here' detected",
          location: "Article section",
          recommendation: "Use descriptive link text that explains the destination or purpose.",
        },
        {
          id: "6",
          type: "Language Attribute",
          severity: "info" as const,
          description: "Document language not specified",
          location: "<html> tag",
          recommendation: "Add lang='en' attribute to the <html> element.",
        },
        {
          id: "7",
          type: "ARIA Landmarks",
          severity: "warning" as const,
          description: "Missing navigation landmarks",
          location: "Page structure",
          recommendation: "Add ARIA landmark roles or use semantic HTML5 elements (<nav>, <main>, <aside>).",
        },
        {
          id: "8",
          type: "Focus Indicators",
          severity: "warning" as const,
          description: "Custom focus styles override browser defaults",
          location: "Interactive elements",
          recommendation: "Ensure visible focus indicators for keyboard navigation accessibility.",
        },
        {
          id: "9",
          type: "Image Text Detection",
          severity: "info" as const,
          description: scanType === "ai" ? "AI detected text in 2 images: 'Learn More', 'Get Started'" : "Enable AI scan to detect text in images",
          location: "Hero section",
          recommendation: scanType === "ai" ? "Consider using actual text instead of text embedded in images." : "Use AI-enhanced scan for image text analysis.",
        },
        {
          id: "10",
          type: "Keyboard Navigation",
          severity: "warning" as const,
          description: "Some interactive elements not reachable via keyboard",
          location: "Dropdown menus",
          recommendation: "Ensure all interactive elements can be accessed using Tab and Enter keys.",
        },
      ],
    };

    setScanResults(mockResults);
    setIsScanning(false);
    setShowResults(true);

    toast({
      title: "Scan Complete",
      description: `Found ${mockResults.criticalIssues} critical issues and ${mockResults.warnings} warnings.`,
    });
  };

  const handleHighlight = () => {
    console.log("Highlighting issues on page");
  };

  const handleExport = () => {
    if (!scanResults) return;

    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      score: scanResults.score,
      summary: {
        critical: scanResults.criticalIssues,
        warnings: scanResults.warnings,
        total: scanResults.issues.length,
      },
      issues: scanResults.issues,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `accessibility-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-card shadow-2xl overflow-hidden border border-border">
          <ScannerHeader darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

          {!isScanning && !showResults && (
            <ScanOptions
              scanType={scanType}
              onScanTypeChange={setScanType}
              onStartScan={handleStartScan}
              isScanning={isScanning}
            />
          )}

          {isScanning && <LoadingState />}

          {showResults && scanResults && (
            <>
              <ScoreDisplay
                score={scanResults.score}
                criticalIssues={scanResults.criticalIssues}
                warnings={scanResults.warnings}
              />
              <IssuesList issues={scanResults.issues} />
              <ActionButtons onHighlight={handleHighlight} onExport={handleExport} />
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setShowResults(false);
                    setScanResults(null);
                  }}
                  className="w-full text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  ← Back to Scan Options
                </button>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Built with ❤️ for accessible education
        </p>
      </div>
    </div>
  );
};

export default Index;
