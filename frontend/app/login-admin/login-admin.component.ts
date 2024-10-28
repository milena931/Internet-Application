import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent{

  constructor(private router: Router, private servis: LoginService){ }

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
            if(this.korisnik.tip == "admin"){
              this.router.navigate(['admin'])
            }else{
              this.greska = "Pogrešno korisničko ime ili lozinka"
            }
          }else{
            this.greska = "Pogrešno korisničko ime ili lozinka"
          }
        }
      )
    }
  }

  nazad(){
    this.router.navigate([''])
  }
}
