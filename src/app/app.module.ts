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
import { CandlesticksBaseComponent } from './charts/amcharts-candlestick-page/candlesticks-base/candlesticks-base.component';
import { Amcharts4StackedAreaPageComponent } from './charts/amcharts4-stacked-area-page/amcharts4-stacked-area-page.component';
import {LoginTimesCandlestickDataGenerator} from './charts/amcharts-candlestick-page/services/login-times-candlesticks-data-generation';
import { AmchartsCandlestickPageComponent } from './charts/amcharts-candlestick-page/amcharts-candlestick-page.component';
import { CandlestickLoginsSeparatedAxisComponent } from './charts/amcharts-candlestick-page/candlestick-logins-separated-axis/candlestick-logins-separated-axis.component';
import { ToolbarComponent } from './charts/amcharts-candlestick-page/toolbar/toolbar.component';
import { RangeChartComponent } from './charts/range-chart/range-chart.component';
import {RangeChartDataGenerator} from './charts/range-chart/range-chart-data-generator';
import { ZoomChartComponent } from './charts/zoom-chart/zoom-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    Amcharts3Component,
    Amcharts4Component,
    HeaderComponent,
    HighchartsComponent,
    ChartInputParametersComponent,
    CanvasjsComponent,
    CandlesticksBaseComponent,
    Amcharts4StackedAreaPageComponent,
    AmchartsCandlestickPageComponent,
    CandlestickLoginsSeparatedAxisComponent,
    ToolbarComponent,
    RangeChartComponent,
    ZoomChartComponent
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
  providers: [ChartDataService, LoginTimesCandlestickDataGenerator, RangeChartDataGenerator],
  bootstrap: [AppComponent],
  exports: [ChartInputParametersComponent],
})
export class AppModule { }
