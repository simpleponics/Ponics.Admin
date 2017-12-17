import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { BusyModule} from 'angular2-busy';
import {OrganismsRoutingModule, routedComponents} from './organisms-routing.module';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    OrganismsRoutingModule,
    BusyModule.forRoot(environment.BusyConfig),
  ],
  declarations: [
    ...routedComponents,
  ],

})
export class OrganismsModule {
}
