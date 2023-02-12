import { Router } from "express";

//para usar el archivo que se suba en uploader declarado en users
import { uploader } from "../utils.js";

const router = Router ();

const pets = [];

router.get('/', (req, res) => {
  res.send({ pets });
});

router.post('/', uploader.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.send({status: 'error'});
  const pet = req.body;
  pet.profile = req.file.path; //busca la imagen en el directorio public
  pets.push(pet);
  res.send({ status: 'success' });
})

export default router;