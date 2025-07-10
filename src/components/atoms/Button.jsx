import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 focus:ring-primary/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary/50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
    accent: "bg-gradient-to-r from-accent to-warning text-white hover:from-accent/90 hover:to-warning/90 focus:ring-accent/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    ghost: "bg-transparent text-primary hover:bg-primary/10 focus:ring-primary/50",
    danger: "bg-gradient-to-r from-error to-red-500 text-white hover:from-error/90 hover:to-red-500/90 focus:ring-error/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    success: "bg-gradient-to-r from-success to-green-500 text-white hover:from-success/90 hover:to-green-500/90 focus:ring-success/50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-base rounded-lg",
    lg: "px-6 py-3 text-lg rounded-xl"
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;