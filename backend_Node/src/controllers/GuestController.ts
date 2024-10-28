import express from 'express'
import UserModel from '../models/User'
import RestoranModel from '../models/Restoran'
import RezervacijaModel from '../models/Rezervacija'
import OcenaModel from '../models/Ocena'
import JeloModel from '../models/Jelo'
import PorudzbinaModel from '../models/Porudzbina'
import fs from 'fs';
import path from 'path';

export class GuestController {

    gosti = (req: express.Request, res: express.Response) => {
        UserModel.find({ 'odobren': true , 'tip': 'gost'}).then(
            (users) => {
                res.json(users)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    restorani = (req: express.Request, res: express.Response) => {
        RestoranModel.find({}).then(
            (restorani) => {
                res.json(restorani)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    konobari = (req: express.Request, res: express.Response) => {
        UserModel.find({'tip': 'konobar'}).then(
            (konobari) => {
                res.json(konobari)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    ocene = (req: express.Request, res: express.Response) => {
        OcenaModel.find({}).then(
            (ocene) => {
                res.json(ocene)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    rezervacije = (req: express.Request, res: express.Response) => {
        RezervacijaModel.find({}).then(
            (rezervacije) => {
                res.json(rezervacije)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    rezervacijeRestorana = (req: express.Request, res: express.Response) => {
        let id = req.body.id

        RezervacijaModel.find({'restoran': id}).then(
            (rezervacije) => {
                res.json(rezervacije)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    rezervacijeGosta = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime

        RezervacijaModel.find({'korisnik': kor_ime}).then(
            (rezervacije) => {
                res.json(rezervacije)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    oceneGosta = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime

        OcenaModel.find({'korisnik': kor_ime}).then(
            (ocene) => {
                res.json(ocene)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    rezervisiRestoran = (req: express.Request, res: express.Response) => {
        let broj = req.body.broj
        let opis = req.body.opis
        let restoran = req.body.restoran
        let vreme = req.body.vreme
        let korisnik = req.body.korisnik
        let sto = req.body.sto

        let rezervacija = new RezervacijaModel()
        rezervacija.brojOsoba = broj
        rezervacija.opis = opis
        rezervacija.restoran = restoran
        rezervacija.vreme = vreme
        rezervacija.korisnik = korisnik
        rezervacija.odobrena = false
        rezervacija.sto = sto
        rezervacija.bio = false
        rezervacija.zaduzenje = ""
        rezervacija.tip = "forma"
        rezervacija.produzena = false
        rezervacija.razlogOdbijanja = ""

        RezervacijaModel.find({}).then(
            (rezervacije)=>{
                let id: number = 0
                rezervacije.forEach(rez=>{
                    if(rez.id > id){
                        id = rez.id
                    }
                })
                id = id + 1
                rezervacija.id = id
                rezervacija.save().then(
                    (rezultat) => {
                        res.json({'msg': 'uspesno'})
                    }
                ).catch((err) => {
                    console.log(err)
                })
            }
        ).catch((err) => {
            console.log(err)
        })
    }
    
    rezervisiRestoranPanel = (req: express.Request, res: express.Response) => {
        let broj = req.body.brOsoba
        let restoran = req.body.restoran
        let vreme = req.body.vreme
        let korisnik = req.body.korisnik
        let sto = req.body.sto

        let rezervacija = new RezervacijaModel()
        rezervacija.brojOsoba = broj
        rezervacija.opis = ""
        rezervacija.restoran = restoran
        rezervacija.vreme = vreme
        rezervacija.korisnik = korisnik
        rezervacija.odobrena = false
        rezervacija.sto = sto
        rezervacija.bio = false
        rezervacija.zaduzenje = ""
        rezervacija.tip = "panel"
        rezervacija.produzena = false
        rezervacija.razlogOdbijanja = ""
        
        RezervacijaModel.find({}).then(
            (rezervacije)=>{
                let id: number = 0
                rezervacije.forEach(rez=>{
                    if(rez.id > id){
                        id = rez.id
                    }
                })
                id = id + 1
                rezervacija.id = id
                rezervacija.save().then(
                    (rezultat) => {
                        res.json({'msg': 'uspesno'})
                    }
                ).catch((err) => {
                    console.log(err)
                })
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    dohvRestoran = (req: express.Request, res: express.Response) => {
        let id = req.body.id
        
        RestoranModel.findOne({ 'id': id}).then(
            (restoran) => {
                res.json(restoran)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    dohvKorisnika = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let lozinka = req.body.lozinka

        UserModel.findOne({ 'kor_ime': korisnicko_ime, 'odobren': true }).then(
            (user) => {
                res.json(user)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    dohvSliku = (req: express.Request, res: express.Response) => {
        let rel_putanja = req.params.rel_putanja

        const fullPath = path.resolve(__dirname, '../../src/baza/slike', rel_putanja);
        fs.access(fullPath, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send('Slika nije pronađena');
            }

            res.sendFile(fullPath);
        });
    }

    promeniProfilnuSliku = async (req: express.Request, res: express.Response) => {
        const korisnicko_ime = req.body.kor_ime;
        const novaSlika = req.file;
      
        if (!novaSlika) {
          return res.status(400).send('Niste odabrali novu sliku.');
        }
      
        try {
          const korisnik = await UserModel.findOne({ kor_ime: korisnicko_ime, odobren: true });
          if (!korisnik) {
            return res.status(404).send('Korisnik nije pronađen.');
          }
      
          // Obrisi staru sliku ako postoji
          if (korisnik.slika && korisnik.slika !== 'default.jpg') {
            const staraSlikaPath = path.join(__dirname, '../../src/baza/slike', korisnik.slika);
            fs.unlink(staraSlikaPath, (err) => {
              if (err) console.error('Greška pri brisanju stare slike:', err);
            });
          }
      
          // Sacuvaj novu sliku
          korisnik.slika = novaSlika.filename;
          await korisnik.save();
      
          res.json({ novaSlika: novaSlika.filename });
        } catch (err) {
          console.error(err);
          res.status(500).send('Greška na serveru.');
        }
      }

    promeniIme = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let novoIme = req.body.novoIme

        UserModel.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, {$set: {'ime': novoIme}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    promeniPrezime = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let novoPrezime = req.body.novoPrezime

        UserModel.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, {$set: {'prezime': novoPrezime}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    promeniMejl = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let noviMejl = req.body.noviMejl

        UserModel.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, {$set: {'mejl': noviMejl}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    promeniAdresu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let novaAdresa = req.body.novaAdresa

        UserModel.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, {$set: {'adresa': novaAdresa}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    promeniKontakt = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let noviKontakt = req.body.noviKontakt

        UserModel.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, {$set: {'kontakt_telefon': noviKontakt}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    promeniKarticu = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let novaKartica = req.body.novaKartica

        UserModel.updateOne({ 'kor_ime': korisnicko_ime, 'odobren': true }, {$set: {'broj_kartice': novaKartica}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    dohvJela = (req: express.Request, res: express.Response) => {
        let restoran = req.body.restoran

        JeloModel.find({"restoran": restoran}).then(
            (jela)=>{
                res.json(jela)
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    dodajPorudzbinu = (req: express.Request, res: express.Response) => {
        let porudzbina = new PorudzbinaModel(JSON.parse(req.body.porudzbina))

        porudzbina.save().then(
            (ret)=>{
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    dodajOcenu = (req: express.Request, res: express.Response) => {
        let ocena = req.body.ocena
        let komentar = req.body.komentar
        let korisnik = req.body.kor_ime
        let restoran = req.body.restoran
        let vreme = req.body.vreme
        let idRez = req.body.idRez

        let ocenaNova = new OcenaModel()

        ocenaNova.ocena = ocena
        ocenaNova.komentar = komentar
        ocenaNova.korisnik = korisnik
        ocenaNova.restoran = restoran
        ocenaNova.vreme = vreme
        ocenaNova.idRez = idRez

        ocenaNova.save().then(
            (ret)=>{
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    obrisiRez = (req: express.Request, res: express.Response) => {
        let idRez = req.body.idRez

        RezervacijaModel.findOneAndDelete({'id': idRez}).then(
            (rez)=>{
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    dohvPorudzbine = (req: express.Request, res: express.Response) => {
        let kor_ime = req.body.kor_ime

        PorudzbinaModel.find({'korisnik': kor_ime}).then(
            (rez)=>{
                res.json(rez)
            }
        ).catch((err) => {
            console.log(err)
        })
    }
}