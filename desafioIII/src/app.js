import express from 'express';
import ProductManager from './ProductManager.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Creamos la instancia de la clase
const productManager = new ProductManager(path.join(dirname, 'productos.json'));

app.use(express.urlencoded({extended: true}));

// Ruta /products tipo get app.get llamar al método getAll de la clase ProductManager para esto hay que instanciar la clase
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.send({products});
})

//Ruta /products/:pid tipo app.get donde debemos llamar al metodo getById de la clae ProductManager usar la instancia de la clase ya creada
app.get('/products/:id', async (req, res) => {
	let products = await productManager.getProducts();
	const idProduct = Number(req.params.id)
	const product = products.find(e => e.id === idProduct)
	if (!product) return res.send({error: 'Producto no encontrado'});
	res.send(product)
})


// Había un problema de sobrescritura en la url por eso la cambié a: http://localhost:8080/products/filter/limit?limit=5

app.get('/products/filter/limit', async (req, res) => {
  let products = await productManager.getProducts();
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const firstProducts = products.slice(0, limit);
	res.send({ products: firstProducts });
});

// Alternativa idea, pero sobrescribe 
/* app.get('/products', async (req, res) => {
  let products = await productManager.getProducts();
  const limit = req.query.limit ? parseInt(req.query.limit) : 5;
  const firstProducts = products.slice(0, limit);
	res.send({ firstProducts });
}); */



app.listen(8080,()=>console.log("Listening on 8080"))