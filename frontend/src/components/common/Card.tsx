import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  muted?: boolean;
}

export function Card({ children, className, muted = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border p-6 shadow-card transition-shadow duration-200 hover:shadow-raised",
        muted ? "bg-secondary/40" : "bg-card text-card-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
