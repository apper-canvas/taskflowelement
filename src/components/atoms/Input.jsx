import React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef(({ 
  className, 
  type = "text", 
  error = false,
  ...props 
}, ref) => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 placeholder:text-gray-400";
  
  const stateClasses = error 
    ? "border-error focus:ring-error/50 focus:border-error" 
    : "border-gray-300 focus:ring-primary/50 focus:border-primary hover:border-gray-400";

  return (
    <input
      type={type}
      className={cn(
        baseClasses,
        stateClasses,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;