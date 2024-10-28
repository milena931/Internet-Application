import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajRestoranJsonComponent } from './dodaj-restoran-json.component';

describe('DodajRestoranJsonComponent', () => {
  let component: DodajRestoranJsonComponent;
  let fixture: ComponentFixture<DodajRestoranJsonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DodajRestoranJsonComponent]
    });
    fixture = TestBed.createComponent(DodajRestoranJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
