"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LoginController_1 = require("../controllers/LoginController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const loginRouter = express_1.default.Router();
//const upload = multer({ dest: '../baza/slike/' })
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
loginRouter.route('/login').post((req, res) => new LoginController_1.LoginController().login(req, res));
loginRouter.route('/registracija').post(upload.single('slika'), (req, res) => new LoginController_1.LoginController().registracija(req, res));
loginRouter.route('/promenaLozinke').post((req, res) => new LoginController_1.LoginController().promeniLozinku(req, res));
loginRouter.route('/prikaziPitanje').post((req, res) => new LoginController_1.LoginController().prikaziPitanje(req, res));
loginRouter.route('/proveriOdgovor').post((req, res) => new LoginController_1.LoginController().proveriOdgovor(req, res));
loginRouter.route('/gosti').get((req, res) => new LoginController_1.LoginController().gosti(req, res));
exports.default = loginRouter;
