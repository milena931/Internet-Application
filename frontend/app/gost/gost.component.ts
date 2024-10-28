import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-gost',
  templateUrl: './gost.component.html',
  styleUrls: ['./gost.component.css']
})
export class GostComponent implements OnInit{

  constructor(private router: Router, private servis: GostService){ }

  kor_ime: string = ""
  korisnik: Korisnik = new Korisnik()
  greska: string = ""
  slikaUrl: string = ""

  
  ngOnInit(): void { 
    this.kor_ime = localStorage.getItem('ulogovan') || ''

    this.servis.dohvGosta(this.kor_ime).subscribe(
      (data)=>{
        this.korisnik = data
        this.loadSlika(this.korisnik.slika);
      }
    )
  }

  loadSlika(rel_putanja: string) {
    this.servis.dohvSliku(rel_putanja).subscribe(
      (response) => {
        const reader = new FileReader()
        reader.onload = () => {
          this.slikaUrl = reader.result as string
        };
        reader.readAsDataURL(response)
      }
    );
  }

  profil(){
    this.router.navigate(['profilGost'])
  }

  restorani(){
    this.router.navigate(['restoraniGost'])
  }

  rezervacije(){
    this.router.navigate(['rezervacijeGost'])
  }

  dostava(){
    this.router.navigate(['dostavaGost'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  

}
