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
import * as colors from '../../../shared/shared-chart-settings';

@Component({
  selector: 'app-candlesticks-logins-base',
  templateUrl: './candlesticks-logins-base.component.html',
  styleUrls: ['./candlesticks-base.component.css']
})
export class CandlesticksBaseComponent implements OnInit, AfterViewInit {
  @Input() data: any[];
  public chart: any;
  public connectionSeries: am4charts.CandlestickSeries;
  public userProfileSeries: am4charts.CandlestickSeries;
  public groupPoliciesSeries: am4charts.CandlestickSeries;
  public totalLoginTimesSeries: am4charts.CandlestickSeries;
  public applicationSeries: {id: string, series: am4charts.CandlestickSeries}[] = [];
  public loginTimesSeries: {id: string, series: am4charts.CandlestickSeries}[] = [];
  public dataSource = 'logins';

  public loginTimesSeriesNames = [
    'connection', 'total_login_time', 'user_profile', 'group_policies'
  ];

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
    {id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement2',  name: 'Measurement 2'},
    {id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement3', name: 'Measurement 3'},
    {id: '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement4', name: 'Measurement 4'}],

    // App4
    [{id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__app_start_time', name: 'Start Time'},
    {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement1', name: 'Measurement 1'},
    {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement2', name: 'Measurement 2'},
    {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement3', name: 'Measurement 3'},
    {id: '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement4', name: 'Measurement 4'}],
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
      this.loginTimesSeriesNames.forEach(sName => this.loginTimesSeries.push())

      this.connectionSeries = createConnectionSeries(this.chart);
      this.userProfileSeries = createUserProfileSeries(this.chart);
      this.groupPoliciesSeries = createGroupPoliciesSeries(this.chart);
      this.totalLoginTimesSeries = createTotalLoginTimesSeries(this.chart);

      // this.applicationsSeriesNames.forEach(s => s.forEach((appS, i) =>
      //   this.applicationSeries.push(
      //     {id: appS.id, series: createSeries(appS.id, colors[i], this.chart)}
      //   )));
    });
  }


  public toggleSeries(name: string) {
    this[`${name}Series`].isHidden ? this[`${name}Series`].show() : this[`${name}Series`].hide();
  }

  public toggleApplicationSeries(id: string) {
    const currentSeries = this.applicationSeries.find(s => s.id === id);
    currentSeries.series.isHidden ? currentSeries.series.show() : currentSeries.series.hide();
    currentSeries.series.hiddenInLegend = currentSeries.series.isHidden;
  }

  public changeDataSource(dataSource: string) {
    console.log('dataSource: ', dataSource);
    this.dataSource = dataSource;
    if (dataSource === 'applications') {
      this.connectionSeries.hide();
      this.userProfileSeries.hide();
      this.groupPoliciesSeries.hide();
      this.totalLoginTimesSeries.hide();

      // applicationsSeriesNames
      this.data = this._applicationsCandlestickDataGenerator.generateApplicationsData();
      console.log('this.data: ', this.data);
      this.zone.runOutsideAngular(() => {
        this.chart = createApplicationsMeasurementsChart(am4core.create('chartdiv-simple-candlesticks', am4charts.XYChart), this.data, this.applicationSeries);
        this.applicationsSeriesNames.forEach(s => s.forEach((appS, i) =>
          this.applicationSeries.push(
            {id: appS.id, series: createSeries(appS.id, colors[i], this.chart)}
          )));
      })

      console.log('this.applicationSeries: ', this.applicationSeries);
    } else if (dataSource === 'logins') {
      this.chart = createLoginTimesChart(am4core.create('chartdiv-simple-candlesticks', am4charts.XYChart), this.data);
    } else if (dataSource === 'latency') {

    }
  }


}
