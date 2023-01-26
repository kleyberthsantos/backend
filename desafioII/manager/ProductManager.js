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

  async getProductById(id) { 
    try { 
        const array = await this.getProducts();
        let productoId = array.find( (item) => item.id === id);
        let productoParseado = JSON.stringify(productoId);
        if(productoId){
          console.log("Id de producto seleccionado: "+ productoParseado);
        } else {
          console.log("Error: Id Producto no encontrado");
        }
    }catch(err){
      throw err;
    }
  }

  //** 
  async updateProduct(id, thumbnail) {
    try{
      const array = await this.getProducts();
      let productoId = array.find( (item) => item.id === id);
      //console.log(JSON.stringify(productoId));
      productoId.thumbnail = thumbnail;

      let productoParseado = JSON.stringify(productoId);
      if(productoId){
        console.log("\nEste es el Update: "+ productoParseado);
      } else {
        throw err;
      }

      await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'));
      return productos;

  } catch {
    return ("\nError: Update Producto no encontrado");
  }

    }


  //** 
  async deleteProduct(id) {
    let array = await this.getProducts();
      let deleteId = array.find( (item) => item.id === id);
      
        if (deleteId) {
          let productSelected = array.splice(id -1, id-1);
          console.log("\nproducto a eliminar " + JSON.stringify(deleteId));
          console.log("\nproducto seleccionado " + JSON.stringify(productSelected));
          console.log(JSON.stringify(array));
        } else {
          console.log("\nError: Id Delete Producto no encontrado");
        }
      }
        
  }

