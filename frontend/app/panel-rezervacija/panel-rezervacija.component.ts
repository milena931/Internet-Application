import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Restoran } from '../models/Restoran';
import { GostService } from '../services/gost.service';
import { Rezervacija } from '../models/Rezervacija';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-panel-rezervacija',
  templateUrl: './panel-rezervacija.component.html',
  styleUrls: ['./panel-rezervacija.component.css']
})
export class PanelRezervacijaComponent implements OnInit, AfterViewInit{

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D


  constructor(private router: Router, private servis: GostService){ }


  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  id: number = 0
  kor_ime: string = ""
  restoran: Restoran = new Restoran()
  odabraniSto: number = 0 
  rezervacije: Rezervacija[] = []
  slobodniStolovi: boolean[] = []
  korisnik: Korisnik = new Korisnik()

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''
    this.id = parseInt(localStorage.getItem('restoran') || '')

    this.servis.dohvRestoran(this.id).subscribe(
      (data)=>{
        this.restoran = data
        this.servis.dohvGosta(this.kor_ime).subscribe(
          (kor)=>{
            this.korisnik = kor
          }
        )
      }
    )
    
  }

  vreme: string = ""

  parseVreme(time: string, referenceDate: Date): Date {
    let [hours, minutes] = time.split(':').map(Number);
    let result = new Date(referenceDate);
    result.setHours(hours);
    result.setMinutes(minutes);
    result.setSeconds(0);
    result.setMilliseconds(0);
    return result;
  }

  prikaziPanel(){
    if(this.vreme == ""){
      this.greska = "Niste uneli vreme"
      return
    }

    let vremeRezervacije = new Date(this.vreme);
    let pocetakRadnogVremena = this.parseVreme(this.restoran.pocetakRadnogVremena, vremeRezervacije)
    let krajRadnogVremena = this.parseVreme(this.restoran.krajRadnogVremena, vremeRezervacije)

    if (krajRadnogVremena <= pocetakRadnogVremena) {
      krajRadnogVremena.setDate(krajRadnogVremena.getDate() + 1);
    }

    if (vremeRezervacije < pocetakRadnogVremena || vremeRezervacije > krajRadnogVremena) {
      this.greska = "Vreme rezervacije je van radnog vremena restorana."
      return
    }

    if(vremeRezervacije < new Date()){
      this.greska = "Vreme rezervacije je u prošlosti."
      return
    }

    this.vreme = this.vreme + ':00'
    this.greska = ""
    this.servis.dohvRezervacijeRestorana(this.id).subscribe(
      (rezervacije) => {
        this.rezervacije = rezervacije;
        this.crtajStolove();
      }
    );
  }

  crtajStolove() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

    for (let i = 0; i < this.restoran.brStolova; i++) {
      this.slobodniStolovi[i] = true
    }

    let datumVreme: Date = new Date(this.vreme);
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


    for(let elem of this.restoran.raspored){
      if(elem.tip_elementa == "sto"){ 
        this.ctx.beginPath();
        this.ctx.arc(elem.x, elem.y, elem.poluprecnik, 0, 2 * Math.PI);

        if (!this.slobodniStolovi[elem.brojStola - 1]) {
          this.ctx.fillStyle = 'red';
        } else if (this.odabraniSto == elem.brojStola) {
          this.ctx.fillStyle = 'green';
        } else {
          this.ctx.fillStyle = 'white';
        }

        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(elem.brojLjudiZaStolom.toString(), elem.x, elem.y);

      } else if(elem.tip_elementa == "kuhinja"){ 
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.strokeRect(elem.x - 50, elem.y - 25, 100, 50);
        this.ctx.fillStyle = 'black';
        this.ctx.fillText("KUHINJA", elem.x - 20, elem.y + 5);

      } else if(elem.tip_elementa == "toalet"){ 
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
        if (distance < elem.poluprecnik && this.slobodniStolovi[elem.brojStola - 1]) {
          this.odabraniSto = elem.brojStola;
          this.crtajStolove();
          return;
        }
      }
    }

    this.odabraniSto = 0;
    this.crtajStolove();
  }

  brojOsoba: number = 0
  greska: string = ""

  potvrdiRezervaciju() {
    if (this.brojOsoba > 6 || this.brojOsoba < 1 || this.odabraniSto == 0) {
      this.greska = "Niste izabrali sve parametre"
      return
    }else if(this.korisnik.nepojavljivanja >= 3){
      this.greska = "Nemate mogućnost rezervacije zbog nepojavljivanja"
      return
    }

    this.servis.dodajRezervacijuPanel(this.vreme, this.odabraniSto, this.brojOsoba, this.id, this.kor_ime).subscribe(
      (response) => {
        console.log(this.odabraniSto)
        alert('Rezervacija uspešno napravljena!');
        this.vreme = ""
        this.router.navigate(['rezervacija']);
      }
    );
  }

  nazad(){
    this.router.navigate(['rezervacija'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
