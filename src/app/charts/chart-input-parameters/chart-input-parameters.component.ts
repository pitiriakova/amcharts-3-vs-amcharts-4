import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-chart-input-parameters',
  templateUrl: './chart-input-parameters.component.html',
  styleUrls: ['./chart-input-parameters.component.css']
})
export class ChartInputParametersComponent {
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter();
  public dataPointsCount = 100;
  public seriesCount = 3;

  constructor() { }

  public updateData(): void {
    this.dataUpdated.emit({dataPointsCount: this.dataPointsCount, seriesCount: this.seriesCount});
  }

}
