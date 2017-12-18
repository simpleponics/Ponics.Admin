
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../modal.component';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchStringValidator} from '../../@core/validators/matchStringValidator';

@Component({
  selector: 'ngx-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent extends ModalComponent implements OnInit {
  @Input() challengeQuestion: string;
  @Input() challengeAnswer: string;
  @Input() confirmModalTitle: string;
  @Input() confirmModalButtonText: string;
  @Input() confirmationSuccessful: Function;

  challengeForm: FormGroup;

  constructor(protected activeModal: NgbActiveModal) {
    super(activeModal);
  }

  ngOnInit(): void {
    this.challengeForm = new FormGroup({
      'userAnswer': new FormControl(
        null,
        [
            Validators.required,
            matchStringValidator(this.challengeAnswer),
          ]
        ),
    });
  }

  onSubmit() {
    if (this.challengeForm.valid) {
      this.confirmationSuccessful();
      this.closeModal();
    }
  }
}
