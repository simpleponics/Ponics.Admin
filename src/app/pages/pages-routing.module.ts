import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {OrganismsComponent} from './organisms/organisms.component';
import {CallbackComponent} from './callback/callback.component';
import {AuthGuardService} from '../@core/data/auth/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: 'callback', component: CallbackComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'aquaponics',
      loadChildren: './aquaponics/aquaponics.module#AquaponicsModule',
      canActivate: [AuthGuardService],
    },
    {
      path: 'organisms',
      component: OrganismsComponent,
      canActivate: [AuthGuardService],
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
