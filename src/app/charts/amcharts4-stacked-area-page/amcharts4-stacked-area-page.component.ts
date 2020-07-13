import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {LoginTimesCandlestickDataGenerator} from '../amcharts-candlestick-page/services/login-times-candlesticks-data-generation';

@Component({
  selector: 'app-amcharts4-stacked-area',
  templateUrl: './amcharts4-stacked-area-page.component.html',
  styleUrls: ['./amcharts4-stacked-area-page.component.css']
})
export class Amcharts4StackedAreaPageComponent implements OnInit, AfterViewInit {

  constructor(private _loginTimesCandlestickDataGenerator: LoginTimesCandlestickDataGenerator) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
//     let chart = am4core.create('chartdiv-6', am4charts.XYChart);
//
//     chart.data = this._loginTimesCandlestickDataGenerator.generateStackedAreaChartData()
//
//     chart.dateFormatter.inputDateFormat = 'yyyy';
//     let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//     dateAxis.renderer.minGridDistance = 60;
//     dateAxis.startLocation = 0.5;
//     dateAxis.endLocation = 0.5;
//     dateAxis.baseInterval = {
//       timeUnit: 'year',
//       count: 1
//     };
//
//     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//     valueAxis.tooltip.disabled = true;
//
//     let series = chart.series.push(new am4charts.LineSeries());
//     series.dataFields.dateX = 'year';
//     series.name = 'cars';
//     series.dataFields.valueY = 'cars';
//     series.tooltipText = '[#000]{valueY.value}[/]';
//     series.tooltip.background.fill = am4core.color('#FFF');
//     series.tooltip.getStrokeFromObject = true;
//     series.tooltip.background.strokeWidth = 3;
//     series.tooltip.getFillFromObject = false;
//     series.fillOpacity = 0.6;
//     series.strokeWidth = 2;
//     series.stacked = true;
//
//     let series2 = chart.series.push(new am4charts.LineSeries());
//     series2.name = 'motorcycles';
//     series2.dataFields.dateX = 'year';
//     series2.dataFields.valueY = 'motorcycles';
//     series2.tooltipText = '[#000]{valueY.value}[/]';
//     series2.tooltip.background.fill = am4core.color('#FFF');
//     series2.tooltip.getFillFromObject = false;
//     series2.tooltip.getStrokeFromObject = true;
//     series2.tooltip.background.strokeWidth = 3;
//     series2.sequencedInterpolation = true;
//     series2.fillOpacity = 0.6;
//     series2.stacked = true;
//     series2.strokeWidth = 2;
//
//     let series3 = chart.series.push(new am4charts.LineSeries());
//     series3.name = 'bicycles';
//     series3.dataFields.dateX = 'year';
//     series3.dataFields.valueY = 'bicycles';
//     series3.tooltipText = '[#000]{valueY.value}[/]';
//     series3.tooltip.background.fill = am4core.color('#FFF');
//     series3.tooltip.getFillFromObject = false;
//     series3.tooltip.getStrokeFromObject = true;
//     series3.tooltip.background.strokeWidth = 3;
//     series3.sequencedInterpolation = true;
//     series3.fillOpacity = 0.6;
//     series3.defaultState.transitionDuration = 1000;
//     series3.stacked = true;
//     series3.strokeWidth = 2;
//
//     chart.cursor = new am4charts.XYCursor();
//     chart.cursor.xAxis = dateAxis;
//     chart.scrollbarX = new am4core.Scrollbar();
//
// // Add a legend
//     chart.legend = new am4charts.Legend();
//     chart.legend.position = 'top';
//
// // axis ranges
//     let range = dateAxis.axisRanges.create();
//     range.date = new Date(2001, 0, 1);
//     range.endDate = new Date(2003, 0, 1);
//     range.axisFill.fill = chart.colors.getIndex(7);
//     range.axisFill.fillOpacity = 0.2;
//
//     range.label.text = 'Fines for speeding increased';
//     range.label.inside = true;
//     range.label.rotation = 90;
//     range.label.horizontalCenter = 'right';
//     range.label.verticalCenter = 'bottom';
//
//     let range2 = dateAxis.axisRanges.create();
//     range2.date = new Date(2007, 0, 1);
//     range2.grid.stroke = chart.colors.getIndex(7);
//     range2.grid.strokeOpacity = 0.6;
//     range2.grid.strokeDasharray = '5,2';
//
//
//     range2.label.text = 'Motorcycle fee introduced';
//     range2.label.inside = true;
//     range2.label.rotation = 90;
//     range2.label.horizontalCenter = 'right';
//     range2.label.verticalCenter = 'bottom';
//
  }

}
