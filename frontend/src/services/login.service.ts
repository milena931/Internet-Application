import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Korisnik } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(kor_ime: string, lozinka: string) {
    const data = {
      korisnicko_ime: kor_ime,
      lozinka: lozinka
    }
    return this.http.post<Korisnik>("http://localhost:4000/login/login", data)
  }

  registracija(ime: string, prezime: string, kor_ime: string, lozinka: string, pol: string, mejl: string,
    adresa: string, broj_kartice: string, kontakt_telefon: string, bezbedonosno_pitanje: string, odgovor: string, slika: File
  ) {

    const formData: FormData = new FormData();
    formData.append('ime', ime);
    formData.append('prezime', prezime);
    formData.append('kor_ime', kor_ime);
    formData.append('lozinka', lozinka);
    formData.append('pol', pol);
    formData.append('mejl', mejl);
    formData.append('adresa', adresa);
    formData.append('broj_kartice', broj_kartice);
    formData.append('kontakt_telefon', kontakt_telefon);
    formData.append('bezbedonosno_pitanje', bezbedonosno_pitanje);
    formData.append('odgovor', odgovor);

    if (slika) {
      formData.append('slika', slika, slika.name);
    }


    return this.http.post<String>("http://localhost:4000/login/registracija", formData)
  }

  promeniLozinku(kor_ime: string, nova: string){
    const data = {
      kor_ime: kor_ime,
      nova: nova
    }
    return this.http.post<String>("http://localhost:4000/login/promenaLozinke", data)
  }

  prikaziPitanje(kor_ime: string){
    const data = {
      kor_ime: kor_ime
    }
    return this.http.post<string>("http://localhost:4000/login/prikaziPitanje", data)
  }

  proveriOdgovor(kor_ime: string, odgovor: string){
    const data = {
      kor_ime: kor_ime,
      odgovor: odgovor
    }
    return this.http.post<string>("http://localhost:4000/login/proveriOdgovor", data)
  }

  dohvSveGoste(){
    return this.http.get<Korisnik[]>("http://localhost:4000/login/gosti")
  }
}
