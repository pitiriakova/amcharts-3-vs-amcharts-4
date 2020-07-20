import candlestickData1090 from '../data/candlestick-data-10-90.json';
import candlestickData2575 from '../data/candlestick-data-25-75.json';
import {appIds} from '../shared/applications-series-ids';

export class ApplicationsCandlestickDataGenerator {
  timestamp: any = null;
  dataArray: any[] = [];
  minutesToSet = 0;
  counter = 0;
  q1: number;
  q2: number;

  id = '076b0d0d-d201-4213-bc72-822c9b54d602__app_start_time';
  currentIdIndex = 0;
  ids = appIds;

  public timeSlotData: number[] = [];

  getStaticData1090() {
    return candlestickData1090;
  }

  getStaticData2575() {
    return candlestickData2575;
  }

  // generate 100 values
  generateDataPerTimeSlot() {
    for (let i = 0; i <= 100; i++) {
      let randomMin, randomMax;

      if (i === 0 || i === 5 || i === 10 || i === 15) {
        randomMin = Math.random() * 8 + 7;
        randomMax = Math.random() * 11 + 9;
      } else if (i === 1 || i === 6 || i === 11 || i === 16) {
        randomMin = Math.random() * 18.5 + 17;
        randomMax = Math.random() * 19.5 + 19;
      } else if (i === 2 || i === 7 || i === 12 || i === 17) {
        randomMin = Math.random() * 19 + 18.5;
        randomMax = Math.random() * 21 + 20;
      } else if (i === 3 || i === 8 || i === 13 || i === 18) {
        randomMin = Math.random() * 13 + 12;
        randomMax = Math.random() * 15 + 14;
      } else {
        randomMin = Math.random() * 0.03 + 0.0001;
        randomMax = Math.random() * 0.08  + 0.04;
      }

      this.timeSlotData.push(Number((Math.random() * randomMax + randomMin).toFixed(4)));
    }

    return this.timeSlotData.sort();
  }

  private getPercentile(num: number) {
    const index = this.timeSlotData.length * (num / 100);

    if (index % 2 === 0) {
      return this.timeSlotData[index];
    } else {
      return (this.timeSlotData[Math.round(index)] + this.timeSlotData[Math.floor(index)]) / 2;
    }
  }

  generateApplicationsData(q1?: number, q2?: number) {
    if (this.counter === 0) {
      this.q1 = q1;
      this.q2 = q2;
      this.id = this.ids[0];
    }

    this.timeSlotData = [];
    this.generateDataPerTimeSlot();

    this.counter = this.counter + 1;

    if (this.counter % 6 === 0) {
      this.id = this.getNextId();
    }

    const obj = {
      id: this.id,
      timestamp: this.getTimestamp(),
      [this.id + '_max']: this.timeSlotData.reduce((a, b) => Math.max(a, b)),
      [this.id + '_min']: this.timeSlotData.reduce((a, b) => Math.min(a, b)),
      [this.id + '_l1']: this.getPercentile(this.q1),
      [this.id + '_l2']: this.getPercentile(this.q2),
      [this.id + '_value']: (this.timeSlotData[0] + this.timeSlotData[this.timeSlotData.length - 1]) / 2,
      label: 'Duration',
      'description': [
        {
          'label': 'User Account',
          'value': 'dummy\\user29'
        },
        {
          'label': 'Launcher',
          'value': 'DESKTOP-VJNL42L 1'
        },
        {
          'label': 'Locale',
          'value': 'English (United States)'
        },
        {
          'label': 'Remoting Protocol',
          'value': 'Rdp'
        },
        {
          'label': 'Resolution',
          'value': '1080 × 1920'
        },
        {
          'label': 'Scale Factor',
          'value': '100%'
        },
        {
          'label': 'Target Host',
          'value': 'IntegrationTester'
        },
        {
          'label': 'Target O S',
          'value': 'IntegrationTester'
        }
      ]
    };


    this.dataArray.push(obj);
    if (this.counter === 119) {
      const arrayToReturn = [...this.dataArray];
      this.resetService();
      return arrayToReturn;
    } else {
      return this.generateApplicationsData();
    }
  }

  resetService () {
    this.counter = 0;
    this.id = this.ids[0];
    this.dataArray = [];
    this.timeSlotData = [];
  }

  getTimestamp(): string {
    const today = new Date();
    if (this.counter % 6 === 0) {
      this.minutesToSet = 0;
    } else {
      this.minutesToSet = this.minutesToSet + 10;
    }

    const seconds = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();

    return `${today.getHours()}:${this.minutesToSet < 10 ? '0' + this.minutesToSet : this.minutesToSet}:55`;
  }

  getNextId () {
    if (this.counter % 6 === 0) {
      this.currentIdIndex = this.currentIdIndex + 1;
      return this.id = this.ids[this.currentIdIndex];
    }
  }
}
