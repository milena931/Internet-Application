"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip: {
        type: String
    },
    mejl: {
        type: String
    },
    kontakt_telefon: {
        type: String
    },
    pol: {
        type: String
    },
    slika: {
        type: String
    },
    bezbedonosno_pitanje: {
        type: String
    },
    odgovor: {
        type: String
    },
    broj_kartice: {
        type: String
    },
    adresa: {
        type: String
    },
    odobren: {
        type: Boolean
    },
    restoran: {
        type: Number
    },
    nepojavljivanja: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('UserModel', User, 'korisnici');
