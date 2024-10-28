import express from 'express'
import { LoginController } from '../controllers/LoginController';
import multer from 'multer';
import path from 'path'

const loginRouter = express.Router()
//const upload = multer({ dest: '../baza/slike/' })

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Korišćenje path.resolve za osiguranje apsolutne putanje
      cb(null, path.resolve(__dirname, '../../src/baza/slike'));
      //cb(null, '../baza/slike');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

loginRouter.route('/login').post(
    (req, res)=>new LoginController().login(req, res)
)

loginRouter.route('/registracija').post(upload.single('slika'),
    (req, res)=>new LoginController().registracija( req, res)
)

loginRouter.route('/promenaLozinke').post(
    (req, res)=>new LoginController().promeniLozinku(req, res)
)

loginRouter.route('/prikaziPitanje').post(
    (req, res)=>new LoginController().prikaziPitanje(req, res)
)

loginRouter.route('/proveriOdgovor').post(
    (req, res)=>new LoginController().proveriOdgovor(req, res)
)

loginRouter.route('/gosti').get(
  (req, res)=>new LoginController().gosti(req, res)
)

export default loginRouter;