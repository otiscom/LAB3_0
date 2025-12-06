const fs = require('fs').promises;
const path = require('path');

const products = [];

const fullName = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = async () => {
  try {
    const contents = await fs.readFile(fullName, 'utf-8');

    if (!contents || contents.trim().length === 0) {
      return [];
    } else {
      return JSON.parse(contents);
    }
  } catch (error) {
    return [];
  }
};

module.exports = class Product {
  constructor(t,img, p, d) {
    this.title = t;
    this.image = img;
    this.price = p;
    this.desc = d;
    
  }

  async save() {
    products.length = 0;
    try {
      const prodsFromFile = await getProductsFromFile();
      products.push(...prodsFromFile);
      products.push(this);
      await fs.writeFile(fullName, JSON.stringify(products));
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchAll() {
    products.length = 0;
    try {
      const prodsFromFile = await getProductsFromFile();
      products.push(...prodsFromFile);
      return products;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
};
