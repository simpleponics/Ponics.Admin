import { Component } from '@angular/core';

import {MenuService} from '../@core/data/menu.service';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-simpleponics-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-simpleponics-layout>
  `,
})
export class PagesComponent {
  menu: NbMenuItem[] = [];
  constructor(private menuService: MenuService) {
    this.menu = menuService.menuItems;
  }
}
