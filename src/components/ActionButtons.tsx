import { Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  onHighlight: () => void;
  onExport: () => void;
}

export const ActionButtons = ({ onHighlight, onExport }: ActionButtonsProps) => {
  const handleHighlight = () => {
    onHighlight();
    toast({
      title: "Issues Highlighted",
      description: "Accessibility issues are now highlighted on the page.",
    });
  };

  const handleExport = () => {
    onExport();
    toast({
      title: "Report Exported",
      description: "Your accessibility report has been downloaded.",
    });
  };

  return (
    <div className="flex gap-3 p-6 pt-0">
      <Button
        onClick={handleHighlight}
        variant="outline"
        className="flex-1 rounded-xl hover:bg-primary/5 hover:border-primary transition-all duration-300"
      >
        <Eye className="h-4 w-4 mr-2" />
        Highlight Issues
      </Button>
      <Button
        onClick={handleExport}
        variant="outline"
        className="flex-1 rounded-xl hover:bg-primary/5 hover:border-primary transition-all duration-300"
      >
        <Download className="h-4 w-4 mr-2" />
        Export Report
      </Button>
    </div>
  );
};
