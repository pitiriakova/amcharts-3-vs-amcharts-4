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
    // this.series = this._dataService.getSeriesFromStaticDataset();
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

  hideRawAndShowAverages() {
    Amcharts4OptimizedZoomChartComponent.dataMode = 'average';
    const activeRawSeries = this.chart.series.values.filter(s => s.isHidden === false);
    console.log('currentActiveSeriesIds: ', activeRawSeries);

    activeRawSeries.forEach((cas, index) => {
      const currentAverageSeries = this.chart.series.values.find(v => v.id === cas.id + '__average');
      console.log('currentAverageSeries: ', currentAverageSeries);
      if (currentAverageSeries) {
        currentAverageSeries.show();
        cas.hide();
      } else {
        cas.hide();
        this.createAverageSeries(cas.id + '__average', index);
      }
    });
  }

  hideAverageAndShowRawData() {
    Amcharts4OptimizedZoomChartComponent.dataMode = 'raw';

    const activeAverageSeries = this.chart.series.values.filter(s => s.isHidden === false);

    activeAverageSeries.forEach((cas, index) => {
      const currentRawSeries = this.chart.series.values.find(v => v.id + '__average' === cas.id);
      if (currentRawSeries) {
        currentRawSeries.show();
        cas.hide();
      } else {
        cas.hide();
        this.createSeries(cas.id.replace('__average', ''), index);
      }
    });
  }

  toggleSeries(data: { id: string, checked: boolean }) {
    if (this.chart.series.values.length === 0) {
      this.createAverageSeries(data.id, 4);
    } else {
      const moreThan500pointsToShow = this.checkForPointsCount();

      if (moreThan500pointsToShow && Amcharts4OptimizedZoomChartComponent.dataMode === 'average') {
        console.log('MORE THAN 500 AND AVERAGE');
        const checkedAverageSeries = this.chart.series.values.find(s => s.id === data.id + '__average');

        if (checkedAverageSeries) {
          (checkedAverageSeries.isHidden || checkedAverageSeries.hidden) ? checkedAverageSeries.show() : checkedAverageSeries.hide();
          // this.chart.invalidateData();
        } else {
          this.createAverageSeries(data.id, 5);
        }
      }

      if (moreThan500pointsToShow && Amcharts4OptimizedZoomChartComponent.dataMode === 'raw') {
        console.log('MORE THAN 500 AND RAW');

        const checkedAverageSeries = this.chart.series.values.find(s => s.id === data.id + '__average');
        if (checkedAverageSeries) {
          (checkedAverageSeries.isHidden || checkedAverageSeries.hidden) ? checkedAverageSeries.show() : checkedAverageSeries.hide();
          // this.chart.invalidateData();
        } else {
          this.createAverageSeries(data.id, 5);
        }

        this.hideRawAndShowAverages();
      }

      if (!moreThan500pointsToShow && Amcharts4OptimizedZoomChartComponent.dataMode === 'raw') {

        console.log('NO MORE THAN 500 AND RAW');
        const checkedRawSeries = this.chart.series.values.find(s => s.id.replace('__average', '') === data.id);

        if (checkedRawSeries) {
          (checkedRawSeries.isHidden || checkedRawSeries.hidden) ? checkedRawSeries.show() : checkedRawSeries.hide();
          // this.chart.invalidateData();
        } else {
          this.createSeries(data.id, 4);
        }
      }

      if (!moreThan500pointsToShow && Amcharts4OptimizedZoomChartComponent.dataMode === 'average') {
        console.log('NO MORE THAN 500 AND AVERAGE');

        const checkedRawSeries = this.chart.series.values.find(s => s.id.replace('__average', '') === data.id);

        if (checkedRawSeries) {
          (checkedRawSeries.isHidden || checkedRawSeries.hidden) ? checkedRawSeries.show() : checkedRawSeries.hide();
          // this.chart.invalidateData();
        } else {
          this.createSeries(data.id, 4);
        }
        this.hideAverageAndShowRawData();
      }
    }
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
      this.chart.scrollbarX.events.on('up', this.dateAxisChanged.bind(this));
      // TODO: back to average series
      this.chart.scrollbarX.events.on('down', this.zoomStarted.bind(this));
    });
  }

  zoomStarted() {
    if (Amcharts4OptimizedZoomChartComponent.dataMode === 'average') {
      return;
    } else {
      console.log('ZOOMED OUT, SWITCH TO AVERAGE');
      this.hideRawAndShowAverages();
    }
  }

  private createValueAxis(): void {
    this.valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    this.valueAxis.tooltip.disabled = true;
    this.valueAxis.renderer.minWidth = 35;
    this.valueAxis.min = 0;
  }

  private createDateAxis(): void {
    this.dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    this.dateAxis.renderer.grid.template.location = 0;
    this.dateAxis.renderer.minGridDistance = 80;
    this.dateAxis.skipEmptyPeriods = true;
    // this.dateAxis.groupData = true;
    // this.dateAxis.groupCount = 100;
    this.dateAxis.min = this.chartData[0].timestamp;
    this.dateAxis.max = this.chartData[this.chartData.length - 1].timestamp;
    this.dateAxis.startLocation = 0;
    this.dateAxis.endLocation = 1;
    this.dateAxis.renderer.grid.template.location = 0;
    // dateAxis.groupIntervals.setAll([
    //   { timeUnit: "second", count: 1 },
    // ]);

    this.dateAxis.skipRangeEvent = true;
    // this.dateAxis.trackable = false;
    this.dateAxis.events.on('rangechangeended', (e) => {
      this.minZoom = e.target.minZoomed;
      this.maxZoom = e.target.maxZoomed;
    });

  }

  private createAverageSeries(serieId: string, index: number): any {
    console.log('SHOULD CREATE AVERAGE SERIES');
    const series = this.chart.series.push(new am4charts.LineSeries());
    series.id = serieId + '__average';
    series.dataFields.dateX = 'timestamp';
    series.dataFields.valueY = `${serieId}__average`;
    series.stroke = am4core.color(`${this.colors[index]}`);
    this.scrollbarX.series.push(series);
  }

  private createSeries(serieId: string, index: number): any {
    console.log('SHOULD CREATE RAW SERIES');
    console.log('serieId: ', serieId);
    const series = this.chart.series.push(new am4charts.LineSeries());

    series.id = serieId;
    series.dataFields.dateX = 'timestamp';
    series.dataFields.valueY = `${serieId}`;
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

  checkForPointsCount(): boolean {
    const currentActiveSeries = this.chart.series.values.filter(s => s.isHidden === false);
    let pointsCount = 0;

    if (Amcharts4OptimizedZoomChartComponent.dataMode === 'raw') {
      this.zoomedArea.forEach(measurementsData => {
        currentActiveSeries.map(cas => {
          if (Object.keys(measurementsData).find(md => md === cas.id)) {
            pointsCount = pointsCount + 1;
          }
        });
      });
    } else {
      this.zoomedArea.forEach(measurementsData => {
        currentActiveSeries.map(cas => {
          if (Object.keys(measurementsData).find(md => md + '__average' === cas.id)) {
            pointsCount = pointsCount + 1;
          }
        });
      });
    }

    console.log('RAW DATA (POINTS COUNT) FOR VISIBLE SERIES: ', pointsCount);

    return pointsCount > 500;
  }

  dateAxisChanged(e) {
    console.log('ZOOMED TO NEW AREA');
    this.zoomedArea = e.target.chart.data.filter(cd => {
      if (cd.timestamp > this.minZoom && cd.timestamp < this.maxZoom) {
        return cd;
      }
    });

    console.log('ALL AVAILABLE RAW DATA FOR ZOOMED AREA: ', this.zoomedArea);

    const moreThan500Points = this.checkForPointsCount();
    console.log('MORE THAN 500 POINTS TO SHOW: ', moreThan500Points);
    (moreThan500Points) ? this.hideRawAndShowAverages() : this.hideAverageAndShowRawData();
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
