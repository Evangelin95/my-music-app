import { Component, HostListener, OnInit } from '@angular/core';
import { PlaylistService } from 'src/app/services/playlist.service';
import { UserprofileService } from 'src/app/services/userprofile.service';


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor() { }

    

  ngOnInit(): void {
    
    //let access_token = localStorage.getItem('access_token')
    //console.log(access_token);


  }




}
