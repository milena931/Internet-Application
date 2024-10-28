import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoraniAdminComponent } from './restorani-admin.component';

describe('RestoraniAdminComponent', () => {
  let component: RestoraniAdminComponent;
  let fixture: ComponentFixture<RestoraniAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoraniAdminComponent]
    });
    fixture = TestBed.createComponent(RestoraniAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
