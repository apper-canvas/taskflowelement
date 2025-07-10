import categoriesData from "@/services/mockData/categories.json";

let categories = [...categoriesData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categories];
  },

  async getById(id) {
    await delay(150);
    const category = categories.find(cat => cat.Id === parseInt(id));
    return category ? { ...category } : null;
  },

  async create(categoryData) {
    await delay(250);
    const newCategory = {
      ...categoryData,
      Id: Math.max(...categories.map(c => c.Id), 0) + 1,
      taskCount: 0
    };
    categories.push(newCategory);
    return { ...newCategory };
  },

  async update(id, updateData) {
    await delay(200);
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) return null;
    
    categories[index] = { ...categories[index], ...updateData };
    return { ...categories[index] };
  },

  async delete(id) {
    await delay(200);
    const index = categories.findIndex(cat => cat.Id === parseInt(id));
    if (index === -1) return false;
    
    categories.splice(index, 1);
    return true;
  },

  async updateTaskCount(categoryId, count) {
    await delay(100);
    const index = categories.findIndex(cat => cat.Id === parseInt(categoryId));
    if (index === -1) return null;
    
    categories[index] = { ...categories[index], taskCount: count };
    return { ...categories[index] };
  }
};

export default categoryService;