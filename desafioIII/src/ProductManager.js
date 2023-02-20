import { promises } from 'fs';

export default class ProductManager {

  constructor(ruta) {
    this.ruta = ruta;
  }

  async getProductsById(id) {
    try { 
      const products = await promises.readFile(this.ruta, 'utf-8');
      const productId = products.find( product => product.id === id);
      let productoParseado = JSON.stringify(productId);
      if(productoId){
        console.log("Id de producto seleccionado: "+ productoParseado);
      } else {
        console.log("Error: Id Producto no encontrado");
      }
  }catch(err){
    console.log(err);
  }
  }

  async getProducts() {
      try {
          const products = await promises.readFile(this.ruta, 'utf-8');
          return JSON.parse(products);
      } catch (error) {
        console.log(error);
        return [];
      }
  }

}

