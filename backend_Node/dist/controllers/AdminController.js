"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const User_1 = __importDefault(require("../models/User"));
const Restoran_1 = __importDefault(require("../models/Restoran"));
class AdminController {
    constructor() {
        this.zahtevi = (req, res) => {
            User_1.default.find({ 'odobren': false }).then((user) => {
                res.json(user);
            }).catch((err) => {
                console.log(err);
            });
        };
        this.odobri = (req, res) => {
            let kor_ime = req.body.kor_ime;
            User_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'odobren': true } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.deaktiviraj = (req, res) => {
            let kor_ime = req.body.kor_ime;
            User_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'odobren': false } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.konobar = (req, res) => {
            let kor_ime = req.body.kor_ime;
            let restoran = req.body.restoran;
            User_1.default.updateOne({ 'kor_ime': kor_ime }, { $set: { 'tip': 'konobar', 'restoran': restoran } }).then((user) => {
                res.json({ 'msg': 'uspesno' });
            }).catch((err) => {
                console.log(err);
            });
        };
        this.restoran = (req, res) => {
            let restoran = new Restoran_1.default(req.body.restoran);
            let id = 0;
            Restoran_1.default.find({}).then((restorani) => {
                restorani.forEach(restoran => {
                    if (id < restoran.id) {
                        id = restoran.id;
                    }
                });
                id = id + 1;
                restoran.id = id;
                restoran.save().then((user) => {
                    res.json({ 'msg': 'uspesno' });
                }).catch((err) => {
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        };
    }
}
exports.AdminController = AdminController;
