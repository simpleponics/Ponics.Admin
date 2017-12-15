import {NgModule} from '@angular/core';

import {AquaponicsRoutingModule, routedComponents } from './aquaponics-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {AddLevelsModalComponent} from './system/add-levels/add-levels-modal.component';
import {LevelValueComponent} from './system/add-levels/level-value/level-value.component';
import {AddComponentModalComponent} from './system/add-component/add-component-modal.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    AquaponicsRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents: [
    AddLevelsModalComponent,
    LevelValueComponent,
    AddComponentModalComponent
  ],
})
export class AquaponicsModule {
  constructor() {
    console.log('AquaponicsModule');
  }
}
