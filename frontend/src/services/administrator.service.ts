import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/User';
import { Restoran } from '../models/Restoran';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }

  dohvatiZahteve(){
    return this.http.get<Korisnik[]>('http://localhost:4000/admin/zahtevi')
  }

  odobriKorisnika(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post<string>('http://localhost:4000/admin/odobri', data)
  }

  deaktivirajKorisnika(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post<string>('http://localhost:4000/admin/deaktiviraj', data)
  }

  dodajKonobara(kor_ime: string, restoran: number){
    const data = {
      kor_ime: kor_ime,
      restoran: restoran
    }
    return this.http.post<string>('http://localhost:4000/admin/konobar', data)
  }

  dodajRestoran(r: Restoran){
    const data = {
      restoran: r
    }
    return this.http.post<string>('http://localhost:4000/admin/restoran', data)
  }
}
