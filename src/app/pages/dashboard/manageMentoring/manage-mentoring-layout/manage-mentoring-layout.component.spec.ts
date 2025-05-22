import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMentoringLayoutComponent } from './manage-mentoring-layout.component';

describe('ManageMentoringLayoutComponent', () => {
  let component: ManageMentoringLayoutComponent;
  let fixture: ComponentFixture<ManageMentoringLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMentoringLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageMentoringLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
