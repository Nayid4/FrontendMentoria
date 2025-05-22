import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkshopLayoutComponent } from './manage-workshop-layout.component';

describe('ManageWorkshopLayoutComponent', () => {
  let component: ManageWorkshopLayoutComponent;
  let fixture: ComponentFixture<ManageWorkshopLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageWorkshopLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageWorkshopLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
