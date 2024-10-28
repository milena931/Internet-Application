import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';
import { Rezervacija } from '../models/Rezervacija';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-statistika-konobar',
  templateUrl: './statistika-konobar.component.html',
  styleUrls: ['./statistika-konobar.component.css']
})
export class StatistikaKonobarComponent implements OnInit, AfterViewInit{
  
  constructor(private router: Router, private konobarServis: KonobarService, private gostServis: GostService){ }

  kor_ime: string = ""
  konobar: Korisnik = new Korisnik()
  zaduzenjaKonobara: Rezervacija[] = []

  rezervacije: Rezervacija[] = []
  konobari: Korisnik[] = []


  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''

    this.gostServis.dohvGosta(this.kor_ime).subscribe(
      (konobar)=>{
        this.konobar = konobar
        this.konobarServis.dohvatiZaduzenja(this.kor_ime).subscribe(
          (zaduzenja)=>{
            this.zaduzenjaKonobara = zaduzenja
            this.gostServis.dohvRezervacije().subscribe(
              (sveRez)=>{
                this.rezervacije = sveRez
                this.gostServis.dohvKonobare().subscribe(
                  (konobari)=>{
                    this.konobari = konobari
                    let filtriraniKonobari = this.konobari.filter(k=>{
                      return k.restoran == this.konobar.restoran
                    })
                    this.konobari = filtriraniKonobari
                    this.crtajGrafike()
                  }
                )
              }
            )
            
          }
        )
      }
    )
  }

  
  ngAfterViewInit(): void {
    this.crtajGrafike()
  }

  crtajGrafike() {
    setTimeout(() => {
      if (document.getElementById('barChart') && document.getElementById('pieChart') && document.getElementById('histogramChart')) {
        this.crtajBarGrafik()
        this.crtajPitaGrafik()
        this.crtajHistogram()
      }
    }, 1000); // Dodato kašnjenje od 1s kako bi se osiguralo da su svi elementi inicijalizovani jer iz nekog razloga nije ovo radilo
  }

  crtajBarGrafik() {
    const data = this.pripremiPodatkeZaGrafik()
    const ctx = (document.getElementById('barChart') as HTMLCanvasElement).getContext('2d')
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Broj osoba po danima',
          data: Object.values(data),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  pripremiPodatkeZaGrafik() {
    const brojOsobaPoDanu: { [datum: string]: number } = {}

    for (let zaduzenje of this.zaduzenjaKonobara) {
      const datum = new Date(zaduzenje.vreme).toLocaleDateString()

      if (!brojOsobaPoDanu[datum]) {
        brojOsobaPoDanu[datum] = 0
      }
      brojOsobaPoDanu[datum] += zaduzenje.brojOsoba
    }

    return brojOsobaPoDanu
  }

  crtajPitaGrafik() {
    const data = this.pripremiPodatkeZaPitaGrafik();
    const ctx = (document.getElementById('pieChart') as HTMLCanvasElement).getContext('2d')
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Raspodela gostiju među konobarima',
          data: Object.values(data),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        }
      }
    });
  }

  pripremiPodatkeZaPitaGrafik() {
    const brojOsobaPoKonobaru: { [imeKonobara: string]: number } = {}

    for (let rezervacija of this.rezervacije) {
      if (rezervacija.zaduzenje && rezervacija.restoran === this.konobar.restoran) {
        const imeKonobara = rezervacija.zaduzenje
        if (!brojOsobaPoKonobaru[imeKonobara]) {
          brojOsobaPoKonobaru[imeKonobara] = 0
        }
        brojOsobaPoKonobaru[imeKonobara] += rezervacija.brojOsoba
      }
    }

    return brojOsobaPoKonobaru;
  }

  crtajHistogram() {
    const data = this.pripremiPodatkeZaHistogram();
    const ctx = (document.getElementById('histogramChart') as HTMLCanvasElement).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(data),
        datasets: [{
          label: 'Prosečan broj rezervacija',
          data: Object.values(data),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  pripremiPodatkeZaHistogram() {
    let danas = new Date();
    let pre24Meseca = new Date();
    pre24Meseca.setMonth(danas.getMonth() - 24);

    let brojRezervacijaPoDanuUNedelji: { [danUNedelji: string]: number[] } = {
      'PON': [], 'UTO': [], 'SRE': [], 'CET': [], 'PET': [], 'SUB': [], 'NED': []
    };

    for (let rezervacija of this.rezervacije) {
      let datum = new Date(rezervacija.vreme);
      if (datum >= pre24Meseca  && rezervacija.restoran == this.konobar.restoran) {
        let danUNedelji = datum.getDay()
        switch (danUNedelji) {
          case 0:
            brojRezervacijaPoDanuUNedelji['NED'].push(rezervacija.brojOsoba)
            break
          case 1:
            brojRezervacijaPoDanuUNedelji['PON'].push(rezervacija.brojOsoba)
            break
          case 2:
            brojRezervacijaPoDanuUNedelji['UTO'].push(rezervacija.brojOsoba)
            break
          case 3:
            brojRezervacijaPoDanuUNedelji['SRE'].push(rezervacija.brojOsoba)
            break
          case 4:
            brojRezervacijaPoDanuUNedelji['CET'].push(rezervacija.brojOsoba)
            break
          case 5:
            brojRezervacijaPoDanuUNedelji['PET'].push(rezervacija.brojOsoba)
            break
          case 6:
            brojRezervacijaPoDanuUNedelji['SUB'].push(rezervacija.brojOsoba)
            break
        }
      }
    }

    let proseciPoDanimaUNedelji: { [danUNedelji: string]: number } = {};

    console.log(proseciPoDanimaUNedelji)
    for (let dan in brojRezervacijaPoDanuUNedelji) {
      let ukupno = brojRezervacijaPoDanuUNedelji[dan].reduce((a, b) => a + b, 0);
      let broj = brojRezervacijaPoDanuUNedelji[dan].length;
      proseciPoDanimaUNedelji[dan] = broj ? ukupno / broj : 0;
    }

    return proseciPoDanimaUNedelji;
  }

  nazad(){
    this.router.navigate(['konobar'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
