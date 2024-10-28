import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministratorService } from '../services/administrator.service';
import { GostService } from '../services/gost.service';
import { Korisnik } from '../models/User';

@Component({
  selector: 'app-korisnici-admin',
  templateUrl: './korisnici-admin.component.html',
  styleUrls: ['./korisnici-admin.component.css']
})
export class KorisniciAdminComponent implements OnInit{

  constructor(private router: Router, private adminServis: AdministratorService, private gostServis: GostService){ }

  kor_ime: string = ""
  gosti: Korisnik[] = []
  zahtevi: Korisnik[] = []

  ngOnInit(): void{
    this.kor_ime = localStorage.getItem('ulogovan')

    this.gostServis.dohvBrojGostiju().subscribe(
      (data)=>{
        this.gosti = data
        this.adminServis.dohvatiZahteve().subscribe(
          (zaht)=>{
            this.zahtevi = zaht
          }
        )
      }
    )

  }

  odobri(g: Korisnik){
    this.adminServis.odobriKorisnika(g.kor_ime).subscribe(
      (data)=>{
        if(data){
          this.ngOnInit()
        }
      }
    )
  }

  deaktiviraj(g: Korisnik){
    this.adminServis.deaktivirajKorisnika(g.kor_ime).subscribe(
      (data)=>{
        if(data){
          this.ngOnInit()
        }
      }
    )
  }

  azuriraj(g: Korisnik){
    localStorage.setItem('gost', JSON.stringify(g))
    this.router.navigate(['adminAzurirajeKorisnika'])
  }

  nazad(){
    this.router.navigate(['admin'])
  }
  
  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
