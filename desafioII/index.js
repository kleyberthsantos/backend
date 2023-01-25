import ProductManager from "./manager/ProductManager.js";

const manager = new ProductManager();

const managerProduct = async() => {
  let productos = await manager.getProducts();
  console.log(productos);

  const product = {
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock:25
  }

  await manager.addProduct(product);

  productos = await manager.getProducts();

  await manager.getProductById(4);
  console.log(product);

  await manager.deleteProduct(5);
  try {
  product = manager.getProductById(5);
  } catch(error) {
  console.log(error.message);
  }
}

managerProduct();