import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Restoran } from '../models/Restoran';
import { Ocena } from '../models/Ocena';
import { Korisnik } from '../models/User';
import * as L from 'leaflet';
import { KoordinateService } from '../services/koordinate.service';
import { Rezervacija } from '../models/Rezervacija';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent implements OnInit, AfterViewInit {

  map: any;
  marker: any;

  constructor(private router: Router, private servis: GostService, private koordinateServis: KoordinateService) { }

  ngAfterViewInit(): void {  //za inicijalizaciju leaflet mape
    this.map = L.map('map', {
      center: [44.7866, 20.4489],
      zoom: 15
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const beograd: L.LatLngBoundsExpression = [
      [44.578, 20.210],
      [45.017, 20.635]
    ];
    this.map.fitBounds(beograd);
  }

  koordinate(adresa: string): void {
    this.koordinateServis.koordinate(adresa).subscribe(
      (koordinate: any) => {
        if (koordinate) {
          this.marker = L.marker([koordinate.lat, koordinate.lon]).addTo(this.map);
          this.marker.bindPopup(adresa).openPopup();

          this.map.setView([koordinate.lat, koordinate.lon], 15);
        } else {
          alert('Nepostojeća lokacija')
        }
      }
    );
  }

  id: number = 0
  kor_ime: string = ""
  restoran: Restoran = new Restoran()
  oceneRestorana: Ocena[] = []
  sveOcene: Ocena[] = []
  korisnici: Korisnik[] = []
  zvezdice: string = ""
  korisnik: Korisnik = new Korisnik()

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''
    this.id = parseInt(localStorage.getItem('restoran') || '')

    this.servis.dohvRestoran(this.id).subscribe(
      (data) => {
        if (data) {
          this.restoran = data
          this.koordinate(this.restoran.adresa);
          this.servis.dohvOcene().subscribe(
            (ocene) => {
              this.servis.dohvBrojGostiju().subscribe(
                (gosti) => {
                  ocene.forEach(ocena => {
                    if (ocena.restoran == this.id) {
                      gosti.forEach(gost => {
                        if (gost.kor_ime == ocena.korisnik) {
                          ocena.ime = gost.ime
                          ocena.prezime = gost.prezime
                        }
                      })
                      this.oceneRestorana.push(ocena)
                    }
                  })
                  this.servis.dohvGosta(this.kor_ime).subscribe(
                    (kor)=>{
                      this.korisnik = kor
                    }
                  )
                }
              )
            }
          )
        }
      }
    )

  }

  vreme: string = ""
  opis: string = ""
  broj: number = 0
  greska: string = ""
  rezervacije: Rezervacija[] = []

  parseVreme(time: string, referenceDate: Date): Date {
    let [hours, minutes] = time.split(':').map(Number);
    let result = new Date(referenceDate);
    result.setHours(hours);
    result.setMinutes(minutes);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  }

  rezervacija() {
    if (this.broj == 0 || this.vreme == "") {
      this.greska = "Niste uneli podatke"
    }else if(this.korisnik.nepojavljivanja >= 3){
      this.greska = "Nemate mogućnost rezervacije zbog nepojavljivanja"
    } else {

      let vremeRezervacije = new Date(this.vreme)
      let pocetakRadnogVremena = this.parseVreme(this.restoran.pocetakRadnogVremena, vremeRezervacije)
      let krajRadnogVremena = this.parseVreme(this.restoran.krajRadnogVremena, vremeRezervacije)

      if (krajRadnogVremena <= pocetakRadnogVremena) {
        krajRadnogVremena.setDate(krajRadnogVremena.getDate() + 1)
      }

      if (vremeRezervacije < pocetakRadnogVremena || vremeRezervacije > krajRadnogVremena) {
        this.greska = "Vreme rezervacije je van radnog vremena restorana."
        return
      }

      if(vremeRezervacije < new Date()){
        this.greska = "Vreme rezervacije je u prošlosti."
        return
      }

      this.greska = ""
      this.vreme = this.vreme + ':00'
      this.servis.dohvRezervacijeRestorana(this.id).subscribe(
        (data) => {
          this.rezervacije = data
          let sto = this.proveriRaspolozivostMesta(this.vreme, this.opis, this.broj, this.rezervacije)
          if (sto > 0) {
            let mojSto = 1
            this.rezervacije.forEach(rezervacija => {
              let datumVreme: Date = new Date(this.vreme );
              let trajanjeRezervacije = 3 * 60 * 60 * 1000; //u mili sekundama

              let krajRezervacije = new Date(datumVreme.getTime() + trajanjeRezervacije);

              let preklapajuceRezervacije = this.rezervacije.filter(rezervacija => {
                let pocetakPostojece = new Date(rezervacija.vreme);

                if(rezervacija.produzena == true){
                  trajanjeRezervacije = 4 * 60 * 60 * 1000
                }
                let krajPostojece = new Date(pocetakPostojece.getTime() + trajanjeRezervacije)
          
                return (datumVreme < krajPostojece && krajRezervacije > pocetakPostojece)
              });

              preklapajuceRezervacije.forEach(preklapajuca=>{
                if(preklapajuca.sto == mojSto){
                  mojSto = mojSto +1
                }
              })

            })
            this.servis.rezervisiRestoran(this.broj, this.vreme, this.opis, this.id, this.kor_ime, 0).subscribe( //inicijalno nije sto dodeljen
              (rez) => {
                if (rez) {
                  alert("Rezervacija uspešno poslata")
                  this.vreme = ""
                  this.broj = 0
                }
              }
            )
          } else {
            alert('Nažalost, nema dovoljno mesta za odabrani datum i vreme.');
          }
        }
      )
    }

  }

  proveriRaspolozivostMesta(vreme: string, opis: string, brLjudi: number, sveRezervacije: Rezervacija[]): number {
    let datumVreme: Date = new Date(vreme);
    let trajanjeRezervacije = 3 * 60 * 60 * 1000; //u mili sekundama

    let krajRezervacije = new Date(datumVreme.getTime() + trajanjeRezervacije);

    let brojStolova = this.restoran.brStolova;
    let kapacitetStola = 6;


    if (brLjudi > kapacitetStola) {
      alert('Jedna rezervacija može rezervisati najviše jedan sto (do 6 osoba). \n Ukoliko vam je potreban jop jedan sto molimo vas rezervišite ga odvojeno');
      return -1;
    }

    // Filtriranje rezervacija koje se preklapaju sa novom rezervacijom
    let preklapajuceRezervacije = sveRezervacije.filter(rezervacija => {
      let pocetakPostojece = new Date(rezervacija.vreme);
      let krajPostojece = new Date(pocetakPostojece.getTime() + trajanjeRezervacije)

      return (datumVreme < krajPostojece && krajRezervacije > pocetakPostojece)
    });

    let zauzetiStolovi = preklapajuceRezervacije.length;

    // Provera da li ima dovoljno slobodnih stolova
    return brojStolova - zauzetiStolovi
  }

  panel() {
    this.router.navigate(['panelRezervacija'])
  }

  jelovnik(){
    this.router.navigate(['jelovnik'])
  }

  nazad() {
    this.router.navigate(['restoraniGost'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}