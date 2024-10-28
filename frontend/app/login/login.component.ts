import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private router: Router, private servis: LoginService){ }

  ngOnInit(): void { }

  kor_ime: string = ""
  lozinka: string = ""
  greska: string = ""

  korisnik: Korisnik = new Korisnik()

  prijava(){
    if(this.kor_ime == "" || this.lozinka == ""){
      this.greska = "Niste uneli podatke"
    }else{
      this.servis.login(this.kor_ime, this.lozinka).subscribe(
        (data)=>{
          if(data){
            this.greska = ""
            this.korisnik = data
            localStorage.setItem('ulogovan', this.korisnik.kor_ime)
            if(this.korisnik.tip == "gost"){
              this.router.navigate(['gost'])
            }else{
              this.router.navigate(['konobar'])
            }
            
          }else{
            this.greska = "Pogršno korisničko ime ili lozinka"
          }
        }
      )
    }
  }

  registracija(){
    this.router.navigate(['registracija'])
  }

  nazad(){
    this.router.navigate([''])
  }

  promenaLozinke(){
    this.router.navigate(['promenaLozinke'])
  }
}
