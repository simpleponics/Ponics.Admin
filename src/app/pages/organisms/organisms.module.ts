import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { BusyModule} from 'angular2-busy';
import {OrganismsRoutingModule, routedComponents} from './organisms-routing.module';
import {environment} from '../../../environments/environment';
import {OrganismDetailComponent} from './organism-detail/organism-detail.component';
import {ModalModule} from '../../modal/modal.module';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    OrganismsRoutingModule,
    BusyModule.forRoot(environment.BusyConfig),
    ModalModule
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [
    OrganismDetailComponent,
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
})
export class OrganismsModule {
}
