import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorAssignmentFormComponent } from './mentor-assignment-form.component';

describe('MentorAssignmentFormComponent', () => {
  let component: MentorAssignmentFormComponent;
  let fixture: ComponentFixture<MentorAssignmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MentorAssignmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MentorAssignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
