/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {AfterViewInit, ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {ChartDataService} from '../../../services/chart-data.service';
import {LoginTimesCandlestickDataGenerator} from '../services/login-times-candlesticks-data-generation';
import {createApplicationsMeasurementsChart, createSeries} from '../services/applications-candlestick-series';
import {ApplicationsCandlestickDataGenerator} from '../services/applications-candlesticks-data-generation';
import * as colors from '../../../shared/shared-chart-settings';

@Component({
  selector: 'app-candlesticks-logins-base',
  templateUrl: './candlesticks-base.component.html',
  styleUrls: ['./candlesticks-base.component.css']
})
export class CandlesticksBaseComponent implements AfterViewInit {
  public data: any[];
  public chart1090: any;
  public chart2575: any;
  public applicationSeries1090: { id: string, series: am4charts.CandlestickSeries }[] = [];
  public applicationSeries2575: { id: string, series: am4charts.CandlestickSeries }[] = [];
  public applicationsData1090: any[] = [];
  public applicationsData2575: any[] = [];

  selectedPercentile = 'type1090';

  public applicationsSeriesNames = [
    // App1
    [{id: '076b0d0d-d201-4213-bc72-822c9b54d602__app_start_time', name: 'Start Time'},
      {id: '076b0d0d-d201-4213-bc72-822c9b54d602__measurement1', name: 'Measurement 1'},
      {id: '076b0d0d-d201-4213-bc72-822c9b54d602__measurement2', name: 'Measurement 2'},
      {id: '076b0d0d-d201-4213-bc72-822c9b54d602__measurement3', name: 'Measurement 3'},
      {id: '076b0d0d-d201-4213-bc72-822c9b54d602__measurement4', name: 'Measurement 4'}],

    // App2
    [{id: 'c0b2ce10-499a-4192-8a6c-89f0258e0f39__app_start_time', name: 'Start Time'},
      {id: 'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement1', name: 'Measurement 1'},
      {id: 'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement2', name: 'Measurement 2'},
      {id: 'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement3', name: 'Measurement 3'},
      {id: 'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement4', name: 'Measurement 4'}],

    // App3
    [{id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__app_start_time', name: 'Start Time'},
      {id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement1', name: 'Measurement 1'},
      {id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement2', name: 'Measurement 2'},
      {id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement3', name: 'Measurement 3'},
      {id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement4', name: 'Measurement 4'}],

    // App4
    [{id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__app_start_time', name: 'Start Time'},
      {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement1', name: 'Measurement 1'},
      {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement2', name: 'Measurement 2'},
      {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement3', name: 'Measurement 3'},
      {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement4', name: 'Measurement 4'}],
  ];

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService) {
    this.applicationsData1090 = new ApplicationsCandlestickDataGenerator().generateApplicationsData(10, 90);
    this.applicationsData2575 = new ApplicationsCandlestickDataGenerator().generateApplicationsData(25, 75);
    am4core.options.commercialLicense = true;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.applicationSeries2575 = [];
      console.log('this.applicationsData2575: ', this.applicationsData2575);
      this.chart2575 = createApplicationsMeasurementsChart(am4core.create('chartdiv-simple-candlesticks-25-75', am4charts.XYChart), this.applicationsData2575);
      this.applicationsSeriesNames.map(s => s.forEach((appS, i) =>
        this.applicationSeries2575.push(
          {id: appS.id, series: createSeries(appS.id, colors[i], this.chart2575)}
        )));
    });
    this.zone.runOutsideAngular(() => {
      this.applicationSeries1090 = [];
      console.log('this.applicationsData1090: ', this.applicationsData1090);
      this.chart1090 = createApplicationsMeasurementsChart(am4core.create('chartdiv-simple-candlesticks-10-90', am4charts.XYChart), this.applicationsData1090);
      this.applicationsSeriesNames.map(s => s.forEach((appS, i) =>
        this.applicationSeries1090.push(
          {id: appS.id, series: createSeries(appS.id, colors[i], this.chart1090)}
        )));
    });
  }

  public toggleSeries(id: string) {
    const currentSeries1 = this.applicationSeries1090.find(s => s.id === id);
    console.log('currentSeries1: ', currentSeries1);
    currentSeries1.series.isHidden ? currentSeries1.series.show() : currentSeries1.series.hide();
    currentSeries1.series.hiddenInLegend = currentSeries1.series.isHidden;

    const currentSeries2 = this.applicationSeries2575.find(s => s.id === id);
    console.log('currentSeries2: ', currentSeries2);
    currentSeries2.series.isHidden ? currentSeries2.series.show() : currentSeries2.series.hide();
    currentSeries2.series.hiddenInLegend = currentSeries2.series.isHidden;
  }
}
