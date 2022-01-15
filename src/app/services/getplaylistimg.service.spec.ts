import { TestBed } from '@angular/core/testing';

import { GetplaylistimgService } from './getplaylistimg.service';

describe('GetplaylistimgService', () => {
  let service: GetplaylistimgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetplaylistimgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
