import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AquaponicSystemComponent} from './system/aquaponic-system.component';
import {AquaponicsComponent} from './aquaponics.component';
import {AquaponicsAddSystemComponent} from './system/add-system/aquaponics-add-system.component';
import {AddLevelsModalComponent} from './system/add-levels/add-levels-modal.component';
import {LevelValueComponent} from './system/add-levels/level-value/level-value.component';
import {AddComponentModalComponent} from './system/add-component/add-component-modal.component';


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
      component: AquaponicSystemComponent,
    },
    {
      path: 'systems/:systemId/components/:componentId',
      component: AquaponicSystemComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AquaponicsRoutingModule {
}

export const routedComponents = [
  AquaponicsComponent,
  AquaponicSystemComponent,
  AquaponicsAddSystemComponent,
  AddLevelsModalComponent,
  LevelValueComponent,
  AddComponentModalComponent,
];
