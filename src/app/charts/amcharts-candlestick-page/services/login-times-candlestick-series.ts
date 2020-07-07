import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

export function createLoginTimesChart(chart, data: any) {
  chart.paddingRight = 20;
  chart.dateFormatter.inputDateFormat = 'HH:mm:ss';
  chart.data = data;
  chart.legend = new am4charts.Legend();

  chart.legend.position = 'top';
  chart.fontSize = 12;
  chart.fontFamily = 'Roboto, sans-serif';
  // chart.scrollbarX = new am4core.Scrollbar();
  getDateAxis(chart);
  getValueAxis(chart);
  // groupPoliciesSeries.tooltipText = 'Open:${openValueY.group_policies_value}\nLow:${lowValueY.group_policies_min}\nHigh:${highValueY.group_policies_max}\nClose:${valueY.group_policies_value}';

  chart.cursor = new am4charts.XYCursor();
  // var scrollbarX = new am4charts.XYChartScrollbar();
  // scrollbarX.series.push(totalLoginTimesSeries);
  // chart.scrollbarX = scrollbarX;

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

export function createConnectionSeries(chart: any) {
  const connectionSeries = chart.series.push(new am4charts.CandlestickSeries());
  connectionSeries.name = 'Connection';
  connectionSeries.dataFields.dateX = 'timestamp';
  connectionSeries.dataFields.valueY = 'connection_value';
  connectionSeries.dataFields.openValueY = 'connection_min';
  connectionSeries.dataFields.lowValueY = 'connection_min';
  connectionSeries.dataFields.highValueY = 'connection_max';

  connectionSeries.riseFromOpenState.properties.fill = am4core.color('#128b8a');
  connectionSeries.riseFromOpenState.properties.fillOpacity = 0.5;
  connectionSeries.dropFromOpenState.properties.fill = am4core.color('#128b8a');
  connectionSeries.riseFromOpenState.properties.stroke = am4core.color('#128b8a');
  connectionSeries.dropFromOpenState.properties.stroke = am4core.color('#128b8a');
  connectionSeries.simplifiedProcessing = true;
  connectionSeries.hide();
  // connectionSeries.tooltipText = 'Open:${openValueY.connection_value}\nLow:${lowValueY.connection_min}\nHigh:${highValueY.connection_max}\nClose:${valueY.connection_value}';

  return connectionSeries;


}

export function createUserProfileSeries(chart: any) {
  const userProfileSeries = chart.series.push(new am4charts.CandlestickSeries());
  userProfileSeries.name = 'User Profile';
  userProfileSeries.dataFields.dateX = 'timestamp';
  userProfileSeries.dataFields.valueY = 'user_profile_value';
  userProfileSeries.dataFields.openValueY = 'user_profile_min';
  userProfileSeries.dataFields.lowValueY = 'user_profile_min';
  userProfileSeries.dataFields.highValueY = 'user_profile_max';
  userProfileSeries.simplifiedProcessing = true;

  userProfileSeries.riseFromOpenState.properties.fill = am4core.color('#e6194b');
  userProfileSeries.riseFromOpenState.properties.fillOpacity = 0.5;
  userProfileSeries.dropFromOpenState.properties.fill = am4core.color('#e6194b');
  userProfileSeries.riseFromOpenState.properties.stroke = am4core.color('#e6194b');
  userProfileSeries.dropFromOpenState.properties.stroke = am4core.color('#e6194b');
  userProfileSeries.hide();
  // userProfileSeries.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';

  return userProfileSeries;
}

export function createGroupPoliciesSeries(chart: any) {
  const groupPoliciesSeries = chart.series.push(new am4charts.CandlestickSeries());
  groupPoliciesSeries.name = 'GPO Processing';
  groupPoliciesSeries.dataFields.dateX = 'timestamp';
  groupPoliciesSeries.dataFields.valueY = 'group_policies_value';
  groupPoliciesSeries.dataFields.openValueY = 'group_policies_min';
  groupPoliciesSeries.dataFields.lowValueY = 'group_policies_min';
  groupPoliciesSeries.dataFields.highValueY = 'group_policies_max';
  groupPoliciesSeries.simplifiedProcessing = true;

  groupPoliciesSeries.riseFromOpenState.properties.fill = am4core.color('#0f68d1');
  groupPoliciesSeries.dropFromOpenState.properties.fill = am4core.color('#0f68d1');
  groupPoliciesSeries.riseFromOpenState.properties.stroke = am4core.color('#0f68d1');
  groupPoliciesSeries.dropFromOpenState.properties.stroke = am4core.color('#0f68d1');
  groupPoliciesSeries.riseFromOpenState.properties.fillOpacity = 0.5;
  groupPoliciesSeries.hide();

  return groupPoliciesSeries;
}

export function createTotalLoginTimesSeries(chart: any) {
  const totalLoginTimesSeries = chart.series.push(new am4charts.CandlestickSeries());
  totalLoginTimesSeries.dataFields.dateX = 'timestamp';
  totalLoginTimesSeries.name = 'Total login time';
  totalLoginTimesSeries.dataFields.valueY = 'total_login_time_value';
  totalLoginTimesSeries.dataFields.openValueY = 'total_login_time_min';
  totalLoginTimesSeries.dataFields.lowValueY = 'total_login_time_min';
  totalLoginTimesSeries.dataFields.highValueY = 'total_login_time_max';
  totalLoginTimesSeries.riseFromOpenState.properties.fill = am4core.color('#8BC541');
  totalLoginTimesSeries.dropFromOpenState.properties.fill = am4core.color('#8DC443');
  totalLoginTimesSeries.riseFromOpenState.properties.stroke = am4core.color('#8BC541');
  totalLoginTimesSeries.dropFromOpenState.properties.stroke = am4core.color('#8BC541');
  totalLoginTimesSeries.simplifiedProcessing = true;
  totalLoginTimesSeries.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';
  totalLoginTimesSeries.hide();

  return totalLoginTimesSeries;
}
