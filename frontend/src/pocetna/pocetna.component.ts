import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';
import { Restoran } from '../models/Restoran';
import { RestoranSaKonobarima } from '../models/RestoranSaKonobarima';
import { Rezervacija } from '../models/Rezervacija';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private router: Router, private servis: GostService) { }

  gosti: Korisnik[] = []
  brojGostiju: number = 0
  restorani: Restoran[] = []
  brojRestorana: number = 0
  konobari: Korisnik[] = []
  restoraniIKonobari: RestoranSaKonobarima[] = []

  brojRezervacija24h: number = 0
  brojRezervacija7dana: number = 0
  brojRezervacijaMesec: number = 0
  rezervacije: Rezervacija[] = []

  ngOnInit(): void {
    this.servis.dohvBrojGostiju().subscribe(
      (gosti) => {
        this.gosti = gosti
        this.brojGostiju = gosti.length
        this.servis.dohvBrojRestorana().subscribe(
          (restorani) => {
            this.restorani = restorani
            this.brojRestorana = restorani.length
            this.servis.dohvKonobare().subscribe(
              (konobari) => {
                this.konobari = konobari
                let i: number = 0
                this.restorani.forEach(restoran => {
                  this.restoraniIKonobari[i] = new RestoranSaKonobarima()
                  this.restoraniIKonobari[i].adresa = restoran.adresa
                  this.restoraniIKonobari[i].id = restoran.id
                  this.restoraniIKonobari[i].naziv = restoran.naziv
                  this.restoraniIKonobari[i].tip = restoran.tip
                  this.konobari.forEach(konobar => {
                    if(konobar.restoran == restoran.id){
                      this.restoraniIKonobari[i].konobari.push(konobar)
                    }
                  })
                  i = i + 1
                })
              }
            )
          }
        )
      }
    )

    this.servis.dohvRezervacije().subscribe((data) => {
      this.rezervacije = data;
      this.brojRezervacija();
    });

  }

  brojRezervacija(): void {
    const now = new Date();
    this.brojRezervacija24h = this.rezervacije.filter(r => {
      const datumRezervacije = new Date(r.vreme);
      return (now.getTime() - datumRezervacije.getTime()) <= (24 * 60 * 60 * 1000);
    }).length;

    this.brojRezervacija7dana = this.rezervacije.filter(r => {
      const datumRezervacije = new Date(r.vreme);
      return (now.getTime() - datumRezervacije.getTime()) <= (7 * 24 * 60 * 60 * 1000);
    }).length;

    this.brojRezervacijaMesec = this.rezervacije.filter(r => {
      const datumRezervacije = new Date(r.vreme);
      return (now.getTime() - datumRezervacije.getTime()) <= (30 * 24 * 60 * 60 * 1000);
    }).length;
  }


  rastuce: boolean = false
  rastuceBool: boolean = false

  sortirajRestorane(param: string): void {
    if(this.rastuce){
      this.rastuceBool = true
    }
    if(param == "naziv"){
      this.restoraniIKonobari.sort((a, b) => {
        if (a.naziv < b.naziv) {
          return this.rastuceBool ? -1 : 1;
        } else if (a.naziv > b.naziv) {
          return this.rastuceBool ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    if(param == "tip"){
      this.restoraniIKonobari.sort((a, b) => {
        if (a.tip < b.tip) {
          return this.rastuceBool ? -1 : 1;
        } else if (a.tip > b.tip) {
          return this.rastuceBool ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    if(param == "adresa"){
      this.restoraniIKonobari.sort((a, b) => {
        if (a.adresa < b.adresa) {
          return this.rastuceBool ? -1 : 1;
        } else if (a.adresa > b.adresa) {
          return this.rastuceBool ? 1 : -1;
        } else {
          return 0;
        }
      });
    }
    this.rastuceBool = false
  }

  tip: string = ""
  naziv: string = ""
  adresa: string = ""
  filtriraniRestorani: RestoranSaKonobarima[] = []

  pretraziRestorane() {
    this.filtriraniRestorani = this.restoraniIKonobari.filter(restoran => {
      return (
        (this.naziv === '' || restoran.naziv.toLowerCase().includes(this.naziv.toLowerCase())) &&
        (this.adresa === '' || restoran.adresa.toLowerCase().includes(this.adresa.toLowerCase())) &&
        (this.tip === '' || restoran.tip.toLowerCase().includes(this.tip.toLowerCase()))
      )
    })
  }

  prijava() {
    this.router.navigate(['login'])
  }
}
