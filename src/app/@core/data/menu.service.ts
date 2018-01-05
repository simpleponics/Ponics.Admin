import { Injectable } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {PonicsService} from './ponics.service';

@Injectable()
export class MenuService {

  systems: NbMenuItem = {
    title: 'Systems',
    link: '/aquaponics/systems',
    children: [],
  };

  aquaponics: NbMenuItem = {
    title: 'Aquaponics',
    icon: 'icon icon-aquaponics',
    link: '/aquaponics',
    children: [
      {
        title: 'Add System',
        link: '/pages/aquaponics/add',
      },
      this.systems,
    ],
  };

  organisms: NbMenuItem = {
    title: 'Organisms',
    icon: 'icon-bioenergy',
    link: '/pages/organisms',
  };

  menuItems: NbMenuItem[] = [
    this.aquaponics,
    this.organisms,
  ];

  constructor(private ponicsService: PonicsService) {
    this.generateSystemMenuItems();
    ponicsService.systemAdded.subscribe(
      system => {
        this.generateSystemMenuItems();
      });

    ponicsService.systemUpdated.subscribe(
      system => {
        this.generateSystemMenuItems();
      },
    );
  }

  generateSystemMenuItems()  {
    this.systems.children = [];
    this.ponicsService.getAquaponicSystems().then(
      systems => {
        for (const system of systems) {
          this.systems.children.push({
            title: system.name,
            link: '/pages/aquaponics/systems/' + system.id,
            children: [
              {
                title: 'Analysis',
                link: '/pages/aquaponics/systems/' + system.id + '/analysis',
              },
            ],
          });
        }
      },
    );
  }
}
