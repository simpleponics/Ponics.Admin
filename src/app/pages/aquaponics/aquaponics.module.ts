import {NgModule} from '@angular/core';

import { AquaponicsRoutingModule, routedComponents } from './aquaponics-routing.module';
import {ThemeModule} from '../../@theme/theme.module';
import {NbMenuItem} from '@nebular/theme';
import {PonicsService} from '../../ponics.service';
import {AquaponicSystem} from '../../Ponics.Api.dtos';

@NgModule({
  imports: [
    ThemeModule,
    AquaponicsRoutingModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [PonicsService],
})
export class AquaponicsModule  {

  static menu: NbMenuItem = {
    title: 'Aquaponics',
    icon: 'nb-keypad',
    link: '/aquaponics',
    children: [
      {
        title: 'Add System',
        link: '/pages/aquaponics/add',
      },
    ],
  };

  constructor(private ponicsService: PonicsService) {
    ponicsService.systemAdded.subscribe(
      (system: AquaponicSystem) =>
        AquaponicsModule.menu.children.push({
          title: system.name,
          link: '/pages/aquaponics/systems/' + system.id,
        }),
    );
  }
  
  generateMenueItems()  {

  }
}
