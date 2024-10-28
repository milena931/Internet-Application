import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rezervacija } from '../models/Rezervacija';
import { RezervacijeRestoranOcene } from '../models/RezervacijeRestoranOcene';
import { Porudzbina } from '../models/Porudzbina';

@Injectable({
  providedIn: 'root'
})
export class KonobarService {

  constructor(private http: HttpClient) { }

  dohvatiNeobradjeneRezervacije(restoran: number){
    const data = {
      restoran: restoran
    }
    return this.http.post<Rezervacija[]>('http://localhost:4000/konobar/dohvatiNeobradjeneRezervacije', data)
  }

  odobriRezervaciju(id: number, konobar: string){
    const data={
      id: id,
      konobar: konobar
    }
    return this.http.post<string>('http://localhost:4000/konobar/odobriRezervaciju', data)
  }
  odobriRezervacijuForma(id: number, konobar: string, br: number){
    const data={
      id: id,
      konobar: konobar,
      br: br
    }
    return this.http.post<string>('http://localhost:4000/konobar/odobriRezervacijuForma', data)
  }

  odbijRezervaciju(id: number, komentar: string){
    const data={
      id: id,
      komentar: komentar
    }
    return this.http.post<string>('http://localhost:4000/konobar/odbijRezervaciju', data)
  }

  dohvatiZaduzenja(konobar: string){
    const data = {
      konobar: konobar
    }
    return this.http.post<Rezervacija[]>('http://localhost:4000/konobar/zaduzenja', data)
  }

  potvrdiDolazak(id: number){
    const data = {
      rezervacija: id
    }
    return this.http.post<string>('http://localhost:4000/konobar/potvrdiDolazak', data)
  }

  nijeSePojavio(r: RezervacijeRestoranOcene){
    const data = {
      kor_ime: r.korisnik
    }
    return this.http.post<string>('http://localhost:4000/konobar/nijeSePojavio', data)
  }

  produziRezervaciju(r: RezervacijeRestoranOcene){
    const data = {
      id: r.id
    }
    return this.http.post<string>('http://localhost:4000/konobar/produzi', data)
  }

  dohvatiPorudzbine(id: number){
    const data = {
      restoran: id
    }
    return this.http.post<Porudzbina[]>('http://localhost:4000/konobar/porudzbine', data)
  }

  odobriPorudzbinu(p: Porudzbina){
    const data = {
      porudzbina: p
    }
    return this.http.post<Porudzbina[]>('http://localhost:4000/konobar/odobriPorudzbinu', data)
  }

  odbijPorudzbinu(p: Porudzbina){
    const data = {
      porudzbina: p
    }
    return this.http.post<Porudzbina[]>('http://localhost:4000/konobar/odbijPorudzbinu', data)
  }
}
