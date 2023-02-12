import express from "express";
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import { __dirname } from "./utils.js";

const app = express();

//1ER middleware nivel apliación (ojo se ejecutan en cascada)
app.use((req, res, next) => {
  console.log('time: ', Date.now());
  next();
})

//función middleware nivel endpoint
function middleware1(req, res, next) {
  req.dato1 = 'un dato'; 
  next();
}


//setear que el soporte va a recibir un body en la petición y dar soporte para lo que se reciba
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//path virtual sin declarar el path absoluto, ruta: http://localhost:8080/static/img/img.jpg
/* app.use('/static', express.static('public')); */

//path absoluto, ruta: http://localhost:8080/static/img/img.jpg
app.use('/static', express.static(`${__dirname}/public`));


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

//servicio individual middleware1
app.get('/test', middleware1, (req, res) => {
  console.log(req.dato1);
  console.log(soyerror); //gatilla el error y lo controla con el middlewate de la línea 44
  res.send({message: 'Hola tester'});
});


//middleware para menejo de errores, siempre va al final
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Broken');
})

app.listen(8080, () => console.log('Server running'));