// crateRequire, posteriormente require que la pasa como argunmento
import { createRequire } from 'module';
import cartShopping from '../shopping/cart.shopping.js';
const require = createRequire(import.meta.url);
const fs = require('fs');
import productManager from './product.manager.js';

const pm = new productManager('../products.js');

class cartShoppingManager {
  constructor(path) {
    if (!path) {
      throw new Error("Archivo no hayado");
    } else {
      this.path = path;
      fs.existsSync(path)
        ? (this.items = JSON.parse(fs.readFileSync(this.path, "utf-8")))
        : (this.items = []);
    }
  }

  getAll() {
    return this.items;
  }

  getNextId() {
    return this.items.length > 0
      ? this.items[this.items.length - 1].idCart + 1
      : 1;
  }

  async addCart() {
    const newCart = new cartShopping();
    newCart["idCart"] = this.getNextId();
    this.items.push(newCart);
    await fs.writeFileSync(this.path, JSON.stringify(this.items, null, "\t"));
  }

  async addProductToCart(params) {
    const product = pm.getByID(params.pid);
    if (product) {
      const cart = this.items.find((i) => i.idCart == parseInt(params.cid));
      if (cart) {
        if (!cart.products) {
          cart.products = [];
        }
        if (cart.products.find((i) => i.idProduct == parseInt(params.pid)) != undefined) {
          const product_ = cart.products.find((i) => i.idProduct == parseInt(params.pid));
          product_.quantity += product.stock;
        } else {
          cart.products.push({ idProduct: parseInt(params.pid), quantity: 1 });
        }
        await fs.writeFileSync(this.path, JSON.stringify(this.items, null, "\t"));
      } else {
        throw new Error("El carrito ha sido encontrado");
      }
    } else {
      throw new Error("El producto no ha sido encontrado");
    }
  }

  async getCart(id) {
    const cart = this.items.find((i) => i.idCart == parseInt(id));
    if (!cart) {
      throw new Error("Lo siento no encontré el carrito");
    }
    return cart;
  }
}

export default cartShoppingManager;