import fs from 'fs';

const path = './files/Products.json';

export default class ProductManager {
  getProducts = async() =>{
    try {
      if (fs.existsSync(path)){
        const data = await fs.promises.readFile(path, 'utf-8');
        const products = JSON.parse(data);
        return products;
      } else{
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  addProduct = async(productos) =>{
    const products = await this.getProducts();
    if (products.length === 0){
      productos.id = 1;
    } else {
      productos.id = products[products.length -1].id+1;
    }
    products.push(productos);
    
    await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
    return productos;
  }

  //** 
    getProductById = (id) => {
      const productosId = (products => products.id === id);
        if( productosId === id ){
          return productos.id;
        } else {
          console.log("Error: Producto no encontrado");
        }
      }


  //** 
    updateProduct(id, product) {
      let products = this.products.findIndex(products => products.id === id);
      if(products === -1) {
        products.id;
          return;
      } else {
      product.id = id;
      products[index] = product;
      }
    }


  //** 
    deleteProduct(id) {
    let index = (products => products.id === id);
      if(index === -1) {
      return index.id;
      } else {
        console.log("Error: Producto no eliminado");
      }
    }
}