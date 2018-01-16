import {NgModule} from '@angular/core';

import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {OrganismsRoutingModule, routedComponents} from './organisms-routing.module';
import {OrganismDetailComponent} from './organism-detail/organism-detail.component';
import {ModalModule} from '../../modal/modal.module';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';
import {AddToleranceModalComponent} from './organism-detail/add-tolerance/add-tolerance-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomEditorComponent} from './organism-detail/custom-editor/custom-editor.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OrganismsComponent} from './organisms.component';
import {AddOrganismModalComponent} from './add-organism/add-organism-modal.component';
import {NgBusyModule} from 'ng-busy';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    OrganismsRoutingModule,
    ModalModule,
    ReactiveFormsModule,
    NgbModule,
    NgBusyModule,
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
