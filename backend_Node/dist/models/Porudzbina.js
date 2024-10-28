"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Porudzbina = new Schema({
    restoran: {
        type: Number
    },
    jela: {
        type: String
    },
    vreme: {
        type: String
    },
    korisnik: {
        type: String
    },
    status: {
        type: String
    },
    cena: {
        type: Number
    },
    procenjeno_vreme: {
        type: String
    }
});
exports.default = mongoose_1.default.model('PorudzbinaModel', Porudzbina, 'porudzbine');
