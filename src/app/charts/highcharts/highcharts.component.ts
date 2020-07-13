import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import * as Highcharts from 'highcharts';
import {ChartDataService} from '../../services/chart-data.service';
import {ChartSettings} from '../../services/default-chart-settings';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements AfterViewInit, OnDestroy {
  public chart: any;
  public chartData: any;
  public startRenderTime: Date;
  public renderTimeResult = '';
  public result = 0;

  constructor(private chartDataService: ChartDataService) {
    this.chartData = this.chartDataService.generateNewHighchartsData(ChartSettings.DEFAULT_DATA_POINTS_COUNT, ChartSettings.DEFAULT_SERIES_COUNT);
    console.log('this.chartData: ', this.chartData);
  }

  private countRenderTime() {
    const endRenderTime = new Date();
    this.result = endRenderTime.getTime() - this.startRenderTime.getTime();
    this.renderTimeResult = `${new Date(this.result).getSeconds()} seconds, ${new Date(this.result).getMilliseconds()} milliseconds`;
  }

  public ngAfterViewInit(): void {
    this.renderChart(ChartSettings.DEFAULT_SERIES_COUNT);
  }

  public ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  public updateData(data): void {
    this.chartData = this.chartDataService.generateNewHighchartsData(data.dataPointsCount, data.seriesCount);
    this.renderChart(data.seriesCount);
  }

  private renderChart(seriesCount: number): void {
    const cmp = this;
    this.startRenderTime = new Date();
    this.chart = Highcharts.chart('container', {

      chart: {
        type: 'line',
        scrollablePlotArea: {
          minWidth: 1500
      },
        animation: {
          duration: 0
        },
        events: {
          load: function(event) {
            cmp.countRenderTime();
          }
        },
      },
      title: {
        text: ''
      },
      xAxis: {
        gridLineWidth: 1,
        type: 'datetime',
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%a %d %b', this.value);
          }
        }
      },
      yAxis: [{
        showFirstLabel: true
      }],
      // tooltip: {
      //   shared: true,
      //   crosshairs: true
      // },
      plotOptions: {
        series: {
          cursor: 'pointer',
        },
        line: {
          marker: {
            enabled: true,
            radius: 6,
            symbol: 'round'
          },
          enableMouseTracking: true
        }
      },
    });

    console.log('this.chartData: ', this.chartData);
    for (let i = 1; i <= seriesCount; i++) {
      this.chart.addSeries({
        name: `series${i}`,
        data: this.chartData[`series${i}`],
        animation: {
          duration: 0
        },
        turboThreshold: 0, // to be able set more than 1000 points per series
        pointInterval: 24 * 3600 * 1000 * 7// one week
      });
    }
  }
}

