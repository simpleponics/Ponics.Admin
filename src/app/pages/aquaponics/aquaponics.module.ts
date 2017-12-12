import {NgModule} from '@angular/core';

import {AquaponicsRoutingModule, routedComponents } from './aquaponics-routing.module';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    AquaponicsRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ]
})
export class AquaponicsModule {
  constructor() {
    console.log('AquaponicsModule');
  }
}
