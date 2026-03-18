import { Loader2 } from "lucide-react";

export default function loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        
        {/* Spinner */}
        <div className="p-4 rounded-full bg-primary/10">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>

        {/* Text */}
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground">
            Loading your workspace
          </p>
          <p className="text-xs text-muted-foreground">
            Please wait a moment...
          </p>
        </div>

      </div>
    </div>
  );
}
