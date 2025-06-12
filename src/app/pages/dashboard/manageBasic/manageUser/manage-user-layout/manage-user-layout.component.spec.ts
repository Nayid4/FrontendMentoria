import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserLayoutComponent } from './manage-user-layout.component';

describe('ManageUserLayoutComponent', () => {
  let component: ManageUserLayoutComponent;
  let fixture: ComponentFixture<ManageUserLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageUserLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
