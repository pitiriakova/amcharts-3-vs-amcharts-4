import {Injectable} from '@angular/core';
import zoomData from './zoom-chart/zoom-data.json';
import zoomAverageData from './zoom-chart/zoom-average-data.json';

@Injectable({
  providedIn: 'root'
})

export class ZoomChartDataGenerator {
  public oneHourData: any[] = [];
  secondsToSet = 0;
  minutesToSet = 0;
  currentHour = new Date(new Date().setMinutes(0, 0));

  data = {};
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

  start = 0;
  end = 300;

  constructor() {
    console.log('this.currentHour: ', this.currentHour);
  }

  getStaticDataSet() {
    console.log('zoomData: ', zoomData);
    return zoomData;
  }

  getAveragesBasedOnStaticDataset() {
    return zoomAverageData;
  }

  getAveragesFromRecentlyGeneratedDataset() {
    const averages = {};
    for (const serieName in this.data) {
      averages[serieName] = [];
      let allTimeSlotData = [];
      let currentTimeSlot = null;
      for (let seriesDataIndex = 0; seriesDataIndex < this.data[serieName].length; seriesDataIndex++) {

        // if first value per timeslot
        if (seriesDataIndex % 300 === 0) {
          if (seriesDataIndex !== 0) {
            currentTimeSlot = this.data[serieName][seriesDataIndex - 300][0];
            averages[serieName].push([currentTimeSlot, Number((allTimeSlotData.reduce((a, b) => a + b, 0) / 300).toFixed(4))]);
          }
          if (seriesDataIndex === 1800) {
            currentTimeSlot = this.data[serieName][seriesDataIndex][0];
            averages[serieName].push([currentTimeSlot, Number((allTimeSlotData.reduce((a, b) => a + b, 0) / 300).toFixed(4))]);
          }

          allTimeSlotData = [];
          currentTimeSlot = null;
        } else {
          allTimeSlotData.push(this.data[serieName][seriesDataIndex][1]);
        }
      }
    }

    return averages;
  }

  getTimeStamp() {
    return this.currentHour.setHours(new Date().getHours(), this.minutesToSet, this.secondsToSet);
  }

  getRandomValue(i) {
    let randomMin = Number((Math.random() * ( 0.03 - 0.0001) + 0.0001));
    let randomMax = Number((Math.random() * (0.08 - 0.04) + 0.04));

    if (i % 5 === 0) {
      randomMin = Number((Math.random() * (8 - 7) + 7));
      randomMax = Number((Math.random() * (11 - 9) + 9));
    }

    if (i % 4 === 0) {
      randomMin = Number((Math.random() * (18.5 - 17) + 17));
      randomMax = Number((Math.random() * (19.5 - 19) + 19));
    }

    if (i % 3 === 0) {
      randomMin = Number((Math.random() * (19 - 18.5) + 18.5));
      randomMax = Number((Math.random() * (25 - 20) + 20));
    }

    if (i % 2 === 0) {
      randomMin = Number((Math.random() * (25 - 23) + 23));
      randomMax = Number((Math.random() * (32 - 31) + 31));
    }

    return Number((Math.random() * (randomMax - randomMin) + randomMin - i).toFixed(4));
  }

  getOneHourData(i) {
    this.oneHourData = [];

      do {
        if (this.secondsToSet === 60) {
          this.secondsToSet = 0;
          this.minutesToSet = this.minutesToSet + 1;
        } else {
          this.secondsToSet = this.secondsToSet + 2;
        }

        this.oneHourData.push([this.getTimeStamp(), this.getRandomValue(i)]);
      }
      while (this.minutesToSet < 60);

      return this.oneHourData;
    // }
  }

  generateRandomDataset() {
    for (let i = 0; i < this.ids.length; i++) {
      if (i < this.ids.length) {
        this.secondsToSet = 0;
        this.minutesToSet = 0;
      }
      this.data[this.ids[i]] = this.getOneHourData(i);
    }
    // console.log('this.ids.forEach(id => this.data[id] = this.getOneHourData());:" ', this.ids.forEach(id => this.data[id] = this.getOneHourData()))
    return this.data;
  }

  // getTenPercentOfRandomData() {
  //   const dataObject = {};
  //   const tenPercentsOfAllValues = this.timeStamps * 0.1;
  //   this.ids.forEach(id => {
  //       dataObject[id] = [];
  //       this.timeStamps.forEach(ts => {
  //         for (let i = 0; i < 101; i++) {
  //           const randomValue = ts[Math.floor(Math.random() * ts.length)];
  //           dataObject[id]
  //             .push(
  //               [
  //                 ts,
  //                 randomValue
  //               ]
  //             );
  //         }
  //         }
  //       );
  //     }
  //   );
  //
  //   console.log('this.dataObject: ', dataObject);
  //   return dataObject;
  // }

  // getDetailedData(from, to) {
  // console.log('getTenPercentOfRandomData: ', this.getTenPercentOfRandomData());
  // }
}
