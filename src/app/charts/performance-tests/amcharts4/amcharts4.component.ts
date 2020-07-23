import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
} from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import {ChartDataService} from '../../../services/chart-data.service';
import {ChartSettings} from '../../../services/default-chart-settings';

@Component({
  selector: 'app-amcharts4',
  templateUrl: './amcharts4.component.html',
  styleUrls: ['./amcharts4.component.css']
})
export class Amcharts4Component implements AfterViewInit, OnDestroy {
  public chartData: any;
  private chart: am4charts.XYChart;
  private colors = ['#3979A8', '#256B4E', '#7939A8', '#c86961', '#c89d61'];
  public renderTimeResult = '';
  public result = 0;

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private chartDataService: ChartDataService) {
    this.chartData = this.chartDataService.generateNewData(ChartSettings.DEFAULT_DATA_POINTS_COUNT, ChartSettings.DEFAULT_SERIES_COUNT);
  }

  public ngAfterViewInit(): void {
    if (this.chartData) {
      console.log('this.chartData: ', this.chartData);
      this.renderChart(ChartSettings.DEFAULT_SERIES_COUNT);
    }
  }

  public updateData(data): void {
    this.chartData = this.chartDataService.generateNewData(data.dataPointsCount, data.seriesCount);
    this.renderChart(data.seriesCount);
  }

  public renderChart(seriesCount: number): void {
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create('chartdiv-4', am4charts.XYChart);
      this.chart.data = this.chartData;

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

      for (let i = 1; i <= seriesCount; i++) {
        this.createSeries(i);
      }
    });
  }

  private createValueAxis(): void {
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;
  }

  private createDateAxis(): void {
    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 80;
  }

  private createSeries(index): void {
    const series = this.chart.series.push(new am4charts.LineSeries());

    series.dataFields.dateX = 'date';
    series.dataFields.valueY = `series${index}`;
    series.strokeOpacity = 0;

    const bullet = series.bullets.push(new am4charts.Bullet());
    const roundBullet = bullet.createChild(am4core.Circle);
    bullet.fill = am4core.color(`${this.colors[index]}`);
    roundBullet.width = 10;
    roundBullet.height = 10;
    roundBullet.strokeWidth = 0;
    series.tooltipText = '{valueY.value}';
  }

  public ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
