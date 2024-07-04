import React from "react";

export function AiLoading() {
  return (
    <div className="flex  z-50  flex-col items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-pulse bg-gradient-to-r from-primary to-primary-foreground rounded-full" />
          <span className="ml-2 text-muted-foreground">
            Generating AI-powered content...
          </span>
        </div>
        <p className="text-muted-foreground">
          Please wait while we create something amazing for you.
        </p>
      </div>
    </div>
  );
}
