import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciAdminComponent } from './korisnici-admin.component';

describe('KorisniciAdminComponent', () => {
  let component: KorisniciAdminComponent;
  let fixture: ComponentFixture<KorisniciAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KorisniciAdminComponent]
    });
    fixture = TestBed.createComponent(KorisniciAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
