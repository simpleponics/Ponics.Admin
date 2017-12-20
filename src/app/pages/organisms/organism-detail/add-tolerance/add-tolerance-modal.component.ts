import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {PonicsService} from '../../../../@core/data/ponics.service';
import {
  Organism,
  Tolerance,
} from '../../../../@core/data/Ponics.Api.dtos';
import {ModalComponent} from '../../../../modal/modal.component';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {OrganismService} from '../../../../@core/data/organism.service';
import {tolerances, tolerancesValidators} from '../../../../@core/data/PonicsMaps';
import {toleranceValidator} from '../../../../@core/validators/toleranceValidator';

@Component({
  selector: 'ngx-add-tolerance-modal',
  templateUrl: './add-tolerance-modal.component.html',
  styleUrls: ['./add-tolerance-modal.component.scss'],
})
export class AddToleranceModalComponent extends ModalComponent implements OnInit {

  @Input() organism: Organism;
  @Input() tolerance: Tolerance = new Tolerance;

  addTolerancesCommandsKeys: string[] = [];
  toleranceForm: FormGroup;
  validationErrorMessage: string;

  constructor(private ponicsService: PonicsService,
              private organismService: OrganismService,
              activeModal: NgbActiveModal) {
    super(activeModal);
  }

  ngOnInit() {
    this.addTolerancesCommandsKeys = this.organismService.getMissingTolerances(this.organism);
    this.toleranceForm = new FormGroup({
      'tolerance': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      'upper': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      'lower': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      'desiredUpper': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
      'desiredLower': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
    });
  }

  onToleranceChange(): void {
    const selectedTolerance = this.toleranceForm.get('tolerance').value;
    let validator = toleranceValidator;
    this.validationErrorMessage = 'is required';

    if (tolerancesValidators.has(selectedTolerance)) {
      const tolerancesValidator = tolerancesValidators.get(selectedTolerance);
      validator = tolerancesValidator.validator;
      this.validationErrorMessage = tolerancesValidator.validationErrorMessage;
    }

    this.setControlValidator('upper', validator);
    this.setControlValidator('lower', validator);
    this.setControlValidator('desiredUpper', validator);
    this.setControlValidator('desiredLower', validator);
  }

  private setControlValidator(
    path: string,
    validator: (formControlName: string) => (control: AbstractControl) => ({} | ValidationErrors)) {
    const control = this.toleranceForm.get(path);
    control.setValidators(validator(path));
    control.updateValueAndValidity();
  }

  onSubmit(): void {
    const selectedTolerance = this.toleranceForm.get('tolerance').value;
    const tolerance = tolerances.get(selectedTolerance);

    tolerance.upper = this.toleranceForm.get('tolerance').value;
    tolerance.lower = this.toleranceForm.get('lower').value;
    tolerance.desiredUpper = this.toleranceForm.get('desiredUpper').value;
    tolerance.desiredLower = this.toleranceForm.get('desiredLower').value;

    console.log(tolerance);

    this.organismService.addTolerance(this.organism.id, tolerance, selectedTolerance);

  }
}
