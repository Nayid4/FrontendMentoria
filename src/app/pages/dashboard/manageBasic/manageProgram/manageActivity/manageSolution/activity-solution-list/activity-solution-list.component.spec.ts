import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySolutionListComponent } from './activity-solution-list.component';

describe('ActivitySolutionListComponent', () => {
  let component: ActivitySolutionListComponent;
  let fixture: ComponentFixture<ActivitySolutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySolutionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySolutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
