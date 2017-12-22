import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {PonicsService} from '../../@core/data/ponics.service';
import {Organism} from '../../@core/data/Ponics.Api.dtos';
import {OrganismService} from '../../@core/data/organism.service';

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
    private ponicsService: PonicsService,
    private organismService: OrganismService) { }

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
  }
}
