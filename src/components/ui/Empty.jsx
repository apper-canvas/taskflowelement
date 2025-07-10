import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found",
  description = "Get started by creating your first item.",
  actionText = "Create New",
  onAction,
  icon = "FileText"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full mx-auto mb-6">
          <ApperIcon name={icon} size={40} className="text-primary" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            className="flex items-center space-x-2 mx-auto"
          >
            <ApperIcon name="Plus" size={16} />
            <span>{actionText}</span>
          </Button>
        )}
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Lightbulb" size={14} />
              <span>Stay organized</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Target" size={14} />
              <span>Be productive</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="CheckCircle" size={14} />
              <span>Get things done</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;