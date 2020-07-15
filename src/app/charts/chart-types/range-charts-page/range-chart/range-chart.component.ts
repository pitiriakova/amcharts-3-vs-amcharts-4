import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SmallDatasetGenerator} from '../../../../services/small-dataset-generator';
import {colors, rgbColors, rgbColorsHighOpacity} from '../../../../shared/shared-chart-settings';
import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import {applicationsSeriesNames} from '../../../../shared/applications-series-names';
import {LargeDatasetGenerator} from '../../../../services/large-dataset-generator';
highchartsMore(Highcharts);

@Component({
  selector: 'app-range-chart',
  templateUrl: './range-chart.component.html',
  styleUrls: ['./range-chart.component.css']
})
export class RangeChartComponent implements AfterViewInit {
  data: any[] = [];
  chart: any;
  public applicationsSeriesNames = applicationsSeriesNames;

  constructor(private _smallDatasetGenerator: SmallDatasetGenerator,
              private _largeDatasetGenerator: LargeDatasetGenerator) {
  }

  public toggleSeries(id: string) {
    const currentSeries = this.chart.get(id);
    currentSeries.visible ? currentSeries.hide() : currentSeries.show();
    currentSeries.linkedSeries[0].visible ? currentSeries.linkedSeries[0].show() : currentSeries.linkedSeries[0].hide();
  }

  ngAfterViewInit(): void {
    const randomDataSet = this._largeDatasetGenerator.generateRandomDataset();
    const averages = this._largeDatasetGenerator.getAveragesFromRecentlyGeneratedDataset();
    // const averagesData = this._largeDatasetGenerator.getAveragesFromRecentlyGeneratedDataset();

    console.log('DATA:randomDataSet: ', randomDataSet);
    console.log('DATA:maxMinData: ', averages);
    // console.log('DATA:averagesData: ', averagesData);
    this.chart = Highcharts.chart('container-range-raw', {
      title: {
        text: 'Applications (row data and average)'
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
          // zIndex: 0,
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
        color: rgbColors[i],
        // zIndex: 1,
        lineWidth: 3,
        lineColor: rgbColorsHighOpacity[i],
        tooltip: {
          borderColor: colors[i]
        },
        marker: {
          enabled: false,
          fillColor: rgbColorsHighOpacity[i],
          states: {
            hover: {
              enabled: true,
              radius: 3,
              // fill: rgbColors[i],
              fillColor: rgbColorsHighOpacity[i],
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
        data: randomDataSet[merged[i].id],
        visible: false,
      });

      this.chart.addSeries({
        name: merged[i].name,
        type: 'line',
        lineColor: colors[i],
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
        data: averages[merged[i].id],
        visible: false,
      });
    }
  }
}
