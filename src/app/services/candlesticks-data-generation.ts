import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandlestickDataGenerator {
  timestamp: any = null;
  dataArray: any[] = [];
  minutesToSet = 0;
  counter = 0;
  id = 'connection';

  generateCandlestickData() {
    console.log('this.counter: ', this.counter);
    this.counter = this.counter + 1;

    if (this.counter % 12 === 0) {
      this.id = this.getNextId();
    }

    const value = this.getValue();
    const min =  this.getMin(value);
    const max =  this.getMax(value);

    const obj = {
      id: this.id,
      timestamp: this.getTimestamp(),
      [this.id + '_max']: max.toFixed(4),
      [this.id + '_min']: min.toFixed(4),
      [this.id + '_value']: value.toFixed(4),
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
    if (this.counter === 48) {
      return this.dataArray;
    } else {
      return this.generateCandlestickData();
    }
  }

  getTimestamp(): string {
    const today = new Date();
    if (this.counter % 12 === 0) {
      this.minutesToSet = 0;
    } else {
      this.minutesToSet = this.minutesToSet + 5;
    }

    const seconds = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();

    return `${today.getHours()}:${this.minutesToSet < 10 ? '0' + this.minutesToSet : this.minutesToSet}:55`;
  }

  getNextId () {
    if (this.counter === 12) {
      return this.id = 'user_profile';
    }

    if (this.counter === 24) {
      return this.id = 'group_policies';
    }

    if (this.counter === 36) {
      return this.id = 'total_login_time';
    }
  }

  getMax(value: number): number {
    return Number((Math.random() * value).toFixed(4));
  }

  getMin(value: number): number {
    return  Number((Math.random() * value).toFixed(4));
  }

  getValue(): number {
    // from 0.8 till 2.1
    return Number((Math.random() * 2.1 + 0.8).toFixed(4));
  }
}
