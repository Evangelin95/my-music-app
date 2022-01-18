import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PlaylistService } from './playlist.service';

let httpClientSpy: { get: jasmine.Spy };

describe('GetplaylistimgService', () => {
  let service: PlaylistService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },]
    });
    service = TestBed.inject(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
