import {Component, Input, OnInit} from '@angular/core';
import {Component as SystemComponent, Organism} from '../../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../../@core/data/ponics.service';

@Component({
  selector: 'ngx-aquaponics-system-component',
  templateUrl: './aquaponics-system-component.component.html',
})
export class AquaponicsSystemComponentComponent implements OnInit {
  @Input() systemComponent: SystemComponent = new SystemComponent();
  @Input() organisms: Organism[] = [];

  constructor(private ponicsService: PonicsService) {
  }

  ngOnInit(): void {
    this.fetchOrganisms();
  }

  fetchOrganisms() {
    if (this.systemComponent.organisms != null) {
      for (const organismId of this.systemComponent.organisms) {
        this.ponicsService.getOrganism(organismId)
          .then(r => {
            this.organisms.push(r);
          });
      }
    }
  }
}
