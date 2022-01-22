import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TracklistService {

  httpoptions = {
    headers: new HttpHeaders(),
    params: new HttpParams()
  }

  constructor(private http: HttpClient) {
    this.httpoptions.headers = this.httpoptions.headers.set('Content-Type', 'application/json');
    this.httpoptions.headers = this.httpoptions.headers.set('Accept', 'application/json');
   }

  getListFavorite(token:string):Observable<any>{
    this.httpoptions.headers = this.httpoptions.headers.set('Authorization', 'Bearer ' +token);

    return this.http.get('https://api.spotify.com/v1/me/tracks', this.httpoptions)
  }

  putTrackFavorite(token:string,id:string):Observable<any>
  {
    this.httpoptions.headers = this.httpoptions.headers.set('Authorization', 'Bearer ' +token);
    this.httpoptions.params = this.httpoptions.params.set('ids', id);
    return this.http.put('https://api.spotify.com/v1/me/tracks',null, this.httpoptions);
  }

  deleteTrackFavorite(token:string,id:string):Observable<any>
  {
    this.httpoptions.headers = this.httpoptions.headers.set('Authorization', 'Bearer ' +token);
    this.httpoptions.params = this.httpoptions.params.set('ids', id);
    return this.http.delete('https://api.spotify.com/v1/me/tracks', this.httpoptions);
  }
}
