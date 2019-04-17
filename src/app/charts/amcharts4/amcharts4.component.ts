import {
  AfterViewInit, ChangeDetectorRef,
  Component, EventEmitter, Input,
  NgZone, OnChanges,
  OnDestroy, Output
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ChartDataService} from '../../services/chart-data.service';

@Component({
  selector: 'app-amcharts4',
  templateUrl: './amcharts4.component.html',
  styleUrls: ['./amcharts4.component.css']
})
export class Amcharts4Component implements AfterViewInit, OnDestroy {
  public chartData: any;
  private chart: am4charts.XYChart;
  public dataPointsCount = 100;
  public renderTimeResult = '';
  public result = 0;

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService) {
    this.getNewData();
  }

  ngAfterViewInit(): void {
    console.log('this.chartData: ', this.chartData);
    if (this.chartData) {
      this.renderChart();
    }
  }

  public getNewData() {
    this.chartData = this.chartDataService.generateNewData(this.dataPointsCount);
    this.cdRef.detectChanges();
    this.renderChart();
  }

  public renderChart(): void {
    console.log('RENDER AM 4444444');
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create('chartdiv-4', am4charts.XYChart);
      this.chart.dataProvider = this.chartData;

      const startRenderTime = new Date();
      this.chart.events.on('ready', () => {
        const endRenderTime = new Date();
        this.result = endRenderTime.getTime() - startRenderTime.getTime();
        this.renderTimeResult = `${new Date(this.result).getSeconds()} seconds, ${new Date(this.result).getMilliseconds()} milliseconds`;
        this.cdRef.detectChanges();
      });

      this.chart.paddingRight = 20;
      this.chart.cursor = new am4charts.XYCursor();
      this.createValueAxis();
      this.createDateAxis();

      [{name: 'series1', color: '#3979A8'}, {name: 'series2', color: '#256B4E'}, {name: 'series3', color: '#7939A8'}]
        .forEach((s => this.createSeries(s)));
    });
  }

  private createValueAxis() {
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
  }

  private createDateAxis() {
    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
  }

  private createSeries(prop: any) {
    const series = this.chart.series.push(new am4charts.LineSeries());

    series.dataFields.dateX = 'date';
    series.dataFields.valueY = prop.name;
    series.strokeOpacity = 0;

    const bullet = series.bullets.push(new am4charts.Bullet());
    const roundBullet = bullet.createChild(am4core.Circle);
    bullet.fill = am4core.color(`${prop.color}`);
    roundBullet.width = 10;
    roundBullet.height = 10;
    roundBullet.strokeWidth = 0;
    series.tooltipText = '{valueY.value}';
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
