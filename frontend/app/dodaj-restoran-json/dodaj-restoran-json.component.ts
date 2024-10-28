import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdministratorService } from '../services/administrator.service';
import { Router } from '@angular/router';
import { Raspored } from '../models/Raspored';
import { Restoran } from '../models/Restoran';

@Component({
  selector: 'app-dodaj-restoran-json',
  templateUrl: './dodaj-restoran-json.component.html',
  styleUrls: ['./dodaj-restoran-json.component.css']
})
export class DodajRestoranJsonComponent implements OnInit, AfterViewInit {

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

  json_fajl: File = new File([], "")
  raspored: Raspored[] = []
  restoran: Restoran = new Restoran()
  brStolova: number = 0

  greska: string = ""

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')
  }


  nacrtaj_elemente() {

    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)

    for (let elem of this.raspored) {
      if (elem.tip_elementa == "sto") { // okrugli sto
        this.ctx.beginPath()
        this.ctx.arc(elem.x, elem.y, elem.poluprecnik, 0, 2 * Math.PI)
        this.ctx.fillStyle = 'beige'
        this.ctx.fill()
        this.ctx.stroke()
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(elem.brojLjudiZaStolom.toString(), elem.x, elem.y)

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

  dodajRestoran() {
    if (this.adresa == "" || this.naziv == "" || this.kontakt == "" || this.opis == "" || this.tip == "" || this.pocetakRadnogVremena == "" || this.krajRadnogVremena == "") {
      this.greska = "Niste uneli sve podatke"
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.json_fajl = file
      let fileReader = new FileReader()
      fileReader.onload = (e) => {
        let contents = e.target?.result as string
        try {
          let parsedJson: any[] = JSON.parse(contents)

          this.raspored = parsedJson.map((item) => {
            let rasporedElem = new Raspored()
            rasporedElem.tip_elementa = item.tip_elementa
            rasporedElem.x = item.x
            rasporedElem.y = item.y
            rasporedElem.poluprecnik = item.poluprecnik
            rasporedElem.brojLjudiZaStolom = item.brojLjudiZaStolom
            rasporedElem.brojStola = item.brojStola
            return rasporedElem
          });

          this.nacrtaj_elemente()
        } catch (error) {
          this.greska = 'Greška prilikom učitavanja JSON fajla.'
        }
      };
      fileReader.readAsText(file);
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
