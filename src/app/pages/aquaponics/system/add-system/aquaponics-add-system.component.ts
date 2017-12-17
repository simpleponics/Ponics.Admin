import { Component } from '@angular/core';
import { AquaponicSystem } from '../../../../@core/data/Ponics.Api.dtos';
import { PonicsService } from '../../../../@core/data/ponics.service';


@Component({
    selector: 'ngx-aquaponics-add-system',
    templateUrl: './aquaponics-add-system.component.html',
})

export class AquaponicsAddSystemComponent {
  newAquaponicSystem = new AquaponicSystem();

  constructor(private ponicsService: PonicsService) {
  }

  onCreateAquaponicSystem() {
    this.ponicsService.addAquaponicSystem(this.newAquaponicSystem);
    this.newAquaponicSystem = new AquaponicSystem();
  }
}
