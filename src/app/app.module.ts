import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {ChartsComponent} from './charts/charts.component';
import {Amcharts3Component} from './charts/amcharts3/amcharts3.component';
import {Amcharts4Component} from './charts/amcharts4/amcharts4.component';
import {CommonModule} from '@angular/common';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import { HeaderComponent } from './shared/header/header.component';
import {ChartDataService} from './services/chart-data.service';
import { HighchartsComponent } from './charts/highcharts/highcharts.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartsComponent, Amcharts3Component, Amcharts4Component, HeaderComponent, HighchartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    AmChartsModule,
  ],
  providers: [ChartDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
