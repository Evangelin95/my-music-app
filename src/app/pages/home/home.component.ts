import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthGuardServiceService } from 'src/app/services/guard/auth-guard-service.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { UserprofileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombre = "";
  desplaylist = "";
  nameplaylist = ""
  imgplaylist = "";
  list = "";
  spotify = "";
  like = "";
  song = "";
  token = "";

  displayedColumns: string[] = ['#', 'TÍTULO', 'ÁLBUM', 'FECHA INCORPORACIÓN'];
  dataSource = new MatTableDataSource();
  temLements: any[] = [];

  constructor(private profileService: UserprofileService,
    private playList: PlaylistService,
    private authGuardService: AuthGuardServiceService,
    ) { }


  ngOnInit(): void {

    //debugger;
    if(localStorage.getItem('access_token') == "undefined" || localStorage.getItem('access_token') == null) 
    {
      let hash = window.location.hash.substring(1);
      let url = hash.substring(1).split("&");
      console.log(url[0].split("=")[1]);
      localStorage.setItem('access_token',url[0].split("=")[1]);
      localStorage.setItem('auth','true');
    }

    this.token = ""+localStorage.getItem('access_token');

    this.GetDataUser();
    this.GetDataPlaylist();
  }

  GetDataPlaylist()
  {
    this.playList.getPlaylistImg(this.token).subscribe(response => {
      console.log(response);
      this.nameplaylist = response.name
      this.desplaylist = response.description;
      this.imgplaylist = response.images[0].url;
      this.spotify = response.owner.id;
      this.like = response.followers.total;
      this.song = response.tracks.total;

      this.dataSource = response.tracks.items;
      this.temLements = response.tracks.items;

    },
      error => {
        console.log(error);
        this.authGuardService.isTokenExpired(error);
      })
  }

  GetDataUser()
  {
    this.profileService.getProfileUser(this.token).subscribe(response => {
      console.log(response);
      this.nombre = response.display_name;
    },
      error => {
        console.log(error);
        this.authGuardService.isTokenExpired(error);
      })
  }

}
