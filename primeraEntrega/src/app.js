import express from 'express';
import cartsRouter from './routes/carts.router.js';
import productsRouter from './routes/products.router.js';

const app = express();

//setear que el soporte va a recibir un body en la petición y dar soporte para lo que se reciba
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => {
    console.log('Server runing');
});
