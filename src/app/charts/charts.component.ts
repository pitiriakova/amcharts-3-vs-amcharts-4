import {Component} from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent {
  data = [];
  public dataPointsCount = 100;

  constructor() {
    this.generateNewData();
  }
  public addDays(currentDate, index) {
    const date = new Date(currentDate.valueOf());
    date.setDate(date.getDate() + index);
    return date;
  }

  generateNewData() {
    this.data = [];
    const currentDate = new Date();
    Array.apply(null, {length: this.dataPointsCount})
      .map(Function.call, Math.random).forEach((item, index) => {
      this.data.push({
        date: this.addDays(currentDate, index),
        series1: item,
        series2: item + 1,
        series3: item - 1,
      });
    });
  }
 }
