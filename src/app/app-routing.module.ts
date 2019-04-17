import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {Amcharts3Component} from './charts/amcharts3/amcharts3.component';
import {Amcharts4Component} from './charts/amcharts4/amcharts4.component';
import {HighchartsComponent} from './charts/highcharts/highcharts.component';

const appRoutes: Routes = [
  { path: 'amcharts3', component: Amcharts3Component },
  { path: 'amcharts4', component: Amcharts4Component },
  { path: 'highcharts', component: HighchartsComponent },
  { path: '',
    redirectTo: '/amcharts3',
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
