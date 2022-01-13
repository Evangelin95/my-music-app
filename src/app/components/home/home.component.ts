import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor( ) { }

  ngOnInit(): void {

    let hash = window.location.hash.substring(1);
    let url = hash.substring(1).split("&");
    /*console.log(url)*/
    let token = url[0].split("=")[1];
    console.log(token)
    
  }

}
