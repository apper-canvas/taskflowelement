import React from "react";
import { motion } from "framer-motion";
import ProgressRing from "@/components/molecules/ProgressRing";
import ApperIcon from "@/components/ApperIcon";

const TaskStats = ({ tasks = [], categories = [] }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const overdueTasks = tasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && task.status === "pending";
  }).length;

  const priorityStats = {
    high: tasks.filter(task => task.priority === "high" && task.status === "pending").length,
    medium: tasks.filter(task => task.priority === "medium" && task.status === "pending").length,
    low: tasks.filter(task => task.priority === "low" && task.status === "pending").length
  };

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: "CheckSquare",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Pending",
      value: pendingTasks,
      icon: "Clock",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      title: "Overdue",
      value: overdueTasks,
      icon: "AlertCircle",
      color: "text-error",
      bgColor: "bg-error/10"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <ApperIcon name={stat.icon} size={24} className={stat.color} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress and Priority Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
          <div className="flex items-center justify-center">
            <ProgressRing progress={completionRate} size={120} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              {completedTasks} of {totalTasks} tasks completed
            </p>
          </div>
        </motion.div>

        {/* Priority Breakdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Breakdown</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">High Priority</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{priorityStats.high}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Medium Priority</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{priorityStats.medium}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Low Priority</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{priorityStats.low}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskStats;