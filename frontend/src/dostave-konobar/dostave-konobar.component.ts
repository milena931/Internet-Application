import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { KonobarService } from '../services/konobar.service';
import { Korisnik } from '../models/User';
import { Porudzbina } from '../models/Porudzbina';

@Component({
  selector: 'app-dostave-konobar',
  templateUrl: './dostave-konobar.component.html',
  styleUrls: ['./dostave-konobar.component.css']
})
export class DostaveKonobarComponent implements OnInit{

  constructor(private router: Router, private gostServis: GostService, private konobarServis: KonobarService){ }

  kor_ime: string = ""
  konobar: Korisnik = new Korisnik()
  porudzbine: Porudzbina[] = []

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''

    this.gostServis.dohvGosta(this.kor_ime).subscribe(
      (konobar)=>{
        this.konobar = konobar
        this.konobarServis.dohvatiPorudzbine(this.konobar.restoran).subscribe(
          (porudzbine)=>{
            this.porudzbine = porudzbine
          }
        )
      }
    )
  }

  vremeDostave: string = ""
  greska: string = ""

  potvrdi(p: Porudzbina){
    if(this.vremeDostave == ""){
      this.greska = "Zaboravili ste da dodate vreme dostave"
    }else{
      this.greska = ""
      p.procenjeno_vreme = this.vremeDostave
      this.konobarServis.odobriPorudzbinu(p).subscribe(
        (data)=>{
          if(data){
            this.ngOnInit()
          }
        }
      )
    }
  }

  odbij(p: Porudzbina){
    this.konobarServis.odbijPorudzbinu(p).subscribe(
      (data)=>{
        if(data){
          this.ngOnInit()
        }
      }
    )
  }

  nazad(){
    this.router.navigate(['konobar'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
