
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed animate-[fadeIn_0.5s_ease-out]",
        className
      )}
    >
      <Icon className="h-12 w-12 text-muted-foreground/40 mb-4" />
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">{description}</p>
      )}
      {actionText && onAction && (
        <Button 
          onClick={onAction} 
          variant="outline" 
          className="mt-2 button-hover"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}
