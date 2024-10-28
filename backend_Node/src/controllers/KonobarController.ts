import express from "express";
import RezervacijaModel from '../models/Rezervacija'
import UserModel from '../models/User'
import PorudzbinaModel from '../models/Porudzbina'

export class KonobarController{

    dohvNeobradjeneRezervacije = (req: express.Request, res: express.Response) => {
        let restoran = req.body.restoran
        
        RezervacijaModel.find({'odobrena': false, 'restoran': restoran}).then(
            (user) => {
                res.json(user)
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    odobriRezervaciju = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let konobar = req.body.konobar
        
        RezervacijaModel.updateOne({'id': id}, {$set: {'zaduzenje': konobar, 'odobrena': true}}).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    odobriRezervacijuForma = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let konobar = req.body.konobar
        let br = req.body.br
        
        RezervacijaModel.updateOne({'id': id}, {$set: {'zaduzenje': konobar, 'odobrena': true, 'sto': br}}).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    odbijRezervaciju = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        let komentar = req.body.komentar
        
        RezervacijaModel.updateOne({'id': id}, {$set: {'razlogOdbijanja': komentar, 'sto': 0}}).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    zaduzenja = (req: express.Request, res: express.Response) => {
        let konobar = req.body.konobar
        
        RezervacijaModel.find({'zaduzenje': konobar}).then(
            (rez) => {
                res.json(rez)
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    potvrdiDolazak = (req: express.Request, res: express.Response) => {
        let rezervacija = req.body.rezervacija
        
        RezervacijaModel.updateOne({'id': rezervacija}, {$set: {'bio': true}}).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    nijeSePojavio = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime
        
        UserModel.updateOne({'kor_ime': kor_ime}, {$inc: {'nepojavljivanja': 1}}).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    produzi = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        
        RezervacijaModel.updateOne({'id': id}, {$set: {'produzena': true}}).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    porudzbine = (req: express.Request, res: express.Response) => {
        let restoran = req.body.restoran
        
        PorudzbinaModel.find({'restoran': restoran}).then(
            (rez) => {
                res.json(rez)
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    odobriPorudzbinu = (req: express.Request, res: express.Response) => {
        let porudzbina = new PorudzbinaModel(req.body.porudzbina)
        
        PorudzbinaModel.updateOne({'restoran': porudzbina.restoran, 'vreme': porudzbina.vreme, 'jela': porudzbina.jela, 'cena': porudzbina.cena, 'korisnik': porudzbina.korisnik},
            {$set: {'procenjeno_vreme': porudzbina.procenjeno_vreme, 'status': 'odobrena'}}
        ).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    odbijPorudzbinu = (req: express.Request, res: express.Response) => {
        let porudzbina = new PorudzbinaModel(req.body.porudzbina)
        
        PorudzbinaModel.findOneAndDelete({'restoran': porudzbina.restoran, 'vreme': porudzbina.vreme, 'jela': porudzbina.jela, 'cena': porudzbina.cena, 'korisnik': porudzbina.korisnik}).then(
            (rez) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

}