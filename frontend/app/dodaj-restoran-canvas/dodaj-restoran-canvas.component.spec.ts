import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajRestoranCanvasComponent } from './dodaj-restoran-canvas.component';

describe('DodajRestoranCanvasComponent', () => {
  let component: DodajRestoranCanvasComponent;
  let fixture: ComponentFixture<DodajRestoranCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajRestoranCanvasComponent]
    });
    fixture = TestBed.createComponent(DodajRestoranCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
