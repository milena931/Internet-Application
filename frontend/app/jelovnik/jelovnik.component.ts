import { Component, OnInit } from '@angular/core';
import { Restoran } from '../models/Restoran';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Jelo } from '../models/Jelo';

@Component({
  selector: 'app-jelovnik',
  templateUrl: './jelovnik.component.html',
  styleUrls: ['./jelovnik.component.css']
})
export class JelovnikComponent implements OnInit {

  constructor(private router: Router, private servis: GostService) { }

  kor_ime: string = ""
  id: number = 0
  jela: Jelo[] = []
  korpa: Jelo[] = []

  ngOnInit(): void {
    let pom = localStorage.getItem('korpa') || ''
    if(pom == "" || pom == 'prazna'){
      this.korpa = []
    }else{
      this.korpa = JSON.parse(localStorage.getItem('korpa'))
    }
    this.kor_ime = localStorage.getItem('ulogovan') || ''
    this.id = parseInt(localStorage.getItem('restoran') || '')

    this.servis.dohvJela(this.id).subscribe(
      (jela) => {
        this.jela = jela
        this.jela.forEach(jelo => {
          this.servis.dohvSliku(jelo.slika).subscribe(
            (data) => {
              const reader = new FileReader();
              reader.onload = () => {
                jelo.slikaURL = reader.result as string;
              };
              reader.readAsDataURL(data);
            }
          )
        })
      }
    )

  }

  greska: string = ""
  br: number = 0

  dodajUKorpu(j: Jelo) {
    if (this.br <= 0) {
      this.greska = "Niste uneli količinu"
    } else {
      for (let i = 0; i < this.br; i++) {
        this.korpa.push(j)
      }
    }
  }


  prikaziKorpu(){
    localStorage.setItem('korpa', JSON.stringify(this.korpa))
    this.router.navigate(['korpa'])
  }

  nazad() {
    this.router.navigate(['rezervacija'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
