import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/atoms/Checkbox";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import StatusBadge from "@/components/molecules/StatusBadge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = forwardRef(({ 
  task, 
  category,
  onToggleComplete,
  onEdit,
  onDelete,
  className 
}, ref) => {
  const isCompleted = task.status === "completed";
  const isOverdue = new Date(task.dueDate) < new Date() && !isCompleted;
  
  const priorityColors = {
    low: "border-l-success",
    medium: "border-l-warning", 
    high: "border-l-error"
  };

  const handleToggleComplete = () => {
    onToggleComplete(task.Id, !isCompleted);
  };

  return (
<motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className={cn(
        "bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-l-4 p-4",
        priorityColors[task.priority],
        isCompleted && "opacity-75",
        isOverdue && "bg-red-50 border-l-error",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="mt-1">
            <Checkbox
              checked={isCompleted}
              onChange={handleToggleComplete}
              className="transform transition-transform duration-200"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-semibold text-gray-900 mb-1",
              isCompleted && "line-through text-gray-500"
            )}>
              {task.title}
            </h3>
            {task.description && (
              <p className={cn(
                "text-gray-600 text-sm mb-2",
                isCompleted && "line-through text-gray-400"
              )}>
                {task.description}
              </p>
            )}
            <div className="flex items-center space-x-2 mb-2">
              <PriorityBadge priority={task.priority} />
              <StatusBadge status={task.status} />
              {category && (
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-gray-100"
          >
            <ApperIcon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.Id)}
            className="p-2 hover:bg-red-100 text-red-600"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Calendar" size={14} />
            <span className={cn(
              isOverdue && !isCompleted && "text-red-600 font-medium"
            )}>
              Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
            </span>
          </div>
          {isOverdue && !isCompleted && (
            <div className="flex items-center space-x-1 text-red-600">
              <ApperIcon name="AlertCircle" size={14} />
              <span className="font-medium">Overdue</span>
            </div>
          )}
        </div>
        
        {isCompleted && task.completedAt && (
          <div className="flex items-center space-x-1 text-green-600">
            <ApperIcon name="CheckCircle" size={14} />
            <span>Completed {format(new Date(task.completedAt), "MMM dd")}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
});

export default TaskCard;