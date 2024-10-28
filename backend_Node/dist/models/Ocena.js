"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Ocena = new Schema({
    restoran: {
        type: Number
    },
    ocena: {
        type: Number
    },
    komentar: {
        type: String
    },
    korisnik: {
        type: String
    },
    vreme: {
        type: String
    },
    idRez: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('OcenaModel', Ocena, 'ocene');
