import {Component, Input} from '@angular/core';

@Component({
  selector: 'ngx-level-value',
  templateUrl: './level-value.component.html',
})
export class LevelValueComponent {
  @Input() levelName: string = '';
  @Input() analyseQuery: any;
}
