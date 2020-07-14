import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RangeChartDataGenerator {
  timestamp: any = null;
  minutesToSet = 0;

  id = '076b0d0d-d201-4213-bc72-822c9b54d602__app_start_time';
  ids = [
    // App1
    '076b0d0d-d201-4213-bc72-822c9b54d602__app_start_time',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement1',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement2',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement3',
    '076b0d0d-d201-4213-bc72-822c9b54d602__measurement4',

    // App2
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__app_start_time',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement1',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement2',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement3',
    'c0b2ce10-499a-4192-8a6c-89f0258e0f39__measurement4',

    // App3
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__app_start_time',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement1',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement2',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement3',
    '983d01b5-d210-4a3e-9bec-d7f2e640cc21__measurement4',

    // App4
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__app_start_time',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement1',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement2',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement3',
    '2bd3b2b9-75b7-422e-8a15-dea3036b4d8d__measurement4',
  ];

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

    this.ids.forEach(id => {
      this.timeSlotData[id] = {};
      this.timeslots.forEach((ts, index) => {
        this.timeSlotData[id][ts] = [];

        for (let i = 0; i <= 50; i++) {

          // TODO: for login times:
          // const randomMin = Number((Math.random() * 0.3 + 0.9));
          // const randomMax = Number((Math.random() * 1.5 + 2.6));

          const randomMin = Number((Math.random() * (0.0001 - 0.03)));
          const randomMax = Number((Math.random() * (0.08 - 0.04)));

          this.timeSlotData[id][ts].push(Number((Math.random() * randomMax - randomMin).toFixed(4)));
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
