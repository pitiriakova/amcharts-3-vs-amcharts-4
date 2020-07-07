import {AfterViewInit, Component, Input, NgZone, OnInit} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {LoginTimesCandlestickDataGenerator} from '../../../services/login-times-candlesticks-data-generation';

@Component({
  selector: 'app-candlestick-logins-separated-axis',
  templateUrl: './candlestick-logins-separated-axis.component.html',
  styleUrls: ['./candlestick-logins-separated-axis.component.css']
})
export class CandlestickLoginsSeparatedAxisComponent implements OnInit, AfterViewInit {
  @Input() data: any[] = [];

  public connectionSeries: am4charts.CandlestickSeries;
  public userProfileSeries: am4charts.CandlestickSeries;
  public groupPoliciesSeries: am4charts.CandlestickSeries;
  public totalLoginTimesSeries: am4charts.CandlestickSeries;

  constructor(private zone: NgZone,
              private _loginTimesCandlestickDataGenerator: LoginTimesCandlestickDataGenerator) {
    am4core.options.commercialLicense = true;
    this._loginTimesCandlestickDataGenerator.init()
    this.data = this._loginTimesCandlestickDataGenerator.generateCandlestickData();
  }

  ngOnInit() {
    console.log('_loginTimesCandlestickDataGenerator: ', this.data);
  }


  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv-candlestick-scrollbar', am4charts.XYChart);
      chart.paddingRight = 20;
      chart.dateFormatter.inputDateFormat = 'HH:mm:ss';
      chart.data = this.data;
      chart.legend = new am4charts.Legend();

      const loginTimesValueAxis = this.getLoginTimesValueAxis(chart);
      this.getDateAxis(chart);
      const valueAxis = this.getValueAxis(chart);

      chart.leftAxesContainer.layout = 'vertical';
      // chart.leftAxesContainer.height = 400;
      // chart.bottomAxesContainer.height = 200;
      // chart.topAxesContainer.height = 200;
      chart.legend.position = 'top';
      chart.fontSize = 12;
      chart.fontFamily = 'Roboto, sans-serif';
      // chart.scrollbarX = new am4core.Scrollbar();

      this.connectionSeries = chart.series.push(new am4charts.CandlestickSeries());
      this.connectionSeries.name = 'Connection';
      this.connectionSeries.dataFields.dateX = 'timestamp';
      this.connectionSeries.dataFields.valueY = 'connection_value';
      this.connectionSeries.dataFields.openValueY = 'connection_min';
      this.connectionSeries.dataFields.lowValueY = 'connection_min';
      this.connectionSeries.dataFields.highValueY = 'connection_max';

      this.connectionSeries.riseFromOpenState.properties.fill = am4core.color('#128b8a');
      this.connectionSeries.riseFromOpenState.properties.fillOpacity = 0.5;
      this.connectionSeries.dropFromOpenState.properties.fill = am4core.color('#128b8a');
      this.connectionSeries.riseFromOpenState.properties.stroke = am4core.color('#128b8a');
      this.connectionSeries.dropFromOpenState.properties.stroke = am4core.color('#128b8a');
      this.connectionSeries.simplifiedProcessing = true;
      this.connectionSeries.yAxis = valueAxis;
      this.connectionSeries.hide();
      // connectionSeries.tooltipText = 'Open:${openValueY.connection_value}\nLow:${lowValueY.connection_min}\nHigh:${highValueY.connection_max}\nClose:${valueY.connection_value}';

      this.userProfileSeries = chart.series.push(new am4charts.CandlestickSeries());
      this.userProfileSeries.name = 'User Profile';
      this.userProfileSeries.yAxis = valueAxis;
      this.userProfileSeries.dataFields.dateX = 'timestamp';
      this.userProfileSeries.dataFields.valueY = 'user_profile_value';
      this.userProfileSeries.dataFields.openValueY = 'user_profile_min';
      this.userProfileSeries.dataFields.lowValueY = 'user_profile_min';
      this.userProfileSeries.dataFields.highValueY = 'user_profile_max';
      this.userProfileSeries.simplifiedProcessing = true;

      this.userProfileSeries.riseFromOpenState.properties.fill = am4core.color('#e6194b');
      this.userProfileSeries.riseFromOpenState.properties.fillOpacity = 0.5;
      this.userProfileSeries.dropFromOpenState.properties.fill = am4core.color('#e6194b');
      this.userProfileSeries.riseFromOpenState.properties.stroke = am4core.color('#e6194b');
      this.userProfileSeries.dropFromOpenState.properties.stroke = am4core.color('#e6194b');
      this.userProfileSeries.hide();
      // userProfileSeries.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';

