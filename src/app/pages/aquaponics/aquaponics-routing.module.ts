import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AquaponicsSystemComponent} from './system/aquaponics-system.component';
import {AquaponicsComponent} from './aquaponics.component';
import {AquaponicsAddSystemComponent} from './add-system/aquaponics-add-system.component';
import {AquaponicsSystemComponentComponent} from './system/component/aquaponics-system-component.component';
import {AquaponicsSystemComponentOrganismComponent} from './system/component/organism/aquaponics-system-component-organism.component';
import {AddLevelsModalComponent} from './system/component/add-levels/add-levels-modal.component';

const routes: Routes = [{
  path: '',
  component: AquaponicsComponent,
  children: [
    {
      path: 'add',
      component: AquaponicsAddSystemComponent,
    },
    {
      path: 'systems/:systemId',
      component: AquaponicsSystemComponent,
    },
    {
      path: 'systems/:systemId/components/:componentId',
      component: AquaponicsSystemComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AquaponicsRoutingModule {
  constructor() {
    console.log('AquaponicsRoutingModule');
  }
}

export const routedComponents = [
  AquaponicsComponent,
  AquaponicsSystemComponent,
  AquaponicsAddSystemComponent,
  AquaponicsSystemComponentComponent,
  AquaponicsSystemComponentOrganismComponent,
  AddLevelsModalComponent,
];
