"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Restoran = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    tip: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    brStolova: {
        type: Number
    },
    raspored: {
        type: Array
    },
    pocetakRadnogVremena: {
        type: String
    },
    krajRadnogVremena: {
        type: String
    },
    opis: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RestoranModel', Restoran, 'restorani');
