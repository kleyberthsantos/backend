import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users= [];

app.get('/api/users', (req, res) =>{
  res.send(users);
});

app.post('/api/users', (req, res) => {

  // Ejemplo de lo que se debería de envíar:
  /*   {
    first_name: 'Kley',
    last_name: 'Santos',
    user_name: 'KleySant'
  } */

  const user = req.body;

  if(!user.first_name ||!user.last_name) {
    return res.status(400).send({status: 'error', message: 'Incomplete values'});
  }

  users.push(user);
  res.send({status: 'sucess', message: 'User created'});
});



app.put('/api/users/:id', (req, res) => {
  const user = req.body;
  const userId = Number(req.params.id);

  if(!user.first_name ||!user.last_name) {
    return res.status(400).send({status: 'error', message: 'Incomplete values'});
  }

  const newUSer = { id: userId, ...user };

  const index = users.findIndex( u => u.id === userId);

  if(index != -1) {
    user[index] = newUSer;
    res.send({status: 'sucess', message: 'User update'});
  } else {
    res.status(400).send({status: 'error', message: 'User not foud'});
  }
});

app.listen(8080, () => console.log('Server runnign'));