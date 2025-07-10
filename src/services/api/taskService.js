import templateService from "@/services/api/templateService";

const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "category_id" } },
          { field: { Name: "due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } }
        ],
        orderBy: [
          {
            fieldName: "due_date",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to UI format
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title || task.Name,
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "pending",
        categoryId: task.category_id ? task.category_id.toString() : "",
        dueDate: task.due_date,
        createdAt: task.created_at,
        completedAt: task.completed_at
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "category_id" } },
          { field: { Name: "due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } }
        ]
      };
      
      const response = await apperClient.getRecordById("task", parseInt(id), params);
      
      if (!response.success || !response.data) {
        return null;
      }
      
      // Map database fields to UI format
      const task = response.data;
      return {
        Id: task.Id,
        title: task.title || task.Name,
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "pending",
        categoryId: task.category_id ? task.category_id.toString() : "",
        dueDate: task.due_date,
        createdAt: task.created_at,
        completedAt: task.completed_at
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const params = {
        records: [{
          Name: taskData.title,
          title: taskData.title,
          description: taskData.description || "",
          priority: taskData.priority || "medium",
          status: "pending",
          category_id: taskData.categoryId ? parseInt(taskData.categoryId) : null,
          due_date: taskData.dueDate,
          created_at: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.createRecord("task", params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results && response.results.length > 0) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        if (successfulRecords.length > 0) {
          const newTask = successfulRecords[0].data;
          return {
            Id: newTask.Id,
            title: newTask.title || newTask.Name,
            description: newTask.description || "",
            priority: newTask.priority || "medium",
            status: newTask.status || "pending",
            categoryId: newTask.category_id ? newTask.category_id.toString() : "",
            dueDate: newTask.due_date,
            createdAt: newTask.created_at,
            completedAt: newTask.completed_at
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include updateable fields
      const updateRecord = {
        Id: parseInt(id)
      };
      
      if (updateData.title !== undefined) {
        updateRecord.Name = updateData.title;
        updateRecord.title = updateData.title;
      }
      if (updateData.description !== undefined) updateRecord.description = updateData.description;
      if (updateData.priority !== undefined) updateRecord.priority = updateData.priority;
      if (updateData.status !== undefined) updateRecord.status = updateData.status;
      if (updateData.categoryId !== undefined) updateRecord.category_id = updateData.categoryId ? parseInt(updateData.categoryId) : null;
      if (updateData.dueDate !== undefined) updateRecord.due_date = updateData.dueDate;
      if (updateData.completedAt !== undefined) updateRecord.completed_at = updateData.completedAt;
      
      const params = {
        records: [updateRecord]
      };
      
      const response = await apperClient.updateRecord("task", params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      if (response.results && response.results.length > 0) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        if (successfulRecords.length > 0) {
          const updatedTask = successfulRecords[0].data;
          return {
            Id: updatedTask.Id,
            title: updatedTask.title || updatedTask.Name,
            description: updatedTask.description || "",
            priority: updatedTask.priority || "medium",
            status: updatedTask.status || "pending",
            categoryId: updatedTask.category_id ? updatedTask.category_id.toString() : "",
            dueDate: updatedTask.due_date,
            createdAt: updatedTask.created_at,
            completedAt: updatedTask.completed_at
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord("task", params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async markComplete(id) {
    return await this.update(id, { 
      status: "completed", 
      completedAt: new Date().toISOString() 
    });
  },

  async markPending(id) {
    return await this.update(id, { 
      status: "pending", 
      completedAt: null 
    });
  },

  async getByCategory(categoryId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "category_id" } },
          { field: { Name: "due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } }
        ],
        where: [
          {
            FieldName: "category_id",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title || task.Name,
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "pending",
        categoryId: task.category_id ? task.category_id.toString() : "",
        dueDate: task.due_date,
        createdAt: task.created_at,
        completedAt: task.completed_at
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getByStatus(status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title" } },
          { field: { Name: "description" } },
          { field: { Name: "priority" } },
          { field: { Name: "status" } },
          { field: { Name: "category_id" } },
          { field: { Name: "due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "completed_at" } }
        ],
        where: [
          {
            FieldName: "status",
            Operator: "EqualTo",
            Values: [status]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("task", params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(task => ({
        Id: task.Id,
        title: task.title || task.Name,
        description: task.description || "",
        priority: task.priority || "medium",
        status: task.status || "pending",
        categoryId: task.category_id ? task.category_id.toString() : "",
        dueDate: task.due_date,
        createdAt: task.created_at,
        completedAt: task.completed_at
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks by status:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async saveAsTemplate(taskData) {
    const templateData = {
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      categoryId: taskData.categoryId,
      dueDate: taskData.dueDate
    };
    return await templateService.create(templateData);
  },

  async loadTemplate(templateData) {
    return { ...templateData };
  }
};

export default taskService;