import {Component, Input, OnInit} from '@angular/core';
import {Component as SystemComponent, Organism} from '../../../../Ponics.Api.dtos';
import {PonicsService} from '../../../../ponics.service';

@Component({
  selector: 'ngx-aquaponics-system-component',
  templateUrl: './aquaponics-system-component.component.html',
})
export class AquaponicsSystemComponentComponent implements OnInit {
  @Input() systemComponent: SystemComponent = new SystemComponent();
  organisms: Organism[] = [];

  constructor(private ponicsService: PonicsService) {
  }

  ngOnInit(): void {
    for (const organismId of this.systemComponent.organisms)
    {
      this.ponicsService.getOrganism(organismId)
        .then(r => {
          this.organisms.push(r);
        });
    }
  }
}
