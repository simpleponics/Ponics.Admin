import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AquaponicSystemComponent} from './system/aquaponics-system.component';

import {AquaponicsComponent} from './aquaponics.component';
import {PonicsService} from '../../ponics.service';
import {AquaponicAddSystemComponent} from './addsystem/aquaponics-addsystem.component';

const routes: Routes = [{
  path: '',
  component: AquaponicsComponent,
  children: [
    {
      path: 'add',
      component: AquaponicAddSystemComponent,
    },
    {
      path: 'systems/:id',
      component: AquaponicSystemComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AquaponicsRoutingModule {
  constructor(private ponicsService: PonicsService) {
  }
}

export const routedComponents = [
  AquaponicsComponent,
  AquaponicSystemComponent,
  AquaponicAddSystemComponent,
];
