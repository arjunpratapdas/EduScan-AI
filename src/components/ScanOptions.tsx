import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sparkles, Zap } from "lucide-react";

interface ScanOptionsProps {
  scanType: "basic" | "ai";
  onScanTypeChange: (type: "basic" | "ai") => void;
  onStartScan: () => void;
  isScanning: boolean;
}

export const ScanOptions = ({
  scanType,
  onScanTypeChange,
  onStartScan,
  isScanning,
}: ScanOptionsProps) => {
  return (
    <div className="space-y-4 p-6">
      <RadioGroup
        value={scanType}
        onValueChange={(value) => onScanTypeChange(value as "basic" | "ai")}
        className="space-y-3"
      >
        <div
          className={`flex items-center space-x-3 rounded-xl border-2 p-4 transition-all duration-300 cursor-pointer ${
            scanType === "basic"
              ? "border-primary bg-primary/5 shadow-lg"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => onScanTypeChange("basic")}
        >
          <RadioGroupItem value="basic" id="basic" />
          <Label
            htmlFor="basic"
            className="flex flex-1 items-center gap-2 cursor-pointer font-medium"
          >
            <Zap className="h-5 w-5 text-primary" />
            <span>Basic Scan (Free)</span>
          </Label>
        </div>

        <div
          className={`flex items-center space-x-3 rounded-xl border-2 p-4 transition-all duration-300 cursor-pointer ${
            scanType === "ai"
              ? "border-primary bg-primary/5 shadow-lg"
              : "border-border hover:border-primary/50"
          }`}
          onClick={() => onScanTypeChange("ai")}
        >
          <RadioGroupItem value="ai" id="ai" />
          <Label
            htmlFor="ai"
            className="flex flex-1 items-center gap-2 cursor-pointer font-medium"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI Enhanced (Free)</span>
          </Label>
        </div>
      </RadioGroup>

      <Button
        onClick={onStartScan}
        disabled={isScanning}
        className="w-full h-14 text-lg font-semibold rounded-xl gradient-primary text-white hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
      >
        {isScanning ? (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            <span>Scanning...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            <span>Start Free Scan</span>
          </div>
        )}
      </Button>
    </div>
  );
};
