import {AfterViewInit, Component, OnInit} from '@angular/core';
import {applicationsSeriesNames} from '../../../../shared/applications-series-names';

import * as Highstock from 'highcharts/highstock';
import {SmallDatasetGenerator} from '../../../../services/small-dataset-generator';
import {colors, rgbColorsHighOpacity} from '../../../../shared/shared-chart-settings';
import {LargeDatasetGenerator} from '../../../../services/large-dataset-generator';

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
  selectedSeries: any[] = [];

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
    currentSeries.visible ? currentSeries.hide() : currentSeries.show();
    const currentAverageSeries = this.chart.get(id + '__average');
    currentAverageSeries.visible ? currentAverageSeries.hide() : currentAverageSeries.show();
    currentAverageSeries.showInNavigator = currentAverageSeries.visible;

    // const navigatorSeries = this.chart.get('highcharts-navigator-series');
    // console.log('navigatorSeries: ', navigatorSeries);
    // currentAverageSeries.visible ? navigatorSeries.show() : navigatorSeries.hide();
    // this.chart.series.forEach(s => {
    //   if (s.visible) {
    //     navigatorSeries.setData([navigatorSeries.data, ...currentAverageSeries.options.data], false);
    //     currentAverageSeries.visible ? navigatorSeries.show() : navigatorSeries.hide();
    //   }
    // })
  }

  ngAfterViewInit(): void {
    this.allCheckboxes = document.getElementsByTagName('input');
    this.generateChart();
  }

  generateChart() {
    const merged = [].concat.apply([], this.applicationsSeriesNames);
    this.chart = Highstock.stockChart('container-zoom', {
      chart: {
        zoomType: 'xy'
      },
      navigator: {
        series: {
          // color: '#FF00FF',
          lineWidth: 2
        }
      },
      rangeSelector: {
        selected: 1
      },
      scrollbar: {
        enabled: true
      },
      title: {
        text: 'Applications (select area to zoom)'
      },
      xAxis: {
        type: 'datetime',
        events: {}
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
          // showInNavigator: true,
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

    for (let i = 0; i <= merged.length - 1; i++) {
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
        showInNavigator: true,
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

      //
      // this.chart.addSeries({
      //   type: 'area',
      //   name: 'Custom navigator',
      //   data: merged[i].id,
      //   color: '#000000',
      //   fillOpacity: 0.4,
      //   lineWidth: 1,
      //   xAxis: 1,
      //   yAxis: 1,
      //   enableMouseTracking: false,
      //   showInLegend: false,
      //   showInNavigator: false,
      //   animation: false,
      // });
    }
  }
}
