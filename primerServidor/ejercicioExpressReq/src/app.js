import express from 'express';

const app = express();

const usuarios = [
  {id:1, nombre: 'kley', apellido: 'santos', edad: 32, genero: 'M'},
  {id:2, nombre: 'Val', apellido: 'Neira', edad: 32, genero: 'F'},
  {id:3, nombre: 'Steven', apellido: 'santos', edad: 32, genero: 'M'},
  {id:4, nombre: 'Javiera', apellido: 'cortes', edad: 32, genero: 'F'},
]

// path params
app.get('/usuario/:id', (req, res) => {
  const idUsuario = Number(req.params.id);
  const usuario = usuarios.find(u => u.id === idUsuario);
  if(!usuario) return res.send({error: 'Usuario invalido'});
  
  res.send(usuario);
});

// query params

app.get('/query/params', (req, res) => {
  const { genero, edad, id } = req.query;

  if(!genero || (genero !== 'M' && genero !== 'F')) return res.send(usaurios);

  const usuariosFiltrados = usuarios.filter(u => u.genero === genero);

  res.send(usuariosFiltrados);
});

app.listen(8080, () => console.log('Listening on port 8080'));