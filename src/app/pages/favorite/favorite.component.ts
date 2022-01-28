import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthGuardServiceService } from 'src/app/services/guard/auth-guard-service.service';
import { TracklistService } from 'src/app/services/tracklist.service';
import { UserprofileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  access_token: any;
  nombre = "";
  namesong ="";
  isMobile = false;
  totalsong = "";

  dataSource = new MatTableDataSource();

  constructor(private profileService: UserprofileService,
    private trackService: TracklistService,
    private authGuardService: AuthGuardServiceService) { }

  ngOnInit(): void {
    
  this.access_token = localStorage.getItem('access_token')
  console.log(this.access_token);

  this.GetDataUser();
  this.getDataTrack();

  }

  GetDataUser()
  {
    this.profileService.getProfileUser(this.access_token).subscribe(response => {
      console.log(response);
      this.nombre = response.display_name;
    },
      error => {
        console.log(error);
        this.authGuardService.isTokenExpired(error);
      })
  }

  getDataTrack()
  {
    this.trackService.getListFavorite(this.access_token).subscribe(response => {
      console.log(response);
      this.dataSource = response.items;
      this.totalsong = response.total;
    },
      error => {
        console.log(error);
        this.authGuardService.isTokenExpired(error);
    })
  }



}
