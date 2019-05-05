import { TestBed } from '@angular/core/testing';

import { DataSharedService } from './data-shared.service';

describe('DataSharedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataSharedService = TestBed.get(DataSharedService);
    expect(service).toBeTruthy();
  });
});
