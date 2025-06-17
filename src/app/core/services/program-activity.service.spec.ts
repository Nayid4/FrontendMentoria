import { TestBed } from '@angular/core/testing';

import { ProgramActivityService } from './program-activity.service';

describe('ProgramActivityService', () => {
  let service: ProgramActivityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramActivityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
