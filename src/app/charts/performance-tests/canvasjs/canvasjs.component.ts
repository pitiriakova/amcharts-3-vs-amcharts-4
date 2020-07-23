import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import * as CanvasJS from './canvasjs.min';
import {ChartSettings} from '../../../services/default-chart-settings';
import {ChartDataService} from '../../../services/chart-data.service';

@Component({
  selector: 'app-canvasjs',
  templateUrl: './canvasjs.component.html',
  styleUrls: ['./canvasjs.component.css']
})
export class CanvasjsComponent implements OnInit, AfterViewInit {
  public chartData: any;
  chart: any;

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService) {
    this.chartData = this.chartDataService.generateCanvasJsData(ChartSettings.DEFAULT_DATA_POINTS_COUNT, ChartSettings.DEFAULT_SERIES_COUNT);

    console.log('this.chartData: ', this.chartData);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.chartData) {
      // tslint:disable-next-line:no-console
      console.time('renderCanvasJsChart');
      this.renderChart(ChartSettings.DEFAULT_SERIES_COUNT);
      // tslint:disable-next-line:no-console
      console.timeEnd('renderCanvasJsChart');
    }
  }

  renderChart (seriesCount: number) {
    this.zone.runOutsideAngular(() => {
      this.chart = new CanvasJS.Chart('chartdiv-canvas-js', {
        animationEnabled: true,
        title: {
          text: 'Server Performance'
        },
        axisX: {
          title: 'Server Load (in TPS)'
        },
        axisY: {
          title: 'Response Time (in ms)'
        },
        data: this.getChartSeriesData()
      });
      this.chart.render();
    });
  }

  getChartSeriesData() {
    const dataToSend = [];
    // tslint:disable-next-line:no-shadowed-variable
    console.log('this.chartData[i]: ', this.chartData);
    for (const data of this.chartData) {
      console.log('this.data[i]: ', data);
      dataToSend.push({
        type: 'scatter',
        toolTipContent: '<span style=\'color:#4F81BC \'><b>{name}</b></span><br/><b> Load:</b> {x} TPS<br/><b> Response Time:</b></span> {y} ms',
        name: data,
        showInLegend: true,
        dataPoints: this.chartData[data]
      });
    }

    console.log('dataToSend: ', dataToSend)
    return dataToSend;
  }

  updateData($event) {
  }

}
