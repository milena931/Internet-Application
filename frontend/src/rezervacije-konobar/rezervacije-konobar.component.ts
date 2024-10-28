import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { GostService } from '../services/gost.service';
import { Rezervacija } from '../models/Rezervacija';
import { Restoran } from '../models/Restoran';
import { RezervacijeRestoranOcene } from '../models/RezervacijeRestoranOcene';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-rezervacije-konobar',
  templateUrl: './rezervacije-konobar.component.html',
  styleUrls: ['./rezervacije-konobar.component.css']
})
export class RezervacijeKonobarComponent implements OnInit {

  constructor(private router: Router, private konobarServis: KonobarService, private gostServis: GostService) { }

  kor_ime: string = ""
  neobradjene: Rezervacija[] = []
  rezervacije: RezervacijeRestoranOcene[] = []
  restorani: Restoran[] = []
  restoran: Restoran = new Restoran()
  konobar: Korisnik = new Korisnik()
  gosti: Korisnik[] = []

  zaduzenja: Rezervacija[] = []
  zaduzenjaProsireno: RezervacijeRestoranOcene[] = []



  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''

    this.gostServis.dohvGosta(this.kor_ime).subscribe(
      (konobar) => {
        this.konobar = konobar
        this.gostServis.dohvRestoran(this.konobar.restoran).subscribe(
          (restoran) => {
            this.restoran = restoran
            this.konobarServis.dohvatiNeobradjeneRezervacije(this.restoran.id).subscribe(
              (rezervacije) => {
                this.neobradjene = rezervacije
                this.neobradjene.sort((a, b) => {
                  let aDate = new Date(a.vreme).getTime();
                  let bDate = new Date(b.vreme).getTime();

                  return bDate - aDate; // Sortiraj u opadajućem redosledu
                });
                this.konobarServis.dohvatiZaduzenja(this.kor_ime).subscribe(
                  (rez) => {
                    this.zaduzenja = rez
                    this.gostServis.dohvBrojGostiju().subscribe(
                      (gosti)=>{
                        this.gosti = gosti
                        this.postaviPolja()
                      }
                    )
                  }
                )
              }
            )
          }
        )
      }
    )

  }

  postaviPolja() {
    this.rezervacije = []
    this.zaduzenjaProsireno = []
    
    this.neobradjene.forEach(rezervacija => {
      let novaRez: RezervacijeRestoranOcene = new RezervacijeRestoranOcene()
      novaRez.bio = rezervacija.bio
      novaRez.brojOsoba = rezervacija.brojOsoba
      novaRez.id = rezervacija.id
      novaRez.korisnik = rezervacija.korisnik
      novaRez.opis = rezervacija.opis
      novaRez.vreme = new Date(rezervacija.vreme)
      novaRez.sto = rezervacija.sto
      novaRez.odobren = rezervacija.odobrena
      novaRez.zaduzenje = rezervacija.zaduzenje
      novaRez.tip = rezervacija.tip
      novaRez.nazivRestorana = this.restoran.naziv
      novaRez.adresa = this.restoran.adresa
      novaRez.restoran = this.restoran.id
      novaRez.razlogOdbijanja = rezervacija.razlogOdbijanja

      this.gosti.forEach(gost => {
        if (gost.kor_ime == rezervacija.korisnik) {
          novaRez.ime = gost.ime
          novaRez.prezime = gost.prezime
        }
      })
      this.rezervacije.push(novaRez)
    })

    this.zaduzenja.forEach(rezervacija => {
      let novaRez: RezervacijeRestoranOcene = new RezervacijeRestoranOcene()
      novaRez.bio = rezervacija.bio
      novaRez.brojOsoba = rezervacija.brojOsoba
      novaRez.id = rezervacija.id
      novaRez.korisnik = rezervacija.korisnik
      novaRez.opis = rezervacija.opis
      novaRez.vreme = new Date(rezervacija.vreme)
      novaRez.sto = rezervacija.sto
      novaRez.odobren = rezervacija.odobrena
      novaRez.zaduzenje = rezervacija.zaduzenje
      novaRez.tip = rezervacija.tip
      novaRez.produzena = rezervacija.produzena
      novaRez.nazivRestorana = this.restoran.naziv
      novaRez.adresa = this.restoran.adresa
      novaRez.restoran = this.restoran.id
      novaRez.razlogOdbijanja = rezervacija.razlogOdbijanja
      
      this.gosti.forEach(gost => {
        if (gost.kor_ime == rezervacija.korisnik) {
          novaRez.ime = gost.ime
          novaRez.prezime = gost.prezime
        }
      })
      this.zaduzenjaProsireno.push(novaRez)
    })
  }

  odobri(r: RezervacijeRestoranOcene) {
    if (r.tip == 'panel') {
      localStorage.setItem('rezervacija', JSON.stringify(r))
      this.router.navigate(['konobarPanelRezervacija'])
    } else if (r.tip == 'forma') {
      localStorage.setItem('rezervacija', JSON.stringify(r))
      this.router.navigate(['konobarFormaRezervacija'])
    }
  }

  potvrdiDolazak(r: RezervacijeRestoranOcene){
    if(new Date(r.vreme).getTime() + 210 * 60 * 1000 >= new Date().getTime() && new Date(r.vreme) < new Date()){
      this.konobarServis.potvrdiDolazak(r.id).subscribe(
        (data)=>{
          this.neobradjene = []
          this.zaduzenjaProsireno = []
          this.ngOnInit()
        }
      )
    }else{
      alert('Rezervacija još nije počela ili vam je isteklo vreme za odobravanje')
    }
  }

  nijeSePojavio(r: RezervacijeRestoranOcene){
    if(new Date(r.vreme).getTime() + 210 * 60 * 1000 >= new Date().getTime() && new Date(r.vreme) < new Date()){
      this.konobarServis.nijeSePojavio(r).subscribe(
        (data)=>{
          this.zaduzenjaProsireno = []
          this.neobradjene = []
          this.ngOnInit()
        }
      )
    }else{
      alert('Rezervacija još nije počela ili vam je isteklo vreme za odobravanje')
    }
  }

  produzi(r: RezervacijeRestoranOcene){
    if(new Date() > new Date(r.vreme)){
      alert("Rezervacija ne može biti produžena u toku trajanja")
    }else{
      this.konobarServis.produziRezervaciju(r).subscribe(
        (data)=>{
          if(data){
            alert("Rezervacija uspešno produžena")
            this.ngOnInit()
          }else{
            alert("Došlo je do greške")
          }
        }
      )
    }
  }

  nazad() {
    this.router.navigate(['konobar'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
