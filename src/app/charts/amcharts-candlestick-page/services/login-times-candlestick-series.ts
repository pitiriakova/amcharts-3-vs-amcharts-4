import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import construct = Reflect.construct;

export class LoginTimesChart {
  totalLoginsAxis;
  valueAxis;
  constructor(chart, data: any) {
    chart.dateFormatter.inputDateFormat = 'HH:mm:ss';
    chart.data = data;

    chart.legend = new am4charts.Legend();
    chart.leftAxesContainer.layout = 'vertical';
    chart.legend.position = 'top';
    chart.fontSize = 12;
    chart.fontFamily = 'Roboto, sans-serif';
    chart.cursor = new am4charts.XYCursor();
    // chart.scrollbarX = new am4core.Scrollbar();

    this.totalLoginsAxis = this.getLoginTimesValueAxis(chart);
    this.getDateAxis(chart);
    this.valueAxis = this.getValueAxis(chart);

    chart.cursor = new am4charts.XYCursor();
    return chart;
  }

  getDateAxis(chart: any) {
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

  getLoginTimesValueAxis(chart) {
    const loginTimesValueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    loginTimesValueAxis.marginTop = 30;
    loginTimesValueAxis.min = 30;
    loginTimesValueAxis.tooltip.disabled = true;
    loginTimesValueAxis.title.fontWeight = '700';
    loginTimesValueAxis.renderer.line.strokeOpacity = 1;
    loginTimesValueAxis.renderer.line.strokeWidth = 3;
    loginTimesValueAxis.renderer.line.stroke = am4core.color('#626262');

    return loginTimesValueAxis;
  }

  getValueAxis(chart: any) {
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.title.fontWeight = '700';
    valueAxis.renderer.line.strokeWidth = 3;
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.stroke = am4core.color('#626262');
    valueAxis.marginTop = 20;
    valueAxis.align = 'right';
    valueAxis.min = 0;
    return valueAxis;
  }

  static createLoginTimesSeries(id, color, chart: any) {
    const series = chart.series.push(new am4charts.CandlestickSeries());
    series.name = id;
    // if (id === 'total_login_time') {
    //   series.yAxis =
    // }
    series.dataFields.dateX = 'timestamp';
    series.dataFields.average = `${id}_value`;
    series.dataFields.valueY = `${id}_l1`;
    series.dataFields.openValueY = `${id}_l2`;
    series.dataFields.lowValueY = `${id}_min`;
    series.dataFields.highValueY = `${id}_max`;

    series.riseFromOpenState.properties.fill = am4core.color(color);
    series.riseFromOpenState.properties.fillOpacity = 1;
    series.dropFromOpenState.properties.fill = am4core.color(color);
    series.riseFromOpenState.properties.stroke = am4core.color(color);
    series.dropFromOpenState.properties.stroke = am4core.color(color);
    series.simplifiedProcessing = true;
    // series.hide();
    // series.tooltipText = 'Open:${openValueY.connection_value}\nLow:${lowValueY.connection_min}\nHigh:${highValueY.connection_max}\nClose:${valueY.connection_value}';
    return series;
  }

}

// TODO: uncomment to build base
//  function getDateAxis(chart: any) {
//   const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
//   dateAxis.skipEmptyPeriods = false;
//   dateAxis.renderer.ticks.template.disabled = false;
//   dateAxis.renderer.line.strokeOpacity = 1;
//   dateAxis.renderer.line.strokeWidth = 1;
//   dateAxis.renderer.line.stroke = am4core.color('#626262');
//   dateAxis.renderer.ticks.template.strokeWidth = 1;
//   dateAxis.renderer.ticks.template.length = 1;
//   dateAxis.baseInterval = {
//     timeUnit: 'minute',
//     count: 5
//   };
//   dateAxis.startLocation = 0;
//   dateAxis.endLocation = 1;
//   dateAxis.renderer.grid.template.location = 0;
//   dateAxis.tooltip.disabled = true;
// }
//
// function getValueAxis(chart: any) {
//   const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
//   valueAxis.tooltip.disabled = true;
//   valueAxis.title.fontWeight = '700';
//   valueAxis.renderer.line.strokeOpacity = 1;
//   valueAxis.renderer.line.strokeWidth = 3;
//   valueAxis.renderer.line.stroke = am4core.color('#626262');
//   valueAxis.min = 0;
// }
