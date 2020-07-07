import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {Amcharts3Component} from './charts/amcharts3/amcharts3.component';
import {Amcharts4Component} from './charts/amcharts4/amcharts4.component';
import {CommonModule} from '@angular/common';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import { HeaderComponent } from './shared/header/header.component';
import {ChartDataService} from './services/chart-data.service';
import { HighchartsComponent } from './charts/highcharts/highcharts.component';
import { ChartInputParametersComponent } from './charts/chart-input-parameters/chart-input-parameters.component';
import { CanvasjsComponent } from './charts/canvasjs/canvasjs.component';
import { Amcharts4CandlesticksComponent } from './charts/amcharts4-candlesticks/amcharts4-candlesticks.component';
import { Amcharts4StackedAreaComponent } from './charts/amcharts4-stacked-area/amcharts4-stacked-area.component';
import {CandlestickDataGenerator} from './services/candlesticks-data-generation';

@NgModule({
  declarations: [
    AppComponent,
    Amcharts3Component, Amcharts4Component, HeaderComponent, HighchartsComponent, ChartInputParametersComponent, CanvasjsComponent, Amcharts4CandlesticksComponent, Amcharts4StackedAreaComponent
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
  providers: [ChartDataService, CandlestickDataGenerator],
  bootstrap: [AppComponent],
  exports: [ChartInputParametersComponent],
})
export class AppModule { }
