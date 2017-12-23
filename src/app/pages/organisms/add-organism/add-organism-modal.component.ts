import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from '../../../modal/modal.component';
import {Organism} from '../../../@core/data/Ponics.Api.dtos';
import {OrganismService} from '../../../@core/data/organism.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-add-organism-modal',
  templateUrl: './add-organism-modal.component.html',
  styleUrls: ['./add-organism-modal.component.scss'],
})
export class AddOrganismModalComponent extends ModalComponent implements OnInit {
  addOrganismForm: FormGroup;

  constructor(
    private organismService: OrganismService,
    activeModal: NgbActiveModal) {
    super(activeModal);
  }

  ngOnInit(): void {
    this.addOrganismForm = new FormGroup({
      'organismName': new FormControl(
        null,
        [
          Validators.required,
        ],
      ),
    });
  }

  onSubmit() {
    if (this.addOrganismForm.valid) {
      const organism = new Organism();
      organism.name =  this.addOrganismForm.get('organismName').value;
      this.organismService.addOrganism(organism);
      this.closeModal();
    }
  }
}
