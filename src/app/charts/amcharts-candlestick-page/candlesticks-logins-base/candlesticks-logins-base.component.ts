/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {ChartDataService} from '../../../services/chart-data.service';
import {LoginTimesCandlestickDataGenerator} from '../../../services/login-times-candlesticks-data-generation';
import {
  createConnectionSeries, createGroupPoliciesSeries,
  createLoginTimesChart,
  createTotalLoginTimesSeries,
  createUserProfileSeries
} from '../services/login-times-candlestick-series';
import {createApplicationsMeasurementsChart, createSeries} from '../services/applications-candlestick-series';
import {ApplicationsCandlestickDataGenerator} from '../../../services/applications-candlesticks-data-generation';

@Component({
  selector: 'app-candlesticks-logins-base',
  templateUrl: './candlesticks-logins-base.component.html',
  styleUrls: ['./candlesticks-logins-base.component.css']
})
export class CandlesticksLoginsBaseComponent implements OnInit, AfterViewInit {
  @Input() data: any[];
  public chart: any;
  public connectionSeries: am4charts.CandlestickSeries;
  public userProfileSeries: am4charts.CandlestickSeries;
  public groupPoliciesSeries: am4charts.CandlestickSeries;
  public totalLoginTimesSeries: am4charts.CandlestickSeries;


  public applicationsSeriesNames = [
    // App1
    '076b0d0d-d201-4213-bc72-822c9b54d602__app_start_time',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement1',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement2',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement3',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement4',

    // App2
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__app_start_time',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement1',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement2',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement3',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement4',

    // App3
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__app_start_time',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement1',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement2',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement3',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement4',

    // App4
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__app_start_time',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement1',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement2',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement3',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement4',
  ];

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService,
              private _applicationsCandlestickDataGenerator: ApplicationsCandlestickDataGenerator,
              private _loginTimesCandlestickDataGenerator: LoginTimesCandlestickDataGenerator) {
    this._loginTimesCandlestickDataGenerator.init()
    this.data = this._loginTimesCandlestickDataGenerator.generateCandlestickData();
    am4core.options.commercialLicense = true;
  }

  ngOnInit() {
    console.log('_loginTimesCandlestickDataGenerator: ', this.data);
  }


  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.chart = createLoginTimesChart(am4core.create('chartdiv-simple-candlesticks', am4charts.XYChart), this.data);
      this.connectionSeries = createConnectionSeries(this.chart);
      this.userProfileSeries = createUserProfileSeries(this.chart);
      this.groupPoliciesSeries = createGroupPoliciesSeries(this.chart);
      this.totalLoginTimesSeries = createTotalLoginTimesSeries(this.chart);
    });
  }


  public toggleSeries(name: string) {
    this[`${name}Series`].isHidden ? this[`${name}Series`].show() : this[`${name}Series`].hide();
  }

  public changeDataSource(dataSource: string) {
    if (dataSource === 'applications') {
      this.connectionSeries.hide();
      this.userProfileSeries.hide();
      this.groupPoliciesSeries.hide();
      this.totalLoginTimesSeries.hide();

      // applicationsSeriesNames
      this.data = this._applicationsCandlestickDataGenerator.generateApplicationsData();
      console.log('this.data: ', this.data);
      this.chart = createApplicationsMeasurementsChart(am4core.create('chartdiv-simple-candlesticks', am4charts.XYChart), this.data);
      this.applicationsSeriesNames.forEach(s => this[`${s}Series`] = createSeries(s, '#eee222', this.chart));

      console.log('@@@@@@@@@@@@@@@: ', this.applicationsSeriesNames.forEach(s => this[`${s}Series`] = createSeries(s, '#eee222', this.chart)))
    } else if (dataSource === 'logins') {
      this.chart = createLoginTimesChart(am4core.create('chartdiv-simple-candlesticks', am4charts.XYChart), this.data);
    } else if (dataSource === 'latency') {

    }
  }


}
