import { NbMenuItem } from '@nebular/theme';
import {AquaponicsModule} from './aquaponics/aquaponics.module';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  AquaponicsModule.menu,
];
