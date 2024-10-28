import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAzuriranjekorisnikaComponent } from './admin-azuriranjekorisnika.component';

describe('AdminAzuriranjekorisnikaComponent', () => {
  let component: AdminAzuriranjekorisnikaComponent;
  let fixture: ComponentFixture<AdminAzuriranjekorisnikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAzuriranjekorisnikaComponent]
    });
    fixture = TestBed.createComponent(AdminAzuriranjekorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
