import { Component, EventEmitter, Output } from '@angular/core';
import { AquaponicSystem } from '../../../Ponics.Api.dtos';

@Component({
    selector: 'ngx-addaquaponicsystem',
    templateUrl: './addaquaponicsystem.component.html',
})

export class AddAquaponicSystemComponent {
    @Output() aquaponicSystemAdded = new EventEmitter<AquaponicSystem>();
    newAquaponicSystem = new AquaponicSystem();

    onCreateAquaponicSystem() {
        this.aquaponicSystemAdded.emit(this.newAquaponicSystem);
        this.newAquaponicSystem = new AquaponicSystem();
    }
}
