import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {PonicsService} from '../../../../ponics.service';
import {
  AquaponicSystem,
  Component as AquaponicSystemComponent, Organism,
} from '../../../../Ponics.Api.dtos';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-add-component-modal',
  templateUrl: './add-component-modal.component.html',
  styleUrls: ['./add-component-modal.component.scss'],
})
export class AddComponentModalComponent  implements OnInit {
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
    private activeModal: NgbActiveModal) {
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
