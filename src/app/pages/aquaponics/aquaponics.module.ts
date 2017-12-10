import { NgModule } from '@angular/core';

import { AquaponicsRoutingModule, routedComponents } from './aquaponics-routing.module';

@NgModule({
  imports: [
    AquaponicsRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AquaponicsModule { }
