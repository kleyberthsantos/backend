import express from 'express';

const app = express();

app.get('/saludo', (req, res) => {
  res.send('Hola a todos desde express');
});

app.get('/bienvenida', (req, res) => {
  res.send( `<h1 style="color:blue;">Bienvenido a mi primer servidor express</h1>` );
});

app.get('/usuario', (req, res) => {
  res.send( {
    nombre: 'Pepito',
    apellido: 'Perez',
    edad: 69,
    correo: 'pp@gmail.com'
  } );
});

app.listen(8080, () => console.log('Listening on port 8080'));