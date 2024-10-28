import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Jelo = new Schema({
    restoran: {
        type: Number
    },
    cena: {
        type: Number
    },
    opis: {
        type: String
    },
    slika: {
        type: String
    },
    naziv: {
        type: String
    }
})

export default mongoose.model('JeloModel', Jelo, 'jela')