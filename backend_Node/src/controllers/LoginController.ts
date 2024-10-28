import express from 'express'
import UserModel from '../models/User'
import * as crypto from 'crypto';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

export class LoginController {

    //defaultImagePath: string = path.resolve(__dirname, '../../src/baza/slike/default.jpg')
    //defaultImagePath: string = '/baza/slike/default.jpg'
    defaultImagePath: string = 'default.jpg'

    algorithm = 'aes-256-cbc'
    key = Buffer.from('12345678901234567890123456789012', 'utf-8')
    iv = Buffer.from('1234567890123456', 'utf-8')

    encrypt(lozinka: string): string {
        if (lozinka != "") {
            const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv)
            let encrypted = cipher.update(lozinka, 'utf-8', 'hex')
            encrypted += cipher.final('hex')
            return encrypted
        } else {
            return ""
        }

    }

    decrypt(encryptedText: string): string {
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv)
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
        decrypted += decipher.final('utf-8')
        return decrypted;
    }

    login = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.korisnicko_ime
        let lozinka = req.body.lozinka

        UserModel.findOne({ 'kor_ime': korisnicko_ime, 'lozinka': this.encrypt(lozinka), 'odobren': true }).then(
            (user) => {
                res.json(user)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    registracija = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let lozinka = req.body.lozinka
        let ime = req.body.ime
        let prezime = req.body.prezime
        let mejl = req.body.mejl
        let kontakt_telefon = req.body.kontakt_telefon
        let adresa = req.body.adresa
        let bezbedonosno_pitanje = req.body.bezbedonosno_pitanje
        let odgovor = req.body.odgovor
        let pol = req.body.pol

        let broj_kartice = req.body.broj_kartice
        let tip = "gost"
        let odobren = false

        let slikaPath = this.defaultImagePath
        let slika = req.file


        UserModel.find({}).then(
            async (user) => {

                if (slika && slika.filename) {
                    //let imagePath = path.join('baza/slike/', slika.filename)
                    let imagePath = slika.filename
                    //let imagePath = path.resolve(__dirname, '../../src/baza/slike', slika.filename)

                    try {
                        let metadata = await sharp(path.resolve(__dirname, '../../src/baza/slike', slika.filename)).metadata();
                        if (metadata && metadata.width && metadata.height) {
                            if (metadata.width >= 100 && metadata.height >= 100 && metadata.width <= 300 && metadata.height <= 300) {
                                slikaPath = imagePath;
                            } else {
                                if (fs.existsSync(path.resolve(__dirname, '../../src/baza/slike', slika.filename))) {
                                    fs.unlinkSync(path.resolve(__dirname, '../../src/baza/slike', slika.filename)) // Brisanje slike ako je neodgovarajućih dimenzija
                                }
                                return res.json({ msg: 'Lose dimenzije slike' });
                            }
                        }
                    } catch (err) {
                        if (fs.existsSync(path.resolve(__dirname, '../../src/baza/slike', slika.filename))) {
                            fs.unlinkSync(path.resolve(__dirname, '../../src/baza/slike', slika.filename)); // Brisanje slike u slučaju greške
                        }
                        console.log(err)
                    }
                }

                let korisnik = new UserModel()
                korisnik.ime = ime
                korisnik.prezime = prezime
                korisnik.kor_ime = korisnicko_ime
                korisnik.lozinka = this.encrypt(lozinka)
                korisnik.tip = tip
                korisnik.pol = pol
                korisnik.mejl = mejl
                korisnik.adresa = adresa
                korisnik.kontakt_telefon = kontakt_telefon
                korisnik.broj_kartice = broj_kartice
                korisnik.bezbedonosno_pitanje = bezbedonosno_pitanje
                korisnik.odgovor = odgovor
                korisnik.odobren = odobren
                korisnik.slika = slikaPath
                korisnik.nepojavljivanja = 0
                korisnik.restoran = 0

                korisnik.save().then((usr) => {
                    res.json({ msg: "registrovan" })
                }).catch((err) => {
                    console.log(err)
                })
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    promeniLozinku = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let nova = req.body.nova

        UserModel.updateOne({ 'kor_ime': korisnicko_ime,'odobren': true }, {$set: {'lozinka': this.encrypt(nova)}}).then(
            (user) => {
                res.json({'msg': 'uspesno'})
            }
        ).catch((err) => {
            console.log(err)
        })

    }


    prikaziPitanje = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime

        UserModel.findOne({ 'kor_ime': korisnicko_ime,'odobren': true }).then(
            (user) => {
                res.json(user?.bezbedonosno_pitanje)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    proveriOdgovor = (req: express.Request, res: express.Response) => {
        let korisnicko_ime = req.body.kor_ime
        let odgovor = req.body.odgovor

        UserModel.findOne({ 'kor_ime': korisnicko_ime,'odobren': true , 'odgovor': odgovor}).then(
            (user) => {
                res.json(user)
            }
        ).catch((err) => {
            console.log(err)
        })

    }

    gosti = (req: express.Request, res: express.Response) => {
        UserModel.find({'tip': 'gost'}).then(
            (users) => {
                res.json(users)
            }
        ).catch((err) => {
            console.log(err)
        })

    }
}