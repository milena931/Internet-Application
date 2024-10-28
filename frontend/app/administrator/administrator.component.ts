import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministratorService } from '../services/administrator.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit{

  constructor(private router: Router, private adminServis: AdministratorService){ }

  ngOnInit(): void{

  }

  korisnici(){
    this.router.navigate(['korisniciAdmin'])
  }

  konobari(){
    this.router.navigate(['konobariAdmin'])
  }

  restorani(){
    this.router.navigate(['restoraniAdmin'])
  }

  logout(){
    this.router.navigate([''])
  }
}
