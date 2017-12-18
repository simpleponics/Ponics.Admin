import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {OrganismDetailComponent} from './organism-detail/organism-detail.component';
import {OrganismsComponent} from './organisms.component';



const routes: Routes = [{
  path: '',
  component: OrganismsComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganismsRoutingModule {
}

export const routedComponents = [
  OrganismsComponent,
  OrganismDetailComponent,
];
