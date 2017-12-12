import { Component } from '@angular/core';
import { AquaponicSystem } from '../../../Ponics.Api.dtos';
import {PonicsService} from '../../../ponics.service';


@Component({
    selector: 'ngx-aquaponics-addsystem',
    templateUrl: './aquaponics-addsystem.component.html',
})

export class AquaponicAddSystemComponent {
  newAquaponicSystem = new AquaponicSystem();

  constructor(private ponicsService: PonicsService) {

  }

  onCreateAquaponicSystem() {
    this.ponicsService.addAquaponicSystem(this.newAquaponicSystem);
    this.newAquaponicSystem = new AquaponicSystem();
  }
}
