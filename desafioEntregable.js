class ProductManager {

  constructor(){
    this.products = [];
    this.idProduct = 0;
  }


  //método getProducts
  getProducts = () => {
    return this.products;
  }


  //método addProduct
  addProduct = ( title, description, price, thumbnail, code, stock ) => {

    for (const addAProduct of this.products) {
      if(addAProduct.code === code){
        console.log("El código de producto ya existe");
        return;
      }
    }
        const addAProduct = {
            id: this.idProduct++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
            
        }

        

        this.products.push(addAProduct);
      }
      
  getProductById(id) {
    for (let addAProduct of this.products){
      if( addAProduct.id === id ){
        addAProduct.id;
        return;
      } else {
        console.log("Error: Producto no encontrado");
      }
    }
  }

  
}

//Prueba
const productManager = new ProductManager();

//muestra el array de producto vacío
console.log(productManager.getProducts());

//encuenta el producto y muestra: el producto agregado posterior al array vacío
try {
  //producto 0
  productManager.addProduct( "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
} catch (error) {
  console.log(error);
}


//agregamos 2 productos, fijar el resultado en los code
//producto 1, se omitirá porque tiene el mismo code del 0
productManager.addProduct( "producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
console.log(productManager.getProducts());
//producto 2
productManager.addProduct( "producto nuevo", "Este es un nuevo producto", 200, "Sin imagen", "abc1234", 25);
console.log(productManager.getProducts());
/* //producto id 3
productManager.addProduct( "producto nuevo", "Este es un nuevo producto", 200, "Sin imagen", "abc12345", 25);
console.log(productManager.getProducts()); */



  //busca producto con id diferente si encuentra el producto lo muestra con id 2
  try {
    console.log(productManager.getProductById(4)); 
  } catch (error) {
  //si no encuentra el producto indica: producto no encontrado
  console.log(error); 
}