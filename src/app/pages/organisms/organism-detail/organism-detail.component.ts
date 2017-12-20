import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {Organism} from '../../../@core/data/Ponics.Api.dtos';
import {LocalDataSource} from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../../../modal/confirm-modal/confirm-modal.component';
import {PonicsService} from '../../../@core/data/ponics.service';
import {AddToleranceModalComponent} from './add-tolerance/add-tolerance-modal.component';
import {OrganismService} from '../../../@core/data/organism.service';

@Component({
  selector: 'ngx-organism-detail',
  templateUrl: './organism-detail.component.html',
})
export class OrganismDetailComponent implements OnInit, OnChanges {
  @Input() organism: Organism = new Organism();
  @Input() allowEdit: boolean = false;
  @ViewChild('tolerances') tolerances: Ng2SmartTableComponent;

  settings = {
    mode: 'inline',
    hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-b"></i>',
      confirmDelete: true,
    },
    columns: {
      type: {
        title: 'Type',
        type: 'string',
        editable: false,
      },
      upper: {
        title: 'Upper',
        type: 'number',
      },
      lower: {
        title: 'Lower',
        type: 'number',
      },
      desiredUpper: {
        title: 'Desired Upper',
        type: 'string',
      },
      desiredLower: {
        title: 'Desired Lower',
        type: 'number',
      },
      scale: {
        title: 'Scale',
        type: 'string',
        editable: false,
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  addTolerancesCommandsKeys: string[] = [];

  constructor(
    private modalService: NgbModal,
    private ponicsService: PonicsService,
    private organismService: OrganismService) {
  }

  ngOnInit(): void {
    this.settings.actions.edit = this.allowEdit;
    this.settings.actions.delete = this.allowEdit;

    this.tolerances.settings = this.settings;

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.source.load(this.organism.tolerances);
    this.addTolerancesCommandsKeys = this.organismService.getMissingTolerances(this.organism);
  }


  deleteOrganism() {
    const modal = this.modalService.open(ConfirmModalComponent, {size: 'lg', container: 'nb-layout'});
    const deleteConfirmModalComponent = <ConfirmModalComponent>modal.componentInstance;
    deleteConfirmModalComponent.confirmModalTitle = 'Delete ' + this.organism.name;
    deleteConfirmModalComponent.challengeQuestion =
      'Are you Sure you wish to delete this Organism? If so please enter its name.';

    deleteConfirmModalComponent.challengeAnswer = this.organism.name;

    deleteConfirmModalComponent.confirmModalButtonText = 'Delete';
    deleteConfirmModalComponent.confirmationSuccessful =
      () => this.ponicsService.deleteOrganism(this.organism.id);
  }

  addTolerance() {
    const modal = this.modalService.open(AddToleranceModalComponent, {size: 'lg', container: 'nb-layout'});
    const addToleranceModalComponent = <AddToleranceModalComponent>modal.componentInstance;
    addToleranceModalComponent.organism = this.organism;
  }

  onNameChange() {
    this.organismService.upateOrganism(this.organism);
  }

  onDeleteToleranceConfirm(event) {
    const modal = this.modalService.open(ConfirmModalComponent, {size: 'lg', container: 'nb-layout'});
    const deleteConfirmModalComponent = <ConfirmModalComponent>modal.componentInstance;

    deleteConfirmModalComponent.confirmModalTitle = 'Delete ' + event.data.type + ' tolerance';
    deleteConfirmModalComponent.challengeQuestion =
      'Are you Sure you wish to delete this tolerance? If so please enter its name.';

    deleteConfirmModalComponent.challengeAnswer = event.data.type;

    deleteConfirmModalComponent.confirmModalButtonText = 'Delete';
    deleteConfirmModalComponent.confirmationSuccessful = () => event.confirm.resolve(event.newData);

    console.log(event);
  }
}
