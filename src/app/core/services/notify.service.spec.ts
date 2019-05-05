/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotifyService } from './notify.service';

describe('NotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifyService]
    });
  });

  it('should ...', inject([NotifyService], (service: NotifyService) => {
    expect(service).toBeTruthy();
  }));
});
