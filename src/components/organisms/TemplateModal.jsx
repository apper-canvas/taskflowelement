import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import templateService from "@/services/api/templateService";

const TemplateModal = ({ isOpen, onClose, onLoadTemplate, categories = [] }) => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showTemplateNameModal, setShowTemplateNameModal] = useState(false);
  const [templateName, setTemplateName] = useState("");

  useEffect(() => {
    if (isOpen) {
      loadTemplates();
    }
  }, [isOpen]);

  useEffect(() => {
if (searchQuery) {
      const filtered = templates.filter(template =>
        (template.name || template.Name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (template.description || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (template.taskData?.title || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTemplates(filtered);
    } else {
      setFilteredTemplates(templates);
    }
  }, [searchQuery, templates]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await templateService.getAll();
      setTemplates(data);
      setFilteredTemplates(data);
    } catch (err) {
      setError("Failed to load templates");
      console.error("Error loading templates:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadTemplate = async (template) => {
    try {
      const templateData = await onLoadTemplate(template.taskData);
      if (templateData) {
        toast.success(`Template "${template.name}" loaded successfully!`);
        onClose();
      }
    } catch (error) {
      toast.error("Failed to load template");
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    
    try {
      await templateService.delete(templateId);
      setTemplates(prev => prev.filter(t => t.Id !== templateId));
      toast.success("Template deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete template");
    }
  };

  const handleTemplatePreview = (template) => {
    setSelectedTemplate(template);
  };

const getCategoryName = (categoryId) => {
    const category = categories.find(c => c.Id === parseInt(categoryId));
    return category ? (category.name || category.Name) : "Unknown Category";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const TemplateCard = ({ template }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
<h3 className="font-semibold text-gray-900 mb-1">{template.name || template.Name}</h3>
          <p className="text-sm text-gray-600 mb-2">{template.taskData?.title || ""}</p>
          {template.taskData?.description && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-2">
              {template.taskData.description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-1 ml-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleTemplatePreview(template)}
            className="p-1 hover:bg-gray-100"
          >
            <ApperIcon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteTemplate(template.Id)}
            className="p-1 hover:bg-red-100 text-red-600"
          >
            <ApperIcon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
<Badge className={getPriorityColor(template.taskData?.priority || "medium")}>
          {template.taskData?.priority || "medium"}
        </Badge>
        {template.taskData?.categoryId && (
          <Badge variant="secondary">
            {getCategoryName(template.taskData.categoryId)}
          </Badge>
        )}
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Created {format(new Date(template.createdAt), "MMM d, yyyy")}
        </span>
        <Button
          size="sm"
          onClick={() => handleLoadTemplate(template)}
          className="flex items-center space-x-1"
        >
          <ApperIcon name="Download" size={14} />
          <span>Use Template</span>
        </Button>
      </div>
    </motion.div>
  );

  const TemplatePreview = ({ template }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-semibold text-gray-900">Template Preview</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedTemplate(null)}
          className="p-1"
        >
          <ApperIcon name="X" size={16} />
        </Button>
      </div>
      
      <div className="space-y-3">
<div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Template Name
          </label>
          <p className="text-sm text-gray-900">{template.name || template.Name}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task Title
          </label>
          <p className="text-sm text-gray-900">{template.taskData?.title || ""}</p>
        </div>
        
        {template.taskData?.description && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <p className="text-sm text-gray-900">{template.taskData.description}</p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <Badge className={getPriorityColor(template.taskData?.priority || "medium")}>
              {template.taskData?.priority || "medium"}
            </Badge>
          </div>
          
          {template.taskData?.categoryId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Badge variant="secondary">
                {getCategoryName(template.taskData.categoryId)}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex justify-end space-x-2 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSelectedTemplate(null)}
          >
            Close Preview
          </Button>
          <Button
            size="sm"
            onClick={() => handleLoadTemplate(template)}
            className="flex items-center space-x-1"
          >
            <ApperIcon name="Download" size={14} />
            <span>Use Template</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900 font-display">
              Task Templates
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose a template to quickly create a new task
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={onClose}
            className="p-2 hover:bg-gray-100"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className="p-6 border-b">
          <div className="relative">
            <ApperIcon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <ApperIcon name="Loader2" size={24} className="animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={loadTemplates} variant="secondary">
                Try Again
              </Button>
            </div>
          ) : (
            <>
              {selectedTemplate && (
                <TemplatePreview template={selectedTemplate} />
              )}
              
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-8">
                  <ApperIcon name="FileText" size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">
                    {searchQuery ? "No templates found matching your search" : "No templates available"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Create your first template by saving a task configuration
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTemplates.map((template) => (
                    <TemplateCard key={template.Id} template={template} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TemplateModal;