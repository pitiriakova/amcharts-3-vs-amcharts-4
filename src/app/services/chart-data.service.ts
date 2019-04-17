import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  public data = [];

  constructor() {
    this.generateNewData(100);
  }
  public addDays(currentDate, index) {
    const date = new Date(currentDate.valueOf());
    date.setDate(date.getDate() + index);
    return date;
  }

  generateNewData(dataPointsCount) {
    console.log('generateNewData')
    this.data = [];
    const currentDate = new Date();
    Array.apply(null, {length: dataPointsCount})
      .map(Function.call, Math.random).forEach((item, index) => {
      this.data.push({
        date: this.addDays(currentDate, index),
        series1: item,
        series2: item + 1,
        series3: item - 1,
      });
    });
    console.log('this.data', this.data);
    return this.data;
  }

  generateNewHighchartsData(dataPointsCount) {
    const categoryData = [];
    const series1 = [];
    const series2 = [];
    const series3 = [];
    const currentDate = new Date();
    Array.apply(null, {length: dataPointsCount})
      .map(Function.call, Math.random).forEach((item, index) => {
      categoryData.push(this.addDays(currentDate, index));
      series1.push(item);
      series2.push(item + 1);
      series3.push(item - 1);
    });

    return {categoryData, series1, series2, series3};
  }
}
