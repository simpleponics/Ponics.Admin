import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { BusyModule} from 'angular2-busy';
import {OrganismsRoutingModule, routedComponents} from './organisms-routing.module';
import {environment} from '../../../environments/environment';
import {OrganismDetailComponent} from './organism-detail/organism-detail.component';
import {ModalModule} from '../../modal/modal.module';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';
import {AddToleranceModalComponent} from './organism-detail/add-tolerance/add-tolerance-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomEditorComponent} from './organism-detail/custom-editor/custom-editor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OrganismsComponent} from './organisms.component';
import {AddOrganismModalComponent} from './add-organism/add-organism-modal.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    OrganismsRoutingModule,
    BusyModule.forRoot(environment.busyConfig),
    ModalModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  exports: [
    OrganismDetailComponent,
    OrganismsComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
    AddToleranceModalComponent,
    CustomEditorComponent,
    AddOrganismModalComponent,
  ],
})
export class OrganismsModule {
}
