import { TestBed } from '@angular/core/testing';

import { UserControlService } from './user-control.service';

describe('UserControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserControlService = TestBed.get(UserControlService);
    expect(service).toBeTruthy();
  });
});
