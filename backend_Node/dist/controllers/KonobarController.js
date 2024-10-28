"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KonobarController = void 0;
const Rezervacija_1 = __importDefault(require("../models/Rezervacija"));
const User_1 = __importDefault(require("../models/User"));
const Porudzbina_1 = __importDefault(require("../models/Porudzbina"));
class KonobarController {
    constructor() {
        this.dohvNeobradjeneRezervacije = (req, res) => {
            let restoran = req.body.restoran;
            Rezervacija_1.default.find({ 'odobrena': false, 'restoran': restoran }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odobriRezervaciju = (req, res) => {
            let id = req.body.id;
            let konobar = req.body.konobar;
            Rezervacija_1.default.updateOne({ 'id': id }, { $set: { 'zaduzenje': konobar, 'odobrena': true } }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odobriRezervacijuForma = (req, res) => {
            let id = req.body.id;
            let konobar = req.body.konobar;
            let br = req.body.br;
            Rezervacija_1.default.updateOne({ 'id': id }, { $set: { 'zaduzenje': konobar, 'odobrena': true, 'sto': br } }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odbijRezervaciju = (req, res) => {
            let id = req.body.id;
            let komentar = req.body.komentar;
            Rezervacija_1.default.updateOne({ 'id': id }, { $set: { 'razlogOdbijanja': komentar, 'sto': 0 } }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.zaduzenja = (req, res) => {
            let konobar = req.body.konobar;
            Rezervacija_1.default.find({ 'zaduzenje': konobar }).then((rez) => {
                res.json(rez);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.potvrdiDolazak = (req, res) => {
            let rezervacija = req.body.rezervacija;
            Rezervacija_1.default.updateOne({ 'id': rezervacija }, { $set: { 'bio': true } }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.nijeSePojavio = (req, res) => {
            let kor_ime = req.body.kor_ime;
            User_1.default.updateOne({ 'kor_ime': kor_ime }, { $inc: { 'nepojavljivanja': 1 } }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.produzi = (req, res) => {
            let id = req.body.id;
            Rezervacija_1.default.updateOne({ 'id': id }, { $set: { 'produzena': true } }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.porudzbine = (req, res) => {
            let restoran = req.body.restoran;
            Porudzbina_1.default.find({ 'restoran': restoran }).then((rez) => {
                res.json(rez);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odobriPorudzbinu = (req, res) => {
            let porudzbina = new Porudzbina_1.default(req.body.porudzbina);
            Porudzbina_1.default.updateOne({ 'restoran': porudzbina.restoran, 'vreme': porudzbina.vreme, 'jela': porudzbina.jela, 'cena': porudzbina.cena, 'korisnik': porudzbina.korisnik }, { $set: { 'procenjeno_vreme': porudzbina.procenjeno_vreme, 'status': 'odobrena' } }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odbijPorudzbinu = (req, res) => {
            let porudzbina = new Porudzbina_1.default(req.body.porudzbina);
            Porudzbina_1.default.findOneAndDelete({ 'restoran': porudzbina.restoran, 'vreme': porudzbina.vreme, 'jela': porudzbina.jela, 'cena': porudzbina.cena, 'korisnik': porudzbina.korisnik }).then((rez) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.KonobarController = KonobarController;
