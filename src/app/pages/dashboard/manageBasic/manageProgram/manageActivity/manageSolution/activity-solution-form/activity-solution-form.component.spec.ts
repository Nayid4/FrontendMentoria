import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySolutionFormComponent } from './activity-solution-form.component';

describe('ActivitySolutionFormComponent', () => {
  let component: ActivitySolutionFormComponent;
  let fixture: ComponentFixture<ActivitySolutionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySolutionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySolutionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
