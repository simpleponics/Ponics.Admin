import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {OrganismsComponent} from "./organisms/organisms.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'aquaponics',
      loadChildren: './aquaponics/aquaponics.module#AquaponicsModule',
    },
    {
      path: 'organisms',
      component: OrganismsComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
