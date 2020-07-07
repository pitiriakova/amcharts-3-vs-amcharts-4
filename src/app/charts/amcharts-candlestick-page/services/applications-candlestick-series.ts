import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export function createApplicationsMeasurementsChart(chart, data: any) {
  chart.paddingRight = 20;
  chart.dateFormatter.inputDateFormat = 'HH:mm:ss';
  chart.data = data;
  // chart.legend = new am4charts.Legend();

  // chart.legend.position = 'top';
  chart.fontSize = 12;
  chart.fontFamily = 'Roboto, sans-serif';
  getDateAxis(chart);
  getValueAxis(chart);

  chart.cursor = new am4charts.XYCursor();

  return chart;
}

function getDateAxis(chart: any) {
  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.skipEmptyPeriods = false;
  dateAxis.renderer.ticks.template.disabled = false;
  dateAxis.renderer.line.strokeOpacity = 1;
  dateAxis.renderer.line.strokeWidth = 1;
  dateAxis.renderer.line.stroke = am4core.color('#626262');
  dateAxis.renderer.ticks.template.strokeWidth = 1;
  dateAxis.renderer.ticks.template.length = 1;
  dateAxis.baseInterval = {
    timeUnit: 'minute',
    count: 5
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

export function createSeries(name, color, chart) {
  const series = chart.series.push(new am4charts.CandlestickSeries());
  series.name = name;
  series.dataFields.dateX = 'timestamp';
  series.dataFields.valueY = `${name}_value`;
  series.dataFields.openValueY = `${name}_min`;
  series.dataFields.lowValueY = `${name}_min`;
  series.dataFields.highValueY = `${name}_max`;
  series.simplifiedProcessing = true;

  series.riseFromOpenState.properties.fill = am4core.color(color);
  series.riseFromOpenState.properties.fillOpacity = 0.5;
  series.dropFromOpenState.properties.fill = am4core.color(color);
  series.riseFromOpenState.properties.stroke = am4core.color(color);
  series.dropFromOpenState.properties.stroke = am4core.color(color);
  // series.hide();
  // userProfileSeries.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';
  return series;
}
