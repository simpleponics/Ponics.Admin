import { Component, Input } from '@angular/core';
import { AquaponicSystem } from '../../../Ponics.Api.dtos';
import {PonicsService} from '../../../ponics.service';

@Component({
  selector: 'ngx-aquaponicsystem',
  templateUrl: './aquaponics-system.component.html',
})

export class AquaponicSystemComponent {
    aquaponicSystem: AquaponicSystem;

    constructor(private ponicsService: PonicsService) {

    }
}
