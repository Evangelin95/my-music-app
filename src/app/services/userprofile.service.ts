import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  httpoptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
  }

  constructor(private http: HttpClient) {
    this.httpoptions.headers = this.httpoptions.headers.set('Content-Type', 'application/json');
    this.httpoptions.headers = this.httpoptions.headers.set('Accept', 'application/json');
   }

  GetProfileUser(token:string):Observable<any>{
    this.httpoptions.headers = this.httpoptions.headers.set('Authorization', 'Bearer ' +token);

    return this.http.get('https://api.spotify.com/v1/me', this.httpoptions)

  }
}
