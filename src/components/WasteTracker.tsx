
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface WasteTrackerProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export default function WasteTracker({ 
  percentage, 
  size = "md", 
  showLabel = true,
  className 
}: WasteTrackerProps) {
  // Determine color based on waste percentage
  const getColorClass = () => {
    if (percentage < 10) return "bg-green-500";
    if (percentage < 25) return "bg-lime-500";
    if (percentage < 50) return "bg-amber-500";
    return "bg-red-500";
  };

  // Size classes
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Average waste</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <Progress 
        value={percentage} 
        className={cn(sizeClasses[size], "bg-muted")}
        style={{ 
          "--progress-indicator-color": getColorClass().replace("bg-", "var(--") + ")",
        } as React.CSSProperties}
      />
    </div>
  );
}
