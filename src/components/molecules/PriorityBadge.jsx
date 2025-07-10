import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, className }) => {
  const priorityConfig = {
    low: {
      variant: "success",
      icon: "ArrowDown",
      text: "Low Priority"
    },
    medium: {
      variant: "warning", 
      icon: "ArrowRight",
      text: "Medium Priority"
    },
    high: {
      variant: "error",
      icon: "ArrowUp", 
      text: "High Priority"
    }
  };

  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <Badge variant={config.variant} className={className}>
      <ApperIcon name={config.icon} size={12} className="mr-1" />
      {config.text}
    </Badge>
  );
};

export default PriorityBadge;