import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

export class ModalComponent {

  constructor(protected activeModal: NgbActiveModal) {
  }

  closeModal() {
    this.activeModal.close();
  }
}
