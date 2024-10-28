import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/User';
import { Restoran } from '../models/Restoran';
import { Rezervacija } from '../models/Rezervacija';
import { Ocena } from '../models/Ocena';
import { Jelo } from '../models/Jelo';
import { Porudzbina } from '../models/Porudzbina';
import { RezervacijeRestoranOcene } from '../models/RezervacijeRestoranOcene';

@Injectable({
  providedIn: 'root'
})
export class GostService {

  constructor(private http: HttpClient) { }

  dohvBrojGostiju(){
    return this.http.get<Korisnik[]>("http://localhost:4000/gost/brojGostiju")
  }


  dohvBrojRestorana(){
    return this.http.get<Restoran[]>("http://localhost:4000/gost/brojRestorana")
  }

  dohvRezervacije(){
    return this.http.get<Rezervacija[]>("http://localhost:4000/gost/rezervacije")
  }

  dohvRezervacijeRestorana(id: number){
    const data = {
      id: id
    }
    return this.http.post<Rezervacija[]>("http://localhost:4000/gost/dohvatiRezervacijeRestorana", data)
  }

  dohvRezervacijeGosta(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post<Rezervacija[]>("http://localhost:4000/gost/dohvatiRezervacijeGosta", data)
  }


  rezervisiRestoran(broj: number, vreme: string, opis: string, restoran: number, kor_ime: string, sto: number){
    const data = {
      broj: broj,
      vreme: vreme,
      opis: opis,
      restoran: restoran,
      korisnik: kor_ime,
      sto: sto
    }
    return this.http.post<string>("http://localhost:4000/gost/rezervisiRestoran", data)
  }

  dodajRezervacijuPanel(vreme: string, sto: number, brOsoba: number, restoran: number, korisnik: string){
    const data={
      vreme: vreme,
      sto: sto,
      brOsoba: brOsoba,
      restoran: restoran,
      korisnik: korisnik
    }
    return this.http.post<string>("http://localhost:4000/gost/rezervisiRestoranPanel", data)
  }

  dohvKonobare(){
    return this.http.get<Korisnik[]>("http://localhost:4000/gost/konobari")
  }

  dohvOcene(){
    return this.http.get<Ocena[]>("http://localhost:4000/gost/ocene")
  }


  dohvGosta(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post<Korisnik>("http://localhost:4000/gost/dohvatiGosta", data)
  }

  dohvRestoran(id: number){
    const data = {
      id: id
    }
    return this.http.post<Restoran>("http://localhost:4000/gost/dohvatiRestoran", data)
  }

  dohvSliku(rel_putanja: string){
    return this.http.get(`http://localhost:4000/gost/dohvatiSliku/${rel_putanja}`, { responseType: 'blob' })
  }

  promeniProfilnuSliku(kor_ime: string, novaSlika: File) {
    const formData: FormData = new FormData()
    formData.append('kor_ime', kor_ime)
    formData.append('novaSlika', novaSlika)

    return this.http.post<{ novaSlika: string }>("http://localhost:4000/gost/promeniProfilnuSliku", formData)
  }

  promeniIme(novo: string, kor_ime: string){
    const data = {
      kor_ime: kor_ime,
      novoIme: novo
    }
    return this.http.post<string>("http://localhost:4000/gost/promeniIme", data)
  }

  promeniPrezime(novo: string, kor_ime: string){
    const data = {
      kor_ime: kor_ime,
      novoPrezime: novo
    }
    return this.http.post<string>("http://localhost:4000/gost/promeniPrezime", data)
  }

  promeniMejl(novo: string, kor_ime: string){
    const data = {
      kor_ime: kor_ime,
      noviMejl: novo
    }
    return this.http.post<string>("http://localhost:4000/gost/promeniMejl", data)
  }

  promeniAdresu(novo: string, kor_ime: string){
    const data = {
      kor_ime: kor_ime,
      novaAdresa: novo
    }
    return this.http.post<string>("http://localhost:4000/gost/promeniAdresu", data)
  }

  promeniKontakt(novo: string, kor_ime: string){
    const data = {
      kor_ime: kor_ime,
      noviKontakt: novo
    }
    return this.http.post<string>("http://localhost:4000/gost/promeniKontakt", data)
  }

  promeniKarticu(novo: string, kor_ime: string){
    const data = {
      kor_ime: kor_ime,
      novaKartica: novo
    }
    return this.http.post<string>("http://localhost:4000/gost/promeniKarticu", data)
  }

  dohvJela(restoran: number){
    const data = {
      restoran: restoran
    }
    return this.http.post<Jelo[]>("http://localhost:4000/gost/dohvatiJela", data)
  }

  posaljiPorudzbinu(p: Porudzbina){
    const data = {
      porudzbina: JSON.stringify(p)
    }
    return this.http.post<string>("http://localhost:4000/gost/dodajPorudzbinu", data)
  }

  dohvOceneGosta(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post<Ocena[]>("http://localhost:4000/gost/dohvatiOceneGosta", data)
  }

  dodajKomentar(r: RezervacijeRestoranOcene){
    const data = {
      kor_ime: r.korisnik,
      komentar: r.komentar,
      restoran: r.restoran,
      ocena: r.ocena,
      idRez: r.id,
      vreme: r.vreme
    }
    return this.http.post<string>("http://localhost:4000/gost/dodajOcenu", data)
  }

  otkaziRez(r: RezervacijeRestoranOcene){
    const data = {
      idRez: r.id
    }
    return this.http.post<string>("http://localhost:4000/gost/obrisiRezervaciju", data)
  }

  dohvPorudzbine(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post<Porudzbina[]>("http://localhost:4000/gost/dohvatiPorudzbine", data)
  }
}
