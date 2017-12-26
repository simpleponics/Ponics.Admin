import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ngx-level-value',
  templateUrl: './level-value.component.html',
})
export class LevelValueComponent {
  @Input() levelName: string = '';
  @Input() analyseQuery: any;
  @Output() onDeleteValue: EventEmitter<LevelValueComponent> = new EventEmitter<LevelValueComponent>();
  @Input() control: FormControl;
  @Input() validationErrorMessage: string;

  deleteValue() {
    this.onDeleteValue.emit(this);
  }
}
