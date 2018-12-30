import { TestBed } from '@angular/core/testing';

import { StarwarService } from './starwar.service';

describe('StarwarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarwarService = TestBed.get(StarwarService);
    expect(service).toBeTruthy();
  });
});
