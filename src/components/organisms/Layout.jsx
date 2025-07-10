import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <ApperIcon name="CheckSquare" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-display">
                  TaskFlow
                </h1>
                <p className="text-sm text-gray-600">
                  Organize your tasks efficiently
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ApperIcon name="Calendar" size={16} />
                <span>{new Date().toLocaleDateString("en-US", { 
                  weekday: "long", 
                  year: "numeric", 
                  month: "long", 
                  day: "numeric" 
                })}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              © 2024 TaskFlow. Built with React & Tailwind CSS.
            </div>
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-1 text-sm text-gray-600"
              >
                <ApperIcon name="Heart" size={14} className="text-red-500" />
                <span>Made with love</span>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;