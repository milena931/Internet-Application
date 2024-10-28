import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GostComponent } from './gost/gost.component';
import { KonobarComponent } from './konobar/konobar.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { ProfilGostComponent } from './profil-gost/profil-gost.component';
import { RestoraniGostComponent } from './restorani-gost/restorani-gost.component';
import { RezervacijeGostComponent } from './rezervacije-gost/rezervacije-gost.component';
import { DostavaGostComponent } from './dostava-gost/dostava-gost.component';
import { RezervacijaComponent } from './rezervacija/rezervacija.component';
import { PanelRezervacijaComponent } from './panel-rezervacija/panel-rezervacija.component';
import { JelovnikComponent } from './jelovnik/jelovnik.component';
import { KorpaComponent } from './korpa/korpa.component';
import { StarRatingModule } from 'angular-star-rating';
import { RezervacijeKonobarComponent } from './rezervacije-konobar/rezervacije-konobar.component';
import { DostaveKonobarComponent } from './dostave-konobar/dostave-konobar.component';
import { ProfilKonobarComponent } from './profil-konobar/profil-konobar.component';
import { StatistikaKonobarComponent } from './statistika-konobar/statistika-konobar.component';
import { KonbarPotvrdarezervacijePanelComponent } from './konbar-potvrdarezervacije-panel/konbar-potvrdarezervacije-panel.component';
import { KonobarPotvrdarezervacijeFormaComponent } from './konobar-potvrdarezervacije-forma/konobar-potvrdarezervacije-forma.component';
import { KorisniciAdminComponent } from './korisnici-admin/korisnici-admin.component';
import { AdminAzuriranjekorisnikaComponent } from './admin-azuriranjekorisnika/admin-azuriranjekorisnika.component';
import { KonobariAdminComponent } from './konobari-admin/konobari-admin.component';
import { RestoraniAdminComponent } from './restorani-admin/restorani-admin.component';
import { DodajRestoranCanvasComponent } from './dodaj-restoran-canvas/dodaj-restoran-canvas.component';
import { DodajRestoranJsonComponent } from './dodaj-restoran-json/dodaj-restoran-json.component';

@NgModule({
  declarations: [
    AppComponent,
    GostComponent,
    KonobarComponent,
    AdministratorComponent,
    LoginComponent,
    RegistracijaComponent,
    LoginAdminComponent,
    PocetnaComponent,
    PromenaLozinkeComponent,
    ProfilGostComponent,
    RestoraniGostComponent,
    RezervacijeGostComponent,
    DostavaGostComponent,
    RezervacijaComponent,
    PanelRezervacijaComponent,
    JelovnikComponent,
    KorpaComponent,
    RezervacijeKonobarComponent,
    DostaveKonobarComponent,
    ProfilKonobarComponent,
    StatistikaKonobarComponent,
    KonbarPotvrdarezervacijePanelComponent,
    KonobarPotvrdarezervacijeFormaComponent,
    KorisniciAdminComponent,
    AdminAzuriranjekorisnikaComponent,
    KonobariAdminComponent,
    RestoraniAdminComponent,
    DodajRestoranCanvasComponent,
    DodajRestoranJsonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    StarRatingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
