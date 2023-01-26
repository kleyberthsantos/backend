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

  await manager.getProductById(1);

  await manager.updateProduct(2, "_A T R I B U T O   N U E V O_");

  await manager.deleteProduct(3);
}

managerProduct();