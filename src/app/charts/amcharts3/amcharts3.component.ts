import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output} from '@angular/core';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-amcharts3',
  templateUrl: './amcharts3.component.html',
  styleUrls: ['./amcharts3.component.css']
})
export class Amcharts3Component implements OnChanges {
  @Input() data: any;
  public chartData: any;
  private chart: AmChart;
  public renderTimeResult = '';
  public result: number;
  public startRenderTime = new Date();

  constructor(private AmCharts: AmChartsService, private cdRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes): void {
    if (changes.data && changes.data && changes.data.currentValue) {
      this.chartData = changes.data.currentValue;
      this.renderChart();
    }
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
        'dataProvider': this.data,
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
