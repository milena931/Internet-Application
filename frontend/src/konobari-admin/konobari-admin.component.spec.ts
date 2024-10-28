import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonobariAdminComponent } from './konobari-admin.component';

describe('KonobariAdminComponent', () => {
  let component: KonobariAdminComponent;
  let fixture: ComponentFixture<KonobariAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KonobariAdminComponent]
    });
    fixture = TestBed.createComponent(KonobariAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
