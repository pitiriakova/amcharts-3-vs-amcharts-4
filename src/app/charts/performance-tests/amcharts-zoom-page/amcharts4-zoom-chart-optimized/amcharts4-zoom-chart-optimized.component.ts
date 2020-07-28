import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ChartSettings} from '../../../../services/default-chart-settings';
import {ChartDataService} from '../../../../services/chart-data.service';
import * as am4charts from '@amcharts/amcharts4/charts';
import {applicationsSeriesNames} from '../../../../shared/applications-series-names';
import * as am4core from '@amcharts/amcharts4/core';
import {rgbColorsHighOpacity} from '../../../../shared/shared-chart-settings';
import {Amcharts4ZoomChartDataGenerator} from '../amcharts4-zoom-chart/amcharts4-zoom-chart-data-generator';

@Component({
  selector: 'app-amcharts4-zoom-chart-optimized',
  templateUrl: './amcharts4-zoom-chart-optimized.component.html',
  styleUrls: ['./amcharts4-zoom-chart-optimized.component.css']
})
export class Amcharts4OptimizedZoomChartComponent implements AfterViewInit, OnDestroy {

  constructor(private zone: NgZone, private cdRef: ChangeDetectorRef, private _dataService: Amcharts4ZoomChartDataGenerator, private chartDataService: ChartDataService) {
    this.chartData = this._dataService.getStaticOptimizedDataset();
    console.log('this.chartData111111: ', this.chartData);

    this.merged = [].concat.apply([], this.applicationsSeriesNames);
  }

  static dataMode = 'average';
  series: any;
  merged: any;
  valueAxis: any;
  dateAxis: any;
  minZoom: number;
  maxZoom: number;
  public chartData: any;
  private chart: am4charts.XYChart;
  private colors = rgbColorsHighOpacity;
  public renderTimeResult = '';
  public result = 0;
  public applicationsSeriesNames = applicationsSeriesNames;
  scrollbarX: any;
  zoomedArea: any;

  public ngAfterViewInit(): void {
    if (this.chartData) {
      this.zoomedArea = this.chartData;
      this.renderChart(ChartSettings.DEFAULT_SERIES_COUNT);
    }
  }

  toggleSeries(data: { id: string, checked: boolean }) {
        const checkedRawSeries = this.chart.series.values.find(s => s.id.replace('__average', '') === data.id);

        if (checkedRawSeries) {
          (checkedRawSeries.isHidden || checkedRawSeries.hidden) ? checkedRawSeries.show() : checkedRawSeries.hide();
        } else {
          this.createSeries(data.id, 4);
      }
        this.chart.invalidateData();
  }

  public renderChart(seriesCount: number): void {
    this.zone.runOutsideAngular(() => {
      this.chart = am4core.create('container-zoom-optimized', am4charts.XYChart);
      this.chart.dateFormatter.dateFormat = 'HH:mm:ss';
      this.chart.data = this.chartData;
      this.chart.numberFormatter.numberFormat = '#.0';

      const startRenderTime = new Date();
      this.chart.events.on('ready', () => {
        const endRenderTime = new Date();
        this.result = endRenderTime.getTime() - startRenderTime.getTime();
        this.renderTimeResult = `${new Date(this.result).getSeconds()} seconds, ${new Date(this.result).getMilliseconds()} milliseconds`;
        this.cdRef.detectChanges();
      });

      this.chart.paddingRight = 20;
      this.chart.cursor = new am4charts.XYCursor();
      this.valueAxis = this.createValueAxis();
      this.createDateAxis();
      this.scrollbarX = new am4charts.XYChartScrollbar();
      this.chart.scrollbarX = this.scrollbarX;
      this.chart.scrollbarY = new am4charts.XYChartScrollbar();
      this.chart.scrollbarX.parent = this.chart.bottomAxesContainer;
      // this.chart.scrollbarX.events.on('startendchanged', this.dateAxisChanged.bind(this));
    });
  }

  private createValueAxis(): void {
    this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    this.valueAxis.tooltip.disabled = true;
    this.valueAxis.renderer.minWidth = 35;
    this.valueAxis.min = 0;
  }

  dateAxisChanged (e) {
    console.log('e.target', e.target);
  }

  private createDateAxis(): void {
    this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    this.dateAxis.renderer.grid.template.location = 0;
    // this.dateAxis.renderer.minGridDistance = 50;
    this.dateAxis.skipEmptyPeriods = true;
    this.dateAxis.groupData = true;
    this.dateAxis.groupCount = 500;
    this.dateAxis.min = this.chartData[0].timestamp;
    this.dateAxis.max = this.chartData[this.chartData.length - 1].timestamp;
    this.dateAxis.startLocation = 0;
    this.dateAxis.endLocation = 1;
    this.dateAxis.renderer.grid.template.location = 0;

    this.dateAxis.skipRangeEvent = true;
    this.dateAxis.trackable = false;
    this.dateAxis.events.on('startendchanged', this.dateAxisChanged.bind(this))
  }

  private createSeries(serieId: string, index: number): any {
    console.log('SHOULD CREATE RAW SERIES');
    console.log('serieId: ', serieId);
    const series = this.chart.series.push(new am4charts.LineSeries());

    series.id = serieId;
    series.minBulletDistance = 3;
    series.dataFields.dateX = 'timestamp';
    series.dataFields.valueY = `${serieId}`;

    const bullet = series.bullets.push(new am4charts.Bullet());
    const roundBullet = bullet.createChild(am4core.Circle);
    bullet.fill = am4core.color(`${this.colors[index]}`);
    roundBullet.width = 10;
    roundBullet.height = 10;
    roundBullet.strokeWidth = 1;
    this.scrollbarX.series.push(series);
    series.tooltipText = '{valueY.value}';
  }

  public ngOnDestroy(): void {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  // Style scrollbar
  // private customizeGrip(grip) {
  //   // Remove default grip image
  //   grip.icon.disabled = true;
  //
  //   // Disable background
  //   grip.background.disabled = true;
  //
  //   // Add rotated rectangle as bi-di arrow
  //   const img = grip.createChild(am4core.Rectangle);
  //   img.width = 15;
  //   img.height = 15;
  //   img.fill = am4core.color('#999');
  //   img.rotation = 45;
  //   img.align = 'center';
  //   img.valign = 'middle';
  //
  //   // Add vertical bar
  //   const line = grip.createChild(am4core.Rectangle);
  //   line.height = 60;
  //   line.width = 3;
  //   line.fill = am4core.color('#999');
  //   line.align = 'center';
  //   line.valign = 'middle';
  //
  // }
}
