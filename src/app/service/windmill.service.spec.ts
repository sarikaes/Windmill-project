import { TestBed } from '@angular/core/testing';

import { WindmillService } from './windmill.service';

describe('WindmillService', () => {
  let service: WindmillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindmillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
