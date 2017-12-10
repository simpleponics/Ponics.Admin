import { NbMenuItem } from '@nebular/theme';

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
  {
    title: 'Aquaponics',
    icon: 'nb-keypad',
    link: '/aquaponics',
    children: [
      {
        title: 'Add System',
        link: '/aquaponics/add',
      },
    ],
  },
];
