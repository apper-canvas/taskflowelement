import React from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry,
  title = "Oops! Something went wrong"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-error/10 to-red-500/10 rounded-full mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="primary"
              className="flex items-center space-x-2"
            >
              <ApperIcon name="RefreshCw" size={16} />
              <span>Try Again</span>
            </Button>
          )}
          
          <Button
            onClick={() => window.location.reload()}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <ApperIcon name="RotateCcw" size={16} />
            <span>Reload Page</span>
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            If the problem persists, please check your internet connection.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Error;