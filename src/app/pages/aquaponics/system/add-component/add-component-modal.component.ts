import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PonicsService} from '../../../../@core/data/ponics.service';
import {
  AquaponicSystem,
  Component as AquaponicSystemComponent, Organism,
} from '../../../../@core/data/Ponics.Api.dtos';
import {LocalDataSource} from 'ng2-smart-table';
import {ModalComponent} from '../../../../@core/modal/modal.component';

@Component({
  selector: 'ngx-add-component-modal',
  templateUrl: './add-component-modal.component.html',
  styleUrls: ['./add-component-modal.component.scss'],
})
export class AddComponentModalComponent extends ModalComponent  implements OnInit {
  component: AquaponicSystemComponent = new AquaponicSystemComponent();
  system: AquaponicSystem;
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
    activeModal: NgbActiveModal) {
    super(activeModal);
    this.component.organisms = [];
  }

  ngOnInit(): void {
    this.ponicsService.getOrganisms()
      .then(
        (allOrganisms) => {
          this.source.load(allOrganisms);
        },
      );
  }

  addComponent() {
    this.activeModal.close();
    this.ponicsService.addComponent(this.system.id, this.component);
  }

  onUserRowSelect(event) {
    this.component.organisms = [];
    this.organisms = event.selected;
    for (const organism of event.selected) {
      this.component.organisms.push(organism.id);
    }
  }
}
