import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TracklistService } from './tracklist.service';

let httpClientSpy: { get: jasmine.Spy };

describe('TracklistService', () => {
  let service: TracklistService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get,put']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },]
    });
    service = TestBed.inject(TracklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
