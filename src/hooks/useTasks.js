import { useState, useEffect } from "react";
import taskService from "@/services/api/taskService";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error loading tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError("Failed to create task. Please try again.");
      console.error("Error creating task:", err);
      throw err;
    }
  };

  const updateTask = async (id, updateData) => {
    try {
      const updatedTask = await taskService.update(id, updateData);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === parseInt(id) ? updatedTask : task
        ));
        return updatedTask;
      }
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.Id !== parseInt(id)));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error("Error deleting task:", err);
      throw err;
    }
  };

  const markTaskComplete = async (id) => {
    try {
      const updatedTask = await taskService.markComplete(id);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === parseInt(id) ? updatedTask : task
        ));
        return updatedTask;
      }
    } catch (err) {
      setError("Failed to mark task as complete. Please try again.");
      console.error("Error marking task complete:", err);
      throw err;
    }
  };

  const markTaskPending = async (id) => {
    try {
      const updatedTask = await taskService.markPending(id);
      if (updatedTask) {
        setTasks(prev => prev.map(task => 
          task.Id === parseInt(id) ? updatedTask : task
        ));
        return updatedTask;
      }
    } catch (err) {
      setError("Failed to mark task as pending. Please try again.");
      console.error("Error marking task pending:", err);
      throw err;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    markTaskComplete,
    markTaskPending
  };
};

export default useTasks;