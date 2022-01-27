import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthGuardServiceService } from 'src/app/services/guard/auth-guard-service.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { TracklistService } from 'src/app/services/tracklist.service';

@Component({
  selector: 'app-table-listmusic',
  templateUrl: './table-listmusic.component.html',
  styleUrls: ['./table-listmusic.component.css']
})
export class TableListmusicComponent implements OnInit {

  @Input() dataSource = new MatTableDataSource();

  nombre = "";
  list = "";
  isMobile = false;
  spotify = "";
  like = "";
  song = "";
  token = "";
  favorite:any[] = [];
  totalsong ="";

  displayedColumns: string[] = ['#', 'TÍTULO', 'ÁLBUM', 'FECHA INCORPORACIÓN'];
  //dataSource = new MatTableDataSource();
  temLements: any[] = [];

  constructor(private playList: PlaylistService,
    private trackfavorite: TracklistService,
    private authGuardService: AuthGuardServiceService,) { }

  ngOnInit(): void {

    //debugger;
    if(localStorage.getItem('access_token') == "undefined" || localStorage.getItem('access_token') == null) 
    {
      let hash = window.location.hash.substring(1);
      let url = hash.substring(1).split("&");
      /*console.log(url)*/
      console.log(url[0].split("=")[1]);
      localStorage.setItem('access_token',url[0].split("=")[1]);
      localStorage.setItem('auth','true');
    }

    this.token = ""+localStorage.getItem('access_token');
    //console.log(this.token);

    this.getDataTrack();
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
        this.authGuardService.isTokenExpired(error);
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
        this.authGuardService.isTokenExpired(error);
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
        this.authGuardService.isTokenExpired(error);
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
