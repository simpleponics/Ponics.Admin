import { Component, Input } from '@angular/core';
import { AquaponicSystem } from '../../../Ponics.Api.dtos';

@Component({
    selector: 'ngx-aquaponicsystem',
    templateUrl: './aquaponicsystem.component.html'
})

export class AquaponicSystemComponent {
    @Input() aquaponicSystem: AquaponicSystem;
}
