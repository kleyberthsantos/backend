// crateRequire, posteriormente require que la pasa como argunmento
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
import Product from '../shopping/product.shopping.js';

class productShoppingManager {
  constructor(path) {
    if (!path) {
      throw new Error('Archivo no encontrado')
    } else {
      this.path = path
      fs.existsSync(path)
        ? (this.items = JSON.parse(fs.readFileSync(this.path, 'utf-8')))
        : (this.items = [])
    }
  }

  async getAll() {
    return this.items
  }

  async getByID(id) {
    const item = this.items.find((item) => item.id === parseInt(id))
    if (item) {
      return item
    } else {
      throw new Error('El id de producto no existe')
    }
  }

  async getNextId() {
    return this.items.length > 0 ? this.items[this.items.length - 1].id + 1 : 1
  }

  async addProduct(item) {
    const newProduct = new Product(
      item.title,
      item.description,
      item.price,
      item.thumbnail,
      item.code,
      item.stock,
      item.category,
    )
    if (!this.items.find((p) => p.code === newProduct.code)) {
      newProduct['id'] = await this.getNextId()
      this.items.push(newProduct)
      await fs.writeFileSync(this.path, JSON.stringify(this.items, null, '\t'))
    } else {
      throw new Error('El producto ya existe')
    }
  }

  async updateProduct(id, product) {
    const index = this.items.findIndex((p) => p.id === parseInt(id))
    if (index >= 0) {
      this.items[index] = { ...this.items[index], ...product }
      await fs.writeFileSync(this.path, JSON.stringify(this.items, null, '\t'))
    } else {
      throw new Error('El id del producto no existe')
    }
  }

  async delete(id) {
    const index = this.items.findIndex((p) => p.id === parseInt(id))
    if (index >= 0) {
      this.items.splice(index, 1)
      await fs.writeFileSync(this.path, JSON.stringify(this.items, null, '\t'))
    } else {
      throw new Error('El producto no existe')
    }
  }
}

export default productShoppingManager;

