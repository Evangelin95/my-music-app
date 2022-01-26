import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-listmusic',
  templateUrl: './card-listmusic.component.html',
  styleUrls: ['./card-listmusic.component.css']
})
export class CardListmusicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() nameplaylist = '';

  @Input() desplaylist = '';

  @Input() spotify = '';

  @Input() like = '';

  @Input() song = '';

  @Input() imgplaylist = '';



}
