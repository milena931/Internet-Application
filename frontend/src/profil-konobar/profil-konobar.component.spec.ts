import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKonobarComponent } from './profil-konobar.component';

describe('ProfilKonobarComponent', () => {
  let component: ProfilKonobarComponent;
  let fixture: ComponentFixture<ProfilKonobarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilKonobarComponent]
    });
    fixture = TestBed.createComponent(ProfilKonobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
