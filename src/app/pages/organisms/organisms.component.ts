import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {Organism} from '../../@core/data/Ponics.Api.dtos';
import {OrganismService} from '../../@core/data/organism.service';
import {ConfirmModalComponent} from '../../modal/confirm-modal/confirm-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddToleranceModalComponent} from './organism-detail/add-tolerance/add-tolerance-modal.component';
import {AddOrganismModalComponent} from './add-organism/add-organism-modal.component';

@Component({
  selector: 'ngx-organisms',
  templateUrl: './organisms.component.html',
  styleUrls: ['./organisms.component.scss'],
})
export class OrganismsComponent implements OnInit {
  @Input() allowEdit: boolean = true;
  @Input() organismIds: string[] = null;
  selectedOrganism: Organism = null;
  loadingOrganismsBusy: Promise<any>;
  onNameChangeBusy: Promise<any>;

  settings = {
    actions: false,
    hideHeader: true,
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  addTolerancesCommandsKeys: string[] = [];

  constructor(
    private modalService: NgbModal,
    private organismService: OrganismService) {


  }

  ngOnInit(): void {
    let promise: Promise<Array<Organism>>;

    if (this.organismIds != null) {
      promise = this.organismService.getOrganisms(this.organismIds);
    } else {
      promise = this.organismService.getOrganisms();
    }

    this.loadingOrganismsBusy = promise
      .then((allOrganisms) => {
          this.source.load(allOrganisms).then(() => {
              this.selectedOrganism = allOrganisms[0];
            });
        });
  }

  onUserRowSelect(event) {
    this.selectedOrganism = event.data;
    this.addTolerancesCommandsKeys = this.organismService.getMissingTolerances(this.selectedOrganism);
  }

  deleteOrganism() {
    const modal = this.modalService.open(ConfirmModalComponent, {size: 'lg', container: 'nb-layout'});
    const deleteConfirmModalComponent = <ConfirmModalComponent>modal.componentInstance;
    deleteConfirmModalComponent.confirmModalTitle = 'Delete ' + this.selectedOrganism.name;
    deleteConfirmModalComponent.challengeQuestion =
      'Are you Sure you wish to delete this Organism? If so please enter its name.';

    deleteConfirmModalComponent.challengeAnswer = this.selectedOrganism.name;

    deleteConfirmModalComponent.confirmModalButtonText = 'Delete';
    deleteConfirmModalComponent.confirmationSuccessful =
      () => this.organismService.deleteOrganism(this.selectedOrganism.id);
  }

  onNameChange() {
    this.onNameChangeBusy = this.organismService.updateOrganism(this.selectedOrganism);
  }

  addTolerance() {
    const modal = this.modalService.open(AddToleranceModalComponent, {size: 'lg', container: 'nb-layout'});
    const addToleranceModalComponent = <AddToleranceModalComponent>modal.componentInstance;
    addToleranceModalComponent.organism = this.selectedOrganism;
  }

  newOrganism() {
    this.modalService.open(AddOrganismModalComponent, {size: 'lg', container: 'nb-layout'});
  }
}
