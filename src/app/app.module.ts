import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchAreaComponent } from './search-area/search-area.component';
import { ResultAreaComponent } from './result-area/result-area.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { CarouselAreaComponent } from './carousel-area/carousel-area.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { WeeklyAreaComponent } from './weekly-area/weekly-area.component';
import { DetailsAreaComponent } from './details-area/details-area.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    AppComponent,
    SearchAreaComponent,
    ResultAreaComponent,
    CarouselAreaComponent,
    WeeklyAreaComponent,
    DetailsAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
