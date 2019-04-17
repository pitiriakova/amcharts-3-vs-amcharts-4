import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import {FormsModule} from '@angular/forms';
import { Amcharts3Component } from './amcharts3/amcharts3.component';
import { Amcharts4Component } from './amcharts4/amcharts4.component';
import { AmChartsModule } from '@amcharts/amcharts3-angular';

@NgModule({
  declarations: [ChartsComponent, Amcharts3Component, Amcharts4Component],
  imports: [
    CommonModule,
    FormsModule,
    AmChartsModule,
  ],
  exports: [ChartsComponent],
})
export class ChartsModule { }
