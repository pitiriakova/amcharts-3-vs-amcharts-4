import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {ChartDataService} from '../../services/chart-data.service';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements AfterViewInit {
  public chart: any;
  public chartData: any;
  public startRenderTime: Date;
  public dataPointsCount = 100;
  public renderTimeResult = '';
  public result = 0;

  constructor(private chartDataService: ChartDataService) {
    this.chartData = this.chartDataService.generateNewHighchartsData();
  }

  private countRenderTime() {
    const endRenderTime = new Date();
    this.result = endRenderTime.getTime() - this.startRenderTime.getTime();
    this.renderTimeResult = `${new Date(this.result).getSeconds()} seconds, ${new Date(this.result).getMilliseconds()} milliseconds`;
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  getNewData() {
    this.chartData = this.chartDataService.generateNewHighchartsData(this.dataPointsCount);
    this.renderChart();
  }

  renderChart() {
    const cmp = this;
    this.startRenderTime = new Date();
    this.chart = Highcharts.chart('container', {

      chart: {
        scrollablePlotArea: {
          minWidth: 700
        },
        events: {
          load: function(event) {
            console.log('AAAAAAAAAAAAAAAAAA');
            cmp.countRenderTime();
          },
          redraw: function(event) {
            console.log('AAAAAAAAAAAAAAAAAA');
          }
        },
      },
      data: this.chartData,

      xAxis: {
        categories: this.chartData.date,
        gridLineWidth: 1,
        labels: {
          align: 'left',
          x: 3,
          y: -3
        }
      },
      yAxis: [{ // left y axis
        labels: {
          align: 'left',
          x: 3,
          y: 16
        },
        showFirstLabel: true
      }],

      legend: {
        align: 'left',
        verticalAlign: 'top',
        borderWidth: 0
      },

      tooltip: {
        shared: true,
        crosshairs: true
      },

      plotOptions: {
        series: {
          cursor: 'pointer',
        },
        line: {
          marker: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: [{
        type: 'line',
        // data: this.chartData.series1,
        name: 'series1',
        lineWidth: 0,
        animation: {
          duration: 0
        },
      }, {
        type: 'line',
        // data: this.chartData.series2,
        name: 'series1',
        lineWidth: 0,
        animation: {
          duration: 0
        },
      }]
    });

    console.log('DDDDDDDD11111111111111: ', this.chartData.series1);
    console.log('DDDDDDDD11111111111111222222222222222: ', this.chartData.series2);
    this.chart.series[0].setData(this.chartData.series1);
    this.chart.series[1].setData(this.chartData.series2);
  }
}

