import { TestBed } from '@angular/core/testing';

import { ParliDataService } from './parli-data.service';

describe('ParliDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParliDataService = TestBed.get(ParliDataService);
    expect(service).toBeTruthy();
  });
});
