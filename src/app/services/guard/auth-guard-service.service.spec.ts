import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardServiceService } from './auth-guard-service.service';

describe('AuthGuardServiceService', () => {
  let service: AuthGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, MatSnackBarModule],
    });
    service = TestBed.inject(AuthGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
