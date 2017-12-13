import {Component, Input, OnInit} from '@angular/core';
import {Organism} from '../../../../../Ponics.Api.dtos';
import {LocalDataSource} from 'ng2-smart-table';

@Component({
  selector: 'ngx-aquaponics-system-component-organism',
  templateUrl: './aquaponics-system-component-organism.component.html',
})
export class AquaponicsSystemComponentOrganismComponent implements OnInit {

  @Input() organism: Organism = new Organism();
  settings = {
    hideSubHeader: true,
    actions: false,
    columns: {
      type: {
        title: 'Type',
        type: 'string',
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
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  ngOnInit(): void {
    this.source.load(this.organism.tolerances);
  }
}
