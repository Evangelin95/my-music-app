import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService {

  openSnackBar(message: string, action: string) {
    
  }

  loggInd: boolean = false;

  constructor(private router: Router,
    private _snackBar: MatSnackBar) { }

  isAuthenticated()
  {
    this.loggInd = false;
    if(localStorage.getItem('auth') === 'true')
    {
      console.log(localStorage.getItem('auth'));
       this.loggInd = true;
    }
    return this.loggInd;
  }

  isTokenExpired(error:any)
  {
    if(error.status === 401)
    {
       let detailError = error.error;
       if(detailError && detailError.error.message.includes('token'))
       {
          this.router.navigateByUrl("/welcome");  
          this._snackBar.open("The session expired", "OK");
          return true;
       }
    }
    return false; 
  }
}
