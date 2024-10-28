import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JelovnikComponent } from './jelovnik.component';

describe('JelovnikComponent', () => {
  let component: JelovnikComponent;
  let fixture: ComponentFixture<JelovnikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JelovnikComponent]
    });
    fixture = TestBed.createComponent(JelovnikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
