import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Porudzbina = new Schema({
    restoran: {
        type: Number
    },
    jela: {
        type: String
    },
    vreme: {
        type: String
    },
    korisnik: {
        type: String
    },
    status: {
        type: String
    },
    cena: {
        type: Number
    },
    procenjeno_vreme: {
        type: String
    }
})

export default mongoose.model('PorudzbinaModel', Porudzbina, 'porudzbine')