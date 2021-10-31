import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchAreaComponent } from './search-area/search-area.component';
import { StreetInputComponent } from './search-area/street-input/street-input.component';
import { CityInputComponent } from './search-area/city-input/city-input.component';
import { StateInputComponent } from './search-area/state-input/state-input.component';
import { AutoDetectInputComponent } from './search-area/auto-detect-input/auto-detect-input.component';
import { FormSubmitButtonComponent } from './search-area/form-submit-button/form-submit-button.component';
import { ResultAreaComponent } from './result-area/result-area.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchAreaComponent,
    StreetInputComponent,
    CityInputComponent,
    StateInputComponent,
    AutoDetectInputComponent,
    FormSubmitButtonComponent,
    ResultAreaComponent
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
