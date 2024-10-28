import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private router: Router, private servis: LoginService) { }

  ostaliGosti: Korisnik[] = []

  ngOnInit() {
    this.servis.dohvSveGoste().subscribe(
      (data) => {
        this.ostaliGosti = data
      }
    )
  }

  ime: string = ""
  prezime: string = ""
  kor_ime: string = ""
  lozinka: string = ""
  bezbedonosno_pitanje: string = ""
  odgovor: string = ""
  pol: string = ""
  adresa: string = ""
  kontakt_telefon: string = ""
  mejl: string = ""
  slika: string = ""
  slika_fajl: File = new File([], "", undefined)
  broj_kartice: string = ""

  greska_podaci: string = ""
  greska_lozinka: string = ""

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.slika_fajl = file;
    }
  }



  validatePassword(lozinka: string) {
    let regex = /^(?=[a-zA-Z])(?=(?:.*[a-z]){3})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
    return regex.test(lozinka);
  }

  registracija() {
    this.greska_podaci = ""
    this.greska_lozinka = ""
    if (this.ime == "" || this.prezime == "" || this.kor_ime == "" ||
      this.lozinka == "" || this.pol == "" || this.adresa == "" || this.bezbedonosno_pitanje == "" ||
      this.odgovor == "" || this.mejl == "" || this.broj_kartice == "" || this.kontakt_telefon == ""
    ) {

      this.greska_podaci = "Niste uneli sve podatke"

    } else {

      this.ostaliGosti.forEach(gost => {
        if (gost.kor_ime == this.kor_ime) {
          this.greska_podaci = "Korisničko ime nije jedinstveno"
          return
        }
        if (gost.mejl == this.mejl) {
          this.greska_podaci = "Mejl nije jedinstven"
          return
        }
      })

      if (this.greska_podaci == "") {
        this.greska_podaci = ""
        if (!this.validatePassword(this.lozinka)) {
          this.greska_lozinka = "Lozinka mora da ima minimalno 6 karaktera, maksimalno 10 karaktera, od toga bar jedno veliko slovo, 3 mala slova,\njedan broj i jedan specijalan karakter i mora pocinjati slovom"
        } else {
          this.greska_lozinka = ""
          this.servis.registracija(this.ime, this.prezime, this.kor_ime, this.lozinka, this.pol, this.mejl, this.adresa,
            this.broj_kartice, this.kontakt_telefon, this.bezbedonosno_pitanje, this.odgovor, this.slika_fajl
          ).subscribe(
            (data: any) => {
              if (data['msg'] == 'registrovan') {
                alert("Vaš zahtev za registraciju je uspešno poslat.\n Molimo sačekajte odobrenje administratora")
              } else {
                this.greska_podaci = "Slika nije odgovarajucih dimenzija. Molimo vas pokušajte ponovo"
              }
            }
          )
        }
      }

    }
  }

  nazad() {
    this.router.navigate(['login'])
  }
}
