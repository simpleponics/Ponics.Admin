﻿import {Component, Input, OnInit} from '@angular/core';
import {Component as SystemComponent, Organism} from '../../../../@core/data/Ponics.Api.dtos';
import {PonicsService} from '../../../../@core/data/ponics.service';
import {OrganismService} from '../../../../@core/data/organism.service';

@Component({
  selector: 'ngx-aquaponics-system-component',
  templateUrl: './aquaponics-system-component.component.html',
})
export class AquaponicsSystemComponentComponent implements OnInit {
  @Input() systemComponent: SystemComponent = new SystemComponent();
  @Input() organisms: Organism[] = [];

  constructor(
    private ponicsService: PonicsService,
    private organismService: OrganismService) {
  }

  ngOnInit(): void {
    this.fetchOrganisms();
  }

  fetchOrganisms() {
    if (this.systemComponent.organisms != null) {
      for (const organismId of this.systemComponent.organisms) {
        this.organismService.getOrganism(organismId)
          .then(r => {
            this.organisms.push(r);
          });
      }
    }
  }
}
