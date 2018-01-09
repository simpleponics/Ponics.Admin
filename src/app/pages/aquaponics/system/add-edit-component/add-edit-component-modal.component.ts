import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PonicsService} from '../../../../@core/data/ponics.service';
import {
  Component as AquaponicSystemComponent, Organism,
} from '../../../../@core/data/Ponics.Api.dtos';
import {LocalDataSource} from 'ng2-smart-table';
import {ModalComponent} from '../../../../modal/modal.component';
import {OrganismService} from '../../../../@core/data/organism.service';
import {Ng2SmartTableComponent} from 'ng2-smart-table/ng2-smart-table.component';

@Component({
  selector: 'ngx-add-edit-component-modal',
  templateUrl: './add-edit-component-modal.component.html',
  styleUrls: ['./add-edit-component-modal.component.scss'],
})
export class AddEditComponentModalComponent extends ModalComponent implements OnInit {
  @Input() component: AquaponicSystemComponent = new AquaponicSystemComponent();
  @Input() systemId: string;
  @ViewChild('organismsTable') organismsTable: Ng2SmartTableComponent;
  organisms: Organism[] = [];

  settings = {
    selectMode: 'multi',
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private ponicsService: PonicsService,
    private organismService: OrganismService,
    activeModal: NgbActiveModal) {
    super(activeModal)
    this.component.organisms = [];
  }

  ngOnInit(): void {
    this.organismService.getOrganisms()
      .then(
        (allOrganisms) => {
          this.source.load(allOrganisms);
        },
      );

    this.source.onChanged().subscribe(
      () => this.test()
    );
  }

  test(): void {
    if (this.organismsTable.grid.getRows() == null) {
      return;
    }
    for (const o of this.component.organisms) {
      const org = this.organismsTable.grid.getRows()
        .find(r => r.getData().id === o);
      if (org != null) {
        org.isSelected = true;
        console.log(org);
      }
    }
  }

  addComponent() {
    this.activeModal.close();
    this.ponicsService.addComponent(this.systemId, this.component);
  }

  onUserRowSelect(event) {
    this.component.organisms = [];
    this.organisms = event.selected;
    for (const organism of event.selected) {
      this.component.organisms.push(organism.id);
    }
  }

  select(event) {

  }
}
