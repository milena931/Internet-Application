import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Rezervacija = new Schema({
    restoran: {
        type: Number
    },
    korisnik: {
        type: String
    },
    vreme: {
        type: String
    },
    brojOsoba: {
        type: Number
    },
    opis: {
        type: String
    },
    odobrena: {
        type: Boolean
    },
    sto: {
        type: Number
    },
    bio: {
        type: Boolean
    },
    id: {
        type: Number
    },
    zaduzenje: {
        type: String
    },
    tip: {
        type: String
    },
    produzena: {
        type: Boolean
    },
    razlogOdbijanja: {
        type: String
    }
})

export default mongoose.model('RezervacijaModel', Rezervacija, 'rezervacije')