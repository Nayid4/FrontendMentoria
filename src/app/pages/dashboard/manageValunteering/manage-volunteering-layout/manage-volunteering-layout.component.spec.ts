import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVolunteeringLayoutComponent } from './manage-volunteering-layout.component';

describe('ManageVolunteeringLayoutComponent', () => {
  let component: ManageVolunteeringLayoutComponent;
  let fixture: ComponentFixture<ManageVolunteeringLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVolunteeringLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVolunteeringLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
