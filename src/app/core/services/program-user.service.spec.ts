import { TestBed } from '@angular/core/testing';

import { ProgramUserService } from './program-user.service';

describe('ProgramUserService', () => {
  let service: ProgramUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
