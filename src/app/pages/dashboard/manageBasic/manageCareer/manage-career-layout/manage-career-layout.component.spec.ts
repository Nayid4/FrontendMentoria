import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCareerLayoutComponent } from './manage-career-layout.component';

describe('ManageCareerLayoutComponent', () => {
  let component: ManageCareerLayoutComponent;
  let fixture: ComponentFixture<ManageCareerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCareerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCareerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
