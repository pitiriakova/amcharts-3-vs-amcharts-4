import {AfterViewInit, Component, Input, NgZone, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {LoginTimesCandlestickDataGenerator} from '../../../services/login-times-candlesticks-data-generation';
import {LoginTimesChart} from '../services/login-times-candlestick-series';
import {colors} from '../../../shared/shared-chart-settings';

@Component({
  selector: 'app-candlestick-logins-separated-axis',
  templateUrl: './candlestick-logins-separated-axis.component.html',
  styleUrls: ['./candlestick-logins-separated-axis.component.css']
})
export class CandlestickLoginsSeparatedAxisComponent implements AfterViewInit {
  public loginTimesSeries: { id: string, series: am4charts.CandlestickSeries }[] = [];
  data: any[];

  public loginTimesSeriesNames = [
    'connection', 'total_login_time', 'user_profile', 'group_policies'
  ];

  constructor(private zone: NgZone,
              private _loginTimesCandlestickDataGenerator: LoginTimesCandlestickDataGenerator) {
    this.data = this._loginTimesCandlestickDataGenerator.generateCandlestickLoginChartData(25, 75);
    console.log('LOGINS DATA: ', this.data);
    am4core.options.commercialLicense = true;
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const chart = new LoginTimesChart(am4core.create('chartdiv-candlestick-logins', am4charts.XYChart), this.data);
      this.loginTimesSeriesNames.forEach((s, i) =>
        this.loginTimesSeries.push(
          {id: s, series: LoginTimesChart.createLoginTimesSeries(s, colors[i], chart)}
        ));
    });
  }

  public toggleSeries(id: string) {
    const currentSeries = this.loginTimesSeries.find(s => s.id === id);
    currentSeries.series.isHidden ? currentSeries.series.show() : currentSeries.series.hide();
    currentSeries.series.hiddenInLegend = currentSeries.series.isHidden;
  }
}
