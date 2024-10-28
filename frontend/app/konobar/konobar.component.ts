import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KonobarService } from '../services/konobar.service';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-konobar',
  templateUrl: './konobar.component.html',
  styleUrls: ['./konobar.component.css']
})
export class KonobarComponent implements OnInit{

  constructor(private router: Router, private servis: GostService, private konobar: KonobarService){ }

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
        const reader = new FileReader();
        reader.onload = () => {
          this.slikaUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      }
    );
  }

  profil(){
    this.router.navigate(['profilKonobar'])
  }

  statistika(){
    this.router.navigate(['statistikaKonobar'])
  }

  rezervacije(){
    this.router.navigate(['rezervacijeKonobar'])
  }

  dostave(){
    this.router.navigate(['dostaveKonobar'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

  


}
