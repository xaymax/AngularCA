import { TestBed } from '@angular/core/testing';

import { StarwarService } from './starwar.service';

describe('CategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StarwarService = TestBed.get(StarwarService);
    expect(service).toBeTruthy();
  });
});
