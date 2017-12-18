import {Component,  OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {PonicsService} from '../../@core/data/ponics.service';
import {Organism} from '../../@core/data/Ponics.Api.dtos';

@Component({
  selector: 'ngx-organisms',
  templateUrl: './organisms.component.html',
})
export class OrganismsComponent implements OnInit {
  selectedOrganism: Organism = null;

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

  constructor(
    private ponicsService: PonicsService) { }

  ngOnInit(): void {
    this.ponicsService.getOrganisms()
      .then(
        (allOrganisms) => {
          this.source.load(allOrganisms);
        },
      );
  }

  onUserRowSelect(event) {
    this.selectedOrganism = event.data;
  }
}
