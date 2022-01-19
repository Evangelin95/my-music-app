import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PlaylistService } from 'src/app/services/playlist.service';
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

  displayedColumns: string[] = ['#', 'TÍTULO', 'ÁLBUM', 'FECHA INCORPORACIÓN'];
  dataSource = new MatTableDataSource();

  constructor(private profileService: UserprofileService,
    private trackService: TracklistService) { }

    

  ngOnInit(): void {
    
  this.access_token = localStorage.getItem('access_token')
  console.log(this.access_token);

  this.GetDataUser();
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

  GetDataUser()
  {
    this.profileService.getProfileUser(this.access_token).subscribe(response => {
      console.log(response);
      this.nombre = response.display_name;
    },
      error => {
        console.log(error);
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
    })
  }



}
