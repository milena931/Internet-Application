import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';
import { Restoran } from '../models/Restoran';
import { RestoranSaKonobarima } from '../models/RestoranSaKonobarima';
import { Ocena } from '../models/Ocena';

@Component({
  selector: 'app-restorani-gost',
  templateUrl: './restorani-gost.component.html',
  styleUrls: ['./restorani-gost.component.css']
})
export class RestoraniGostComponent implements OnInit{


  constructor(private router: Router, private servis: GostService){ }

  kor_ime: string = ""

  gosti: Korisnik[] = []
  brojGostiju: number = 0
  restorani: Restoran[] = []
  brojRestorana: number = 0
  konobari: Korisnik[] = []
  restoraniIKonobari: RestoranSaKonobarima[] = []
  ocene: Ocena[] = []


  ngOnInit(): void {

    this.kor_ime = localStorage.getItem('ulogovan') || ''


    this.servis.dohvBrojGostiju().subscribe(
      (gosti) => {
        this.gosti = gosti
        this.brojGostiju = gosti.length
        this.servis.dohvBrojRestorana().subscribe(
          (restorani) => {
            this.restorani = restorani
            this.brojRestorana = restorani.length
            this.servis.dohvOcene().subscribe((ocene)=>{
              this.ocene = ocene
              this.servis.dohvKonobare().subscribe(
                (konobari) => {
                  this.konobari = konobari
                  let i: number = 0
                  let br: number = 0
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
                    this.ocene.forEach(ocena=>{
                      if(ocena.restoran == restoran.id){
                        this.restoraniIKonobari[i].prosecnaOcena = this.restoraniIKonobari[i].prosecnaOcena + ocena.ocena
                        br = br +1
                      }
                    })
                    if(br != 0){
                      this.restoraniIKonobari[i].prosecnaOcena = this.restoraniIKonobari[i].prosecnaOcena / br
                    }
                    br = 0
                    i = i + 1
                  })
                }
              )
            })
          }
        )
      }
    )
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

  rezervacija(id: number){
    localStorage.setItem('restoran', id.toString())
    this.router.navigate(['rezervacija'])
  }

  nazad(){
    this.router.navigate(['gost'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
