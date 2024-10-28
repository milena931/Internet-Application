import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { AdministratorService } from '../services/administrator.service';
import { Korisnik } from '../models/User';
import { Restoran } from '../models/Restoran';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-konobari-admin',
  templateUrl: './konobari-admin.component.html',
  styleUrls: ['./konobari-admin.component.css']
})
export class KonobariAdminComponent implements OnInit{

  constructor(private router: Router, private gostServis: GostService, private adminServis: AdministratorService, private servis: LoginService){ }

  konobari: Korisnik[] = []
  restorani: Restoran[] = []

  ngOnInit(): void {
    this.gostServis.dohvKonobare().subscribe(
      (data)=>{
        this.konobari = data
        this.gostServis.dohvBrojRestorana().subscribe(
          (res)=>{
            this.restorani = res
          }
        )
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
  restoran: number = 0

  greska_podaci: string = ""
  greska_lozinka: string = ""

  validatePassword(lozinka: string) {
    let regex = /^(?=[a-zA-Z])(?=(?:.*[a-z]){3})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
    return regex.test(lozinka);
  }

  registracija() {
    if (this.ime == "" || this.prezime == "" || this.kor_ime == "" ||
      this.lozinka == "" || this.pol == "" || this.adresa == "" || this.bezbedonosno_pitanje == "" ||
      this.odgovor == "" || this.mejl == "" || this.broj_kartice == "" || this.kontakt_telefon == ""
    ) {

      this.greska_podaci = "Niste uneli sve podatke"

    } else {
      this.greska_podaci = ""
      if(! this.validatePassword(this.lozinka)){
        this.greska_lozinka = "Lozinka mora da ima minimalno 6 karaktera, maksimalno 10 karaktera, od toga bar jedno veliko slovo, 3 mala slova,\njedan broj i jedan specijalan karakter i mora pocinjati slovom"
      }else{
        this.greska_lozinka = ""
        this.servis.registracija(this.ime, this.prezime, this.kor_ime, this.lozinka, this.pol, this.mejl, this.adresa,
          this.broj_kartice, this.kontakt_telefon, this.bezbedonosno_pitanje, this.odgovor, this.slika_fajl
        ).subscribe(
          (data: any)=>{
            if(data['msg'] == 'registrovan'){
              this.adminServis.odobriKorisnika(this.kor_ime).subscribe(
                (odobren)=>{
                  if(odobren){
                    this.adminServis.dodajKonobara(this.kor_ime, this.restoran).subscribe(
                      (uspesno)=>{
                        if(uspesno){
                          this.ngOnInit()
                        }
                      }
                    )
                  }
                }
              )
            }else{
              this.greska_podaci = "Slika nije odgovarajucih dimenzija. Molimo vas pokušajte ponovo"
            }
          }
        )
      }
    }
  }

  nazad(){
    this.router.navigate(['admin'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
