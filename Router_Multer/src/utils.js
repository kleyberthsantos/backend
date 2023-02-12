import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

//path absoluto, obtenemos la url del proyecto: /Users/kleysantos/Desktop/backend/primerDesafio/Router_Multer/src
const __filename = fileURLToPath(import.meta.url);

//nomenclatura del path
const __dirname = dirname(__filename);



//configurando multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/img`); //lugar donde se almacenará el archivo que se adjunte
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); //datos del archivo adjunto, fecha y nombre
  }
});


const uploader = multer({
  storage, onError: (err, next) => {
    console.log(err);
    next();
  }
});

/* export default __dirname; */

// forma de exportar dos constantes
export {
  __dirname,
  uploader
};