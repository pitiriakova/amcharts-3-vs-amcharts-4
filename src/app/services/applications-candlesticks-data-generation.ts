export class ApplicationsCandlestickDataGenerator {
  timestamp: any = null;
  dataArray: any[] = [];
  minutesToSet = 0;
  counter = 0;
  q1: number;
  q2: number;

  id = '076b0d0d-d201-4213-bc72-822c9b54d602__app_start_time';
  currentIdIndex = 0;
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

  public timeSlotData: number[] = [];

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
