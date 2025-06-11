import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoleLayoutComponent } from './manage-role-layout.component';

describe('ManageRoleLayoutComponent', () => {
  let component: ManageRoleLayoutComponent;
  let fixture: ComponentFixture<ManageRoleLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRoleLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRoleLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
