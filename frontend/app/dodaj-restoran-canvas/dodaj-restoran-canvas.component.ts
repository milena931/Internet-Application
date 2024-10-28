import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdministratorService } from '../services/administrator.service';
import { Raspored } from '../models/Raspored';
import { Restoran } from '../models/Restoran';

@Component({
  selector: 'app-dodaj-restoran-canvas',
  templateUrl: './dodaj-restoran-canvas.component.html',
  styleUrls: ['./dodaj-restoran-canvas.component.css']
})
export class DodajRestoranCanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>
  ctx!: CanvasRenderingContext2D

  constructor(private router: Router, private adminServis: AdministratorService) { }

  naziv: string = ""
  tipNovogElementa: string = ""
  adresa: string = ""
  kontakt: string = ""
  opis: string = ""
  tip: string = ""
  pocetakRadnogVremena: string = ""
  krajRadnogVremena: string = ""
  brLjudiZaStolom: number = 0

  raspored: Raspored[] = []
  brToaleta: number = 0
  brKuhinja: number = 0
  brStolova: number = 0
  x: number = 0
  y: number = 0

  greska: string = ""

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  odaberiMesto(event: MouseEvent) {
    let rect = this.canvas.nativeElement.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    this.x = x
    this.y = y

    //ovo dalje ne treba
    let stoRadius = 25;
    let padding = 30;
    let numColumns = Math.min(this.restoran.brStolova, 4);

    let xOffset = padding + (this.canvas.nativeElement.width - 2 * padding - (numColumns * stoRadius * 2 + (numColumns - 1) * padding)) / 2;
    let yOffset = padding;


  }

  dodajElement() {
    if (this.tipNovogElementa == "") {
      this.greska = "Niste izabrali element"
    } else if (this.x == 0 || this.y == 0) {
      this.greska = "Niste izabrali mesto elementa"
    } else {
      this.greska = ""

      if (this.tipNovogElementa == "sto") {
        if (this.brLjudiZaStolom > 1) {
          let elem = new Raspored()
          elem.brojLjudiZaStolom = this.brLjudiZaStolom
          this.brStolova = this.brStolova + 1
          elem.brojStola = this.brStolova
          elem.tip_elementa = this.tipNovogElementa
          elem.poluprecnik = 25
          elem.x = this.x
          elem.y = this.y
          if (!this.proveriPreklapanje(elem)) {
            this.raspored.push(elem)
            this.nacrtaj_elemente()
          } else {
            this.brLjudiZaStolom = 0
            this.greska = "Elementi se preklapaju, izaberite drugo mesto."
          }

          this.nacrtaj_elemente()
        } else {
          this.brLjudiZaStolom = 0
          this.greska = "Broj ljudi za stolom mora biti veći od 1"
          return
        }
      } else {
        let elem = new Raspored()
        elem.tip_elementa = this.tipNovogElementa
        elem.x = this.x
        elem.y = this.y
        if (!this.proveriPreklapanje(elem)) {
          this.raspored.push(elem)
          this.nacrtaj_elemente()
        } else {
          this.greska = "Elementi se preklapaju, izaberite drugo mesto."
        }
        if (this.tipNovogElementa == "kuhinja") {
          this.brKuhinja = this.brKuhinja + 1
        } else if (this.tipNovogElementa == "toalet") {
          this.brToaleta = this.brToaleta + 1
        }
        this.nacrtaj_elemente()
      }
    }
  }

  proveriPreklapanje(noviElement: Raspored): boolean {
    for (let elem of this.raspored) {
      if (elem.tip_elementa == "sto") {
        let dist = Math.sqrt(Math.pow(elem.x - noviElement.x, 2) + Math.pow(elem.y - noviElement.y, 2))
        if (dist < 50) {
          return true
        }
      }
    }
    return false
  }

  nacrtaj_elemente() {

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)

    for (let elem of this.raspored) {
      if (elem.tip_elementa == "sto") { // okrugli sto
        this.ctx.beginPath()
        this.ctx.arc(elem.x, elem.y, elem.poluprecnik, 0, 2 * Math.PI)
        this.ctx.fillStyle = 'beige'
        this.ctx.fill()
        this.ctx.stroke()  //outline
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(elem.brojLjudiZaStolom.toString(), elem.x, elem.y)  //broj stola

      } else if (elem.tip_elementa == "kuhinja") { // kuhinja u obliku pravougaonika
        this.ctx.fillStyle = 'lightgray'
        this.ctx.fillRect(elem.x - 50, elem.y - 25, 100, 50)
        this.ctx.strokeRect(elem.x - 50, elem.y - 25, 100, 50)
        this.ctx.fillStyle = 'black';
        this.ctx.fillText("KUHINJA", elem.x - 20, elem.y + 5)

      } else if (elem.tip_elementa == "toalet") { // toalet u obliku pravougaonika
        this.ctx.fillStyle = 'lightgray'
        this.ctx.fillRect(elem.x - 50, elem.y - 25, 100, 50)
        this.ctx.strokeRect(elem.x - 50, elem.y - 25, 100, 50)
        this.ctx.fillStyle = 'black';
        this.ctx.fillText("TOALET", elem.x - 20, elem.y + 5)
      }
    }

  }

  restoran: Restoran = new Restoran()

  dodajRestoran() {
    if (this.adresa == "" || this.naziv == "" || this.kontakt == "" || this.opis == "" || this.tip == "" || this.pocetakRadnogVremena == "" || this.krajRadnogVremena == "") {
      this.greska = "Niste uneli sve podatke"
    } else if (this.brStolova < 3 || this.brToaleta < 1 || this.brKuhinja < 1) {
      this.greska = "Nemate sve potrebne elemente: minimalno 3 stola, minimalno 1 toalet i minimalno 1 kuhinja"
    } else {
      this.greska = ""
      this.restoran.raspored = this.raspored
      this.restoran.naziv = this.naziv
      this.restoran.adresa = this.adresa
      this.restoran.brStolova = this.brStolova
      this.restoran.telefon = this.kontakt
      this.restoran.tip = this.tip
      this.restoran.opis = this.opis
      this.restoran.pocetakRadnogVremena = this.pocetakRadnogVremena
      this.restoran.krajRadnogVremena = this.krajRadnogVremena

      this.adminServis.dodajRestoran(this.restoran).subscribe(
        (data) => {
          if (data) {
            alert("Uspesno")
            this.router.navigate(['restoraniAdmin'])
          } else {
            this.greska = "Došlo je do greške"
          }
        }
      )
    }
  }

  nazad() {
    this.router.navigate(['restoraniAdmin'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
