import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly-area',
  templateUrl: './weekly-area.component.html',
  styleUrls: ['./weekly-area.component.scss']
})
export class WeeklyAreaComponent implements OnInit {
  markFavourite = false;

  constructor() { }

  ngOnInit(): void {
  }

}
