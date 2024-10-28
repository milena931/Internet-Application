"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const User_1 = __importDefault(require("../models/User"));
const crypto = __importStar(require("crypto"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class LoginController {
    constructor() {
        //defaultImagePath: string = path.resolve(__dirname, '../../src/baza/slike/default.jpg')
        //defaultImagePath: string = '/baza/slike/default.jpg'
        this.defaultImagePath = 'default.jpg';
        this.algorithm = 'aes-256-cbc';
        this.key = Buffer.from('12345678901234567890123456789012', 'utf-8');
        this.iv = Buffer.from('1234567890123456', 'utf-8');
        this.login = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            User_1.default.findOne({ 'kor_ime': korisnicko_ime, 'lozinka': this.encrypt(lozinka), 'odobren': true }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.registracija = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let mejl = req.body.mejl;
            let kontakt_telefon = req.body.kontakt_telefon;
            let adresa = req.body.adresa;
            let bezbedonosno_pitanje = req.body.bezbedonosno_pitanje;
            let odgovor = req.body.odgovor;
            let pol = req.body.pol;
            let broj_kartice = req.body.broj_kartice;
            let tip = "gost";
            let odobren = false;
            let slikaPath = this.defaultImagePath;
            let slika = req.file;
            User_1.default.find({}).then((user) => __awaiter(this, void 0, void 0, function* () {
                if (slika && slika.filename) {
                    //let imagePath = path.join('baza/slike/', slika.filename)
                    let imagePath = slika.filename;
                    //let imagePath = path.resolve(__dirname, '../../src/baza/slike', slika.filename)
                    try {
                        let metadata = yield (0, sharp_1.default)(path_1.default.resolve(__dirname, '../../src/baza/slike', slika.filename)).metadata();
                        if (metadata && metadata.width && metadata.height) {
                            if (metadata.width >= 100 && metadata.height >= 100 && metadata.width <= 300 && metadata.height <= 300) {
                                slikaPath = imagePath;
                            }
                            else {
                                if (fs_1.default.existsSync(path_1.default.resolve(__dirname, '../../src/baza/slike', slika.filename))) {
                                    fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../../src/baza/slike', slika.filename)); // Brisanje slike ako je neodgovarajućih dimenzija
                                }
                                return res.json({ msg: 'Lose dimenzije slike' });
                            }
                        }
                    }
                    catch (err) {
                        if (fs_1.default.existsSync(path_1.default.resolve(__dirname, '../../src/baza/slike', slika.filename))) {
                            fs_1.default.unlinkSync(path_1.default.resolve(__dirname, '../../src/baza/slike', slika.filename)); // Brisanje slike u slučaju greške
                        }
                        console.log(err);
                    }
                }
                let korisnik = new User_1.default();
                korisnik.ime = ime;
                korisnik.prezime = prezime;
                korisnik.kor_ime = korisnicko_ime;
                korisnik.lozinka = this.encrypt(lozinka);
                korisnik.tip = tip;
                korisnik.pol = pol;
                korisnik.mejl = mejl;
                korisnik.adresa = adresa;
                korisnik.kontakt_telefon = kontakt_telefon;
                korisnik.broj_kartice = broj_kartice;
                korisnik.bezbedonosno_pitanje = bezbedonosno_pitanje;
                korisnik.odgovor = odgovor;
                korisnik.odobren = odobren;
                korisnik.slika = slikaPath;
                korisnik.nepojavljivanja = 0;
                korisnik.restoran = 0;
                korisnik.save().then((usr) => {
                    res.json({ msg: "registrovan" });
                }).catch((err) => {
                    console.log(err);
                });
            })).catch((err) => {
                console.log(err);
            });
        };
        this.promeniLozinku = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let nova = req.body.nova;
            User_1.default.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, { $set: { 'lozinka': this.encrypt(nova) } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.prikaziPitanje = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            User_1.default.findOne({ 'kor_ime': korisnicko_ime, 'odobren': true }).then((user) => {
                res.json(user === null || user === void 0 ? void 0 : user.bezbedonosno_pitanje);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.proveriOdgovor = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let odgovor = req.body.odgovor;
            User_1.default.findOne({ 'kor_ime': korisnicko_ime, 'odobren': true, 'odgovor': odgovor }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.gosti = (req, res) => {
            User_1.default.find({ 'tip': 'gost' }).then((users) => {
                res.json(users);
            }).catch((err) => {
                console.log(err);
            });
        };
    }
    encrypt(lozinka) {
        if (lozinka != "") {
            const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
            let encrypted = cipher.update(lozinka, 'utf-8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        }
        else {
            return "";
        }
    }
    decrypt(encryptedText) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}
exports.LoginController = LoginController;
