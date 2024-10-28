import express from "express";
import { KonobarController } from "../controllers/KonobarController";

const konobarRouter = express.Router()

konobarRouter.route('/dohvatiNeobradjeneRezervacije').post(
    (req, res) => new KonobarController().dohvNeobradjeneRezervacije(req, res)
)

konobarRouter.route('/odobriRezervaciju').post(
    (req, res) => new KonobarController().odobriRezervaciju(req, res)
)

konobarRouter.route('/odobriRezervacijuForma').post(
    (req, res) => new KonobarController().odobriRezervacijuForma(req, res)
)

konobarRouter.route('/odbijRezervaciju').post(
    (req, res) => new KonobarController().odbijRezervaciju(req, res)
)

konobarRouter.route('/zaduzenja').post(
    (req, res) => new KonobarController().zaduzenja(req, res)
)

konobarRouter.route('/potvrdiDolazak').post(
    (req, res) => new KonobarController().potvrdiDolazak(req, res)
)

konobarRouter.route('/nijeSePojavio').post(
    (req, res) => new KonobarController().nijeSePojavio(req, res)
)

konobarRouter.route('/produzi').post(
    (req, res) => new KonobarController().produzi(req, res)
)

konobarRouter.route('/porudzbine').post(
    (req, res) => new KonobarController().porudzbine(req, res)
)

konobarRouter.route('/odobriPorudzbinu').post(
    (req, res) => new KonobarController().odobriPorudzbinu(req, res)
)

konobarRouter.route('/odbijPorudzbinu').post(
    (req, res) => new KonobarController().odbijPorudzbinu(req, res)
)


export default konobarRouter;