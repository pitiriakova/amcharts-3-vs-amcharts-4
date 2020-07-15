import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {AfterViewInit, ChangeDetectorRef, Component, NgZone} from '@angular/core';
import {ChartDataService} from '../../../../services/chart-data.service';
import {createApplicationsMeasurementsChart, createSeries} from './applications-candlestick-series';
import {ApplicationsCandlestickDataGenerator} from '../../../../services/applications-candlesticks-data-generation';
import * as colors from '../../../../shared/shared-chart-settings';
import {applicationsSeriesNames} from '../../../../shared/applications-series-names';

@Component({
  selector: 'app-candlesticks-base',
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

  public applicationsSeriesNames = applicationsSeriesNames;

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService) {
    this.applicationsData1090 = new ApplicationsCandlestickDataGenerator().getStaticData1090();
    this.applicationsData2575 = new ApplicationsCandlestickDataGenerator().getStaticData2575();
    am4core.options.commercialLicense = true;
  }

  generateNewData() {
    this.applicationsData1090 = new ApplicationsCandlestickDataGenerator().generateApplicationsData(10, 90);
    this.applicationsData2575 = new ApplicationsCandlestickDataGenerator().generateApplicationsData(25, 75);
  }

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.applicationSeries2575 = [];
      console.log('DATA:applicationsData2575: ', this.applicationsData2575);
      this.chart2575 = createApplicationsMeasurementsChart(am4core.create('chartdiv-simple-candlesticks-25-75', am4charts.XYChart), this.applicationsData2575);
      this.applicationsSeriesNames.map(s => s.forEach((appS, i) =>
        this.applicationSeries2575.push(
          {id: appS.id, series: createSeries(appS.id, colors[i], this.chart2575)}
        )));
    });
    this.zone.runOutsideAngular(() => {
      this.applicationSeries1090 = [];
      console.log('DATA:applicationsData1090: ', this.applicationsData1090);
      this.chart1090 = createApplicationsMeasurementsChart(am4core.create('chartdiv-simple-candlesticks-10-90', am4charts.XYChart), this.applicationsData1090);
      this.applicationsSeriesNames.map(s => s.forEach((appS, i) =>
        this.applicationSeries1090.push(
          {id: appS.id, series: createSeries(appS.id, colors[i], this.chart1090)}
        )));
    });
  }

  public toggleSeries(id: string) {
    const currentSeries1 = this.applicationSeries1090.find(s => s.id === id);
    currentSeries1.series.isHidden ? currentSeries1.series.show() : currentSeries1.series.hide();
    currentSeries1.series.hiddenInLegend = currentSeries1.series.isHidden;

    const currentSeries2 = this.applicationSeries2575.find(s => s.id === id);
    currentSeries2.series.isHidden ? currentSeries2.series.show() : currentSeries2.series.hide();
    currentSeries2.series.hiddenInLegend = currentSeries2.series.isHidden;
  }
}
