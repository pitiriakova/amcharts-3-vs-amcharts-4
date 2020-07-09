import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnChanges {
  @Input() dataSource: string;
  @Output() percentileSwitched: EventEmitter<any> = new EventEmitter<{p1, p2}>();
  @Output() dataSourceChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() appSeriesToggled: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedPercentile;
  @Input() applicationsSeriesNames;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    console.log('changeschangeschanges: ', changes);
  }

  public onChangeDataSource(dataSource: string) {
    this.dataSourceChanged.emit(dataSource);
  }


  switchPercentile(p1, p2) {
    this.percentileSwitched.emit({p1, p2});
  }

  toggleApplicationSeries(id) {
    this.appSeriesToggled.emit(id);
  }
}
