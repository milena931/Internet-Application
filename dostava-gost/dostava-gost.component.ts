import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Porudzbina } from '../models/Porudzbina';
import { Restoran } from '../models/Restoran';

@Component({
  selector: 'app-dostava-gost',
  templateUrl: './dostava-gost.component.html',
  styleUrls: ['./dostava-gost.component.css']
})
export class DostavaGostComponent implements OnInit{

  constructor(private router: Router, private servis: GostService){ }

  kor_ime: string = ""
  porudzbine: Porudzbina[] = []
  restorani: Restoran[] = []

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''

    this.servis.dohvPorudzbine(this.kor_ime).subscribe(
      (data)=>{
        this.porudzbine = data
        this.servis.dohvBrojRestorana().subscribe(
          (res)=>{
            this.restorani = res
            this.postaviPolja()
            this.porudzbine.sort((a, b) => {
              let aDate = new Date(a.vreme).getTime();
              let bDate = new Date(b.vreme).getTime();
    
              return bDate - aDate; // Sortiraj u opadajućem redosledu
            });
            this.rasporedi()
          }
        )
      }
    )

  }

  postaviPolja(){
    this.porudzbine.forEach(porudzbina=>{
      this.restorani.forEach(restoran=>{
        if(porudzbina.restoran == restoran.id){
          porudzbina.naziv = restoran.naziv
        }
      })
    })
  }

  aktuelne: Porudzbina[] = []
  stare: Porudzbina[] = []

  rasporedi(){
    this.porudzbine.forEach(porudzbina=>{
      if(porudzbina.status == "odobrena" && new Date(porudzbina.vreme).getTime() > new Date().getTime() - 6 * 60 * 60 * 1000){ //aktuelne porudzbine su sve prethodnih 6 sati
        this.aktuelne.push(porudzbina)
      }else if(porudzbina.status == "odobrena"){
        this.stare.push(porudzbina)
      }
    })
  }

  nazad(){
    this.router.navigate(['gost'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
