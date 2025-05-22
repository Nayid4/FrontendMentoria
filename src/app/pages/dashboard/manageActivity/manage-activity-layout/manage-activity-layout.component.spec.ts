import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActivityLayoutComponent } from './manage-activity-layout.component';

describe('ManageActivityLayoutComponent', () => {
  let component: ManageActivityLayoutComponent;
  let fixture: ComponentFixture<ManageActivityLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageActivityLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageActivityLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
