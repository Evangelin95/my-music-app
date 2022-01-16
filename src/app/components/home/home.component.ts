import { Component, DoCheck, HostListener, OnInit } from '@angular/core';
import { GetplaylistimgService } from 'src/app/services/getplaylistimg.service';
import { UserprofileService } from 'src/app/services/userprofile.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['#', 'TÍTULO', 'ÁLBUM', 'FECHA INCORPORACIÓN'];
  dataSource = ELEMENT_DATA;
  temLements: any[] = [];

  constructor(private profileservice: UserprofileService,
    private playlist: GetplaylistimgService) { }


  nombre = "";
  desplaylist = "";
  nameplaylist = ""
  imgplaylist = "";
  list = "";
  isMobile = false;

  ngOnInit(): void {

    let hash = window.location.hash.substring(1);
    let url = hash.substring(1).split("&");
    /*console.log(url)*/
    let token = url[0].split("=")[1];
    console.log(token);

    this.profileservice.GetProfileUser(token).subscribe(response => {
      console.log(response);
      this.nombre = response.display_name;
    },
      error => {
        console.log(error);
      })

    this.playlist.GetPlaylistImg(token).subscribe(response => {
      console.log(response);
      this.nameplaylist = response.name
      this.desplaylist = response.description;
      this.imgplaylist = response.images[0].url;
      //this.list = response.tracks.items.track.album.images[0].url;

      this.dataSource = response.tracks.items;
      this.temLements = response.tracks.items;

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



}
