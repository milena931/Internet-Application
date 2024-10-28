"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GuestController_1 = require("../controllers/GuestController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const guestRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Korišćenje path.resolve za osiguranje apsolutne putanje
        cb(null, path_1.default.resolve(__dirname, '../../src/baza/slike'));
        //cb(null, '../baza/slike');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
guestRouter.route('/brojGostiju').get((req, res) => new GuestController_1.GuestController().gosti(req, res));
guestRouter.route('/brojRestorana').get((req, res) => new GuestController_1.GuestController().restorani(req, res));
guestRouter.route('/konobari').get((req, res) => new GuestController_1.GuestController().konobari(req, res));
guestRouter.route('/rezervacije').get((req, res) => new GuestController_1.GuestController().rezervacije(req, res));
guestRouter.route('/dohvatiRezervacijeRestorana').post((req, res) => new GuestController_1.GuestController().rezervacijeRestorana(req, res));
guestRouter.route('/dohvatiRezervacijeGosta').post((req, res) => new GuestController_1.GuestController().rezervacijeGosta(req, res));
guestRouter.route('/dohvatiOceneGosta').post((req, res) => new GuestController_1.GuestController().oceneGosta(req, res));
guestRouter.route('/rezervisiRestoran').post((req, res) => new GuestController_1.GuestController().rezervisiRestoran(req, res));
guestRouter.route('/rezervisiRestoranPanel').post((req, res) => new GuestController_1.GuestController().rezervisiRestoranPanel(req, res));
guestRouter.route('/ocene').get((req, res) => new GuestController_1.GuestController().ocene(req, res));
guestRouter.route('/dohvatiRestoran').post((req, res) => new GuestController_1.GuestController().dohvRestoran(req, res));
guestRouter.route('/dohvatiGosta').post((req, res) => new GuestController_1.GuestController().dohvKorisnika(req, res));
guestRouter.route('/dohvatiSliku/:rel_putanja').get((req, res) => new GuestController_1.GuestController().dohvSliku(req, res));
guestRouter.route('/promeniProfilnuSliku').post(upload.single('novaSlika'), (req, res) => new GuestController_1.GuestController().promeniProfilnuSliku(req, res));
guestRouter.route('/promeniIme').post((req, res) => new GuestController_1.GuestController().promeniIme(req, res));
guestRouter.route('/promeniPrezime').post((req, res) => new GuestController_1.GuestController().promeniPrezime(req, res));
guestRouter.route('/promeniMejl').post((req, res) => new GuestController_1.GuestController().promeniMejl(req, res));
guestRouter.route('/promeniAdresu').post((req, res) => new GuestController_1.GuestController().promeniAdresu(req, res));
guestRouter.route('/promeniKontakt').post((req, res) => new GuestController_1.GuestController().promeniKontakt(req, res));
guestRouter.route('/promeniKarticu').post((req, res) => new GuestController_1.GuestController().promeniKarticu(req, res));
guestRouter.route('/dohvatiJela').post((req, res) => new GuestController_1.GuestController().dohvJela(req, res));
guestRouter.route('/dodajPorudzbinu').post((req, res) => new GuestController_1.GuestController().dodajPorudzbinu(req, res));
guestRouter.route('/dodajOcenu').post((req, res) => new GuestController_1.GuestController().dodajOcenu(req, res));
guestRouter.route('/obrisiRezervaciju').post((req, res) => new GuestController_1.GuestController().obrisiRez(req, res));
guestRouter.route('/dohvatiPorudzbine').post((req, res) => new GuestController_1.GuestController().dohvPorudzbine(req, res));
exports.default = guestRouter;
