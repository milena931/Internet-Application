import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Ocena = new Schema({
    restoran: {
        type: Number
    },
    ocena: {
        type: Number
    },
    komentar: {
        type: String
    },
    korisnik: {
        type: String
    },
    vreme: {
        type: String
    },
    idRez: {
        type: Number
    }
})

export default mongoose.model('OcenaModel', Ocena, 'ocene')