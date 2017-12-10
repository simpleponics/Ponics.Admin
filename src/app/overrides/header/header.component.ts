import { Component } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../@core/data/users.service';
import { AnalyticsService } from '../../@core/utils/analytics.service';
import {HeaderComponent} from '../../@theme/components';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})

export class OverrideHeaderComponent extends HeaderComponent {
  constructor(sidebarService: NbSidebarService,
              menuService: NbMenuService,
              userService: UserService,
              analyticsService: AnalyticsService) {
    super(sidebarService, menuService, userService, analyticsService);
  }
}
