import { Component, OnInit } from '@angular/core';
import { GostService } from '../services/gost.service';
import { Router } from '@angular/router';
import { Rezervacija } from '../models/Rezervacija';
import { Ocena } from '../models/Ocena';
import { Restoran } from '../models/Restoran';
import { RezervacijeRestoranOcene } from '../models/RezervacijeRestoranOcene';
import { RatingChangeEvent } from 'angular-star-rating';

@Component({
  selector: 'app-rezervacije-gost',
  templateUrl: './rezervacije-gost.component.html',
  styleUrls: ['./rezervacije-gost.component.css']
})
export class RezervacijeGostComponent implements OnInit{

  constructor(private router: Router, private servis: GostService){ }

  kor_ime: string = ""
  rezervacije: Rezervacija[] = []
  ocene: Ocena[] = []
  restorani: Restoran[] = []

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''

    this.servis.dohvRezervacijeGosta(this.kor_ime).subscribe(
      (data)=>{
        this.rezervacije = data
        this.rezervacije.sort((a, b) => {
          let aDate = new Date(a.vreme).getTime();
          let bDate = new Date(b.vreme).getTime();

          return bDate - aDate; // Sortiraj u opadajućem redosledu
        });

        this.servis.dohvOceneGosta(this.kor_ime).subscribe(
          (ocene)=>{
            this.ocene = ocene
            this.servis.dohvBrojRestorana().subscribe(
              (restorani)=>{
                this.restorani = restorani

                this.formirajRezervacije()
              }
            )
          }
        )
      }
    )
  }

  kompletRezervacije: RezervacijeRestoranOcene[] = []
  aktuelneRezervacije: RezervacijeRestoranOcene[] = []
  prosleRezervacije: RezervacijeRestoranOcene[] = []

  formirajRezervacije(){

    this.rezervacije.forEach(rezervacija=>{
      let novaRez: RezervacijeRestoranOcene = new RezervacijeRestoranOcene()
      novaRez.bio = rezervacija.bio
      novaRez.brojOsoba = rezervacija.brojOsoba
      novaRez.korisnik = this.kor_ime
      novaRez.odobren = rezervacija.odobrena
      novaRez.opis = rezervacija.opis
      novaRez.restoran =rezervacija.restoran
      novaRez.sto = rezervacija.sto
      novaRez.vreme = new Date(rezervacija.vreme)
      novaRez.id = rezervacija.id
      novaRez.razlogOdbijanja = rezervacija.razlogOdbijanja

      this.restorani.forEach(restoran=>{
        if(rezervacija.restoran == restoran.id){
          novaRez.nazivRestorana = restoran.naziv
          novaRez.adresa = restoran.adresa
        }
      })
      this.ocene.forEach(ocena=>{
        if(rezervacija.id == ocena.idRez){
          novaRez.komentar = ocena.komentar
          novaRez.ocena = ocena.ocena
          
        }
      })

      this.kompletRezervacije.push(novaRez)
    })

    this.kompletRezervacije.forEach(rezervacija=>{
      if(new Date(rezervacija.vreme) > new Date()){
        this.aktuelneRezervacije.push(rezervacija)
      }else{
        this.prosleRezervacije.push(rezervacija)
      }
    })
  }

  rezZaKomentarisanje: RezervacijeRestoranOcene = new RezervacijeRestoranOcene()
  komBool: boolean = false

  dodajKomentar(r: RezervacijeRestoranOcene){
    this.komBool = true
    this.rezZaKomentarisanje = r
  }

  komentar: string = ""

  onRatingChange(event: RatingChangeEvent) {
    this.rezZaKomentarisanje.ocena = event.rating
  }

  dodaj(){
    this.rezZaKomentarisanje.komentar = this.komentar
    this.servis.dodajKomentar(this.rezZaKomentarisanje).subscribe(
      (res) => {
        if (res) {
          alert("Komentar uspešno dodat")
          this.komBool = false
          this.komentar = ""
        } else {
          alert("Došlo je do greške prilikom dodavanja komentara")
        }
      }
    )
  }

  otkazi(r: RezervacijeRestoranOcene){
    let ogranicenje = 45 * 60 * 60 * 1000 //u milisekundama

    let pocetak = new Date(r.vreme).getTime()
    let kraj = pocetak - ogranicenje

    if(new Date().getTime() > kraj){
      alert("Prošlo je vreme za otkazivanje. Vreme za otkazivanje je 45 minuta pre pocetka rezervacije")
    }else{
      this.servis.otkaziRez(r).subscribe(
        (data)=>{
          if(data){
            this.ngOnInit()
          }else{
            alert('Greska pri otkazivanju')
          }
        }
      )
    }
  }

  nazad(){
    this.router.navigate(['gost'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
