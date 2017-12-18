import {NgModule} from '@angular/core';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ConfirmModalComponent,
  ],
  exports: [
    ConfirmModalComponent,
  ],
})
export class ModalModule {}
