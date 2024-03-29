import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserprofileService } from './userprofile.service';

let httpClientSpy: { get: jasmine.Spy };

describe('UserprofileService', () => {
  let service: UserprofileService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },]
    });
    service = TestBed.inject(UserprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
