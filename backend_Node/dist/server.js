"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
const GuestRoutes_1 = __importDefault(require("./routes/GuestRoutes"));
const KonobarRoutes_1 = __importDefault(require("./routes/KonobarRoutes"));
const AdminRoutes_1 = __importDefault(require("./routes/AdminRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/projekat');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/login', LoginRoutes_1.default);
router.use('/gost', GuestRoutes_1.default);
router.use('/konobar', KonobarRoutes_1.default);
router.use('/admin', AdminRoutes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
