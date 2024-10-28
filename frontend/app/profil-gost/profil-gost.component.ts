import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-profil-gost',
  templateUrl: './profil-gost.component.html',
  styleUrls: ['./profil-gost.component.css']
})
export class ProfilGostComponent implements OnInit{

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
        const reader = new FileReader();
        reader.onload = () => {
          this.slikaUrl = reader.result as string;
        };
        reader.readAsDataURL(response);
      }
    );
  }

  izmeniIme: boolean = false
  novoIme: string = ""
  izmeniPrezime: boolean = false
  novoPrezime: string = ""
  izmeniAdresu: boolean = false
  novaAdresa: string = ""
  izmeniKontakt: boolean = false
  noviKontakt: string = ""
  izmeniKarticu: boolean = false
  novaKartica: string = ""
  izmeniMejl: boolean = false
  noviMejl: string = ""
  novaSlika: File | null = null;
  izmeniSliku: boolean = false

  slikaBool(){
    this.izmeniSliku = true
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.novaSlika = file;
    }
  }

  uploadNovaSlika(): void {
    if (this.novaSlika) {
      this.servis.promeniProfilnuSliku(this.kor_ime, this.novaSlika).subscribe(
        (response) => {
          alert('Profilna slika je uspešno promenjena.');
          this.slikaUrl = `http://localhost:4000/gost/dohvatiSliku/${response.novaSlika}`;
          this.izmeniSliku = false
        },
        (error) => {
          alert('Greška pri promeni profilne slike');
        }
      );
    } else {
      alert('Niste odabrali novu sliku.');
    }
  }

  otkaziIzmenu(){
    this.izmeniAdresu = false
    this.izmeniIme = false
    this.izmeniKarticu = false
    this.izmeniKontakt = false
    this.izmeniPrezime = false
    this.izmeniMejl = false
  }

  imeBool(){
    this.izmeniIme = true
  }

  ime(){
    if(this.novoIme == ""){
      this.greska = "Niste uneli novo ime"
    }else{
      this.servis.promeniIme(this.novoIme, this.kor_ime).subscribe(
        (data)=>{
          if(data!=null){
            alert('Uspesno ste promenili ime')
            this.izmeniIme = false
          }
        }
      )
    }
  }

  prezimeBool(){
    this.izmeniPrezime = true
  }

  prezime(){
    if(this.novoPrezime == ""){
      this.greska = "Niste uneli novo prezime"
    }else{
      this.servis.promeniPrezime(this.novoPrezime, this.kor_ime).subscribe(
        (data)=>{
          if(data!=null){
            alert('Uspesno ste promenili prezime')
            this.izmeniPrezime = false
          }
        }
      )
    }
  }

  mejlBool(){
    this.izmeniMejl = true
  }

  mejl(){
    if(this.noviMejl == ""){
      this.greska = "Niste uneli novi mejl"
    }else{
      this.servis.promeniMejl(this.noviMejl, this.kor_ime).subscribe(
        (data)=>{
          if(data!=null){
            alert('Uspesno ste promenili mejl')
            this.izmeniMejl = false
          }
        }
      )
    }
  }

  adresaBool(){
    this.izmeniAdresu = true
  }

  adresa(){
    if(this.novaAdresa == ""){
      this.greska = "Niste uneli novu adresu"
    }else{
      this.servis.promeniAdresu(this.novaAdresa, this.kor_ime).subscribe(
        (data)=>{
          if(data!=null){
            alert('Uspesno ste promenili adresu')
            this.izmeniAdresu = false
          }
        }
      )
    }
  }

  kontaktBool(){
    this.izmeniKontakt = true
  }

  kontakt(){
    if(this.noviKontakt == ""){
      this.greska = "Niste uneli novi kontakt telefon"
    }else{
      this.servis.promeniKontakt(this.noviKontakt, this.kor_ime).subscribe(
        (data)=>{
          if(data!=null){
            alert('Uspesno ste promenili kontkat telefon')
            this.izmeniKontakt = false
          }
        }
      )
    }
  }

  karticaBool(){
    this.izmeniKarticu= true
  }

  kartica(){
    if(this.novaKartica == ""){
      this.greska = "Niste uneli novi broj kartice"
    }else{
      this.servis.promeniKarticu(this.novaKartica, this.kor_ime).subscribe(
        (data)=>{
          if(data!=null){
            alert('Uspesno ste promenili broj kartice')
            this.izmeniKarticu = false
          }
        }
      )
    }
  }


  nazad(){
    this.router.navigate(['gost'])
  }
  
  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
