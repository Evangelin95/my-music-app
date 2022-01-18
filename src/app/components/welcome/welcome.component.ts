import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(  ) { }

  ngOnInit(): void {
    localStorage.removeItem('access_token');
  }

  login() {
    window.open("https://accounts.spotify.com/authorize?client_id=71e5eaa5123b45219bb4e9be64f1f4d3&redirect_uri=http://localhost:4200/home&response_type=token","_self");
  }
}
