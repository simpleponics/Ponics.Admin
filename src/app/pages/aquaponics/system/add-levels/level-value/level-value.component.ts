import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'ngx-level-value',
  templateUrl: './level-value.component.html',
})
export class LevelValueComponent {
  @Input() levelName: string = '';
  @Input() analyseQuery: any;
  @Output() onDeleteValue: EventEmitter<LevelValueComponent> = new EventEmitter<LevelValueComponent>();

  deleteValue() {
    this.onDeleteValue.emit(this);
  }
}
