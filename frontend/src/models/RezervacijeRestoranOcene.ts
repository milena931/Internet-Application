export class RezervacijeRestoranOcene{
    id: number = 0
    restoran: number = 0
    vreme: Date = new Date()
    korisnik: string = ""
    ime: string = ""
    prezime: string = ""
    brojOsoba: number = 0
    opis: string = ""
    odobren: boolean = false
    zaduzenje: string = ""
    tip: string = ""
    sto: number = 0
    bio: boolean = false
    ocena: number = 0
    komentar: string = ""
    nazivRestorana: string = ""
    adresa: string = ""
    produzena: boolean = false
    razlogOdbijanja: string = ""
}