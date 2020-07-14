import {AfterViewInit, Component, OnInit} from '@angular/core';
import {applicationsSeriesNames} from '../../../shared/applications-series-names';

import * as Highcharts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
import {RangeChartDataGenerator} from '../../range-chart/range-chart-data-generator';
import {colors, rgbColors, rgbColorsHighOpacity} from '../../../shared/shared-chart-settings';
import {ZoomChartDataGenerator} from '../zoom-chart-data-generator';
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
  allCheckboxes: any;

  constructor(private _rangeChartDataGenerator: RangeChartDataGenerator,
              private _zoomChartDataGenerator: ZoomChartDataGenerator) {
  }

  ngOnInit() {
    this.data = this._zoomChartDataGenerator.getStaticDataSet();
    console.log('DATA:this.data: ', this.data);
    this.averageLineData = this._zoomChartDataGenerator.getAveragesBasedOnStaticDataset();
    console.log('this.averageLineData', this.averageLineData);
  }


  public toggleSeries(id: string) {
    const currentSeries = this.chart.get(id);
    currentSeries.visible ? currentSeries.hide() : currentSeries.show();
    const currentAverageSeries = this.chart.get(id + '__average');
    currentAverageSeries.visible ? currentAverageSeries.hide() : currentAverageSeries.show();
  }

  afterSetExtremes(e) {
    const { chart } = e.target;
    // chart.showLoading('Loading data from server...');
    console.log('e.min: ', new Date(e.min));
    console.log('e.max: ', new Date(e.max));
    // this._zoomChartDataGenerator.getDetailedData(e.min, e.max);

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
    this.chart = Highcharts.chart('container-zoom', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'Applications'
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
        min: 0,
        max: 35,
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

  public generateNewData() {
    for (let i = 0; i < this.allCheckboxes.length; i++) {
      this.allCheckboxes[i].checked = false;
    }
    this.data = this._zoomChartDataGenerator.generateRandomDataset();
    this.averageLineData = this._zoomChartDataGenerator.getAveragesFromRecentlyGeneratedDataset();
    this.generateChart();
  }
}
