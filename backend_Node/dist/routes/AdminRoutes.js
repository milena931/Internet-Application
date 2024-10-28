"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const adminRouter = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Korišćenje path.resolve za osiguranje apsolutne putanje
        cb(null, path_1.default.resolve(__dirname, '../../src/baza/slike'));
        //cb(null, '../baza/slike');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
adminRouter.route('/zahtevi').get((req, res) => new AdminController_1.AdminController().zahtevi(req, res));
adminRouter.route('/odobri').post((req, res) => new AdminController_1.AdminController().odobri(req, res));
adminRouter.route('/deaktiviraj').post((req, res) => new AdminController_1.AdminController().deaktiviraj(req, res));
adminRouter.route('/konobar').post((req, res) => new AdminController_1.AdminController().konobar(req, res));
adminRouter.route('/restoran').post((req, res) => new AdminController_1.AdminController().restoran(req, res));
exports.default = adminRouter;
