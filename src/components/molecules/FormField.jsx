import React from "react";
import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import TextArea from "@/components/atoms/TextArea";
import Select from "@/components/atoms/Select";

const FormField = ({ 
  label, 
  type = "text", 
  required = false, 
  error, 
  className,
  children,
  ...props 
}) => {
  const renderInput = () => {
    if (children) {
      return children;
    }
    
    switch (type) {
      case "textarea":
        return <TextArea error={!!error} {...props} />;
      case "select":
        return <Select error={!!error} {...props} />;
      default:
        return <Input type={type} error={!!error} {...props} />;
    }
  };

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label required={required}>
          {label}
        </Label>
      )}
      {renderInput()}
      {error && (
        <p className="text-sm text-error mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;