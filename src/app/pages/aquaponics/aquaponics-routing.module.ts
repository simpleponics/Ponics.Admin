import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AquaponicSystemComponent} from './aquaponicsystem/aquaponicsystem.component';
import {AddAquaponicSystemComponent} from './addaquaponicsystem/addaquaponicsystem.component';
import {AquaponicsComponent} from './aquaponics.component';

const routes: Routes = [{
  path: '',
  component: AquaponicSystemComponent,
  children: [
    {
      path: 'add',
      component: AddAquaponicSystemComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AquaponicsRoutingModule { }

export const routedComponents = [
  AquaponicsComponent,
  AquaponicSystemComponent,
  AddAquaponicSystemComponent,
];
