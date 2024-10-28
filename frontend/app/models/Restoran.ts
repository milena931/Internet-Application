import { Raspored } from "./Raspored"

export class Restoran{
    id: number = 0
    naziv: string = ""
    adresa: string = ""
    tip: string = ""
    telefon: string = ""
    brStolova: number = 0
    raspored: Raspored[] = []
    pocetakRadnogVremena: string = ""
    krajRadnogVremena: string = ""
    opis: string = ""
}