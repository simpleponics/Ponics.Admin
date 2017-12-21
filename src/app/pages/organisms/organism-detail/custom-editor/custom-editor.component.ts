import {Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import {DefaultEditor} from 'ng2-smart-table';
import {FormControl} from '@angular/forms';
import {tolerancesValidators} from '../../../../@core/data/PonicsMaps';
import {OrganismService} from '../../../../@core/data/organism.service';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {toleranceValidator} from '../../../../@core/validators/toleranceValidator';

@Component({
  templateUrl: './custom-editor.component.html',
})
export class CustomEditorComponent extends DefaultEditor implements AfterViewInit, OnInit {
  @ViewChild('p') public popover: NgbPopover;
  control: FormControl;
  value;
  validationErrorMessage: string;

  constructor(private organismService: OrganismService) {
    super();
    this.control = new FormControl('');
    this.control.statusChanges
      .subscribe(s => {

        const data = this.cell.getRow().getData();
        const id = this.cell.getId();

        if (typeof data.validation === 'undefined') {
          data.validation = [];
        }

        if (!data.validation[id] === undefined) {
          data.validation.push(id);
        }
        data.validation[id] = s;

        if (s === 'INVALID') {
          this.popover.open();
        } else {
          this.popover.close();
        }
      });
  }

  ngOnInit(): void {
    this.value = this.cell.getValue();
  }

  ngAfterViewInit(): void {
    if (this.cell.newValue !== '') {
      const toleranceType = this.cell.getRow().getData().type;
      const selectedTolerance = this.organismService.findToleranceTypeKeyFromToleranceObjectType(toleranceType);
      let validator = toleranceValidator;
      this.validationErrorMessage = 'is required';

      if (tolerancesValidators.has(selectedTolerance)) {
        const tolerancesValidator = tolerancesValidators.get(selectedTolerance);
        validator = tolerancesValidator.validator;
        this.validationErrorMessage = tolerancesValidator.validationErrorMessage;
      }
      this.control.setValidators(validator(this.cell.getId()));
    }
  }

  updateValue() {
    this.cell.newValue = this.control.value;
  }
}
