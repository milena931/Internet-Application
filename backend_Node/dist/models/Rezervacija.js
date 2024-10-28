"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rezervacija = new Schema({
    restoran: {
        type: Number
    },
    korisnik: {
        type: String
    },
    vreme: {
        type: String
    },
    brojOsoba: {
        type: Number
    },
    opis: {
        type: String
    },
    odobrena: {
        type: Boolean
    },
    sto: {
        type: Number
    },
    bio: {
        type: Boolean
    },
    id: {
        type: Number
    },
    zaduzenje: {
        type: String
    },
    tip: {
        type: String
    },
    produzena: {
        type: Boolean
    },
    razlogOdbijanja: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RezervacijaModel', Rezervacija, 'rezervacije');
