import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PonicsService} from '../../../../@core/data/ponics.service';
import {
  Organism, Tolerance,
} from '../../../../@core/data/Ponics.Api.dtos';
import {ModalComponent} from '../../../../modal/modal.component';

@Component({
  selector: 'ngx-add-tolerance-modal',
  templateUrl: './add-tolerance-modal.component.html',
  styleUrls: ['./add-tolerance-modal.component.scss'],
})
export class AddToleranceModalComponent extends ModalComponent {
  @Input() organism: Organism;
  @Input() tolerance: Tolerance = new Tolerance;

  constructor(
    private ponicsService: PonicsService,
    activeModal: NgbActiveModal) {
    super(activeModal);
  }
}
