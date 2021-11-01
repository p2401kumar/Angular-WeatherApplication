import {Component, Injectable} from '@angular/core';
import {Observable, of, OperatorFunction} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import {NgbTypeaheadSelectItemEvent} from "@ng-bootstrap/ng-bootstrap";
import {getLocaleId} from "@angular/common";

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

const abbreviations = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
  "GAGU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN",
  "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR",
  "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "VI", "WA", "WV", "WI", "WY"];

const GOOGLE = 'https://nodejs-329516.wl.r.appspot.com/citysuggestion';
const LOC_FINDER = 'https://ipinfo.io/?token=09035606870157';
const LOC_TO_IP = 'https://maps.googleapis.com/maps/api/geocode/json';
const WEATHER_INFO = 'https://nodejs-329516.wl.r.appspot.com/weatherInfo';

// const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
var lastSearchList: [any, string[]] | (string | any[])[];

const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  },
});

@Injectable()
export class AutoCompleteService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    const params = new HttpParams()
      .append('term', term);

    return this.http
      .get<[any, string[]]>(GOOGLE, {params})
      .pipe(map((response) => {
        console.log(response[0]);
        lastSearchList = response;
        return response[0];
      }));
  }

  searchByIp(p: SearchAreaComponent) {
    this.http.get<any>(LOC_FINDER).subscribe(data => {
      p.streetValue = '';
      p.cityValue = data['city'];
      p.stateValue = data['region'];
      this.weatherInfo(p, data['loc'].split(',')[0], data['loc'].split(',')[1])
    })
  }

  searchByInput(p: SearchAreaComponent, street: string, city: string, state: string) {
    const params = new HttpParams()
      .append('address', street + '+' + city + '+' + state)
      .append('key', 'AIzaSyAlKfRcHtNUov7CX9zmFVFEqMPPe7oS9pM');

    this.http.get<any>(LOC_TO_IP, {params}).subscribe(data => {
      this.weatherInfo(p, data["results"][0]['geometry']['location']['lat'], data["results"][0]['geometry']['location']['lng'])
    })
  }

  weatherInfo(p: SearchAreaComponent, lat: string, long: string) {
    console.log(lat + " " + long);

    // weather data
    const params = new HttpParams()
      .append('latitude', lat)
      .append('longitude', long);

    this.http.get<any>(WEATHER_INFO, {params}).subscribe(data => {
      p.resultAvailable = true;
      p.queryAvailable = false;
      p.weather_15_day = data;
      console.log(data)
    })
  }
}

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  providers: [AutoCompleteService],
  styleUrls: ['./search-area.component.scss']
})
export class SearchAreaComponent {
  suggestions: string[] = [];
  states: string[] = states;
  searching = false;
  searchFailed = false;

  public streetValue: any;
  public stateValue: any;
  public cityValue: any;

  public queryAvailable = false;
  public resultAvailable = false;

  public weather_15_day: any | undefined

  constructor(private _service: AutoCompleteService) {
    this.streetValue = ''
    this.stateValue = ''
    this.cityValue = ''
    this.queryAvailable = false;
    this.resultAvailable = false;
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
  autoDetect: any;



  selectedItem($event: NgbTypeaheadSelectItemEvent<any>) {
    for(let i = 0; i<lastSearchList[0].length; i++) {
        if (lastSearchList[0][i] == $event.item) {
          for(let j = 0; j<abbreviations.length; j++) {
            if(lastSearchList[1][i] === abbreviations[j]) {
              console.log(states[j]);
              // alert(states[j]);
              this.stateValue = states[j];
              return;
            }
          }
        }
    }
  }

  clear() {
    // alert();
    this.cityValue = ''
    this.streetValue = ''
    this.stateValue = "Select your State"
    this.queryAvailable = false;
    this.resultAvailable = false;
    this.autoDetect = false;
  }

  submit() {
    // alert(this.cityValue + " " + this.streetValue + " " + this.stateValue)
    this.queryAvailable = true;
    this.resultAvailable = false;

    if(this.autoDetect) {
      this._service.searchByIp(this);
    } else {
      this._service.searchByInput(this, this.streetValue, this.cityValue, this.stateValue);
    }
  }

  setAutoDetect(values:any) {
    this.clear();
    this.autoDetect = values.currentTarget.checked;
  }
}
