import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked = false,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer flex items-center justify-center",
          checked 
            ? "bg-gradient-to-r from-primary to-secondary border-primary text-white scale-105" 
            : "border-gray-300 bg-white hover:border-primary/50",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon 
            name="Check" 
            size={12} 
            className="text-white animate-bounce-in"
          />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;