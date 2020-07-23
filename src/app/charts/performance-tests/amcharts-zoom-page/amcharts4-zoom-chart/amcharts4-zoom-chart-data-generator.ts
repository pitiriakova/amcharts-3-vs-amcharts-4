import {appIds} from '../../../../shared/applications-series-ids';
import staticDataset from './static-data.json';
import staticOptimizedDataset from './static-data-optimized.json';

export class Amcharts4ZoomChartDataGenerator {
  public oneHourData: any[] = [];
  secondsToSet = 0;
  minutesToSet = 0;
  currentHour = new Date(new Date().setMinutes(0, 0));

  data = [];
  ids = appIds;
  constructor() {
  }

  getAveragesFromRecentlyGeneratedDataset(data) {
    const sum = {};
    for (let j = 0; j < data.length; j++) {
      for (let i = 0; i < this.ids.length - 1; i++) {
        if (j % 10 !== 0) {
          sum[this.ids[i]] = sum[this.ids[i]] + data[j][this.ids[i]];
        } else {
          data[j][this.ids[i] + '__average'] = sum[this.ids[i]] / 10;
          sum[this.ids[i]] = 0;
        }

        if (j === data.length - 1) {
          console.log('jjjjjj:', j);
          return data;
        }
      }
    }
  }

  getTimeStamp() {
    return this.currentHour.setHours(new Date().getHours(), this.minutesToSet, this.secondsToSet);
  }

  getRandomValue(k) {
    let randomMin, randomMax;
    if (k === 0 || k === 5 || k === 10 || k === 15) {
      randomMin = Math.random() * 8 + 7;
      randomMax = Math.random() * 11 + 9;
    } else if (k === 1 || k === 6 || k === 11 || k === 16) {
      randomMin = Math.random() * 18.5 + 17;
      randomMax = Math.random() * 19.5 + 19;
    } else if (k === 2 || k === 7 || k === 12 || k === 17) {
      randomMin = Math.random() * 19 + 18.5;
      randomMax = Math.random() * 21 + 20;
    } else if (k === 3 || k === 8 || k === 13 || k === 18) {
      randomMin = Math.random() * 13 + 12;
      randomMax = Math.random() * 15 + 14;
    } else {
      randomMin = Math.random() * 0.03 + 0.0001;
      randomMax = Math.random() * 0.08  + 0.04;
    }

    const randomValue = Number((Math.random() * (randomMax - randomMin) + randomMin).toFixed(4));

    return randomValue > 0 ? randomValue : (-randomValue);
  }

  getOneHourData() {
    this.oneHourData = [];

    do {
      if (this.secondsToSet === 60) {
        this.secondsToSet = 0;
        this.minutesToSet = this.minutesToSet + 1;
      } else {
        this.secondsToSet = this.secondsToSet + 6;
      }

      let obj = {};
      for (let i = 0; i < this.ids.length; i++) {
        obj[this.ids[i]] = this.getRandomValue(i);
        if (i === this.ids.length - 1) {
          obj['timestamp'] = this.getTimeStamp();
          this.oneHourData.push(obj);
          obj = {};
        }
      }
    }
    while (this.minutesToSet < 60);

    return this.oneHourData;
    // }
  }

  generateRandomDataset() {
    // should be [{timestamp: '', serie1: '', serie2: '', serie3: ''}]
    return this.getAveragesFromRecentlyGeneratedDataset(this.getOneHourData());
  }

  getStaticDataset() {
    // return staticDataset;
  }

  getStaticOptimizedDataset() {
    return staticOptimizedDataset;
  }

  getSeriesFromStaticDataset() {

  }

  getAveragesSeriesFromStaticDataset() {

  }
}
