import tasksData from "@/services/mockData/tasks.json";
import templateService from "@/services/api/templateService";

let tasks = [...tasksData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },

  async getById(id) {
    await delay(200);
    const task = tasks.find(task => task.Id === parseInt(id));
    return task ? { ...task } : null;
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      ...taskData,
      Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    tasks.push(newTask);
    return { ...newTask };
  },

  async update(id, updateData) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index] = { ...tasks[index], ...updateData };
    return { ...tasks[index] };
  },

  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return false;
    
    tasks.splice(index, 1);
    return true;
  },

  async markComplete(id) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      status: "completed",
      completedAt: new Date().toISOString()
    };
    return { ...tasks[index] };
  },

  async markPending(id) {
    await delay(250);
    const index = tasks.findIndex(task => task.Id === parseInt(id));
    if (index === -1) return null;
    
    tasks[index] = {
      ...tasks[index],
      status: "pending",
      completedAt: null
    };
    return { ...tasks[index] };
  },

  async getByCategory(categoryId) {
    await delay(200);
    return tasks.filter(task => task.categoryId === categoryId.toString()).map(task => ({ ...task }));
  },

async getByStatus(status) {
    await delay(200);
    return tasks.filter(task => task.status === status).map(task => ({ ...task }));
  },

  async saveAsTemplate(taskData) {
    await delay(200);
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
    await delay(200);
    return { ...templateData };
  }
};

export default taskService;