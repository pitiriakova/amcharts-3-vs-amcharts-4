import {AfterViewInit, Component} from '@angular/core';
import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import {RangeChartDataGenerator} from './range-chart-data-generator'; highchartsMore(Highcharts);

@Component({
  selector: 'app-band-chart',
  templateUrl: './range-chart.component.html',
  styleUrls: ['./range-chart.component.css']
})
export class RangeChartComponent implements AfterViewInit {
  data: any[] = [];
  chart: any;
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

  constructor(private _rangeChartDataGenerator: RangeChartDataGenerator) {
  }

  public toggleSeries(id: string) {
    const currentSeries = this.chart.series.filter(s => s.name === id);
    currentSeries.map(s => s.visible ? s.hide() : s.show());
    console.log('currentSeries: ', currentSeries);
  }

  ngAfterViewInit(): void {
    const maxMinData = this._rangeChartDataGenerator.generateMinMaxSeries();
    const averagesData = this._rangeChartDataGenerator.generateAverageSeries();
    console.log('MAXMINDATA: ', this._rangeChartDataGenerator.generateMinMaxSeries());
    console.log('AVERAGESDATA: ', this._rangeChartDataGenerator.generateAverageSeries());
    this.chart = Highcharts.chart('container', {

      title: {
        text: 'Applications'
      },

      xAxis: {
        type: 'datetime',
        accessibility: {
          rangeDescription: ''
        }
      },

      yAxis: {
        title: {
          text: null
        }
      },

      tooltip: {
        shared: true,
      },
      legend: {
        enabled: false
      }
    });

    const merged = [].concat.apply([], this.applicationsSeriesNames);
    console.log('merged: ', merged);
    for (let i = 0; i <= merged.length - 1; i++) {
      console.log('maxMinData[merged[i].id]: ', maxMinData[merged[i].id])
      this.chart.addSeries({
        name: merged[i].id,
        type: 'arearange',
        lineWidth: 0,
        linkedTo: merged[i].id,
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {
          enabled: false
        },
        data: maxMinData[merged[i].id],
        visible: false,
        animation: {
          duration: 0
        },
        turboThreshold: 0, // to be able set more than 1000 points per series
      });

      this.chart.addSeries({
        name: merged[i].id,
        type: 'line',
        zIndex: 1,
        marker: {
          fillColor: 'white',
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[0]
        },
        data: averagesData[merged[i].id],
        visible: false,
        animation: {
          duration: 0
        },
        turboThreshold: 0, // to be able set more than 1000 points per series
      });
    }
  }
}
