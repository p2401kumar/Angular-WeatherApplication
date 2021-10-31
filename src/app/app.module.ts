import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchAreaComponent } from './search-area/search-area.component';
import { StreetInputComponent } from './street-input/street-input.component';
import { CityInputComponent } from './city-input/city-input.component';
import { StateInputComponent } from './state-input/state-input.component';
import { AutoDetectInputComponent } from './auto-detect-input/auto-detect-input.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchAreaComponent,
    StreetInputComponent,
    CityInputComponent,
    StateInputComponent,
    AutoDetectInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
