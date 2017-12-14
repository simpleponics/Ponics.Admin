import { Injectable } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {PonicsService} from '../ponics.service';

@Injectable()
export class MenuService {

  systems: NbMenuItem = {
    title: 'Systems',
    link: '/aquaponics/systems',
    children: [],
  };

  aquaponics: NbMenuItem = {
    title: 'Aquaponics',
    icon: 'nb-keypad',
    link: '/aquaponics',
    children: [
      {
        title: 'Add System',
        link: '/pages/aquaponics/add',
      },
      this.systems,
    ],
  };

  menuItems: NbMenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'nb-home',
      link: '/pages/dashboard',
      home: true,
    },
    {
      title: 'GROW',
      group: true,
    },
    this.aquaponics,
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
      }
    );
  }

  generateSystemMenuItems()  {
    this.systems.children = [];
    this.ponicsService.getAquaponicSystems().then(
      systems => {
        for (const system of systems)
        {
          this.systems.children.push({
            title: system.name,
            link: '/pages/aquaponics/systems/' + system.id,
          });
        }
      },
    );
  }
}
