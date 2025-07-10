import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import TaskCard from "@/components/molecules/TaskCard";
import SearchBar from "@/components/molecules/SearchBar";
import FilterBar from "@/components/molecules/FilterBar";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";

const TaskList = ({ 
  tasks = [], 
  categories = [], 
  loading = false, 
  error = null,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onCreateTask,
  onRetry
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    category: "all"
  });
  const [sortBy, setSortBy] = useState("dueDate");

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filters.status === "all" || task.status === filters.status;
      const matchesPriority = filters.priority === "all" || task.priority === filters.priority;
      const matchesCategory = filters.category === "all" || task.categoryId === filters.category;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });

    // Sort tasks
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [tasks, searchTerm, filters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      priority: "all", 
      category: "all"
    });
    setSearchTerm("");
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await onToggleComplete(taskId, completed);
      toast.success(completed ? "Task completed! 🎉" : "Task marked as pending");
    } catch (error) {
      toast.error("Failed to update task status");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDeleteTask(taskId);
        toast.success("Task deleted successfully");
      } catch (error) {
        toast.error("Failed to delete task");
      }
    }
  };

  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.Id.toString() === categoryId);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            My Tasks
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredAndSortedTasks.length} task{filteredAndSortedTasks.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <Button
          onClick={onCreateTask}
          className="flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={16} />
          <span>New Task</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="created">Created Date</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>

        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          categories={categories}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Task List */}
      {filteredAndSortedTasks.length === 0 ? (
        <Empty 
          title="No tasks found"
          description={searchTerm || filters.status !== "all" || filters.priority !== "all" || filters.category !== "all" 
            ? "Try adjusting your search or filters to find tasks."
            : "Get started by creating your first task!"
          }
          actionText="Create New Task"
          onAction={onCreateTask}
        />
      ) : (
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {filteredAndSortedTasks.map(task => (
              <TaskCard
                key={task.Id}
                task={task}
                category={getCategoryById(task.categoryId)}
                onToggleComplete={handleToggleComplete}
                onEdit={onEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default TaskList;