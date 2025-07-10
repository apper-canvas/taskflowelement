import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "md",
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20",
    success: "bg-gradient-to-r from-success/10 to-green-500/10 text-success border border-success/20",
    warning: "bg-gradient-to-r from-warning/10 to-accent/10 text-warning border border-warning/20",
    error: "bg-gradient-to-r from-error/10 to-red-500/10 text-error border border-error/20",
    accent: "bg-gradient-to-r from-accent/10 to-warning/10 text-accent border border-accent/20"
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  return (
    <span
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;