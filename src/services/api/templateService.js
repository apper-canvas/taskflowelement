const STORAGE_KEY = 'task_templates';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getTemplatesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading templates from storage:', error);
    return [];
  }
};

const saveTemplatesToStorage = (templates) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch (error) {
    console.error('Error saving templates to storage:', error);
  }
};

const generateNextId = (templates) => {
  if (templates.length === 0) return 1;
  return Math.max(...templates.map(t => t.Id)) + 1;
};

const templateService = {
  async getAll() {
    await delay(200);
    const templates = getTemplatesFromStorage();
    return [...templates];
  },

  async getById(id) {
    await delay(200);
    const templates = getTemplatesFromStorage();
    const template = templates.find(t => t.Id === parseInt(id));
    return template ? { ...template } : null;
  },

  async create(templateData) {
    await delay(300);
    const templates = getTemplatesFromStorage();
    
    const newTemplate = {
      Id: generateNextId(templates),
      name: templateData.name || `Template ${templates.length + 1}`,
      description: templateData.description || '',
      taskData: {
        title: templateData.title || '',
        description: templateData.description || '',
        priority: templateData.priority || 'medium',
        categoryId: templateData.categoryId || '',
        dueDate: templateData.dueDate || ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    templates.push(newTemplate);
    saveTemplatesToStorage(templates);
    return { ...newTemplate };
  },

  async update(id, updateData) {
    await delay(250);
    const templates = getTemplatesFromStorage();
    const index = templates.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) return null;
    
    templates[index] = {
      ...templates[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    saveTemplatesToStorage(templates);
    return { ...templates[index] };
  },

  async delete(id) {
    await delay(200);
    const templates = getTemplatesFromStorage();
    const index = templates.findIndex(t => t.Id === parseInt(id));
    
    if (index === -1) return false;
    
    templates.splice(index, 1);
    saveTemplatesToStorage(templates);
    return true;
  },

  async search(query) {
    await delay(200);
    const templates = getTemplatesFromStorage();
    
    if (!query) return [...templates];
    
    const lowerQuery = query.toLowerCase();
    return templates.filter(template => 
      template.name.toLowerCase().includes(lowerQuery) ||
      template.description.toLowerCase().includes(lowerQuery) ||
      template.taskData.title.toLowerCase().includes(lowerQuery)
    );
  },

  async getByCategory(categoryId) {
    await delay(200);
    const templates = getTemplatesFromStorage();
    return templates.filter(template => 
      template.taskData.categoryId === categoryId.toString()
    );
  }
};

export default templateService;