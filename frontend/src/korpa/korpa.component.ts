import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Jelo } from '../models/Jelo';
import { Porudzbina } from '../models/Porudzbina';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit{

  constructor(private router: Router, private servis: GostService){ }

  kor_ime: string = ""
  id: number = 0
  korpa: Jelo[] = []
  greska: string = ""

  ngOnInit(): void {
    this.kor_ime = localStorage.getItem('ulogovan') || ''
    this.id = parseInt(localStorage.getItem('restoran') || '')

    this.korpa = JSON.parse(localStorage.getItem('korpa'))
  }

  ukloni(j: Jelo){
    this.korpa.forEach(jelo=>{
      if(jelo.naziv == j.naziv){
        let indeks = this.korpa.indexOf(jelo)
        this.korpa.splice(indeks, 1);
        return;
      }
    })
  }

  poruci(){
    let porudzbina = new Porudzbina()
    let jela = ""

    for(let i = 0; i< this.korpa.length; i++){
      if(i == 0){
        jela = this.korpa[i].naziv
      }else{
        jela = jela + ', ' + this.korpa[i].naziv
      }
    }

    for(let i = 0; i< this.korpa.length; i++){
      porudzbina.cena = porudzbina.cena + this.korpa[i].cena
    }

    porudzbina.jela = jela
    porudzbina.vreme = new Date().toISOString()
    porudzbina.korisnik = this.kor_ime
    porudzbina.restoran = this.id
    porudzbina.status = "poslata"

    this.servis.posaljiPorudzbinu(porudzbina).subscribe(
      (res)=>{
        if(res){
          this.greska = ""
          this.korpa = []
          localStorage.setItem('korpa', JSON.stringify("prazna"))
          alert("Vaša porudžbina je poslata ")
        }else{
          this.greska = "Došlo je do greške"
        }
      }
    )
  }

  isprazni(){
    this.korpa = []
    localStorage.setItem('korpa', 'prazna')
  }

  nazad() {
    localStorage.setItem('korpa', JSON.stringify(this.korpa))
    this.router.navigate(['jelovnik'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
