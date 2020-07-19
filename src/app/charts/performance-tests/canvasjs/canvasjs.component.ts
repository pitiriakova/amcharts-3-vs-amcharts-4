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
      this.renderChart(ChartSettings.DEFAULT_SERIES_COUNT);
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
        data: [{
          type: 'scatter',
          toolTipContent: '<span style=\'color:#4F81BC \'><b>{name}</b></span><br/><b> Load:</b> {x} TPS<br/><b> Response Time:</b></span> {y} ms',
          name: 'Server Pluto',
          showInLegend: true,
          dataPoints: [
            {x: 23, y: 330},
            {x: 28, y: 390},
            {x: 39, y: 400},
            {x: 34, y: 430},
            {x: 24, y: 321},
            {x: 29, y: 250},
            {x: 29, y: 370},
            {x: 23, y: 290},
            {x: 27, y: 250},
            {x: 34, y: 380},
            {x: 36, y: 320},
            {x: 33, y: 405},
            {x: 32, y: 453},
            {x: 21, y: 292}
          ]
        },
          {
            type: 'scatter',
            name: 'Server Mars',
            showInLegend: true,
            toolTipContent: '<span style=\'color:#C0504E \'><b>{name}</b></span><br/><b> Load:</b> {x} TPS<br/><b> Response Time:</b></span> {y} ms',
            dataPoints: [
              {x: 19, y: 200},
              {x: 27, y: 300},
              {x: 35, y: 330},
              {x: 32, y: 190},
              {x: 29, y: 189},
              {x: 22, y: 150},
              {x: 27, y: 200},
              {x: 26, y: 190},
              {x: 24, y: 225},
              {x: 33, y: 330},
              {x: 34, y: 250},
              {x: 30, y: 120},
              {x: 37, y: 153},
              {x: 24, y: 196}
            ]
          }]
      });
      this.chart.render();
    });
  }

  updateData($event) {
  }

}
