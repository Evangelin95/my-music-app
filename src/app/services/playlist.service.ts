import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DATA_TEST_PLAYLIST, DATA_TEST_USERPROFILE } from './data-test';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  httpoptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
  }

  constructor(private http: HttpClient) {
    this.httpoptions.headers = this.httpoptions.headers.set('Content-Type', 'application/json');
    this.httpoptions.headers = this.httpoptions.headers.set('Accept', 'application/json');
   }

   getPlaylistImg(token:string):Observable<any>{
    this.httpoptions.headers = this.httpoptions.headers.set('Authorization', 'Bearer ' +token);

    return this.http.get('https://api.spotify.com/v1/playlists/37i9dQZF1DWSpF87bP6JSF', this.httpoptions)
  }

}
