import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Amcharts4Component} from './charts/amcharts4/amcharts4.component';
import {HighchartsComponent} from './charts/highcharts/highcharts.component';
import {CanvasjsComponent} from './charts/canvasjs/canvasjs.component';
import {CandlesticksBaseComponent} from './charts/amcharts-candlestick-page/candlesticks-base/candlesticks-base.component';
import {Amcharts4StackedAreaPageComponent} from './charts/amcharts4-stacked-area-page/amcharts4-stacked-area-page.component';
import {AmchartsCandlestickPageComponent} from './charts/amcharts-candlestick-page/amcharts-candlestick-page.component';
import {RangeChartComponent} from './charts/range-chart/range-chart.component';

const appRoutes: Routes = [
  // { path: 'amcharts3', component: Amcharts3Component },
  { path: 'amcharts4', component: Amcharts4Component },
  { path: 'highcharts', component: HighchartsComponent },
  { path: 'canvasJS', component: CanvasjsComponent },
  { path: 'amcharts4-candlestick-page', component: AmchartsCandlestickPageComponent },
  { path: 'amcharts4-stacked-area-page', component: Amcharts4StackedAreaPageComponent },
  { path: 'amcharts4-range-chart', component: RangeChartComponent },
  { path: '',
    redirectTo: '/amcharts4',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
})
export class AppRoutingModule { }
