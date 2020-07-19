import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export function createApplicationsMeasurementsChart(chart, data: any) {
  chart.paddingRight = 20;
  chart.dateFormatter.inputDateFormat = 'HH:mm:ss';
  chart.data = data;
  chart.fontSize = 12;
  chart.fontFamily = 'Roboto, sans-serif';
  getDateAxis(chart);
  getValueAxis(chart);
  chart.cursor = new am4charts.XYCursor();
  return chart;
}

function getDateAxis(chart: any) {
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.skipEmptyPeriods = true;
  dateAxis.renderer.ticks.template.disabled = false;
  dateAxis.renderer.line.strokeOpacity = 1;
  dateAxis.renderer.line.strokeWidth = 1;
  dateAxis.renderer.line.stroke = am4core.color('#626262');
  dateAxis.renderer.ticks.template.strokeWidth = 1;
  dateAxis.renderer.ticks.template.length = 1;
  dateAxis.baseInterval = {
    timeUnit: 'minute',
    count: 10
  };
  dateAxis.startLocation = 0;
  dateAxis.endLocation = 1;
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.tooltip.disabled = true;
}

function getValueAxis(chart: any) {
  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.title.fontWeight = '700';
  valueAxis.renderer.line.strokeOpacity = 1;
  valueAxis.renderer.line.strokeWidth = 3;
  valueAxis.renderer.line.stroke = am4core.color('#626262');
  valueAxis.min = 0;
}

export function createSeries(id, color, chart) {
  const series = chart.series.push(new am4charts.CandlestickSeries());
  series.name = id;
  series.dataFields.dateX = 'timestamp';
  series.dataFields.average = `${id}_value`;
  series.dataFields.valueY = `${id}_l1`;
  series.dataFields.openValueY = `${id}_l2`;
  series.dataFields.lowValueY = `${id}_min`;
  series.dataFields.highValueY = `${id}_max`;
  series.simplifiedProcessing = true;
  series.riseFromOpenState.properties.fill = am4core.color(color);
  series.riseFromOpenState.properties.fillOpacity = 1;
  series.dropFromOpenState.properties.fill = am4core.color(color);
  series.riseFromOpenState.properties.stroke = am4core.color(color);
  series.dropFromOpenState.properties.stroke = am4core.color(color);
  series.hide();
  series.hiddenInLegend = series.isHidden;
  series.tooltipText = '90%:{openValueY.value}\nMin:{lowValueY.value}\nMax:{highValueY.value}\n10%:{valueY.value}\naverage:{average.value}';
  return series;
}

export function createAverageLine(id, color, chart) {
  const series = chart.series.push(new am4charts.LineSeries());
}
