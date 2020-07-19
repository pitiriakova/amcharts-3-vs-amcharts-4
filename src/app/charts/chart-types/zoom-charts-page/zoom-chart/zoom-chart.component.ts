import {AfterViewInit, Component, OnInit} from '@angular/core';
import {applicationsSeriesNames} from '../../../../shared/applications-series-names';

import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import {SmallDatasetGenerator} from '../../../../services/small-dataset-generator';
import {colors, rgbColorsHighOpacity} from '../../../../shared/shared-chart-settings';
import {LargeDatasetGenerator} from '../../../../services/large-dataset-generator';
highchartsMore(Highcharts);

@Component({
  selector: 'app-zoom-chart',
  templateUrl: './zoom-chart.component.html',
  styleUrls: ['./zoom-chart.component.css']
})
export class ZoomChartComponent implements OnInit, AfterViewInit {
  public applicationsSeriesNames = applicationsSeriesNames;
  data: any;
  averageLineData: any;
  chart: any;
  chartSmall: any;
  allCheckboxes: any;

  constructor(private _smallDatasetGenerator: SmallDatasetGenerator,
              private _largeDatasetGenerator: LargeDatasetGenerator) {
  }

  ngOnInit() {
    this.data = this._largeDatasetGenerator.getStaticDataSet();
    console.log('DATA:this.data: ', this.data);
    this.averageLineData = this._largeDatasetGenerator.getAveragesBasedOnStaticDataset();
    console.log('this.averageLineData', this.averageLineData);
  }


  public toggleSeries(id: string) {
    const currentSeries = this.chart.get(id);
    const currentSeriesSmall = this.chartSmall.get(id + '__average');
    currentSeries.visible ? currentSeries.hide() : currentSeries.show();
    currentSeriesSmall.visible ? currentSeriesSmall.hide() : currentSeriesSmall.show();
    const currentAverageSeries = this.chart.get(id + '__average');
    currentAverageSeries.visible ? currentAverageSeries.hide() : currentAverageSeries.show();
  }

  afterSetExtremes(e) {
    const { chart } = e.target;
    // chart.showLoading('Loading data from server...');
    console.log('e.min: ', new Date(e.min));
    console.log('e.max: ', new Date(e.max));
    // this._largeDatasetGenerator.getDetailedData(e.min, e.max);

    // fetch(`${dataURL}?start=${Math.round(e.min)}&end=${Math.round(e.max)}`)
    //   .then(res => res.ok && res.json())
    //   .then(data => {
    //     chart.series[0].setData(data);
    //     chart.hideLoading();
    //   }).catch(error => console.error(error.message));
  }

  ngAfterViewInit(): void {
    this.allCheckboxes = document.getElementsByTagName('input');
    this.generateChart();
  }

  generateChart() {
    this.chartSmall = Highcharts.chart('container-zoom-small', {
      chart: {
        zoomType: 'x',
        backgroundColor: 'rgba(97,97,97, 0.1)',
        ignoreHiddenSeries: true,
      },
      xAxis: {
        gridLineWidth: 0,
        type: 'datetime',
        events: {
          afterSetExtremes: this.afterSetExtremes
        },
      },
      title: {
        text: ''
      },
      yAxis: {
        gridLineWidth: 0,
        title: {
          text: null
        },
        min: 0,
      },
      legend: {
        enabled: false
      }
    });

    this.chart = Highcharts.chart('container-zoom', {
      chart: {
        zoomType: 'x',
        ignoreHiddenSeries: true
      },
      title: {
        text: 'Applications (select area to zoom)'
      },
      xAxis: {
        type: 'datetime',
        events: {
          afterSetExtremes: this.afterSetExtremes
        },
      },

      boost: {
        useGPUTranslations: true,
        usePreallocated: true
      },

      yAxis: {
        title: {
          text: null
        },
        min: 0
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          marker: {
            radius: 2
          },
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
              opacity: 1
            },
          }
        }
      },
    });
    const merged = [].concat.apply([], this.applicationsSeriesNames);
    for (let i = 0; i <= merged.length - 1; i++) {
      console.log('this.averageLineData', this.averageLineData);

      this.chartSmall.addSeries({
        name: merged[i].name,
        type: 'line',
        color: colors[i],
        id: merged[i].id + '__average',
        zIndex: 0,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 2,
            fillOpacity: 1,
            enabled: false,
          }
        },
        data: this.averageLineData[merged[i].id],
        visible: false,
      });


      this.chart.addSeries({
        name: merged[i].name,
        type: 'scatter',
        color: rgbColorsHighOpacity[i],
        id: merged[i].id,
        zIndex: 0,
        marker: {
          radius: 5,
          symbol: 'round',
          lineColor: rgbColorsHighOpacity[i],
          states: {
            hover: {
              enabled: true,
              // lineColor: rgbColors[i]
            }
          }
        },
        states: {
          hover: {
            lineWidth: 2,
            fillOpacity: 1,
            enabled: false,
          }
        },
        data: this.data[merged[i].id],
        visible: false,
      });

      this.chart.addSeries({
        name: merged[i].name,
        type: 'line',
        color: colors[i],
        id: merged[i].id + '__average',
        zIndex: 0,
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 2,
            fillOpacity: 1,
            enabled: false,
          }
        },
        data: this.averageLineData[merged[i].id],
        visible: false,
      });
    }
  }

  // public generateNewData() {
  //   for (let i = 0; i < this.allCheckboxes.length; i++) {
  //     this.allCheckboxes[i].checked = false;
  //   }
  //   this.data = this._largeDatasetGenerator.generateRandomDataset();
  //   this.averageLineData = this._largeDatasetGenerator.getAveragesFromRecentlyGeneratedDataset();
  //   this.generateChart();
  // }
}
