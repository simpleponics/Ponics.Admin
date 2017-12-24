import {NgModule} from '@angular/core';

import {AquaponicsRoutingModule, routedComponents } from './aquaponics-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {AddLevelsModalComponent} from './system/add-levels/add-levels-modal.component';
import {LevelValueComponent} from './system/add-levels/level-value/level-value.component';
import {AddComponentModalComponent} from './system/add-component/add-component-modal.component';
import {BusyModule} from 'angular2-busy';
import {environment} from '../../../environments/environment';
import {OrganismsModule} from '../organisms/organisms.module';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    AquaponicsRoutingModule,
    BusyModule.forRoot(environment.busyConfig),
    OrganismsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents: [
    AddLevelsModalComponent,
    LevelValueComponent,
    AddComponentModalComponent,
  ],
})
export class AquaponicsModule {}
