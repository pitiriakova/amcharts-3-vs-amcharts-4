import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import {ChartDataService} from '../../services/chart-data.service';

@Component({
  selector: 'app-amcharts3',
  templateUrl: './amcharts3.component.html',
  styleUrls: ['./amcharts3.component.css']
})
export class Amcharts3Component implements AfterViewInit {
  public chartData: any;
  public dataPointsCount = 100;
  private chart: AmChart;
  public renderTimeResult = '';
  public result: number;
  public startRenderTime = new Date();

  constructor(private AmCharts: AmChartsService, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService) {
    this.getNewData();
  }

  ngAfterViewInit(): void {
    console.log('this.chartData: ', this.chartData);
    if (this.chartData) {
      this.renderChart();
    }
  }

  public getNewData() {
    this.chartData = this.chartDataService.generateNewData(this.dataPointsCount);
  }

  private countRenderTime() {
    const endRenderTime = new Date();
    this.result = endRenderTime.getTime() - this.startRenderTime.getTime();
    this.renderTimeResult = `${new Date(this.result).getSeconds()} seconds, ${new Date(this.result).getMilliseconds()} milliseconds`;
    this.cdRef.detectChanges();
  }

  private renderChart() {
    this.startRenderTime = new Date();
      this.chart = this.AmCharts.makeChart('chartdiv-3', {
        'type': 'serial',
        'theme': 'none',
        'marginRight': 80,
        'autoMarginOffset': 20,
        'marginTop': 7,
        'dataProvider': this.chartData,
        'valueAxes': [{
          'axisAlpha': 0.2,
          'dashLength': 1,
          'position': 'left'
        }],
        'mouseWheelZoomEnabled': true,
        'graphs': [{
          'id': 'g1',
          'bullet': 'round',
          'bulletColor': '#3979A8',
          'title': 'red line',
          'valueField': 'series1',
          'bulletSize': 10,
          'lineAlpha': 0,
        },
          {
            'id': 'g2',
            'bullet': 'round',
            'bulletColor': '#256B4E',
            'title': 'red line',
            'valueField': 'series2',
            'bulletSize': 10,
            'lineAlpha': 0,
          },
          {
            'id': 'g3',
            'bullet': 'round',
            'bulletColor': '#7939A8',
            'title': 'red line',
            'valueField': 'series3',
            'bulletSize': 10,
            'lineAlpha': 0,
          }],
        'categoryField': 'date',
        'categoryAxis': {
          'parseDates': true,
          'autoGridCount': true,
        },
        'export': {
          'enabled': true
        }
      });
    this.chart.addListener('ready', this.countRenderTime());
  }
}
