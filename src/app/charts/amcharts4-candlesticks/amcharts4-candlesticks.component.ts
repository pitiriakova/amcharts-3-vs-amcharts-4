/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {ChartDataService} from '../../services/chart-data.service';
import {CandlestickDataGenerator} from '../../services/candlesticks-data-generation';

@Component({
  selector: 'app-amcharts4-candlesticks',
  templateUrl: './amcharts4-candlesticks.component.html',
  styleUrls: ['./amcharts4-candlesticks.component.css']
})
export class Amcharts4CandlesticksComponent implements OnInit, AfterViewInit {
  private _colors: string[] = [
    '#128b8a',
    '#e6194b',
    '#0f68d1',
    '#63248a',
    '#3cb44b',
    '#f366ae',
    '#6aaef4',
    '#ffce34',
    '#ae69f3',
    '#d0661a',
    '#37f53d',
    '#f5aed3',
    '#afd2f4',
    '#8b430d',
    '#d2f53c',
    '#aaffc3',
    '#ff8f5e',
    '#808080',
    '#4d6a99',
    '#89c5c4',
    '#9dc0fa',
    '#616161'
  ];

  data: any[];

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService,
              private _candlestickDataGenerator: CandlestickDataGenerator) {
    am4core.options.commercialLicense = true;
  }

  ngOnInit() {
    this.data = this._candlestickDataGenerator.generateCandlestickData();
    console.log('_candlestickDataGenerator: ', this.data);
  }


  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv-5', am4charts.XYChart);
      chart.paddingRight = 20;
      chart.dateFormatter.inputDateFormat = 'HH:mm:ss';
      chart.data = this.data;
      chart.legend = new am4charts.Legend();

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.skipEmptyPeriods = false;
      dateAxis.renderer.ticks.template.disabled = false;
      dateAxis.renderer.line.strokeOpacity = 1;
      dateAxis.renderer.line.strokeWidth = 1;
      dateAxis.renderer.line.stroke = am4core.color('#626262');
      dateAxis.renderer.ticks.template.strokeWidth = 1;
      dateAxis.renderer.ticks.template.length = 1;
      dateAxis.baseInterval = {
        timeUnit: 'minute',
        count: 5
      };
      dateAxis.startLocation = 0;
      dateAxis.endLocation = 1;
      dateAxis.renderer.grid.template.location = 0;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.title.fontWeight = '700';
      valueAxis.renderer.line.strokeOpacity = 1;
      valueAxis.renderer.line.strokeWidth = 3;
      valueAxis.renderer.line.stroke = am4core.color('#626262');
      valueAxis.min = 0;

      chart.legend.position = 'top';
      chart.fontSize = 12;
      chart.fontFamily = 'Roboto, sans-serif';
      // chart.scrollbarX = new am4core.Scrollbar();

      const connectionSeries = chart.series.push(new am4charts.CandlestickSeries());
      connectionSeries.name = 'Connection';
      connectionSeries.dataFields.dateX = 'timestamp';
      connectionSeries.dataFields.valueY = 'connection_value';
      connectionSeries.dataFields.openValueY = 'connection_min';
      connectionSeries.dataFields.lowValueY = 'connection_min';
      connectionSeries.dataFields.highValueY = 'connection_max';

      connectionSeries.riseFromOpenState.properties.fill = am4core.color('#128b8a');
      connectionSeries.riseFromOpenState.properties.fillOpacity = 0.5;
      connectionSeries.dropFromOpenState.properties.fill = am4core.color('#128b8a');
      connectionSeries.riseFromOpenState.properties.stroke = am4core.color('#128b8a');
      connectionSeries.dropFromOpenState.properties.stroke = am4core.color('#128b8a');
      connectionSeries.simplifiedProcessing = true;
      connectionSeries.tooltipText = 'Open:${openValueY.connection_value}\nLow:${lowValueY.connection_min}\nHigh:${highValueY.connection_max}\nClose:${valueY.connection_value}';

      const userProfileSeries = chart.series.push(new am4charts.CandlestickSeries());
      userProfileSeries.name = 'User Profile';
      userProfileSeries.dataFields.dateX = 'timestamp';
      userProfileSeries.dataFields.valueY = 'user_profile_value';
      userProfileSeries.dataFields.openValueY = 'user_profile_min';
      userProfileSeries.dataFields.lowValueY = 'user_profile_min';
      userProfileSeries.dataFields.highValueY = 'user_profile_max';
      userProfileSeries.simplifiedProcessing = true;

      userProfileSeries.riseFromOpenState.properties.fill = am4core.color('#e6194b');
      userProfileSeries.riseFromOpenState.properties.fillOpacity = 0.5;
      userProfileSeries.dropFromOpenState.properties.fill = am4core.color('#e6194b');
      userProfileSeries.riseFromOpenState.properties.stroke = am4core.color('#e6194b');
      userProfileSeries.dropFromOpenState.properties.stroke = am4core.color('#e6194b');
      userProfileSeries.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';

      const groupPoliciesSeries = chart.series.push(new am4charts.CandlestickSeries());
      groupPoliciesSeries.name = 'GPO Processing';
      groupPoliciesSeries.dataFields.dateX = 'timestamp';
      groupPoliciesSeries.dataFields.valueY = 'group_policies_value';
      groupPoliciesSeries.dataFields.openValueY = 'group_policies_min';
      groupPoliciesSeries.dataFields.lowValueY = 'group_policies_min';
      groupPoliciesSeries.dataFields.highValueY = 'group_policies_max';
      groupPoliciesSeries.simplifiedProcessing = true;

      groupPoliciesSeries.riseFromOpenState.properties.fill = am4core.color('#0f68d1');
      groupPoliciesSeries.dropFromOpenState.properties.fill = am4core.color('#0f68d1');
      groupPoliciesSeries.riseFromOpenState.properties.stroke = am4core.color('#0f68d1');
      groupPoliciesSeries.dropFromOpenState.properties.stroke = am4core.color('#0f68d1');
      groupPoliciesSeries.riseFromOpenState.properties.fillOpacity = 0.5;
      groupPoliciesSeries.tooltipText = 'Open:${openValueY.group_policies_value}\nLow:${lowValueY.group_policies_min}\nHigh:${highValueY.group_policies_max}\nClose:${valueY.group_policies_value}';

      chart.cursor = new am4charts.XYCursor();
      // chart.cursor.behavior = 'none';

      // const totalLoginTimesSeries = chart.series.push(new am4charts.CandlestickSeries());
      // totalLoginTimesSeries.dataFields.dateX = 'timestamp';
      // totalLoginTimesSeries.dataFields.valueY = 'total_login_times_value';
      // totalLoginTimesSeries.dataFields.openValueY = 'total_login_times_min';
      // totalLoginTimesSeries.dataFields.lowValueY = 'total_login_times_min';
      // totalLoginTimesSeries.dataFields.highValueY = 'total_login_times_max';
      // totalLoginTimesSeries.riseFromOpenState.properties.fill = am4core.color('#8BC541');
      // totalLoginTimesSeries.dropFromOpenState.properties.fill = am4core.color('#8DC443');
      // totalLoginTimesSeries.riseFromOpenState.properties.stroke = am4core.color('#8BC541');
      // totalLoginTimesSeries.dropFromOpenState.properties.stroke = am4core.color('#8BC541');
      // totalLoginTimesSeries.simplifiedProcessing = true;
      // totalLoginTimesSeries.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';
    });
  }

}
