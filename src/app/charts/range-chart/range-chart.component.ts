import {AfterViewInit, Component} from '@angular/core';
import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcharts);
import {RangeChartDataGenerator} from './range-chart-data-generator';
import {colors, rgbColors} from '../../shared/shared-chart-settings';
import {applicationsSeriesNames} from '../../shared/applications-series-names';

@Component({
  selector: 'app-band-chart',
  templateUrl: './range-chart.component.html',
  styleUrls: ['./range-chart.component.css']
})
export class RangeChartComponent implements AfterViewInit {
  data: any[] = [];
  chart: any;
  public applicationsSeriesNames = applicationsSeriesNames;

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
    console.log('DATA:maxMinData: ', this._rangeChartDataGenerator.generateMinMaxSeries());
    console.log('DATA:averagesData: ', this._rangeChartDataGenerator.generateAverageSeries());
    this.chart = Highcharts.chart('container', {
      title: {
        text: 'Applications'
      },
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
        lineWidth: 3,
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
        data: averagesData[merged[i].id],
        visible: false,
      });

      this.chart.addSeries({
        name: merged[i].name,
        type: 'arearange',
        lineColor: colors[i],
        fillColor: 'rgba(157,192,250, 0.05)',
        id: merged[i].id + '__range',
        linkedTo: merged[i].id,
        zIndex: 0,
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidth: 2,
            fillOpacity: 1,
            enabled: false,
          }
        },
        data: maxMinData[merged[i].id],
        visible: false,
      });
    }
  }
}
