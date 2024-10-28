import express from 'express'
import { AdminController } from '../controllers/AdminController';
import multer from 'multer';
import path from 'path'

const adminRouter = express.Router()

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

adminRouter.route('/zahtevi').get(
    (req, res) => new AdminController().zahtevi(req, res)
);

adminRouter.route('/odobri').post(
    (req, res) => new AdminController().odobri(req, res)
);

adminRouter.route('/deaktiviraj').post(
    (req, res) => new AdminController().deaktiviraj(req, res)
);

adminRouter.route('/konobar').post(
    (req, res) => new AdminController().konobar(req, res)
);

adminRouter.route('/restoran').post(
    (req, res) => new AdminController().restoran(req, res)
);

export default adminRouter;