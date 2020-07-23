import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {Amcharts3Component} from './charts/performance-tests/amcharts3/amcharts3.component';
import {Amcharts4Component} from './charts/performance-tests/amcharts4/amcharts4.component';
import {CommonModule} from '@angular/common';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import { HeaderComponent } from './shared/header/header.component';
import {ChartDataService} from './services/chart-data.service';
import { HighchartsComponent } from './charts/performance-tests/highcharts/highcharts.component';
import { ChartInputParametersComponent } from './charts/chart-input-parameters/chart-input-parameters.component';
import { CanvasjsComponent } from './charts/performance-tests/canvasjs/canvasjs.component';
import { CandlesticksBaseComponent } from './charts/chart-types/amcharts-candlestick-page/candlesticks-base/candlesticks-base.component';
import { Amcharts4StackedAreaPageComponent } from './charts/chart-types/amcharts4-stacked-area-page/amcharts4-stacked-area-page.component';
import {LoginTimesCandlestickDataGenerator} from './services/candlesticks-data-generation';
import { AmchartsCandlestickPageComponent } from './charts/chart-types/amcharts-candlestick-page/amcharts-candlestick-page.component';
import { CandlestickLoginsSeparatedAxisComponent } from './charts/chart-types/amcharts-candlestick-page/candlestick-logins-separated-axis/candlestick-logins-separated-axis.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { RangeChartAveragesComponent } from './charts/chart-types/range-charts-page/range-chart-averages/range-chart-averages.component';
import {SmallDatasetGenerator} from './services/small-dataset-generator';
import { ZoomChartComponent } from './charts/chart-types/zoom-charts-page/zoom-chart/zoom-chart.component';
import {LargeDatasetGenerator} from './services/large-dataset-generator';
import { ZoomChartsPageComponent } from './charts/chart-types/zoom-charts-page/zoom-charts-page.component';
import { RangeChartsPageComponent } from './charts/chart-types/range-charts-page/range-charts-page.component';
import { RangeChartComponent } from './charts/chart-types/range-charts-page/range-chart/range-chart.component';
import { ChartsjsComponent } from './charts/performance-tests/chartsjs/chartsjs.component';
import { FusionchartsComponent } from './charts/performance-tests/fusioncharts/fusioncharts.component';
import { Amcharts4ZoomChartComponent } from './charts/performance-tests/amcharts-zoom-page/amcharts4-zoom-chart/amcharts4-zoom-chart.component';
import {Amcharts4ZoomChartDataGenerator} from './charts/performance-tests/amcharts-zoom-page/amcharts4-zoom-chart/amcharts4-zoom-chart-data-generator';
import { Amcharts4OptimizedZoomChartComponent } from './charts/performance-tests/amcharts-zoom-page/amcharts4-zoom-chart-optimized/amcharts4-zoom-chart-optimized.component';

@NgModule({
  declarations: [
    AppComponent,
    // Amcharts3Component,
    // Amcharts4Component,
    HeaderComponent,
    // HighchartsComponent,
    ChartInputParametersComponent,
    // CanvasjsComponent,
    // CandlesticksBaseComponent,
    // Amcharts4StackedAreaPageComponent,
    // AmchartsCandlestickPageComponent,
    // CandlestickLoginsSeparatedAxisComponent,
    ToolbarComponent,
    // RangeChartAveragesComponent,
    // ZoomChartComponent,
    // ZoomChartsPageComponent,
    // RangeChartsPageComponent,
    // RangeChartComponent,
    // ChartsjsComponent,
    // FusionchartsComponent,
    Amcharts4ZoomChartComponent,
    Amcharts4OptimizedZoomChartComponent
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
  providers: [ChartDataService, LoginTimesCandlestickDataGenerator, SmallDatasetGenerator, LargeDatasetGenerator, Amcharts4ZoomChartDataGenerator],
  bootstrap: [AppComponent],
  exports: [ChartInputParametersComponent],
})
export class AppModule { }
