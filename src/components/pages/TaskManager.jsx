import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskList from "@/components/organisms/TaskList";
import TaskForm from "@/components/organisms/TaskForm";
import TaskStats from "@/components/organisms/TaskStats";
import Button from "@/components/atoms/Button";
import useTasks from "@/hooks/useTasks";
import useCategories from "@/hooks/useCategories";
import ApperIcon from "@/components/ApperIcon";

const TaskManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const {
    tasks,
    loading: tasksLoading,
    error: tasksError,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    markTaskComplete,
    markTaskPending
  } = useTasks();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    loadCategories
  } = useCategories();

  const handleCreateTask = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSubmitTask = async (taskData) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        await updateTask(editingTask.Id, taskData);
        toast.success("Task updated successfully!");
      } else {
        await createTask(taskData);
        toast.success("Task created successfully!");
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (error) {
      toast.error("Failed to save task. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

const handleToggleComplete = async (taskId, completed) => {
    if (completed) {
      await markTaskComplete(taskId);
    } else {
      await markTaskPending(taskId);
    }
  };

const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
  };

  const handleRetry = () => {
    loadTasks();
    loadCategories();
  };

  return (
    <div className="space-y-6">
      {/* Header with Stats Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            Task Manager
          </h1>
          <p className="text-gray-600 mt-1">
            Stay organized and productive with your task management
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant={showStats ? "primary" : "secondary"}
            onClick={() => setShowStats(!showStats)}
            className="flex items-center space-x-2"
          >
            <ApperIcon name={showStats ? "List" : "BarChart3"} size={16} />
            <span>{showStats ? "View Tasks" : "View Stats"}</span>
          </Button>
          {!showStats && (
            <Button
              onClick={handleCreateTask}
              className="flex items-center space-x-2"
            >
              <ApperIcon name="Plus" size={16} />
              <span>New Task</span>
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task List / Stats */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {showStats ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskStats tasks={tasks} categories={categories} />
              </motion.div>
            ) : (
              <motion.div
                key="tasks"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskList
                  tasks={tasks}
                  categories={categories}
                  loading={tasksLoading}
                  error={tasksError}
                  onToggleComplete={handleToggleComplete}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onCreateTask={handleCreateTask}
                  onRetry={handleRetry}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Task Form */}
        <div className="lg:col-span-1">
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <TaskForm
                  task={editingTask}
                  categories={categories}
                  onSubmit={handleSubmitTask}
                  onCancel={handleCloseForm}
                  loading={formLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;