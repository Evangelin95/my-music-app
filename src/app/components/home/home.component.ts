import { Component, OnInit } from '@angular/core';
import { UserprofileService } from 'src/app/services/userprofile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private profileservice: UserprofileService) { }

  nombre = "";

  ngOnInit(): void {

    let hash = window.location.hash.substring(1);
    let url = hash.substring(1).split("&");
    /*console.log(url)*/
    let token = url[0].split("=")[1];
    console.log(token);

    this.profileservice.GetProfileUser(token).subscribe(response=>{
      console.log(response);
      this.nombre = response.display_name;
    },
    error=>{
      console.log(error);
    })
  }

}
