import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-area',
  templateUrl: './result-area.component.html',
  styleUrls: ['./result-area.component.scss']
})
export class ResultAreaComponent implements OnInit {
  @Input()
  res_city: string | undefined

  @Input()
  res_state: string | undefined

  @Input()
  res_queryAvailable: Boolean | undefined

  @Input()
  res_resultAvailable: Boolean | undefined

  @Input()
  res_weather_15_day: any | undefined

  showResultPage = true;
  favorites: string | undefined;

  constructor() {
    this.favorites = ''
  }

  ngOnInit(): void {
  }

  setResultPage(b: boolean) {
    this.showResultPage = b;
  }
}
