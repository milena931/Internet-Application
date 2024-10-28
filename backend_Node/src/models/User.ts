import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    kor_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    tip: {
        type: String
    },
    mejl: {
        type: String
    },
    kontakt_telefon: {
        type: String
    },
    pol: {
        type: String
    },
    slika: {
        type: String
    },
    bezbedonosno_pitanje: {
        type: String
    },
    odgovor: {
        type: String
    },
    broj_kartice: {
        type: String
    },
    adresa: {
        type: String
    },
    odobren: {
        type: Boolean
    },
    restoran:{
        type: Number
    },
    nepojavljivanja: {
        type: Number
    }
})

export default mongoose.model('UserModel', User, 'korisnici')