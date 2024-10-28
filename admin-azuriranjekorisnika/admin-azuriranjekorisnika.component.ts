import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-admin-azuriranjekorisnika',
  templateUrl: './admin-azuriranjekorisnika.component.html',
  styleUrls: ['./admin-azuriranjekorisnika.component.css']
})
export class AdminAzuriranjekorisnikaComponent implements OnInit{

  constructor(private router: Router, private servis: GostService){ }

  gost: Korisnik = new Korisnik()
  greska: string = ""

  ngOnInit(): void{
    this.gost = JSON.parse(localStorage.getItem('gost'))
  }

  novoIme: string = ""

  izmeniIme(){
    if(this.novoIme == ""){
      this.greska = "Niste uneli ime"
      return
    }
    this.gost.ime = this.novoIme
    localStorage.setItem('gost', JSON.stringify(this.gost))
    this.servis.promeniIme(this.novoIme, this.gost.kor_ime).subscribe(
      (data)=>{
        if(data){
          alert('uspesno')
        }
      }
    )
  }

  novoPrezime: string = ""

  izmeniPrezime(){
    if(this.novoPrezime == ""){
      this.greska = "Niste uneli prezime"
      return
    }
    this.gost.prezime = this.novoPrezime
    localStorage.setItem('gost', JSON.stringify(this.gost))
    this.servis.promeniPrezime(this.novoPrezime, this.gost.kor_ime).subscribe(
      (data)=>{
        if(data){
          alert('uspesno')
        }
      }
    )
  }

  novaAdresa: string = ""

  izmeniAdresu(){
    if(this.novaAdresa == ""){
      this.greska = "Niste uneli adresu"
      return
    }
    this.gost.adresa = this.novaAdresa
    localStorage.setItem('gost', JSON.stringify(this.gost))
    this.servis.promeniAdresu(this.novaAdresa, this.gost.kor_ime).subscribe(
      (data)=>{
        if(data){
          alert('uspesno')
        }
      }
    )
  }

  noviMejl: string = ""

  izmeniMejl(){
    if(this.noviMejl == ""){
      this.greska = "Niste uneli mejl"
      return
    }
    this.gost.mejl = this.noviMejl
    localStorage.setItem('gost', JSON.stringify(this.gost))
    this.servis.promeniMejl(this.noviMejl, this.gost.kor_ime).subscribe(
      (data)=>{
        if(data){
          alert('uspesno')
        }
      }
    )
  }

  noviBrojKartice: string = ""

  izmeniBrojKartice(){
    if(this.noviBrojKartice == ""){
      this.greska = "Niste uneli broj kartice"
      return
    }
    this.gost.broj_kartice = this.noviBrojKartice
    localStorage.setItem('gost', JSON.stringify(this.gost))
    this.servis.promeniKarticu(this.noviBrojKartice, this.gost.kor_ime).subscribe(
      (data)=>{
        if(data){
          alert('uspesno')
        }
      }
    )
  }

  noviTelefon: string = ""

  izmeniTelefon(){
    if(this.noviTelefon == ""){
      this.greska = "Niste uneli broj telefona"
      return
    }
    this.gost.kontakt_telefon = this.noviTelefon
    localStorage.setItem('gost', JSON.stringify(this.gost))
    this.servis.promeniKontakt(this.noviTelefon, this.gost.kor_ime).subscribe(
      (data)=>{
        if(data){
          alert('uspesno')
        }
      }
    )
  }

  nazad(){
    this.router.navigate(['korisniciAdmin'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
