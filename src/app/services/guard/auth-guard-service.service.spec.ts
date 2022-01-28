import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoriteComponent } from 'src/app/pages/favorite/favorite.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';

import { AuthGuardServiceService } from './auth-guard-service.service';
import { AuthGuardGuard } from './auth-guard.guard';

const responseToken = {
  error: {
    error:
    {
      message: "The access token expired",
      status: 401,
    }
  },
  status: 401
}

describe('AuthGuardServiceService', () => {
  let service: AuthGuardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule, RouterTestingModule.withRoutes(
        [{path: '', component: WelcomeComponent },
        {path: 'welcome', component: WelcomeComponent },
        {path: 'home', component: HomeComponent},
        {path: 'favorite',canActivate:[AuthGuardGuard], component: FavoriteComponent}]
        )],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(AuthGuardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Is authenticated', () => {
    localStorage.setItem('auth','true');
    expect(service.isAuthenticated()).toEqual(true);
  });
});
