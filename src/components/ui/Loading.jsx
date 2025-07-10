import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer w-48"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-64"></div>
        </div>
        <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer w-32"></div>
      </div>

      {/* Search and Filters Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer"></div>
          <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer w-32"></div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-16"></div>
                <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg shimmer"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Cards Skeleton */}
      <div className="grid gap-4">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 border-l-4 border-l-gray-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer mt-1"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-3/4"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-full"></div>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shimmer w-20"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shimmer w-16"></div>
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-full shimmer w-12"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-32"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded shimmer w-24"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;