import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Restoran = new Schema({
    id: {
        type: Number
    },
    naziv: {
        type: String
    },
    tip: {
        type: String
    },
    adresa: {
        type: String
    },
    telefon: {
        type: String
    },
    brStolova: {
        type: Number
    },
    raspored: {
        type: Array
    },
    pocetakRadnogVremena: {
        type: String
    },
    krajRadnogVremena: {
        type: String
    },
    opis: {
        type: String
    }
})

export default mongoose.model('RestoranModel', Restoran, 'restorani')