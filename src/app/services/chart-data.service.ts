import { Injectable } from '@angular/core';
import {ChartSettings} from './default-chart-settings';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {
  public data = [];
  min = 0;
  max = 10;

  constructor() {
    this.generateNewData(ChartSettings.DEFAULT_DATA_POINTS_COUNT, ChartSettings.DEFAULT_SERIES_COUNT);
  }
  public addDays(currentDate, index) {
    const date = new Date(currentDate.valueOf());
    date.setDate(currentDate.getDate() + (Math.random() * (this.max - this.min + 1) + this.min) + index);

    return date;
  }

  generateNewData(dataPointsCount, seriesCount) {
    this.data = [];
    const currentDate = new Date();
    Array.apply(null, {length: dataPointsCount})
      .forEach((item, index) => {
        for (let i = 1; i <= seriesCount; i++ ) {
          this.data.push({
            date: this.addDays(currentDate, index),
            [`series${i}`] : (Math.random() * (this.max - this.min + 1) + this.min)
          });
        }
    });
    return this.data.sort((a, b) => a.date - b.date);
  }

  generateNewHighchartsData(dataPointsCount: number, seriesCount: number) {
    const data = {};
    const currentDate = new Date();

    for (let i = 1; i <= seriesCount; i++ ) {
      data[`series${i}`] = [];
    }

    Array.apply(null, {length: dataPointsCount})
      .forEach((item, index) => {
        for (let i = 1; i <= seriesCount; i++ ) {
          data[`series${i}`].push(
            this.addDays(currentDate, index),
            (Math.random() * (this.max - this.min + 1) + this.min)
          );
        }
      });

    return this.sortData(data);
  }

  generateCanvasJsData(dataPointsCount: number, seriesCount: number) {
    const data = {};
    const currentDate = new Date();
    // [{}, {}]
    for (let i = 1; i <= seriesCount; i++ ) {
      data[`series${i}`] = [];
    }

    Array.apply(null, {length: dataPointsCount})
      .forEach((item, index) => {
        for (let i = 1; i <= seriesCount; i++ ) {
          data[`series${i}`].push(
            {
              x: this.addDays(currentDate, index),
              y: (Math.random() * (this.max - this.min + 1) + this.min)
            }
          );
        }
      });

    return this.sortData(data);
  }

  private sortData(data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        data[key].sort((a, b) => a.date - b.date);
      }
    }

    return data;
  }
}
