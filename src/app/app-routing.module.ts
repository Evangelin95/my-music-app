import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './services/guard/auth-guard.guard';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HomeComponent } from './components/home/home.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent },
  {path: 'welcome', component: WelcomeComponent },
  {path: 'home', component: HomeComponent},
  {path: 'favorite',canActivate:[AuthGuardGuard], component: FavoriteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