      this.groupPoliciesSeries = chart.series.push(new am4charts.CandlestickSeries());
      this.groupPoliciesSeries.name = 'GPO Processing';
      this.groupPoliciesSeries.yAxis = valueAxis;
      this.groupPoliciesSeries.dataFields.dateX = 'timestamp';
      this.groupPoliciesSeries.dataFields.valueY = 'group_policies_value';
      this.groupPoliciesSeries.dataFields.openValueY = 'group_policies_min';
      this.groupPoliciesSeries.dataFields.lowValueY = 'group_policies_min';
      this.groupPoliciesSeries.dataFields.highValueY = 'group_policies_max';
      this.groupPoliciesSeries.simplifiedProcessing = true;

      this.groupPoliciesSeries.riseFromOpenState.properties.fill = am4core.color('#0f68d1');
      this.groupPoliciesSeries.dropFromOpenState.properties.fill = am4core.color('#0f68d1');
      this.groupPoliciesSeries.riseFromOpenState.properties.stroke = am4core.color('#0f68d1');
      this.groupPoliciesSeries.dropFromOpenState.properties.stroke = am4core.color('#0f68d1');
      this.groupPoliciesSeries.riseFromOpenState.properties.fillOpacity = 0.5;
      this.groupPoliciesSeries.hide();
      // groupPoliciesSeries.tooltipText = 'Open:${openValueY.group_policies_value}\nLow:${lowValueY.group_policies_min}\nHigh:${highValueY.group_policies_max}\nClose:${valueY.group_policies_value}';

      chart.cursor = new am4charts.XYCursor();

      this.totalLoginTimesSeries = chart.series.push(new am4charts.CandlestickSeries());
      this.totalLoginTimesSeries.dataFields.dateX = 'timestamp';

      this.totalLoginTimesSeries.yAxis = loginTimesValueAxis;
      this.totalLoginTimesSeries.name = 'Total login time';
      this.totalLoginTimesSeries.dataFields.valueY = 'total_login_time_value';
      this.totalLoginTimesSeries.dataFields.openValueY = 'total_login_time_min';
      this.totalLoginTimesSeries.dataFields.lowValueY = 'total_login_time_min';
      this.totalLoginTimesSeries.dataFields.highValueY = 'total_login_time_max';
      this.totalLoginTimesSeries.riseFromOpenState.properties.fill = am4core.color('#8BC541');
      this.totalLoginTimesSeries.dropFromOpenState.properties.fill = am4core.color('#8DC443');
      this.totalLoginTimesSeries.riseFromOpenState.properties.stroke = am4core.color('#8BC541');
      this.totalLoginTimesSeries.dropFromOpenState.properties.stroke = am4core.color('#8BC541');
      this.totalLoginTimesSeries.simplifiedProcessing = true;
      this.totalLoginTimesSeries.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';
      this.totalLoginTimesSeries.hide();


      // var scrollbarX = new am4charts.XYChartScrollbar();
      // scrollbarX.series.push(totalLoginTimesSeries);
      // chart.scrollbarX = scrollbarX;
    });
  }

  private getDateAxis(chart: any) {
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
    dateAxis.tooltip.disabled = true;
  }

  private getLoginTimesValueAxis(chart) {
    const loginTimesValueAxis = chart.yAxes.push(new am4charts.ValueAxis())

    loginTimesValueAxis.marginTop = 30;
    loginTimesValueAxis.min  = 30;
    loginTimesValueAxis.tooltip.disabled = true;
    loginTimesValueAxis.title.fontWeight = '700';
    loginTimesValueAxis.renderer.line.strokeOpacity = 1;
    loginTimesValueAxis.renderer.line.strokeWidth = 3;
    loginTimesValueAxis.renderer.line.stroke = am4core.color('#626262');

    return loginTimesValueAxis;
  }

  private getValueAxis(chart: any)  {
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.fontWeight = '700';
    valueAxis.renderer.line.strokeWidth = 3;
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.stroke = am4core.color('#626262');
    valueAxis.marginTop = 20;
    valueAxis.align = 'right';
    valueAxis.min = 0;

    return valueAxis;

  }

  public toggleSeries(name: string) {
    this[`${name}Series`].isHidden ? this[`${name}Series`].show() : this[`${name}Series`].hide();
  }
}
