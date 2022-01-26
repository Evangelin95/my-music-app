import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {HttpClientModule} from '@angular/common/http';
import { AuthGuardServiceService } from './services/guard/auth-guard-service.service';
import { HeaderComponent } from './ui/components/organisms/header/header.component';
import { CardListmusicComponent } from './ui/components/organisms/card-listmusic/card-listmusic.component';
import { TableListmusicComponent } from './ui/components/organisms/table-listmusic/table-listmusic.component';



@NgModule({
  declarations: [
    HomeComponent,
    WelcomeComponent,
    AppComponent,
    FavoriteComponent,
    HeaderComponent,
    CardListmusicComponent,
    TableListmusicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule
  ],

  providers: [AuthGuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
