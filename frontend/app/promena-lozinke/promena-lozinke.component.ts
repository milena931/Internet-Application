import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit{

  ngOnInit(): void { }

  constructor(private router: Router, private servis: LoginService){ }

  da: string = "ne"
  ne: boolean = false

  kor_ime: string = ""
  stara: string = ""
  nova: string = ""
  nova_ponovo: string = ""
  greska: string = ""

  validatePassword(lozinka: string) {
    let regex = /^(?=[a-zA-Z])(?=(?:.*[a-z]){3})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,10}$/;
    return regex.test(lozinka);
  }

  promeniStaru(){
    if(this.nova == this.nova_ponovo){
      this.servis.login(this.kor_ime, this.stara).subscribe(
        (data)=>{
          if(data != null){
            if(this.validatePassword(this.nova)){
              this.greska = ""

              this.servis.promeniLozinku(this.kor_ime, this.nova).subscribe(
                (data)=>{
                  if(data){
                    alert("Uspešno promenjena lozinka")
                    this.router.navigate(['login'])
                  }
                }
              )
      
            }else{
              this.greska = "Lozinka mora da ima minimalno 6 karaktera, maksimalno 10 karaktera, od toga bar jedno veliko slovo, 3 mala slova,\njedan broj i jedan specijalan karakter i mora pocinjati slovom"
            }
          }else{
            this.greska = "Stara lozinka je pogresna ili korisnik sa takvim korisnickim imenom ne postoji. \n Da li ste zaboravili lozinku?"
          }
        }
      )

    }else{
      this.greska = "Nove lozinke se ne poklapaju"
    }
  }

  pitanje: string = ""
  odgovor: string = ""
  tacno: boolean = false

  prikaziPitanje(){
    this.servis.prikaziPitanje(this.kor_ime).subscribe(
      (data)=>{
        if(data){
          this.pitanje = data
        }else{
          this.greska = "Korisnik sa tim korisničkim imenom na postoji"
        }
      }
    )
  }

  proveriOdgovor(){
    this.servis.proveriOdgovor(this.kor_ime, this.odgovor).subscribe(
      (data)=>{
        if(data){
          this.tacno = true
        }else{
          this.tacno = false
          this.greska = "Pogrešan odgovor na pitanje"
        }
      }
    )
  }

  zaboravljena(){
    if(this.nova == this.nova_ponovo){
      if(this.validatePassword(this.nova)){
        this.greska = ""
        this.servis.promeniLozinku(this.kor_ime, this.nova).subscribe(
          (data)=>{
            if(data){
              alert("Uspešno promenjena lozinka")
              this.router.navigate(['login'])
            }
          }
        )
      }else{
        this.greska = "Lozinka mora da ima minimalno 6 karaktera, maksimalno 10 karaktera, od toga bar jedno veliko slovo, 3 mala slova,\njedan broj i jedan specijalan karakter i mora pocinjati slovom"
      }

    }else{
      this.greska = "Nove lozinke se ne poklapaju"
    }
  }

  nazad(){
    this.router.navigate(['login'])
  }

}
