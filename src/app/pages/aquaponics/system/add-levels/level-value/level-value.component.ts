import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LevelReading} from '../../../../../@core/data/Ponics.Api.dtos';

@Component({
  selector: 'ngx-level-value',
  templateUrl: './level-value.component.html',
})
export class LevelValueComponent implements OnInit {
  @Input() type: string = '';
  @Output() onDeleteValue: EventEmitter<LevelValueComponent> = new EventEmitter<LevelValueComponent>();
  @Input() control: FormControl;
  @Input() validationErrorMessage: string;
  levelReading: LevelReading = new LevelReading();

  ngOnInit(): void {
    this.levelReading.type = this.type;
  }

  deleteValue() {
    this.onDeleteValue.emit(this);
  }
}
