import {Component, OnInit} from '@angular/core';
import {LoginTimesCandlestickDataGenerator} from '../../../services/candlesticks-data-generation';

@Component({
  selector: 'app-amcharts-candlestick-page',
  templateUrl: './amcharts-candlestick-page.component.html',
  styleUrls: ['./amcharts-candlestick-page.component.css']
})
export class AmchartsCandlestickPageComponent implements OnInit {
  data: any[];

  constructor(private _loginTimesCandlestickDataGenerator: LoginTimesCandlestickDataGenerator) {

  }

  ngOnInit() {
  }

}
