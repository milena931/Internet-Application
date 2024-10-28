import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GostService } from '../services/gost.service';
import { Restoran } from '../models/Restoran';

@Component({
  selector: 'app-restorani-admin',
  templateUrl: './restorani-admin.component.html',
  styleUrls: ['./restorani-admin.component.css']
})
export class RestoraniAdminComponent implements OnInit{

  constructor(private router: Router, private gostServis: GostService){ }

  restorani: Restoran[] = []

  ngOnInit(): void {
    this.gostServis.dohvBrojRestorana().subscribe(
      (restorani)=>{
        this.restorani = restorani
      }
    )
  }

  dodajRestoranCanvas(){
    this.router.navigate(['dodajRestoranCanvas'])
  }

  dodajRestoranJSON(){
    this.router.navigate(['dodajRestoranJson'])
  }

  nazad(){
    this.router.navigate(['admin'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])
  }

}
