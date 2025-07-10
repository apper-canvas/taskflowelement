import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
const TaskForm = ({ 
  task = null, 
  categories = [], 
  onSubmit, 
  onCancel,
  loading = false,
  onTemplateSelect,
  onShowTemplateModal
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    categoryId: "",
    dueDate: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "medium",
        categoryId: task.categoryId || "",
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
      });
    }
  }, [task]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
};

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else if (new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const submitData = {
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      };
      
      await onSubmit(submitData);
      
      if (!task) {
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          categoryId: "",
          dueDate: ""
        });
      }
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  const handleLoadTemplate = (templateData) => {
    setFormData({
      title: templateData.title || "",
      description: templateData.description || "",
      priority: templateData.priority || "medium",
      categoryId: templateData.categoryId || "",
      dueDate: templateData.dueDate ? new Date(templateData.dueDate).toISOString().split("T")[0] : ""
    });
    toast.success("Template loaded successfully!");
  };

  const handleSaveTemplate = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a task title before saving as template");
      return;
    }
    
    if (onTemplateSelect) {
      onTemplateSelect(formData);
    }
  };

  useEffect(() => {
    if (onTemplateSelect) {
      // This effect ensures the parent component can access the handleLoadTemplate function
      onTemplateSelect.loadTemplate = handleLoadTemplate;
    }
  }, [onTemplateSelect]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
<div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 font-display">
          {task ? "Edit Task" : "Create New Task"}
        </h2>
        <div className="flex items-center space-x-2">
          {!task && (
            <Button
              variant="ghost"
              onClick={onShowTemplateModal}
              className="p-2 hover:bg-gray-100"
              title="Use Template"
            >
              <ApperIcon name="FileText" size={20} />
            </Button>
          )}
          {!task && (
            <Button
              variant="ghost"
              onClick={handleSaveTemplate}
              className="p-2 hover:bg-gray-100"
              title="Save as Template"
            >
              <ApperIcon name="BookmarkPlus" size={20} />
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={onCancel}
            className="p-2 hover:bg-gray-100"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Task Title"
          required
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={errors.title}
          placeholder="Enter task title..."
        />

        <FormField
          label="Description"
          type="textarea"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          error={errors.description}
          placeholder="Enter task description..."
          rows={3}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Priority"
            required
            type="select"
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            error={errors.priority}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </FormField>

          <FormField
            label="Category"
            required
            type="select"
            value={formData.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            error={errors.categoryId}
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.Id} value={category.Id.toString()}>
                {category.name}
              </option>
            ))}
          </FormField>
        </div>

        <FormField
          label="Due Date"
          required
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          error={errors.dueDate}
        />

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? (
              <>
                <ApperIcon name="Loader2" size={16} className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <ApperIcon name="Save" size={16} />
                <span>{task ? "Update Task" : "Create Task"}</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default TaskForm;