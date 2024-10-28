import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRezervacijaComponent } from './panel-rezervacija.component';

describe('PanelRezervacijaComponent', () => {
  let component: PanelRezervacijaComponent;
  let fixture: ComponentFixture<PanelRezervacijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelRezervacijaComponent]
    });
    fixture = TestBed.createComponent(PanelRezervacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
