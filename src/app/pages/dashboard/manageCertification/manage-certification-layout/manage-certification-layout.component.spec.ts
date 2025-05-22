import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCertificationLayoutComponent } from './manage-certification-layout.component';

describe('ManageCertificationLayoutComponent', () => {
  let component: ManageCertificationLayoutComponent;
  let fixture: ComponentFixture<ManageCertificationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCertificationLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCertificationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
