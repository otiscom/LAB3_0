const products = [];

const fs = require('fs').promises;
const path = require('path');
const fullName = path.join(
  path.dirname(require.main.filename), "data", "products.json");


const getProductsFromFile = async () => {
  try {
    const contents = await fs.readFile(fullName, 'utf-8');
    if (contents.length === 0) {
      return [];
    }else {
      return JSON.parse(contents);
    }
  } catch (error) {
    return [];
  }
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
    save() {
        this.price = Math.floor(Math.random() * 90) + 10;
        this.desc = 'A very nice ' + this.title;
        products.push(this);
    }
    static fetchAll() {
        return products;
    }
}

