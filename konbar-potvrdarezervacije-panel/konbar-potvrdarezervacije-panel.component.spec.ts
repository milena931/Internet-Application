import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonbarPotvrdarezervacijePanelComponent } from './konbar-potvrdarezervacije-panel.component';

describe('KonbarPotvrdarezervacijePanelComponent', () => {
  let component: KonbarPotvrdarezervacijePanelComponent;
  let fixture: ComponentFixture<KonbarPotvrdarezervacijePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KonbarPotvrdarezervacijePanelComponent]
    });
    fixture = TestBed.createComponent(KonbarPotvrdarezervacijePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
