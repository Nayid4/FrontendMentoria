import { TestBed } from '@angular/core/testing';

import { MentorAssignmentService } from './mentor-assignment.service';

describe('MentorAssignmentService', () => {
  let service: MentorAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
