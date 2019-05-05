import { TestBed } from '@angular/core/testing';

import { ResourceControlService } from './resource-control.service';

describe('ResourceControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceControlService = TestBed.get(ResourceControlService);
    expect(service).toBeTruthy();
  });
});
