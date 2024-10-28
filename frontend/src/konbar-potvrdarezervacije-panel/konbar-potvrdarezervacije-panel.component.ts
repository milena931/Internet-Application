import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { RezervacijeRestoranOcene } from '../models/RezervacijeRestoranOcene';
import { Restoran } from '../models/Restoran';
import { GostService } from '../services/gost.service';
import { Rezervacija } from '../models/Rezervacija';

@Component({
  selector: 'app-konbar-potvrdarezervacije-panel',
  templateUrl: './konbar-potvrdarezervacije-panel.component.html',
  styleUrls: ['./konbar-potvrdarezervacije-panel.component.css']
})
export class KonbarPotvrdarezervacijePanelComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D

  constructor(private router: Router, private servis: KonobarService, private gostServis: GostService) { }

  kor_ime: string = ""
  rezervacija: RezervacijeRestoranOcene
  slobodniStolovi: boolean[] = []
  restoran: Restoran = new Restoran()
  rezervacije: Rezervacija[] = []
  odabraniSto: number = 0

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''
    this.rezervacija = JSON.parse(localStorage.getItem('rezervacija'))
    this.odabraniSto = this.rezervacija.sto

    this.gostServis.dohvRestoran(this.rezervacija.restoran).subscribe(
      (data) => {
        this.restoran = data
        this.gostServis.dohvRezervacijeRestorana(this.restoran.id).subscribe(
          (rezervacije) => {
            this.rezervacije = rezervacije
            this.crtajStolove()
          }
        )
      }
    )

  }

  crtajStolove() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let i = 0; i < this.restoran.brStolova; i++) {
      this.slobodniStolovi[i] = true
    }

    let datumVreme: Date = new Date(this.rezervacija.vreme);
    let trajanjeRezervacije = 3 * 60 * 60 * 1000 //u mili sekundama

    let krajRezervacije = new Date(datumVreme.getTime() + trajanjeRezervacije);


    // Filtriranje rezervacija koje se preklapaju sa novom rezervacijom
    let preklapajuceRezervacije = this.rezervacije.filter(rezervacija => {
      let pocetakPostojece = new Date(rezervacija.vreme);
      trajanjeRezervacije = 3 * 60 * 60 * 1000
      if(rezervacija.produzena){
        trajanjeRezervacije = 4 * 60 * 60 * 1000
      }
      let krajPostojece = new Date(pocetakPostojece.getTime() + trajanjeRezervacije)

      return (datumVreme < krajPostojece && krajRezervacije > pocetakPostojece)
    });

    let zauzetiStolovi = preklapajuceRezervacije.length;
    for (let i = 0; i < zauzetiStolovi; i++) {
      this.slobodniStolovi[preklapajuceRezervacije[i].sto - 1] = false;
    }

    this.restoran.raspored.forEach(elem => {
      if (elem.tip_elementa === "sto") {
        const x = elem.x;
        const y = elem.y;

        // Bojenje stolova
        if (this.rezervacija.sto === elem.brojStola && !this.rezervacija.odobren) {
          this.ctx.fillStyle = 'yellow'; // odabrani sto, rezervacija nije odobrena
        } else if (!this.slobodniStolovi[elem.brojStola - 1]) {
          this.ctx.fillStyle = 'red'; // zauzet sto
        } else if (this.odabraniSto === elem.brojStola) {
          this.ctx.fillStyle = 'green'; // odabrani sto
        } else {
          this.ctx.fillStyle = 'white'; // slobodan sto
        }

        // Crtanje kruga za sto
        this.ctx.beginPath();
        this.ctx.arc(x, y, elem.poluprecnik, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();

        // Iscrtavanje kapaciteta stola
        if (this.slobodniStolovi[elem.brojStola - 1]) {
          this.ctx.fillStyle = 'black';
          this.ctx.fillText(elem.brojLjudiZaStolom.toString(), x - 5, y + 5);
        }
      } else if (elem.tip_elementa === "kuhinja") {
        // Crtanje kuhinje
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.strokeRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText("KUHINJA", elem.x - 20, elem.y + 5);
      } else if (elem.tip_elementa === "toalet") {
        // Crtanje toaleta
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.strokeRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText("TOALET", elem.x - 20, elem.y + 5);
      }
    });
  }


  odobri(){
    this.rezervacija.odobren = true
    this.servis.odobriRezervaciju(this.rezervacija.id, this.kor_ime).subscribe(
      (data)=>{
        if(data){
          this.rezervacija.odobren = true
          localStorage.setItem('rezervacija', JSON.stringify(this.rezervacija))
          alert('Rezervacija uspešno odobrena')
          this.ngOnInit()
        }
      }
    )
  }

  odbijBool: boolean = false

  odbijanje(){
    this.odbijBool = true
  }

  komentar: string = ""
  greska: string = ""

  odbij(){
    if(this.komentar == ""){
      this.greska = "Komentar je obavezan kod odbijanja rezervacije"
    }else{
      this.servis.odbijRezervaciju(this.rezervacija.id, this.komentar).subscribe(
        (data)=>{
          if(data){
            this.router.navigate(['rezervacijeKonobar'])
          }
        }
      )
    }
  }

  nazad() {
    this.router.navigate(['rezervacijeKonobar'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
