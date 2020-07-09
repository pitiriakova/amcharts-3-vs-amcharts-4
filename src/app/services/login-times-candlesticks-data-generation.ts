import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginTimesCandlestickDataGenerator {
  timestamp: any = null;
  dataArray: any[] = [];
  stackedChartDataArray: any[] = [];
  minutesToSet = 0;
  counter = 0;
  q1; q2;
  id = 'connection';
  ids = [ 'connection', 'total_login_time', 'user_profile', 'group_policies'];
  currentIdIndex = 0;

  public timeSlotData = [];

  constructor() {

  }

  // generate 100 values
  generateDataPerTimeSlot() {
    for (let i = 0; i <= 100; i++) {
      const randomMin = Number((Math.random() * 0.3 + 0.9));
      const randomMax = Number((Math.random() * 1.5 + 2.6));

      this.timeSlotData.push(Number((Math.random() * randomMax + randomMin).toFixed(4)));
    }

    return this.timeSlotData.sort();
  }


  generateCandlestickLoginChartData(q1?, q2?) {
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

    this.stackedChartDataArray.push(obj);
    if (this.counter === 22) {
      this.counter = 0;
      return this.stackedChartDataArray;
    } else {
      return this.generateCandlestickLoginChartData();
    }
  }

  private getPercentile(num: number) {
    const index = this.timeSlotData.length * (num / 100);

    if (index % 2 === 0) {
      return this.timeSlotData[index];
    } else {
      return (this.timeSlotData[Math.round(index)] + this.timeSlotData[Math.floor(index)]) / 2;
    }
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
