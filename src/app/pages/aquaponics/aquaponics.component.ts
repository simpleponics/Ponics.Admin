import { Component } from '@angular/core';
import {PonicsService} from '../../@core/data/ponics.service';

@Component({
  selector: 'ngx-aquaponics',
  templateUrl: './aquaponics.component.html',
})
export class AquaponicsComponent {
  constructor(private ponicsService: PonicsService) {
    console.log('AquaponicsComponent');
  }
}
