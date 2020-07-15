import {Injectable} from '@angular/core';
import {appIds} from '../shared/applications-series-ids';

@Injectable({
  providedIn: 'root'
})

export class SmallDatasetGenerator {
  timestamp: any = null;
  minutesToSet = 0;

  id = '076b0d0d-d201-4213-bc72-822c9b54d602__app_start_time';
  ids = appIds;

  public timeSlotData: any[] = [];
  currentDataset: any;
  timeslots: any = [];

  constructor() {
    this.currentDataset = this.generateRandomDataset();
    console.log('this.currentDataset: ', this.currentDataset);
  }

  generateRandomDataset () {
    // generate 50 values
    this.timeSlotData = [];
    this.timeslots = [];

    for (let j = 0; j <= 6; j++) {
      this.timeslots.push(this.getTimestamp());
    }

    this.ids.forEach((id, k) => {
      this.timeSlotData[id] = {};
      this.timeslots.forEach((ts, index) => {
        this.timeSlotData[id][ts] = [];

        for (let i = 0; i <= 50; i++) {
          let randomMin, randomMax;
          if (k === 0 || k === 5 || k === 10 || k === 15) {
            randomMin = Number(((Math.random() * 8) + 7));
            randomMax = Number(((Math.random() * 11) + 9));
          }

          if (k === 1 || k === 6 || k === 11 || k === 16) {
            randomMin = Number(((Math.random() * 18.5) + 17));
            randomMax = Number(((Math.random() * 19.5) + 19));
          }

          if (k === 2 || k === 7 || k === 12 || k === 17) {
            randomMin = Number(((Math.random() * 19) + 18.5));
            randomMax = Number(((Math.random() * 21) + 20));
          }

          if (k === 3 || k === 8 || k === 13 || k === 18) {
            randomMin = Number(((Math.random() * 13) + 12));
            randomMax = Number(((Math.random() * 15) + 14));
          } else {
            randomMin = Number(((Math.random() * 0.03) + 0.0001));
            randomMax = Number(((Math.random() * 0.08)  + 0.04));
          }


          const randomValue = Number(((Math.random() * randomMax) + randomMin).toFixed(4));
          this.timeSlotData[id][ts].push(randomValue > 0 ? randomValue : (-randomValue));
        }
      });
    });

    console.log('this.timeSlotData; ', this.timeSlotData);
    return this.timeSlotData;
  }

  generateMinMaxSeries() {
    const dataObject = {};
    this.ids.forEach(id => {
      dataObject[id] = [];
        this.timeslots.forEach(ts => dataObject[id].push([ts,
          this.timeSlotData[id][ts].reduce((a, b) => Math.min(a, b)),
          this.timeSlotData[id][ts].reduce((a, b) => Math.max(a, b))]));
      }
    );

    return dataObject;
  }

  generateAverageSeries() {
    const dataObject = {};
    this.ids.forEach(id => {
      dataObject[id] = [];
        this.timeslots.forEach(ts => dataObject[id].push([ts,
          (Number((this.timeSlotData[id][ts].reduce((a, b) => a + b, 0 ) / 51).toFixed(4)))]));
      }
    );

    console.log('this.dataObject: ', dataObject);
    return dataObject;
  }

  getTimestamp() {
    const today = new Date();
    this.minutesToSet = this.minutesToSet + 10;
    return today.setMinutes(this.minutesToSet);
  }
}
