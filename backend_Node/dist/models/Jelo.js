"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Jelo = new Schema({
    restoran: {
        type: Number
    },
    cena: {
        type: Number
    },
    opis: {
        type: String
    },
    slika: {
        type: String
    },
    naziv: {
        type: String
    }
});
exports.default = mongoose_1.default.model('JeloModel', Jelo, 'jela');
