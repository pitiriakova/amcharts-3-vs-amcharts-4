import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Amcharts4Component} from './charts/performance-tests/amcharts4/amcharts4.component';
import {HighchartsComponent} from './charts/performance-tests/highcharts/highcharts.component';
import {CanvasjsComponent} from './charts/performance-tests/canvasjs/canvasjs.component';
import {Amcharts4StackedAreaPageComponent} from './charts/chart-types/amcharts4-stacked-area-page/amcharts4-stacked-area-page.component';
import {AmchartsCandlestickPageComponent} from './charts/chart-types/amcharts-candlestick-page/amcharts-candlestick-page.component';
import {ZoomChartsPageComponent} from './charts/chart-types/zoom-charts-page/zoom-charts-page.component';
import {RangeChartsPageComponent} from './charts/chart-types/range-charts-page/range-charts-page.component';
import {Amcharts3Component} from './charts/performance-tests/amcharts3/amcharts3.component';
import {Amcharts4ZoomChartComponent} from './charts/performance-tests/amcharts-zoom-page/amcharts4-zoom-chart/amcharts4-zoom-chart.component';
import {Amcharts4OptimizedZoomChartComponent} from './charts/performance-tests/amcharts-zoom-page/amcharts4-zoom-chart-optimized/amcharts4-zoom-chart-optimized.component';
import {AmchartsZoomDynamicSeriesComponent} from './charts/performance-tests/amcharts-zoom-page/amcharts-zoom-dynamic-series/amcharts-zoom-dynamic-series.component';

const appRoutes: Routes = [
  // { path: 'amcharts3', component: Amcharts3Component },
  { path: 'amcharts4', component: Amcharts4Component },
  // { path: 'highcharts', component: HighchartsComponent },
  // { path: 'canvasJS', component: CanvasjsComponent },
  // { path: 'amcharts4-candlestick-page', component: AmchartsCandlestickPageComponent },
  // { path: 'amcharts4-stacked-area-page', component: Amcharts4StackedAreaPageComponent },
  // { path: 'range-chart', component: RangeChartsPageComponent },
  // { path: 'zoom-chart', component: ZoomChartsPageComponent },
  { path: 'amcharts-zoom', component: Amcharts4ZoomChartComponent },
  { path: 'amcharts-zoom-optimized', component: Amcharts4OptimizedZoomChartComponent },
  { path: 'amcharts-zoom-dynamic-series', component: AmchartsZoomDynamicSeriesComponent },
  { path: '',
    redirectTo: '/zoom-chart',
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
