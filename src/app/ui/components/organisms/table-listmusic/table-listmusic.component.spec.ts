import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { FavoriteComponent } from 'src/app/pages/favorite/favorite.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { WelcomeComponent } from 'src/app/pages/welcome/welcome.component';
import { AuthGuardGuard } from 'src/app/services/guard/auth-guard.guard';

import { TableListmusicComponent } from './table-listmusic.component';



describe('TableListmusicComponent', () => {
  let component: TableListmusicComponent;
  let fixture: ComponentFixture<TableListmusicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, MatSnackBarModule, RouterTestingModule.withRoutes(
        [{path: '', component: WelcomeComponent },
        {path: 'welcome', component: WelcomeComponent },
        {path: 'home', component: HomeComponent},
        {path: 'favorite',canActivate:[AuthGuardGuard], component: FavoriteComponent}]
      )],
      declarations: [ TableListmusicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListmusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
