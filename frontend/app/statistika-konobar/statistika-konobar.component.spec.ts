import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistikaKonobarComponent } from './statistika-konobar.component';

describe('StatistikaKonobarComponent', () => {
  let component: StatistikaKonobarComponent;
  let fixture: ComponentFixture<StatistikaKonobarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistikaKonobarComponent]
    });
    fixture = TestBed.createComponent(StatistikaKonobarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
