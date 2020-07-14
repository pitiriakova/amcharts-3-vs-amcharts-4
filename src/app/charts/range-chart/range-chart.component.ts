import {AfterViewInit, Component} from '@angular/core';
import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import {RangeChartDataGenerator} from './range-chart-data-generator';
import {colors, rgbColors} from '../../shared/shared-chart-settings'; highchartsMore(Highcharts);

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
    const currentSeries = this.chart.get(id);
    currentSeries.visible ? currentSeries.hide() : currentSeries.show();
    currentSeries.linkedSeries[0].visible ? currentSeries.linkedSeries[0].show() : currentSeries.linkedSeries[0].hide();
  }

  ngAfterViewInit(): void {
    const maxMinData = this._rangeChartDataGenerator.generateMinMaxSeries();
    const averagesData = this._rangeChartDataGenerator.generateAverageSeries();
    console.log('MAXMINDATA: ', this._rangeChartDataGenerator.generateMinMaxSeries());
    console.log('AVERAGESDATA: ', this._rangeChartDataGenerator.generateAverageSeries());
    this.chart = Highcharts.chart('container', {
      // colors: [null],

      title: {
        text: 'Applications'
      },
      // plotOptions: {
      //   line: {
      //     events: {
      //         // mouseOut: function () {
      //         //   const series = this.chart.series.find(s => s.name === this.userOptions.name + '__range');
      //         //   console.log('series: ', series);
      //         //   series.hide();
      //         // }
      //     }
      //   }
      // },

      plotOptions: {
        series: {
          opacity: 1,
          states: {
            hover: {
              enabled: false,
              opacity: 1,
              halo: {
                opacity: 1
              }
            },
            inactive: {
              opacity: 0.2
            },
          }
        },
        arearange: {
          // fillColor: 'rgba(222, 233, 244, 0.8)',
          // fillOpacity: 0.8,
          fillOpacity: 1,
          zIndex: 0,
        }
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
        },
        min: 0
      },
      tooltip: {
        shared: false,
      },
      legend: {
        enabled: false
      }
    });

    const merged = [].concat.apply([], this.applicationsSeriesNames);
    for (let i = 0; i <= merged.length - 1; i++) {
      this.chart.addSeries({
        name: merged[i].name,
        id: merged[i].id,
        type: 'line',
        color: colors[i],
        zIndex: 1,
        lineColor: colors[i],
        tooltip: {
          borderColor: colors[i]
        },
        marker: {
          enabled: false,
          fillColor: colors[i],
          states: {
            hover: {
              enabled: true,
              radius: 3,
              fill: colors[i],
              fillColor: colors[i],
              lineWidth: 2,
              lineColor: colors[i]
            }
          }
        },
        states: {
          hover: {
            enabled: true,
            lineWidth: 5
          }
        },
        // events: {
        //   mouseOver: function () {
        //     console.log('this: ', this)
        //     const seriesToHide =  this.chart.series.filter(s => s.name.includes('__range'));
        //     seriesToHide.map(s => s.hide());
        //     const seriesToShow = this.chart.series.find(s => s.name === this.userOptions.name + '__range');
        //     seriesToShow.show();
        //   },
        // },
        data: averagesData[merged[i].id],
        visible: false,
        // animation: {
        //   duration: 0
        // },
        // turboThreshold: 0, // to be able set more than 1000 points per series
      });

      this.chart.addSeries({
        name: merged[i].name,
        type: 'arearange',
        lineColor: colors[i],
        fillColor: rgbColors[i],
        id: merged[i].id + '__range',
        linkedTo: merged[i].id,
        // fillOpacity: 0.8,
        zIndex: 0,
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidth: 2,
            fillOpacity: 1,
            // fillColor: 'rgba(222, 233, 244, 0.8)',
            enabled: false,
          }
        },
        data: maxMinData[merged[i].id],
        visible: false,
        // animation: {
        //   duration: 0
        // },
        // turboThreshold: 0, // to be able set more than 1000 points per series
      });
    }
  }
}
