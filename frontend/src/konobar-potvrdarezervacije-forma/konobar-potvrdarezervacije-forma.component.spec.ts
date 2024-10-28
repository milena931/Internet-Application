import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonobarPotvrdarezervacijeFormaComponent } from './konobar-potvrdarezervacije-forma.component';

describe('KonobarPotvrdarezervacijeFormaComponent', () => {
  let component: KonobarPotvrdarezervacijeFormaComponent;
  let fixture: ComponentFixture<KonobarPotvrdarezervacijeFormaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KonobarPotvrdarezervacijeFormaComponent]
    });
    fixture = TestBed.createComponent(KonobarPotvrdarezervacijeFormaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
