import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { LoginComponent } from './login/login.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilGostComponent } from './profil-gost/profil-gost.component';
import { RestoraniGostComponent } from './restorani-gost/restorani-gost.component';
import { RezervacijeGostComponent } from './rezervacije-gost/rezervacije-gost.component';
import { DostavaGostComponent } from './dostava-gost/dostava-gost.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';
import { PanelRezervacijaComponent } from './panel-rezervacija/panel-rezervacija.component';
import { JelovnikComponent } from './jelovnik/jelovnik.component';
import { KorpaComponent } from './korpa/korpa.component';
import { StatistikaKonobarComponent } from './statistika-konobar/statistika-konobar.component';
import { ProfilKonobarComponent } from './profil-konobar/profil-konobar.component';
import { DostaveKonobarComponent } from './dostave-konobar/dostave-konobar.component';
import { RezervacijeKonobarComponent } from './rezervacije-konobar/rezervacije-konobar.component';
import { KonbarPotvrdarezervacijePanelComponent } from './konbar-potvrdarezervacije-panel/konbar-potvrdarezervacije-panel.component';
import { KonobarPotvrdarezervacijeFormaComponent } from './konobar-potvrdarezervacije-forma/konobar-potvrdarezervacije-forma.component';
import { KorisniciAdminComponent } from './korisnici-admin/korisnici-admin.component';
import { AdminAzuriranjekorisnikaComponent } from './admin-azuriranjekorisnika/admin-azuriranjekorisnika.component';
import { KonobariAdminComponent } from './konobari-admin/konobari-admin.component';
import { RestoraniAdminComponent } from './restorani-admin/restorani-admin.component';
import { DodajRestoranCanvasComponent } from './dodaj-restoran-canvas/dodaj-restoran-canvas.component';
import { DodajRestoranJsonComponent } from './dodaj-restoran-json/dodaj-restoran-json.component';

const routes: Routes = [
  {path: "", component: PocetnaComponent},
  {path: "login", component: LoginComponent},
  {path: "adminlogin", component: LoginAdminComponent},
  {path: "admin", component: AdministratorComponent},
  {path: "gost", component: GostComponent},
  {path: "konobar", component: KonobarComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "promenaLozinke", component: PromenaLozinkeComponent},
  {path: "profilGost", component: ProfilGostComponent},
  {path: "restoraniGost", component: RestoraniGostComponent},
  {path: "rezervacijeGost", component: RezervacijeGostComponent},
  {path: "dostavaGost", component: DostavaGostComponent},
  {path: "rezervacija", component: RezervacijaComponent},
  {path: "panelRezervacija", component: PanelRezervacijaComponent},
  {path: "jelovnik", component: JelovnikComponent},
  {path: "korpa", component: KorpaComponent},
  {path: "statistikaKonobar", component: StatistikaKonobarComponent},
  {path: "profilKonobar", component: ProfilKonobarComponent},
  {path: "dostaveKonobar", component: DostaveKonobarComponent},
  {path: "rezervacijeKonobar", component: RezervacijeKonobarComponent},
  {path: "konobarPanelRezervacija", component: KonbarPotvrdarezervacijePanelComponent},
  {path: "konobarFormaRezervacija", component: KonobarPotvrdarezervacijeFormaComponent},
  {path: "korisniciAdmin", component: KorisniciAdminComponent},
  {path: "adminAzurirajeKorisnika", component: AdminAzuriranjekorisnikaComponent},
  {path: "konobariAdmin", component: KonobariAdminComponent},
  {path: "restoraniAdmin", component: RestoraniAdminComponent},
  {path: "dodajRestoranCanvas", component: DodajRestoranCanvasComponent},
  {path: "dodajRestoranJson", component: DodajRestoranJsonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
