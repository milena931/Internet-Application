import express from 'express'
import { GuestController } from '../controllers/GuestController';
import multer from 'multer';
import path from 'path'

const guestRouter = express.Router()

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

guestRouter.route('/brojGostiju').get(
  (req, res) => new GuestController().gosti(req, res)
);

guestRouter.route('/brojRestorana').get(
  (req, res) => new GuestController().restorani(req, res)
);

guestRouter.route('/konobari').get(
  (req, res) => new GuestController().konobari(req, res)
);

guestRouter.route('/rezervacije').get(
  (req, res) => new GuestController().rezervacije(req, res)
);

guestRouter.route('/dohvatiRezervacijeRestorana').post(
  (req, res) => new GuestController().rezervacijeRestorana(req, res)
);

guestRouter.route('/dohvatiRezervacijeGosta').post(
  (req, res) => new GuestController().rezervacijeGosta(req, res)
);

guestRouter.route('/dohvatiOceneGosta').post(
  (req, res) => new GuestController().oceneGosta(req, res)
);

guestRouter.route('/rezervisiRestoran').post(
  (req, res) => new GuestController().rezervisiRestoran(req, res)
);

guestRouter.route('/rezervisiRestoranPanel').post(
  (req, res) => new GuestController().rezervisiRestoranPanel(req, res)
);

guestRouter.route('/ocene').get(
  (req, res) => new GuestController().ocene(req, res)
);

guestRouter.route('/dohvatiRestoran').post(
  (req, res) => new GuestController().dohvRestoran(req, res)
)

guestRouter.route('/dohvatiGosta').post(
  (req, res) => new GuestController().dohvKorisnika(req, res)
)

guestRouter.route('/dohvatiSliku/:rel_putanja').get(
  (req, res) => new GuestController().dohvSliku(req, res)
);

guestRouter.route('/promeniProfilnuSliku').post(upload.single('novaSlika'),
  (req, res) => new GuestController().promeniProfilnuSliku(req, res)
);


guestRouter.route('/promeniIme').post(
  (req, res) => new GuestController().promeniIme(req, res)
)

guestRouter.route('/promeniPrezime').post(
  (req, res) => new GuestController().promeniPrezime(req, res)
)

guestRouter.route('/promeniMejl').post(
  (req, res) => new GuestController().promeniMejl(req, res)
)

guestRouter.route('/promeniAdresu').post(
  (req, res) => new GuestController().promeniAdresu(req, res)
)

guestRouter.route('/promeniKontakt').post(
  (req, res) => new GuestController().promeniKontakt(req, res)
)

guestRouter.route('/promeniKarticu').post(
  (req, res) => new GuestController().promeniKarticu(req, res)
)

guestRouter.route('/dohvatiJela').post(
  (req, res) => new GuestController().dohvJela(req, res)
)

guestRouter.route('/dodajPorudzbinu').post(
  (req, res) => new GuestController().dodajPorudzbinu(req, res)
)

guestRouter.route('/dodajOcenu').post(
  (req, res) => new GuestController().dodajOcenu(req, res)
)

guestRouter.route('/obrisiRezervaciju').post(
  (req, res) => new GuestController().obrisiRez(req, res)
)

guestRouter.route('/dohvatiPorudzbine').post(
  (req, res) => new GuestController().dohvPorudzbine(req, res)
)

export default guestRouter;