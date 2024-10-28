import { Korisnik } from "./User"

export class RestoranSaKonobarima{
    id: number = 0
    naziv: string = ""
    adresa: string = ""
    tip: string = ""
    konobari: Korisnik[] = []
    prosecnaOcena: number = 0.0
    telefon: string = ""
}