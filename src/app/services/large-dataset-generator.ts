import {Injectable} from '@angular/core';
import zoomData from '../charts/chart-types/zoom-charts-page/zoom-chart/zoom-data.json';
import zoomAverageData from '../charts/chart-types/zoom-charts-page/zoom-chart/zoom-average-data.json';
import rangeChartMaxMinData from '../charts/chart-types/range-charts-page/range-chart/range-chart-max-min-data.json'
import {appIds} from '../shared/applications-series-ids';

@Injectable({
  providedIn: 'root'
})

export class LargeDatasetGenerator {
  public oneHourData: any[] = [];
  secondsToSet = 0;
  minutesToSet = 0;
  currentHour = new Date(new Date().setMinutes(0, 0));

  data = {};
  ids = appIds;
  constructor() {
  }

  getStaticDataSet() {
    return zoomData;
  }

  getAveragesBasedOnStaticDataset() {
    return zoomAverageData;
  }


  getMinMaxFromStaticDataset() {
    return rangeChartMaxMinData;
  }

  // getMinMaxFromRecentlyGeneratedData() {
  //   const minMaxes = {};
  //   for (const serieName in this.data) {
  //     minMaxes[serieName] = [];
  //     let allTimeSlotData = [];
  //     let currentTimeSlot = null;
  //     for (let seriesDataIndex = 0; seriesDataIndex < this.data[serieName].length; seriesDataIndex++) {
  //
  //       // if first value per timeslot
  //       if (seriesDataIndex % 307 === 0) {
  //         if (seriesDataIndex !== 0) {
  //           currentTimeSlot = this.data[serieName][seriesDataIndex - 307][0];
  //           minMaxes[serieName].push([currentTimeSlot,
  //             Number((allTimeSlotData.reduce((a, b) => Math.min(a, b))).toFixed(4)),
  //             Number((allTimeSlotData.reduce((a, b) => Math.max(a, b))).toFixed(4))
  //           ]);
  //         }
  //         if (seriesDataIndex > 1535) {
  //           currentTimeSlot = this.data[serieName][seriesDataIndex][0];
  //           minMaxes[serieName].push([currentTimeSlot,
  //             Number((allTimeSlotData.reduce((a, b) => Math.min(a, b))).toFixed(4)),
  //             Number((allTimeSlotData.reduce((a, b) => Math.max(a, b))).toFixed(4))]);
  //         }
  //
  //         allTimeSlotData = [];
  //         currentTimeSlot = null;
  //       } else {
  //         allTimeSlotData.push(this.data[serieName][seriesDataIndex][1]);
  //       }
  //     }
  //   }
  //
  //   return minMaxes;
  // }

  getAveragesFromRecentlyGeneratedDataset() {
    const averages = {};
    for (const serieName in this.data) {
      averages[serieName] = [];
      let allTimeSlotData = [];
      let currentTimeSlot = null;
      for (let seriesDataIndex = 0; seriesDataIndex < this.data[serieName].length; seriesDataIndex++) {

        // if first value per timeslot
        if (seriesDataIndex % 307 === 0) {
          if (seriesDataIndex !== 0) {
            currentTimeSlot = this.data[serieName][seriesDataIndex - 307][0];
            averages[serieName].push([currentTimeSlot, Number((allTimeSlotData.reduce((a, b) => a + b, 0) / 300).toFixed(4))]);
          }
          if (seriesDataIndex >= 1535) {
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

  getRandomValue(k) {
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

    return randomValue > 0 ? randomValue : (-randomValue);
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
