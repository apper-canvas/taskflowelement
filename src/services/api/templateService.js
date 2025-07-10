const templateService = {
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
          { field: { Name: "description" } },
          { field: { Name: "task_data_title" } },
          { field: { Name: "task_data_description" } },
          { field: { Name: "task_data_priority" } },
          { field: { Name: "task_data_category_id" } },
          { field: { Name: "task_data_due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } }
        ],
        orderBy: [
          {
            fieldName: "created_at",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("template", params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database fields to UI format
      return response.data.map(template => ({
        Id: template.Id,
        name: template.Name,
        description: template.description || "",
        taskData: {
          title: template.task_data_title || "",
          description: template.task_data_description || "",
          priority: template.task_data_priority || "medium",
          categoryId: template.task_data_category_id ? template.task_data_category_id.toString() : "",
          dueDate: template.task_data_due_date || ""
        },
        createdAt: template.created_at,
        updatedAt: template.updated_at
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching templates:", error?.response?.data?.message);
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
          { field: { Name: "description" } },
          { field: { Name: "task_data_title" } },
          { field: { Name: "task_data_description" } },
          { field: { Name: "task_data_priority" } },
          { field: { Name: "task_data_category_id" } },
          { field: { Name: "task_data_due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } }
        ]
      };
      
      const response = await apperClient.getRecordById("template", parseInt(id), params);
      
      if (!response.success || !response.data) {
        return null;
      }
      
      // Map database fields to UI format
      const template = response.data;
      return {
        Id: template.Id,
        name: template.Name,
        description: template.description || "",
        taskData: {
          title: template.task_data_title || "",
          description: template.task_data_description || "",
          priority: template.task_data_priority || "medium",
          categoryId: template.task_data_category_id ? template.task_data_category_id.toString() : "",
          dueDate: template.task_data_due_date || ""
        },
        createdAt: template.created_at,
        updatedAt: template.updated_at
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching template with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(templateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Generate a template name if not provided
      const templateName = templateData.name || `Template for ${templateData.title || 'Task'}`;
      
      // Only include updateable fields
      const params = {
        records: [{
          Name: templateName,
          description: templateData.description || "",
          task_data_title: templateData.title || "",
          task_data_description: templateData.description || "",
          task_data_priority: templateData.priority || "medium",
          task_data_category_id: templateData.categoryId ? parseInt(templateData.categoryId) : null,
          task_data_due_date: templateData.dueDate || "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]
      };
      
      const response = await apperClient.createRecord("template", params);
      
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
          const newTemplate = successfulRecords[0].data;
          return {
            Id: newTemplate.Id,
            name: newTemplate.Name,
            description: newTemplate.description || "",
            taskData: {
              title: newTemplate.task_data_title || "",
              description: newTemplate.task_data_description || "",
              priority: newTemplate.task_data_priority || "medium",
              categoryId: newTemplate.task_data_category_id ? newTemplate.task_data_category_id.toString() : "",
              dueDate: newTemplate.task_data_due_date || ""
            },
            createdAt: newTemplate.created_at,
            updatedAt: newTemplate.updated_at
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating template:", error?.response?.data?.message);
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
        Id: parseInt(id),
        updated_at: new Date().toISOString()
      };
      
      if (updateData.name !== undefined) updateRecord.Name = updateData.name;
      if (updateData.description !== undefined) updateRecord.description = updateData.description;
      if (updateData.taskData) {
        if (updateData.taskData.title !== undefined) updateRecord.task_data_title = updateData.taskData.title;
        if (updateData.taskData.description !== undefined) updateRecord.task_data_description = updateData.taskData.description;
        if (updateData.taskData.priority !== undefined) updateRecord.task_data_priority = updateData.taskData.priority;
        if (updateData.taskData.categoryId !== undefined) updateRecord.task_data_category_id = updateData.taskData.categoryId ? parseInt(updateData.taskData.categoryId) : null;
        if (updateData.taskData.dueDate !== undefined) updateRecord.task_data_due_date = updateData.taskData.dueDate;
      }
      
      const params = {
        records: [updateRecord]
      };
      
      const response = await apperClient.updateRecord("template", params);
      
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
          const updatedTemplate = successfulRecords[0].data;
          return {
            Id: updatedTemplate.Id,
            name: updatedTemplate.Name,
            description: updatedTemplate.description || "",
            taskData: {
              title: updatedTemplate.task_data_title || "",
              description: updatedTemplate.task_data_description || "",
              priority: updatedTemplate.task_data_priority || "medium",
              categoryId: updatedTemplate.task_data_category_id ? updatedTemplate.task_data_category_id.toString() : "",
              dueDate: updatedTemplate.task_data_due_date || ""
            },
            createdAt: updatedTemplate.created_at,
            updatedAt: updatedTemplate.updated_at
          };
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating template:", error?.response?.data?.message);
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
      
      const response = await apperClient.deleteRecord("template", params);
      
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
        console.error("Error deleting template:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      if (!query) {
        return await this.getAll();
      }
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "description" } },
          { field: { Name: "task_data_title" } },
          { field: { Name: "task_data_description" } },
          { field: { Name: "task_data_priority" } },
          { field: { Name: "task_data_category_id" } },
          { field: { Name: "task_data_due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "Name",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "description",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "task_data_title",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              }
            ]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("template", params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(template => ({
        Id: template.Id,
        name: template.Name,
        description: template.description || "",
        taskData: {
          title: template.task_data_title || "",
          description: template.task_data_description || "",
          priority: template.task_data_priority || "medium",
          categoryId: template.task_data_category_id ? template.task_data_category_id.toString() : "",
          dueDate: template.task_data_due_date || ""
        },
        createdAt: template.created_at,
        updatedAt: template.updated_at
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching templates:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
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
          { field: { Name: "description" } },
          { field: { Name: "task_data_title" } },
          { field: { Name: "task_data_description" } },
          { field: { Name: "task_data_priority" } },
          { field: { Name: "task_data_category_id" } },
          { field: { Name: "task_data_due_date" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } }
        ],
        where: [
          {
            FieldName: "task_data_category_id",
            Operator: "EqualTo",
            Values: [parseInt(categoryId)]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords("template", params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data.map(template => ({
        Id: template.Id,
        name: template.Name,
        description: template.description || "",
        taskData: {
          title: template.task_data_title || "",
          description: template.task_data_description || "",
          priority: template.task_data_priority || "medium",
          categoryId: template.task_data_category_id ? template.task_data_category_id.toString() : "",
          dueDate: template.task_data_due_date || ""
        },
        createdAt: template.created_at,
        updatedAt: template.updated_at
      }));
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching templates by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
};

export default templateService;