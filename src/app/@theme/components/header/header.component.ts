import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import {AuthService} from '../../../@core/data/auth/auth.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  userMenu = [
    {
      title: 'Log out',
      action: 'logout',
    },
  ];

  @Input() position = 'normal';

  profile: any;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              public auth: AuthService) {
  }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }


  menuClick($event) {
    if ($event.action === 'logout') {
      this.auth.logout();
    }
  }

}
