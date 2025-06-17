import { TestBed } from '@angular/core/testing';

import { ProgramActivitySolutionService } from './program-activity-solution.service';

describe('ProgramActivitySolutionService', () => {
  let service: ProgramActivitySolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramActivitySolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
