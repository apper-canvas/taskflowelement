import React from "react";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status, className }) => {
  const statusConfig = {
    pending: {
      variant: "warning",
      icon: "Clock",
      text: "Pending"
    },
    completed: {
      variant: "success",
      icon: "CheckCircle",
      text: "Completed"
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant={config.variant} className={className}>
      <ApperIcon name={config.icon} size={12} className="mr-1" />
      {config.text}
    </Badge>
  );
};

export default StatusBadge;