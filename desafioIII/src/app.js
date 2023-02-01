import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

//Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

app.use(express.urlencoded({extended: true}));

//Ruta /products tipo get app.get llamar al método getAll de la clase ProductManager para esto hay que instanciar la clase
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.send({products});
})

//Ruta /products/:pid tipo app.get donde debemos llamar al metodo getById de la clae ProductManager usar la instancia de la clase ya creada
app.get('/products/:id', async (req, res) => {
  let products = [{id: 1, name: "Escuadra"}, {id: 2, name: "Calculadora"}];
  const productId = Number(req.params.id);
  const product = products.find(p => p.id === productId);
  if(product){
    res.send({ product });
  }else{
    res.send({ error: 'Producto no encontrado' });
  }
})


app.listen(8080,()=>console.log("Listening on 8080"))

