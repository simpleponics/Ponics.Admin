import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Organism} from '../../../@core/data/Ponics.Api.dtos';
import {LocalDataSource} from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmModalComponent} from '../../../modal/confirm-modal/confirm-modal.component';

@Component({
  selector: 'ngx-organism-detail',
  templateUrl: './organism-detail.component.html',
})
export class OrganismDetailComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.source.load(this.organism.tolerances);
  }

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
      confirmDelete: true
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

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.settings.actions.edit = this.allowEdit;
    this.settings.actions.delete = this.allowEdit;

    this.tolerances.settings = this.settings;
    this.source.load(this.organism.tolerances);
  }

  onDeleteConfirm(event) {
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
