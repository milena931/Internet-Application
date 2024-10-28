"use strict";
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
exports.GuestController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Restoran_1 = __importDefault(require("../models/Restoran"));
const Rezervacija_1 = __importDefault(require("../models/Rezervacija"));
const Ocena_1 = __importDefault(require("../models/Ocena"));
const Jelo_1 = __importDefault(require("../models/Jelo"));
const Porudzbina_1 = __importDefault(require("../models/Porudzbina"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class GuestController {
    constructor() {
        this.gosti = (req, res) => {
            User_1.default.find({ 'odobren': true, 'tip': 'gost' }).then((users) => {
                res.json(users);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.restorani = (req, res) => {
            Restoran_1.default.find({}).then((restorani) => {
                res.json(restorani);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.konobari = (req, res) => {
            User_1.default.find({ 'tip': 'konobar' }).then((konobari) => {
                res.json(konobari);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.ocene = (req, res) => {
            Ocena_1.default.find({}).then((ocene) => {
                res.json(ocene);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.rezervacije = (req, res) => {
            Rezervacija_1.default.find({}).then((rezervacije) => {
                res.json(rezervacije);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.rezervacijeRestorana = (req, res) => {
            let id = req.body.id;
            Rezervacija_1.default.find({ 'restoran': id }).then((rezervacije) => {
                res.json(rezervacije);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.rezervacijeGosta = (req, res) => {
            let kor_ime = req.body.kor_ime;
            Rezervacija_1.default.find({ 'korisnik': kor_ime }).then((rezervacije) => {
                res.json(rezervacije);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.oceneGosta = (req, res) => {
            let kor_ime = req.body.kor_ime;
            Ocena_1.default.find({ 'korisnik': kor_ime }).then((ocene) => {
                res.json(ocene);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.rezervisiRestoran = (req, res) => {
            let broj = req.body.broj;
            let opis = req.body.opis;
            let restoran = req.body.restoran;
            let vreme = req.body.vreme;
            let korisnik = req.body.korisnik;
            let sto = req.body.sto;
            let rezervacija = new Rezervacija_1.default();
            rezervacija.brojOsoba = broj;
            rezervacija.opis = opis;
            rezervacija.restoran = restoran;
            rezervacija.vreme = vreme;
            rezervacija.korisnik = korisnik;
            rezervacija.odobrena = false;
            rezervacija.sto = sto;
            rezervacija.bio = false;
            rezervacija.zaduzenje = "";
            rezervacija.tip = "forma";
            rezervacija.produzena = false;
            rezervacija.razlogOdbijanja = "";
            Rezervacija_1.default.find({}).then((rezervacije) => {
                let id = 0;
                rezervacije.forEach(rez => {
                    if (rez.id > id) {
                        id = rez.id;
                    }
                });
                id = id + 1;
                rezervacija.id = id;
                rezervacija.save().then((rezultat) => {
                    res.json({ 'msg': 'uspesno' });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.rezervisiRestoranPanel = (req, res) => {
            let broj = req.body.brOsoba;
            let restoran = req.body.restoran;
            let vreme = req.body.vreme;
            let korisnik = req.body.korisnik;
            let sto = req.body.sto;
            let rezervacija = new Rezervacija_1.default();
            rezervacija.brojOsoba = broj;
            rezervacija.opis = "";
            rezervacija.restoran = restoran;
            rezervacija.vreme = vreme;
            rezervacija.korisnik = korisnik;
            rezervacija.odobrena = false;
            rezervacija.sto = sto;
            rezervacija.bio = false;
            rezervacija.zaduzenje = "";
            rezervacija.tip = "panel";
            rezervacija.produzena = false;
            rezervacija.razlogOdbijanja = "";
            Rezervacija_1.default.find({}).then((rezervacije) => {
                let id = 0;
                rezervacije.forEach(rez => {
                    if (rez.id > id) {
                        id = rez.id;
                    }
                });
                id = id + 1;
                rezervacija.id = id;
                rezervacija.save().then((rezultat) => {
                    res.json({ 'msg': 'uspesno' });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvRestoran = (req, res) => {
            let id = req.body.id;
            Restoran_1.default.findOne({ 'id': id }).then((restoran) => {
                res.json(restoran);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvKorisnika = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let lozinka = req.body.lozinka;
            User_1.default.findOne({ 'kor_ime': korisnicko_ime, 'odobren': true }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvSliku = (req, res) => {
            let rel_putanja = req.params.rel_putanja;
            const fullPath = path_1.default.resolve(__dirname, '../../src/baza/slike', rel_putanja);
            fs_1.default.access(fullPath, fs_1.default.constants.F_OK, (err) => {
                if (err) {
                    return res.status(404).send('Slika nije pronađena');
                }
                res.sendFile(fullPath);
            });
        };
        this.promeniProfilnuSliku = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const korisnicko_ime = req.body.kor_ime;
            const novaSlika = req.file;
            if (!novaSlika) {
                return res.status(400).send('Niste odabrali novu sliku.');
            }
            try {
                const korisnik = yield User_1.default.findOne({ kor_ime: korisnicko_ime, odobren: true });
                if (!korisnik) {
                    return res.status(404).send('Korisnik nije pronađen.');
                }
                // Obrisi staru sliku ako postoji
                if (korisnik.slika && korisnik.slika !== 'default.jpg') {
                    const staraSlikaPath = path_1.default.join(__dirname, '../../src/baza/slike', korisnik.slika);
                    fs_1.default.unlink(staraSlikaPath, (err) => {
                        if (err)
                            console.error('Greška pri brisanju stare slike:', err);
                    });
                }
                // Sacuvaj novu sliku
                korisnik.slika = novaSlika.filename;
                yield korisnik.save();
                res.json({ novaSlika: novaSlika.filename });
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Greška na serveru.');
            }
        });
        this.promeniIme = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let novoIme = req.body.novoIme;
            User_1.default.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, { $set: { 'ime': novoIme } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.promeniPrezime = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let novoPrezime = req.body.novoPrezime;
            User_1.default.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, { $set: { 'prezime': novoPrezime } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.promeniMejl = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let noviMejl = req.body.noviMejl;
            User_1.default.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, { $set: { 'mejl': noviMejl } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.promeniAdresu = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let novaAdresa = req.body.novaAdresa;
            User_1.default.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, { $set: { 'adresa': novaAdresa } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.promeniKontakt = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let noviKontakt = req.body.noviKontakt;
            User_1.default.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, { $set: { 'kontakt_telefon': noviKontakt } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.promeniKarticu = (req, res) => {
            let korisnicko_ime = req.body.kor_ime;
            let novaKartica = req.body.novaKartica;
            User_1.default.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, { $set: { 'broj_kartice': novaKartica } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvJela = (req, res) => {
            let restoran = req.body.restoran;
            Jelo_1.default.find({ "restoran": restoran }).then((jela) => {
                res.json(jela);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dodajPorudzbinu = (req, res) => {
            let porudzbina = new Porudzbina_1.default(JSON.parse(req.body.porudzbina));
            porudzbina.save().then((ret) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dodajOcenu = (req, res) => {
            let ocena = req.body.ocena;
            let komentar = req.body.komentar;
            let korisnik = req.body.kor_ime;
            let restoran = req.body.restoran;
            let vreme = req.body.vreme;
            let idRez = req.body.idRez;
            let ocenaNova = new Ocena_1.default();
            ocenaNova.ocena = ocena;
            ocenaNova.komentar = komentar;
            ocenaNova.korisnik = korisnik;
            ocenaNova.restoran = restoran;
            ocenaNova.vreme = vreme;
            ocenaNova.idRez = idRez;
            ocenaNova.save().then((ret) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.obrisiRez = (req, res) => {
            let idRez = req.body.idRez;
            Rezervacija_1.default.findOneAndDelete({ 'id': idRez }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.dohvPorudzbine = (req, res) => {
            let kor_ime = req.body.kor_ime;
            Porudzbina_1.default.find({ 'korisnik': kor_ime }).then((rez) => {
                res.json(rez);
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.GuestController = GuestController;
