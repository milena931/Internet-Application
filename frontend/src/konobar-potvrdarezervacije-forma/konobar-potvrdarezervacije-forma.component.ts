import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RezervacijeRestoranOcene } from '../models/RezervacijeRestoranOcene';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { GostService } from '../services/gost.service';
import { Restoran } from '../models/Restoran';
import { Rezervacija } from '../models/Rezervacija';

@Component({
  selector: 'app-konobar-potvrdarezervacije-forma',
  templateUrl: './konobar-potvrdarezervacije-forma.component.html',
  styleUrls: ['./konobar-potvrdarezervacije-forma.component.css']
})
export class KonobarPotvrdarezervacijeFormaComponent implements OnInit, AfterViewInit{

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D

  constructor(private router: Router, private servis: KonobarService, private gostServis: GostService) { }

  kor_ime: string = ""
  rezervacija: RezervacijeRestoranOcene
  slobodniStolovi: boolean[] = []
  restoran: Restoran = new Restoran()
  rezervacije: Rezervacija[] = []
  izabraniSto: number = 0

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''
    this.rezervacija = JSON.parse(localStorage.getItem('rezervacija'))

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
    let trajanjeRezervacije = 3 * 60 * 60 * 1000; //u mili sekundama

    let krajRezervacije = new Date(datumVreme.getTime() + trajanjeRezervacije);


    // Filtriranje rezervacija koje se preklapaju sa novom rezervacijom
    let preklapajuceRezervacije = this.rezervacije.filter(rezervacija => {
      let pocetakPostojece = new Date(rezervacija.vreme);
      trajanjeRezervacije = 3 * 60 * 60 * 1000;

      if(rezervacija.produzena){
        trajanjeRezervacije = 4 * 60 * 60 * 1000;
      }
      let krajPostojece = new Date(pocetakPostojece.getTime() + trajanjeRezervacije)

      return (datumVreme < krajPostojece && krajRezervacije > pocetakPostojece)
    });

    let zauzetiStolovi = preklapajuceRezervacije.length;
    for (let i = 0; i < zauzetiStolovi; i++) {
      if(preklapajuceRezervacije[i].odobrena == true){
        this.slobodniStolovi[preklapajuceRezervacije[i].sto - 1] = false;
      }
    }


    for (let elem of this.restoran.raspored) {
      if (elem.tip_elementa === "sto") {
        this.ctx.beginPath();
        this.ctx.arc(elem.x, elem.y, elem.poluprecnik, 0, 2 * Math.PI);
  
        if (!this.slobodniStolovi[elem.brojStola - 1]) {
          this.ctx.fillStyle = 'red';
        } else if (this.izabraniSto === elem.brojStola) {
          this.ctx.fillStyle = 'green';
        } else {
          this.ctx.fillStyle = 'white';
        }
  
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(elem.brojLjudiZaStolom.toString(), elem.x, elem.y); // Display capacity
  
      } else if (elem.tip_elementa === "kuhinja") {
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.strokeRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText("KUHINJA", elem.x - 20, elem.y + 5);
  
      } else if (elem.tip_elementa === "toalet") {
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.strokeRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText("TOALET", elem.x - 20, elem.y + 5);
      }
    }
  }

  odaberiSto(event: MouseEvent) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
  let x = event.clientX - rect.left;
  let y = event.clientY - rect.top;

  for (let elem of this.restoran.raspored) {
    if (elem.tip_elementa == "sto") {
      let distance = Math.sqrt((x - elem.x) ** 2 + (y - elem.y) ** 2);
      if (distance < elem.poluprecnik && this.slobodniStolovi[elem.brojStola - 1] && this.rezervacija.brojOsoba <= elem.brojLjudiZaStolom) {
        this.izabraniSto = elem.brojStola;
        this.crtajStolove();
        return;
      }
    }
  }

  this.izabraniSto = 0;
  this.crtajStolove();
  }


  getBrojStolova(): number[] {
    let niz: number[] = []
    for(let i = 0; i < this.restoran.brStolova; i++){
      niz[i] = i
    }
    return niz
  }

  greska: string = ""

  odobri(){
    if(this.izabraniSto == 0){
      this.greska = "Niste izabrali sto"
    }else{
      this.greska = ""
      this.servis.odobriRezervacijuForma(this.rezervacija.id, this.kor_ime, this.izabraniSto).subscribe(
        (data)=>{
          if(data){
            this.rezervacija.sto = this.izabraniSto
            this.rezervacija.odobren = true
            localStorage.setItem('rezervacija', JSON.stringify(this.rezervacija))
            alert('Rezervacija odobrena')
            this.ngOnInit()
          }
        }
      )
    }
    
  }

  odbijBool: boolean = false

  odbijanje(){
    this.odbijBool = true
  }

  komentar: string = ""

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
