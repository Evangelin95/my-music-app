import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { PlaylistService } from 'src/app/services/playlist.service';
import { TracklistService } from 'src/app/services/tracklist.service';
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
  isMobile = false;
  spotify = "";
  like = "";
  song = "";
  token = "";
  favorite:any[] = [];
  totalsong ="";


  displayedColumns: string[] = ['#', 'TÍTULO', 'ÁLBUM', 'FECHA INCORPORACIÓN'];
  dataSource = new MatTableDataSource();
  temLements: any[] = [];

  constructor(private profileService: UserprofileService,
    private playList: PlaylistService,
    private trackfavorite: TracklistService) { }


  ngOnInit(): void {

    //debugger;
    if(localStorage.getItem('access_token') == "undefined" || localStorage.getItem('access_token') == null) 
    {
      let hash = window.location.hash.substring(1);
      let url = hash.substring(1).split("&");
      /*console.log(url)*/
      console.log(url[0].split("=")[1]);
      localStorage.setItem('access_token',url[0].split("=")[1]);
    }

    this.token = ""+localStorage.getItem('access_token');
    //console.log(this.token);

    this.GetDataUser();
    this.GetDataPlaylist();
    this.getDataTrack();
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

      //this.list = response.tracks.items.track.album.images[0].url;

      this.dataSource = response.tracks.items;
      this.temLements = response.tracks.items;
      //console.log(this.temLements);

    },
      error => {
        console.log(error);
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
      })
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    if (window.innerWidth <= 480) {
      this.isMobile = true
      this.displayedColumns = ['#', 'TÍTULO'];
    }
    else{
      this.isMobile = false
      this.displayedColumns = ['#', 'TÍTULO', 'ÁLBUM', 'FECHA INCORPORACIÓN'];
    }
  }

  putFavorite(row:any)
  {
    this.trackfavorite.putTrackFavorite(this.token,row.track.id).subscribe(response => {
      console.log(response);
      this.favorite.push(row.track.id);
    },
      error => {
        console.log(error);
      })
    //console.log(row.track.id);
  }

  deleteFavorite(row:any)
  {
    this.trackfavorite.deleteTrackFavorite(this.token,row.track.id).subscribe(response => {
      console.log(response);
      let position: number;
      position = this.favorite.indexOf(row.track.id);
      console.log(position);
      this.favorite.splice(position,1);
    },
      error => {
        console.log(error);
      })
    //console.log(row.track.id);
  }

  getDataTrack()
  {
    this.trackfavorite.getListFavorite(this.token).subscribe(response => {
      console.log(response);
      this.totalsong = response.total;
      for (let iterator of response.items) {
        this.favorite.push(iterator.track.id)
        console.log(iterator.track.id);
      }
      
    },
      error => {
        console.log(error);
    })
  }
  
  validateFavorite(element:any)
  {
    console.log(element.track.id);
    let contfavorite : Boolean;
    contfavorite = this.favorite.includes(element.track.id);
    if(contfavorite == true)
    {
      this.deleteFavorite(element);
    }
    else
    {
      this.putFavorite(element);
    }
  }

  isFavorite(element:any)
  {
     return this.favorite.includes(element.track.id);
  }
  



}
